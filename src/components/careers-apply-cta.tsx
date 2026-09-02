"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { careersCtaClassName } from "@/components/careers-card";
import { SiteFormField } from "@/components/site-form-field";
import { careersApplyForm } from "@/lib/careers";
import { submitJobApplication } from "@/lib/supabase/submissions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "fullName" | "email" | "linkedin" | "github";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<"fullName" | "email", string>>;

const emptyValues: Values = {
  fullName: "",
  email: "",
  linkedin: "",
  github: "",
};

export function CareersApplyCta({ label }: { label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
      return;
    }
    if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  function openDialog() {
    setValues(emptyValues);
    setErrors({});
    setStatus("idle");
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    const field = name as FieldName;
    setValues((current) => ({ ...current, [field]: value }));
    if (field === "fullName" || field === "email") {
      setErrors((current) =>
        current[field] ? { ...current, [field]: undefined } : current,
      );
    }
  }

  function validate(fields: Values): Errors {
    const next: Errors = {};
    if (!fields.fullName.trim()) {
      next.fullName = careersApplyForm.errors.fullName;
    }
    if (!fields.email.trim()) {
      next.email = careersApplyForm.errors.emailRequired;
    } else if (!EMAIL_RE.test(fields.email.trim())) {
      next.email = careersApplyForm.errors.emailInvalid;
    }
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      const first = (["fullName", "email"] as const).find((key) => next[key]);
      if (first) {
        document.getElementById(`ca-${first}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    try {
      await submitJobApplication({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        linkedinUrl: values.linkedin.trim(),
        githubUrl: values.github.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button type="button" className={careersCtaClassName} onClick={openDialog}>
        {label}
        <CtaArrow />
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(100%-1.5rem,36rem)] overflow-y-auto rounded-2xl border border-sunflower/32 bg-[#021208] p-[clamp(1.5rem,3vw,2.25rem)] text-mist shadow-[0_24px_64px_rgba(0,0,0,0.55)] [scrollbar-width:none] backdrop:bg-black/70 [&::-webkit-scrollbar]:hidden"
        onClose={closeDialog}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeDialog();
          }
        }}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="text-[clamp(1.35rem,2.4vw,1.6rem)] leading-[1.28] font-bold tracking-[-0.01em]"
          >
            {careersApplyForm.title}
          </h2>
          <button
            type="button"
            className="grid size-9 shrink-0 place-items-center rounded-lg text-mist/70 transition-colors hover:bg-mist/8 hover:text-mist"
            aria-label={careersApplyForm.close}
            onClick={closeDialog}
          >
            <CloseIcon />
          </button>
        </div>
        {status === "success" ? (
          <div className="flex flex-col items-start gap-3.5" role="status">
            <span
              className="grid size-12 place-items-center rounded-full bg-sunflower"
              aria-hidden="true"
            >
              <SuccessCheck />
            </span>
            <h3 className="text-[22px] leading-[1.25] font-bold tracking-[-0.01em]">
              {careersApplyForm.successTitle}
            </h3>
            <p className="text-base leading-[1.5] text-mist/75">{careersApplyForm.successBody}</p>
            <button
              type="button"
              onClick={closeDialog}
              className="mt-1.5 inline-flex h-12 items-center justify-center rounded-xl border border-mist/50 bg-mist/12 px-6 text-base font-semibold text-mist"
            >
              {careersApplyForm.successCta}
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-5" noValidate onSubmit={onSubmit}>
            {status === "error" ? (
              <p
                className="rounded-lg border border-[#e98b7d]/40 bg-[#e98b7d]/12 px-4 py-3.5 text-sm leading-[1.45] text-[#f0a99e]"
                role="alert"
              >
                {careersApplyForm.error}
              </p>
            ) : null}
            <SiteFormField
              id="ca-fullName"
              name="fullName"
              label={careersApplyForm.fields.fullName.label}
              placeholder={careersApplyForm.fields.fullName.placeholder}
              autoComplete="name"
              required
              value={values.fullName}
              error={errors.fullName}
              onChange={onChange}
            />
            <SiteFormField
              id="ca-email"
              name="email"
              label={careersApplyForm.fields.email.label}
              placeholder={careersApplyForm.fields.email.placeholder}
              type="email"
              autoComplete="email"
              required
              value={values.email}
              error={errors.email}
              onChange={onChange}
            />
            <SiteFormField
              id="ca-linkedin"
              name="linkedin"
              label={careersApplyForm.fields.linkedin.label}
              placeholder={careersApplyForm.fields.linkedin.placeholder}
              type="text"
              autoComplete="url"
              value={values.linkedin}
              onChange={onChange}
            />
            <SiteFormField
              id="ca-github"
              name="github"
              label={careersApplyForm.fields.github.label}
              placeholder={careersApplyForm.fields.github.placeholder}
              type="text"
              autoComplete="url"
              value={values.github}
              onChange={onChange}
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-1 inline-flex h-12 w-full items-center justify-center self-start rounded-xl bg-mist px-6 text-base font-semibold text-forest transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)] disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none sm:w-auto"
            >
              {status === "submitting" ? careersApplyForm.submitting : careersApplyForm.submit}
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
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
