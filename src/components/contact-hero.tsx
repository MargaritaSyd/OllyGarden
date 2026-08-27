import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { MotifField } from "@/components/motif-field";
import { contactEmail, contactHero } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

export function ContactHero() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(8rem,12vw,11rem)] pb-[clamp(4rem,7vw,6.5rem)] max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-16"
      aria-labelledby="ct-title"
    >
      <MotifField
        kind="lead"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="grid items-start gap-12 min-[961px]:grid-cols-2 min-[961px]:gap-[72px]">
          <div className="flex max-w-[580px] flex-col items-start">
            <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
              <BadgeChevrons />
              {contactHero.badge}
            </div>
            <h1
              id="ct-title"
              className="mt-6 text-[clamp(2.5rem,4.45vw,4rem)] leading-[1.12] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)]"
            >
              {contactHero.title.map((line, index) => (
                <span
                  key={line}
                  className={`ov-blur-rise block min-[961px]:whitespace-nowrap ${
                    index === 0 ? "[animation-delay:0.25s]" : "[animation-delay:0.42s]"
                  }`}
                >
                  {line}
                </span>
              ))}
            </h1>
            <p className="ov-fade-up mt-6 text-base leading-[1.4] tracking-[0.02em] text-mist [animation-delay:0.7s]">
              {contactHero.lede}
            </p>
          </div>

          <div className="relative z-[1] flex flex-col gap-6">
            <ContactInfoCard>
              <h2 className="text-[22px] leading-[1.28] font-bold tracking-[-0.01em] text-mist">
                {contactHero.connect.title}
              </h2>
              <p className="mt-3 text-base leading-[1.4] text-mist/75">
                {contactHero.connect.body}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our LinkedIn page"
                  className="grid size-11 place-items-center rounded-[10px] text-sunflower transition-opacity hover:opacity-80"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={siteConfig.social.email}
                  aria-label="Send us an email"
                  className="grid size-11 place-items-center rounded-[10px] text-sunflower transition-opacity hover:opacity-80"
                >
                  <MailIcon />
                </a>
              </div>
            </ContactInfoCard>
            <ContactInfoCard>
              <h2 className="text-[22px] leading-[1.28] font-bold tracking-[-0.01em] text-mist">
                {contactHero.email.title}
              </h2>
              <p className="mt-3 text-base leading-[1.4] text-mist/75">
                {contactHero.email.body}
              </p>
              <a
                href={siteConfig.social.email}
                className="mt-5 inline-block text-lg font-bold text-sunflower underline-offset-2 hover:underline"
              >
                {contactEmail}
              </a>
            </ContactInfoCard>
          </div>
        </div>

        <div className="mt-14">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactInfoCard({ children }: { children: ReactNode }) {
  return (
    <article className="relative isolate overflow-hidden rounded-3xl border border-bitmap-highlight/40 bg-forest">
      <div
        className="surface-grain pointer-events-none absolute inset-0 bg-forest"
        aria-hidden="true"
      />
      <div className="relative px-7 pt-7 pb-8">{children}</div>
    </article>
  );
}

function BadgeChevrons() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M1 1l3 5-3 5M5.5 1l3 5-3 5M10 1l3 5-3 5"
        stroke="#E3E270"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M12.1899 15.0459V19.8078"
        stroke="currentColor"
        strokeWidth="1.90476"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1899 12.1885V12.198"
        stroke="currentColor"
        strokeWidth="1.90476"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 19.8078V15.0459"
        stroke="currentColor"
        strokeWidth="1.90476"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8095 19.8078V16.9507C19.8095 16.4455 19.6088 15.961 19.2516 15.6038C18.8944 15.2466 18.4099 15.0459 17.9048 15.0459C17.3996 15.0459 16.9151 15.2466 16.5579 15.6038C16.2007 15.961 16 16.4455 16 16.9507"
        stroke="currentColor"
        strokeWidth="1.90476"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.42871 11.2373C7.42871 10.2269 7.83007 9.25794 8.54449 8.54352C9.25892 7.82909 10.2279 7.42773 11.2382 7.42773H20.762C21.7724 7.42773 22.7414 7.82909 23.4558 8.54352C24.1702 9.25794 24.5716 10.2269 24.5716 11.2373V20.7611C24.5716 21.7714 24.1702 22.7404 23.4558 23.4548C22.7414 24.1692 21.7724 24.5706 20.762 24.5706H11.2382C10.2279 24.5706 9.25892 24.1692 8.54449 23.4548C7.83007 22.7404 7.42871 21.7714 7.42871 20.7611V11.2373Z"
        stroke="currentColor"
        strokeWidth="1.90476"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M25.5234 11.2383L16.9606 16.6926C16.67 16.8613 16.34 16.9502 16.0039 16.9502C15.6679 16.9502 15.3378 16.8613 15.0473 16.6926L6.47583 11.2383"
        stroke="currentColor"
        strokeWidth="1.90476"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.6187 8.38086H8.38059C7.32862 8.38086 6.47583 9.23365 6.47583 10.2856V21.7142C6.47583 22.7662 7.32862 23.619 8.38059 23.619H23.6187C24.6707 23.619 25.5234 22.7662 25.5234 21.7142V10.2856C25.5234 9.23365 24.6707 8.38086 23.6187 8.38086Z"
        stroke="currentColor"
        strokeWidth="1.90476"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
