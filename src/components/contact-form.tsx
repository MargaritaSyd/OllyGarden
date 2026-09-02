"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { GetStartedLink } from "@/components/get-started-link";
import { SiteFormField, siteFormFieldClass } from "@/components/site-form-field";
import { contactForm } from "@/lib/contact";
import { submitContactMessage } from "@/lib/supabase/submissions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<"name" | "email", string>>;

export function ContactForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    const field = name as FieldName;
    setValues((current) => ({ ...current, [field]: value }));
    if (field === "name" || field === "email") {
      setErrors((current) =>
        current[field] ? { ...current, [field]: undefined } : current,
      );
    }
  }

  function validate(fields: Values): Errors {
    const next: Errors = {};
    if (!fields.name.trim()) {
      next.name = contactForm.errors.name;
    }
    if (!fields.email.trim()) {
      next.email = contactForm.errors.emailRequired;
    } else if (!EMAIL_RE.test(fields.email.trim())) {
      next.email = contactForm.errors.emailInvalid;
    }
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      const first = (["name", "email"] as const).find((key) => next[key]);
      if (first) {
        document.getElementById(`ct-${first}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    try {
      await submitContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="ct-form-card rounded-2xl border border-sunflower/32 p-[clamp(1.75rem,3.4vw,3rem)]">
      <h2 className="mb-7 text-[clamp(1.5rem,2.6vw,1.75rem)] leading-[1.28] font-bold tracking-[-0.01em] text-mist">
        {contactForm.title}
      </h2>
      {status === "success" ? (
        <div className="flex max-w-[520px] flex-col items-start gap-3.5" role="status">
          <span
            className="grid size-12 place-items-center rounded-full bg-sunflower"
            aria-hidden="true"
          >
            <SuccessCheck />
          </span>
          <h3 className="text-[22px] leading-[1.25] font-bold tracking-[-0.01em] text-mist">
            {contactForm.successTitle}
          </h3>
          <p className="text-base leading-[1.5] text-mist/75">{contactForm.successBody}</p>
          <GetStartedLink
            href="/"
            variant="secondary"
            className="mt-1.5 rounded-xl px-6"
          >
            {contactForm.successCta}
          </GetStartedLink>
        </div>
      ) : (
        <form className="flex flex-col gap-5" noValidate onSubmit={onSubmit}>
          {status === "error" ? (
            <p
              className="rounded-lg border border-[#e98b7d]/40 bg-[#e98b7d]/12 px-4 py-3.5 text-sm leading-[1.45] text-[#f0a99e]"
              role="alert"
            >
              {contactForm.error}
            </p>
          ) : null}
          <SiteFormField
            id="ct-name"
            name="name"
            label={contactForm.fields.name.label}
            placeholder={contactForm.fields.name.placeholder}
            autoComplete="name"
            required
            value={values.name}
            error={errors.name}
            onChange={onChange}
          />
          <SiteFormField
            id="ct-email"
            name="email"
            label={contactForm.fields.email.label}
            placeholder={contactForm.fields.email.placeholder}
            type="email"
            autoComplete="email"
            required
            value={values.email}
            error={errors.email}
            onChange={onChange}
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm leading-none font-medium text-mist" htmlFor="ct-message">
              {contactForm.fields.message.label}
            </label>
            <textarea
              id="ct-message"
              name="message"
              rows={6}
              placeholder={contactForm.fields.message.placeholder}
              value={values.message}
              onChange={onChange}
              className={`${siteFormFieldClass} min-h-[162px] resize-y`}
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-1 inline-flex h-12 w-full items-center justify-center self-start rounded-xl bg-mist px-6 text-base font-semibold text-forest transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)] disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none sm:w-auto"
          >
            {status === "submitting" ? contactForm.submitting : contactForm.submit}
          </button>
        </form>
      )}
    </div>
  );
}

function SuccessCheck() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="#00280E"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
