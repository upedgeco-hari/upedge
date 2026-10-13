"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretDown, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { budgetRanges, contactSchema, projectTypes, type ContactInput } from "@/lib/contact-schema";

const field =
  "w-full rounded-input bg-surface px-4 py-3.5 text-base text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] placeholder:text-muted transition-shadow duration-300 focus:shadow-[inset_0_0_0_2px_var(--ink)] focus:outline-none aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--danger)]";

type Status = "idle" | "success" | "error";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), mode: "onTouched" });

  const onSubmit = async (values: ContactInput) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      reset();
      setStatus("success");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-card bg-surface p-8 shadow-[inset_0_0_0_1px_var(--line)] sm:p-12">
        <CheckCircle size={44} weight="light" className="text-success" aria-hidden="true" />
        <h2 className="display-3 mt-6">Thank you. Your request is in.</h2>
        <p className="mt-4 max-w-[46ch] text-ink-2">We will review the details and contact you, usually within one working day.</p>
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Request"}
      </Button>
    </form>
  );
}
