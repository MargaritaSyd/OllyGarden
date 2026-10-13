import Link from "next/link";
import { CareersApplyCta } from "@/components/careers-apply-cta";
import { JsonLd } from "@/components/json-ld";
import { JobPostingAnalytics } from "@/components/job-posting-analytics";
import { PageBody, PageHero } from "@/components/page-hero";
import type { CareersRole } from "@/lib/careers";
import { createPageMetadata } from "@/lib/metadata";
import { jobPostingGraph } from "@/lib/structured-data";

export function careersRoleMetadata(role: CareersRole) {
  return createPageMetadata({
    title: `${role.title} — Careers`,
    description: role.description,
    path: role.href,
  });
}

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3 text-mist/75">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-2 size-1.5 shrink-0 rotate-45 bg-sunflower"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A role's own page under `/careers/<id>`, with JobPosting JSON-LD and view analytics. */
export function CareersRolePage({ role }: { role: CareersRole }) {
  return (
    <article>
      <JsonLd data={jobPostingGraph(role)} />
      <JobPostingAnalytics
        jobId={role.id}
        jobTitle={role.title}
        pagePath={role.href}
      />
      <PageHero
        eyebrow={
          <>
            <Link
              href="/careers#open-positions"
              className="block max-w-max text-sm font-semibold tracking-normal text-sunflower normal-case hover:underline"
            >
              ← All open positions
            </Link>
            <p className="mt-8">{role.locationLine}</p>
          </>
        }
        titleId="job-title"
        title={role.title}
        lede={role.intro}
      >
        <CareersApplyCta
          label="Apply for this role"
          jobId={role.id}
          jobTitle={role.title}
        />
      </PageHero>
      <PageBody>
        <div className="grid gap-12 pb-12 lg:grid-cols-[1fr_1fr]">
          <section>
            <h2 className="text-2xl font-bold">What you’ll own</h2>
            <List items={role.youWillDo} />
          </section>
          <section>
            <h2 className="text-2xl font-bold">Outcomes that matter</h2>
            <List items={role.outcomes} />
          </section>
          <section>
            <h2 className="text-2xl font-bold">What we’re looking for</h2>
            <List items={role.lookingFor} />
          </section>
          <section>
            <h2 className="text-2xl font-bold">Bonus points</h2>
            <List items={role.bonusPoints} />
          </section>
        </div>
        <section className="rounded-3xl border border-sunflower/25 bg-[#082312] p-[clamp(1.5rem,4vw,3rem)]">
          <p className="text-sm font-bold tracking-[.13em] text-bitmap-mid uppercase">
            Interview process
          </p>
          <h2 className="mt-3 text-3xl font-bold">{role.interviewTitle}</h2>
          <p className="mt-4 max-w-3xl text-mist/70">{role.interviewLede}</p>
          <ol className="mt-7 grid gap-4 md:grid-cols-2">
            {role.interview.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl border border-white/10 bg-forest/50 p-5"
              >
                <span className="text-sm font-bold text-sunflower">
                  0{index + 1}
                </span>
                <p className="mt-2 text-mist/75">{step}</p>
              </li>
            ))}
          </ol>
        </section>
        <footer className="mt-12 flex flex-col items-start gap-5 border-t border-white/10 pt-10">
          <h2 className="text-3xl font-bold">{role.closingTitle}</h2>
          <CareersApplyCta
            label="Submit your application"
            jobId={role.id}
            jobTitle={role.title}
          />
        </footer>
      </PageBody>
    </article>
  );
}
