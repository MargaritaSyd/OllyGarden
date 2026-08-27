"use client";

import { useState, type FormEvent } from "react";
import { MotifField } from "@/components/motif-field";
import { siteConfig } from "@/lib/site";
import { tulipLead } from "@/lib/tulip";

export function TulipLead() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const tier = String(data.get("tier") ?? "standard");
    const notes = String(data.get("notes") ?? "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Tier: ${tier}`,
      "",
      notes,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `${siteConfig.social.email}?subject=${encodeURIComponent(
      `Tulip support — ${tier}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section
      aria-labelledby="lead-title"
      className="relative isolate overflow-hidden px-6 py-16 pb-20 sm:px-12 lg:px-[104px] lg:py-24"
    >
      <MotifField
        kind="lead"
        className="pointer-events-none absolute inset-x-0 top-0 bottom-8 -z-10 select-none lg:bottom-12"
      />
      <div className="relative z-10 mx-auto grid max-w-[1328px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start">
        <div>
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

        <div className="surface-grain relative z-10 rounded-3xl border border-white/10 bg-[#19321e] p-6 sm:p-8">
            {sent ? (
              <div>
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
                  <Field
                    id="lf-name"
                    name="name"
                    label="Name"
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    required
                  />
                  <Field
                    id="lf-email"
                    name="email"
                    label="Work email"
                    type="email"
                    placeholder="ada@observability.dev"
                    autoComplete="email"
                    required
                  />
                  <Field
                    id="lf-company"
                    name="company"
                    label="Company"
                    placeholder="Ops Garden GmbH"
                    autoComplete="organization"
                  />
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-mist">
                      Preferred support tier <span aria-hidden="true">*</span>
                    </legend>
                    <div className="grid gap-3">
                      {tulipLead.tiers.map((tier, index) => (
                        <label
                          key={tier.value}
                          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-forest/40 p-4 has-[:checked]:border-[#d9e533]/50"
                        >
                          <input
                            type="radio"
                            name="tier"
                            value={tier.value}
                            defaultChecked={index === 0}
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
                    Deployment notes <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="lf-notes"
                    name="notes"
                    required
                    rows={4}
                    placeholder="Share where you're running the collector, major components you rely on, and any version transition concerns."
                    className="rounded-2xl border border-white/12 bg-forest/50 px-4 py-3 text-sm text-mist outline-none placeholder:text-mist/35 focus:border-[#d9e533]/50"
                  />
                  <button
                    type="submit"
                    className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-mist px-[30px] text-base font-semibold text-forest transition-colors hover:bg-sunflower"
                  >
                    {tulipLead.submit}
                  </button>
                </form>
              </>
            )}
          </div>
      </div>
    </section>
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
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  type?: string;
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
        className="h-12 w-full rounded-2xl border border-white/12 bg-forest/50 px-4 text-sm text-mist outline-none placeholder:text-mist/35 focus:border-[#d9e533]/50"
      />
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
