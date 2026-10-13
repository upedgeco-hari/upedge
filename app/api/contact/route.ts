import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Quote request endpoint. Configure with env variables (see .env.example):
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * Without them it returns 503 in production and accepts (without sending) in development.
 */

// Tiny in-memory rate limit (per server instance). Swap for Upstash/Redis if you need strictness.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const d = parsed.data;
  if (d.company) return NextResponse.json({ ok: true }); // honeypot tripped: pretend success

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ ok: true, dev: true });
    return NextResponse.json({ error: "Email is not configured on the server." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Project type", d.projectType],
    ["Budget", d.budget],
    ["Location", d.location],
  ];

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: d.email,
      subject: `New quote request: ${d.projectType} (${d.name})`,
      text: [...rows.map(([k, v]) => `${k}: ${v}`), "", d.message].join("\n"),
      html: `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${esc(d.message)}</p>`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We could not send your message. Please call or email us instead." }, { status: 502 });
  }
}
