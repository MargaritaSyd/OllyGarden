"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { FormPrivacyNotice, SiteFormField } from "@/components/site-form-field";
import { captureFormEvent, useFormStarted } from "@/lib/form-analytics";
import { normalizeGitHubRepositoryUrl } from "@/lib/github-repository-url";
import { captureCtaClick, capturePostHogEvent } from "@/lib/posthog";
import { submitRoseOpenSourceApplication } from "@/lib/supabase/submissions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RoseOpenSourceApplication({ label }: { label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const markStarted = useFormStarted("rose_open_source");

  function openDialog() {
    setStatus("idle");
    setErrors({});
    dialogRef.current?.showModal();
    captureCtaClick({
      buttonId: "rose_pricing_open_source",
      buttonText: label,
      section: "pricing",
    });
    capturePostHogEvent("rose_oss_apply_opened", {
      page_path: window.location.pathname,
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markStarted();
    captureFormEvent("form_submission_attempted", "rose_open_source");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const githubUrl = String(form.get("githubUrl") ?? "").trim();
    const next: Record<string, string> = {};
    if (!name) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email))
      next.email = "Please enter a valid email address.";
    if (!normalizeGitHubRepositoryUrl(githubUrl))
      next.githubUrl = "Enter a public GitHub repository URL.";
    setErrors(next);
    if (Object.keys(next).length) {
      captureFormEvent("form_submission_failed", "rose_open_source", {
        failure_type: "validation",
      });
      return;
    }

    setStatus("submitting");
    try {
      await submitRoseOpenSourceApplication({ name, email, githubUrl });
      captureFormEvent("form_submitted", "rose_open_source");
      capturePostHogEvent("rose_oss_apply_submitted", {
        page_path: window.location.pathname,
      });
      capturePostHogEvent("lead_generated", {
        form_name: "rose_open_source",
        signup_method: "rose_open_source",
        page_path: window.location.pathname,
      });
      setStatus("success");
    } catch {
      captureFormEvent("form_submission_failed", "rose_open_source", {
        failure_type: "persistence",
      });
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="plan-os-cta rz-cta-steady inline-flex h-12 items-center justify-center rounded-xl bg-mist px-8 text-base font-medium tracking-[0.02em] text-forest transition-colors"
      >
        {label}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[min(100%-1.5rem,36rem)] rounded-2xl border border-sunflower/30 bg-[#021208] p-7 text-mist shadow-2xl backdrop:bg-black/70"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-bold tracking-[.12em] text-bitmap-mid uppercase">
              Rose for open source
            </p>
            <h2 id={titleId} className="mt-2 text-2xl font-bold">
              Apply with a public repository
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="rounded-lg p-2 text-mist/70 hover:bg-white/10"
          >
            ✕
          </button>
        </div>
        {status === "success" ? (
          <div className="mt-7" role="status">
            <h3 className="text-xl font-semibold">Application received.</h3>
            <p className="mt-2 text-mist/70">
              We’ll review the repository and get back to you.
            </p>
          </div>
        ) : (
          <form
            className="mt-7 flex flex-col gap-5"
            onChangeCapture={markStarted}
            onSubmit={submit}
            noValidate
          >
            {status === "error" ? (
              <p
                role="alert"
                className="rounded-lg border border-[#e98b7d]/40 bg-[#e98b7d]/12 p-3 text-sm text-[#f0a99e]"
              >
                We couldn’t save your application. Please try again.
              </p>
            ) : null}
            <SiteFormField
              id="oss-name"
              name="name"
              label="Name"
              placeholder="Ada Lovelace"
              autoComplete="name"
              required
              error={errors.name}
            />
            <SiteFormField
              id="oss-email"
              name="email"
              label="Email"
              placeholder="ada@observability.dev"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <SiteFormField
              id="oss-github"
              name="githubUrl"
              label="Public GitHub repository"
              placeholder="https://github.com/org/repository"
              type="url"
              autoComplete="url"
              required
              error={errors.githubUrl}
            />
            <FormPrivacyNotice />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="h-12 rounded-xl bg-mist px-6 font-semibold text-forest hover:bg-sunflower disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Submit application"}
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
