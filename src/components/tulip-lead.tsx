"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { InView } from "@/components/in-view";
import { MotifField } from "@/components/motif-field";
import { submitTulipLead } from "@/lib/supabase/submissions";
import { tulipLead } from "@/lib/tulip";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "company" | "tier" | "notes";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<"name" | "email" | "tier", string>>;

const emptyValues: Values = {
  name: "",
  email: "",
  company: "",
  tier: "standard",
  notes: "",
};

export function TulipLead() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    const field = name as FieldName;
    setValues((current) => ({ ...current, [field]: value }));
    if (field === "name" || field === "email" || field === "tier") {
      setErrors((current) =>
        current[field] ? { ...current, [field]: undefined } : current,
      );
    }
  }

  function validate(fields: Values): Errors {
    const next: Errors = {};
    if (!fields.name.trim()) {
      next.name = tulipLead.errors.name;
    }
    if (!fields.email.trim()) {
      next.email = tulipLead.errors.emailRequired;
    } else if (!EMAIL_RE.test(fields.email.trim())) {
      next.email = tulipLead.errors.emailInvalid;
    }
    if (!fields.tier.trim()) {
      next.tier = tulipLead.errors.supportTier;
    }
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      const first = (["name", "email", "tier"] as const).find((key) => next[key]);
      if (first) {
        document.getElementById(`lf-${first}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    try {
      await submitTulipLead({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        message: values.notes.trim(),
        supportTier: values.tier.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <InView
      as="section"
      aria-labelledby="lead-title"
      className="tulip-lead relative isolate overflow-hidden px-6 py-16 pb-20 sm:px-12 lg:px-[104px] lg:py-24"
    >
      <MotifField
        kind="lead"
        className="pointer-events-none absolute inset-x-0 top-0 bottom-8 -z-10 select-none lg:bottom-12"
      />
      <div className="relative z-10 mx-auto grid max-w-[1328px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start">
        <div className="lf-copy">
          <h2
            id="lead-title"
            className="text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.2] font-bold tracking-[-0.02em] text-balance text-mist"
          >
            {tulipLead.title}
          </h2>
          <p className="mt-5 max-w-[560px] text-base leading-[1.66] text-mist/75">
            {tulipLead.lede}
          </p>
          <ul className="mt-10 flex flex-col gap-6">
            {tulipLead.points.map((point) => (
              <li key={point.title} className="flex gap-3">
                <Spark />
                <span>
                  <span className="block font-semibold text-mist">{point.title}</span>
                  <span className="mt-1 block text-sm leading-[1.55] text-mist/70">
                    {point.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lf-card surface-grain relative z-10 rounded-3xl border border-white/10 bg-[#19321e] p-6 sm:p-8">
          {status === "success" ? (
            <div role="status">
              <h3 className="text-xl font-semibold text-mist">{tulipLead.successTitle}</h3>
              <p className="mt-3 text-sm leading-[1.6] text-mist/75">
                {tulipLead.successBody}
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-mist">{tulipLead.cardTitle}</h3>
              <p className="mt-2 text-sm leading-[1.6] text-mist/70">{tulipLead.cardSub}</p>
              <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit} noValidate>
                {status === "error" ? (
                  <p
                    className="rounded-lg border border-[#e98b7d]/40 bg-[#e98b7d]/12 px-4 py-3.5 text-sm leading-[1.45] text-[#f0a99e]"
                    role="alert"
                  >
                    {tulipLead.error}
                  </p>
                ) : null}
                <Field
                  id="lf-name"
                  name="name"
                  label="Name"
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  required
                  value={values.name}
                  error={errors.name}
                  onChange={onChange}
                />
                <Field
                  id="lf-email"
                  name="email"
                  label="Work email"
                  type="email"
                  placeholder="ada@observability.dev"
                  autoComplete="email"
                  required
                  value={values.email}
                  error={errors.email}
                  onChange={onChange}
                />
                <Field
                  id="lf-company"
                  name="company"
                  label="Company"
                  placeholder="Ops Garden GmbH"
                  autoComplete="organization"
                  value={values.company}
                  onChange={onChange}
                />
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-mist">
                    Preferred support tier <span aria-hidden="true">*</span>
                  </legend>
                  {errors.tier ? (
                    <p className="mb-2 text-sm text-[#f0a99e]" role="alert">
                      {errors.tier}
                    </p>
                  ) : null}
                  <div className="grid gap-3">
                    {tulipLead.tiers.map((tier, index) => (
                      <label
                        key={tier.value}
                        className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-forest/40 p-4 has-[:checked]:border-[#d9e533]/50"
                      >
                        <input
                          id={index === 0 ? "lf-tier" : undefined}
                          type="radio"
                          name="tier"
                          value={tier.value}
                          checked={values.tier === tier.value}
                          onChange={onChange}
                          className="mt-1 accent-[#9ca703]"
                          required
                        />
                        <span>
                          <span className="block font-semibold text-mist">{tier.title}</span>
                          <span className="mt-0.5 block text-sm text-mist/65">
                            {tier.desc}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-sm font-medium text-mist" htmlFor="lf-notes">
                  Deployment notes
                </label>
                <textarea
                  id="lf-notes"
                  name="notes"
                  rows={4}
                  placeholder="Share where you're running the collector, major components you rely on, and any version transition concerns."
                  value={values.notes}
                  onChange={onChange}
                  className="rounded-2xl border border-white/12 bg-forest/50 px-4 py-3 text-sm text-mist outline-none placeholder:text-mist/35 focus:border-[#d9e533]/50"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-mist px-[30px] text-base font-semibold text-forest transition-colors hover:bg-sunflower disabled:cursor-default disabled:opacity-60 disabled:hover:bg-mist"
                >
                  {status === "submitting" ? tulipLead.submitting : tulipLead.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </InView>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  required = false,
  type = "text",
  value,
  error,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  type?: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-mist" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 w-full rounded-2xl border border-white/12 bg-forest/50 px-4 text-sm text-mist outline-none placeholder:text-mist/35 focus:border-[#d9e533]/50"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#f0a99e]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Spark() {
  return (
    <svg
      className="mt-1 shrink-0 text-bitmap-mid"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1v14M1 8h14M3.05 3.05l9.9 9.9M12.95 3.05l-9.9 9.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
