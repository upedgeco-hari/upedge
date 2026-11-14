"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowCounterClockwise, CaretDown, CheckCircle, WarningCircle, X } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { budgetRanges, contactSchema, projectTypes, type ContactInput } from "@/lib/contact-schema";
import { enquiryFromParams, type EnquiryContext } from "@/lib/enquiry";

const field =
  "w-full rounded-input bg-surface px-4 py-3.5 text-base text-ink placeholder:text-muted " +
  "shadow-[inset_0_0_0_1px_var(--line-strong),var(--elev-1)] transition-shadow duration-[var(--dur-2)] ease-smooth " +
  "hover:shadow-[inset_0_0_0_1px_var(--ink-2),var(--elev-1)] " +
  "focus:shadow-[inset_0_0_0_2px_var(--ink),0_0_0_4px_var(--accent-wash)] focus:outline-none " +
  "aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--danger)]";

type Status = "idle" | "success" | "error";

const DRAFT_KEY = "upedge:enquiry-draft";
/** Fields worth keeping. The honeypot and the carried reference are deliberately not. */
const draftFields = ["name", "phone", "email", "projectType", "budget", "location", "message"] as const;

function readDraft(): Partial<ContactInput> | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const k of draftFields) if (typeof parsed[k] === "string" && parsed[k]) out[k] = parsed[k];
    return Object.keys(out).length ? (out as Partial<ContactInput>) : null;
  } catch {
    return null; // private browsing, cleared storage, or a stale shape: start clean
  }
}

function writeDraft(values: Partial<ContactInput>) {
  try {
    const out: Record<string, string> = {};
    for (const k of draftFields) {
      const v = values[k];
      if (typeof v === "string" && v.trim()) out[k] = v;
    }
    if (Object.keys(out).length) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(out));
    else window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Storage unavailable. The form still works; it just will not remember.
  }
}

function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* nothing to clear */
  }
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [context, setContext] = useState<EnquiryContext | null>(null);
  const [restored, setRestored] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), mode: "onTouched" });

  /*
   * On mount: put back whatever was typed before (a half-filled enquiry should survive
   * going off to re-check a plot size), then lay the page context on top of it, since
   * the link someone just followed is a better signal than a stale draft.
   */
  /* eslint-disable react-hooks/set-state-in-effect --
     localStorage and the query string exist only in the browser. Reading them during
     render would make the client's first paint disagree with the server's HTML, so this
     is the mount-only external read the rule is meant to allow. */
  useEffect(() => {
    const draft = readDraft();
    if (draft) {
      reset(draft, { keepDefaultValues: true });
      setRestored(true);
    }
    const q = new URLSearchParams(window.location.search);
    const ctx = enquiryFromParams(q.get("about"), q.get("type"));
    if (ctx) {
      setContext(ctx);
      if (ctx.type) setValue("projectType", ctx.type, { shouldValidate: false });
    }
  }, [reset, setValue]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /*
   * Keep the draft current, debounced so typing never touches storage on every keystroke.
   * This listens to the change event bubbling up from the fields rather than subscribing
   * with react-hook-form's watch(): watch() returns a fresh function each render, which
   * makes the React Compiler skip memoising this whole component.
   */
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const persist = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => writeDraft(getValues()), 600);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const startFresh = () => {
    clearDraft();
    reset({ name: "", phone: "", email: "", location: "", message: "" });
    setRestored(false);
  };

  const onSubmit = async (values: ContactInput) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, reference: context?.about }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      clearDraft();
      reset();
      setRestored(false);
      setStatus("success");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="panel p-8 sm:p-12">
        <CheckCircle size={44} weight="light" className="text-success" aria-hidden="true" />
        <h2 className="display-3 mt-6">Thank you. Your request is in.</h2>
        <p className="measure-sm mt-4 text-ink-2">
          {context
            ? `We will review your ${context.about.toLowerCase()} enquiry and contact you, usually within one working day.`
            : "We will review the details and contact you, usually within one working day."}
        </p>
        <Button variant="outline" arrow={false} className="mt-8" type="button" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  const a11y = (name: keyof ContactInput) => ({
    id: `${uid}-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-err` : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={persist} noValidate className="space-y-6">
      {context && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-input bg-accent-wash px-4 py-3 text-sm">
          <span className="eyebrow text-accent-deep">Enquiring about</span>
          <span className="font-medium text-ink">{context.about}</span>
          <button
            type="button"
            onClick={() => setContext(null)}
            className="ml-auto inline-flex items-center gap-1.5 text-muted transition-colors duration-[var(--dur-2)] hover:text-ink"
          >
            <X size={14} weight="light" aria-hidden="true" />
            Clear
          </button>
        </p>
      )}

      {restored && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-input bg-surface-2 px-4 py-3 text-sm text-ink-2">
          <ArrowCounterClockwise size={16} weight="light" aria-hidden="true" />
          We kept what you typed earlier.
          <button
            type="button"
            onClick={startFresh}
            className="ml-auto text-muted underline-offset-4 transition-colors duration-[var(--dur-2)] hover:text-ink hover:underline"
          >
            Start fresh
          </button>
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Full name" error={errors.name?.message}>
          <input {...register("name")} {...a11y("name")} autoComplete="name" className={field} placeholder="Your full name" />
        </Field>
        <Field id={`${uid}-phone`} label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} {...a11y("phone")} type="tel" autoComplete="tel" className={field} placeholder="+91 00000 00000" />
        </Field>
      </div>
      <Field id={`${uid}-email`} label="Email" error={errors.email?.message}>
        <input {...register("email")} {...a11y("email")} type="email" autoComplete="email" className={field} placeholder="you@example.com" />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-projectType`} label="Project type" error={errors.projectType?.message}>
          <div className="relative">
            <select {...register("projectType")} {...a11y("projectType")} defaultValue="" className={cn(field, "appearance-none pr-11")}>
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
            <CaretDown size={16} weight="light" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-2" aria-hidden="true" />
          </div>
        </Field>
        <Field id={`${uid}-budget`} label="Budget range" error={errors.budget?.message}>
          <div className="relative">
            <select {...register("budget")} {...a11y("budget")} defaultValue="" className={cn(field, "appearance-none pr-11")}>
            <option value="" disabled>
              Select a budget range
            </option>
            {budgetRanges.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
            <CaretDown size={16} weight="light" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-2" aria-hidden="true" />
          </div>
        </Field>
      </div>
      <Field id={`${uid}-location`} label="Project location" error={errors.location?.message}>
        <input {...register("location")} {...a11y("location")} autoComplete="address-level2" className={field} placeholder="City or area" />
      </Field>
      <Field id={`${uid}-message`} label="Tell us about your project" error={errors.message?.message}>
        <textarea {...register("message")} {...a11y("message")} rows={5} className={cn(field, "resize-y")} placeholder="Plot size, what you want to build, timeline, anything that helps." />
      </Field>

      {/* Honeypot, hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-3 rounded-input bg-danger/10 p-4 text-danger">
          <WarningCircle size={22} weight="light" className="mt-0.5 shrink-0" aria-hidden="true" />
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting} arrow={!isSubmitting}>
          <span className="inline-flex items-center gap-2.5">
            {isSubmitting && <span className="spinner" aria-hidden="true" />}
            {isSubmitting ? "Sending" : "Send Request"}
          </span>
        </Button>
        <p className="text-sm text-muted" aria-live="polite">
          {isSubmitting ? "One moment." : "We reply within one working day."}
        </p>
      </div>
    </form>
  );
}
