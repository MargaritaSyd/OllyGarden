import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { PageBody, PageHero } from "@/components/page-hero";

export const legalLinkClass = "text-olly-green underline hover:no-underline";

type LegalPageProps = {
  title: string;
  /** Decorative icon shown in the eyebrow next to the "Legal" label. */
  icon?: ReactNode;
  /** "Last Updated" line rendered under the title. */
  updated?: ReactNode;
  children: ReactNode;
};

/**
 * Shell for legal documents. The title block fills the first viewport via
 * `PageHero` so the cards start below the global frame motif.
 */
export function LegalPage({ title, icon, updated, children }: LegalPageProps) {
  return (
    <>
      <PageHero
        titleId="legal-title"
        eyebrow={
          <span className="inline-flex items-center gap-2">
            {icon ? (
              <span className="text-olly-green [&>svg]:h-4 [&>svg]:w-4">
                {icon}
              </span>
            ) : null}
            Legal
          </span>
        }
        title={title}
      >
        {updated ? (
          <p className="text-sm text-muted-foreground">{updated}</p>
        ) : null}
      </PageHero>
      <PageBody>
        <div className="container max-w-4xl mx-auto space-y-6">{children}</div>
      </PageBody>
    </>
  );
}

export function Card({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/[0.035] ${className}`}
      {...props}
    />
  );
}

export function CardHeader({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={`px-6 pt-6 ${className}`} {...props} />;
}

export function CardTitle({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return <h2 className={`font-semibold text-mist ${className}`} {...props} />;
}

export function CardContent({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={`px-6 pt-4 pb-6 leading-7 ${className}`} {...props} />;
}

function LegalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 3.5h7l3 3V20H7zM14 3.5V7h3M9.5 11h5M9.5 14.5h5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const FileText = LegalIcon;
export const Calendar = LegalIcon;
export const Shield = LegalIcon;
export const Eye = LegalIcon;
export const Lock = LegalIcon;
export const Database = LegalIcon;
export const Mail = LegalIcon;
