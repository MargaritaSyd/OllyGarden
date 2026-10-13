import Link from "next/link";
import type { ReactNode } from "react";
import { GitHubMark } from "@/components/company-opensource";
import { CtaArrow } from "@/components/cta-arrow";
import { HeroBlob } from "@/components/hero-blob";
import { InView } from "@/components/in-view";
import { RoseMascot } from "@/components/rose-mascot";
import {
  agentSkillsHero,
  agentSkillsInstall,
  agentSkillsLayers,
  agentSkillsRose,
  skillCount,
  skillRepositories,
  type SkillRepository,
} from "@/lib/agent-skills";
import { registerOpenTelemetry } from "@/lib/trademarks";

const sectionPad =
  "px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4rem,8vw,6rem)] max-[880px]:px-6";

export function AgentSkillsHero() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(7.5rem,13vw,11rem)] pb-[clamp(2.5rem,5vw,4rem)] max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-12"
      aria-labelledby="skills-title"
    >
      <HeroBlob />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          {agentSkillsHero.badge}
        </div>
        <h1
          id="skills-title"
          className="ov-blur-rise mt-5 max-w-[880px] text-[clamp(2.25rem,6vw,4rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)] [animation-delay:0.25s]"
        >
          {registerOpenTelemetry(agentSkillsHero.title)}
        </h1>
        <p className="ov-fade-up mt-4 max-w-[720px] text-lg leading-[1.5] text-mist/80 [animation-delay:0.7s]">
          {agentSkillsHero.lede}
        </p>
        <ul className="ov-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:0.85s] max-sm:flex-col">
          {skillRepositories.map((repository, index) => (
            <li key={repository.id}>
              <RepoButton repository={repository} primary={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RepoButton({
  repository,
  primary = false,
}: {
  repository: SkillRepository;
  primary?: boolean;
}) {
  return (
    <a
      href={repository.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-12 items-center justify-center gap-2.5 rounded-xl px-5 text-[15px] font-semibold transition-colors max-sm:w-full ${
        primary
          ? "bg-mist text-forest hover:bg-sunflower"
          : "border border-mist/25 text-mist hover:border-sunflower hover:text-sunflower"
      }`}
    >
      <GitHubMark />
      {repository.repo}
    </a>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="ov-stagger flex max-w-[760px] flex-col gap-4">
      <p className="text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">{eyebrow}</p>
      <h2
        id={id}
        className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
      >
        {title}
      </h2>
      <p className="text-base leading-[1.6] text-mist/75">{lede}</p>
      {children}
    </header>
  );
}

export function AgentSkillsLayers() {
  return (
    <InView as="section" className={sectionPad} aria-labelledby="layers-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-12">
        <SectionHeader
          id="layers-title"
          eyebrow={agentSkillsLayers.eyebrow}
          title={agentSkillsLayers.title}
          lede={agentSkillsLayers.lede}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {skillRepositories.map((repository) => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))}
        </div>
      </div>
    </InView>
  );
}

function RepositoryCard({ repository }: { repository: SkillRepository }) {
  const titleId = `repo-${repository.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-col gap-6 rounded-2xl border border-sunflower/25 bg-[#002810] p-[clamp(1.5rem,3vw,2rem)]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {repository.layer}
          </p>
          <p className="rounded-full border border-mist/15 px-3 py-0.5 text-[13px] text-mist/70">
            {skillCount(repository)} skills
          </p>
        </div>
        <h3
          id={titleId}
          className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.2] font-bold tracking-[-0.02em] text-mist"
        >
          {repository.title}
        </h3>
        <p>
          <a
            href={repository.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-max items-center gap-2 font-mono text-sm text-sunflower underline-offset-2 hover:underline"
          >
            <GitHubMark />
            {repository.repo}
          </a>
        </p>
        <p className="text-[15px] leading-[1.6] text-mist/80">{repository.summary}</p>
        <ul className="flex flex-col gap-1.5 text-[15px] leading-[1.5] text-mist/80">
          {repository.principles.map((principle) => (
            <li key={principle} className="flex gap-2.5">
              <span className="mt-[0.55em] size-1.5 shrink-0 bg-sunflower" aria-hidden="true" />
              {principle}
            </li>
          ))}
        </ul>
      </div>

      {repository.groups.map((group) => (
        <div key={group.title} className="border-t border-mist/10 pt-5">
          <h4 className="text-[13px] font-bold tracking-[0.1em] text-mist/60 uppercase">
            {group.title}
          </h4>
          <ul className="mt-3 flex flex-col gap-3">
            {group.skills.map((skill) => (
              <li key={skill.name} id={skill.name} className="scroll-mt-24">
                <code className="block text-sm font-semibold break-words text-bitmap-highlight">
                  {skill.name}
                </code>
                <span className="sr-only"> — </span>
                <span className="mt-0.5 block text-sm leading-[1.5] text-mist/70">
                  {skill.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
}

export function AgentSkillsRose() {
  const { brain, rose, proprietary } = agentSkillsRose;

  return (
    <InView as="section" className={sectionPad} aria-labelledby="rose-skills-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-12">
        <SectionHeader
          id="rose-skills-title"
          eyebrow={agentSkillsRose.eyebrow}
          title={agentSkillsRose.title}
          lede={agentSkillsRose.lede}
        >
          <p className="text-base leading-[1.6] text-mist/75">{agentSkillsRose.note}</p>
          <Link
            href={agentSkillsRose.roseHref}
            className="w-max font-semibold text-sunflower underline-offset-2 hover:underline"
          >
            {agentSkillsRose.roseLink} →
          </Link>
        </SectionHeader>

        <figure className="w-full max-w-[960px] rounded-[32px] border border-white/10 bg-[#0d1117] p-[clamp(1.25rem,3vw,2rem)]">
          <ol className="grid gap-3 sm:grid-cols-3">
            {skillRepositories.map((repository) => (
              <KnowledgeNode
                key={repository.id}
                layer={repository.layer}
                title={repository.repo}
                sub={repository.origin}
                href={repository.href}
              />
            ))}
            <KnowledgeNode layer={proprietary.layer} title={proprietary.title} sub={proprietary.sub} muted />
          </ol>
          <FlowArrow />
          <div className="rounded-2xl border border-sunflower/40 bg-sunflower/[0.07] px-5 py-4 text-center">
            <p className="font-bold text-mist">{brain.title}</p>
            <p className="mt-1 text-[13px] leading-[1.45] text-mist/65">{brain.sub}</p>
          </div>
          <FlowArrow />
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4 rounded-2xl border border-white/12 bg-[#161b22] px-5 py-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0a0b0a] text-bitmap-mid drop-shadow-[0_0_16px_rgba(209,209,0,0.3)]">
                <RoseMascot className="h-[62%] w-[62%]" />
              </span>
              <span>
                <span className="block font-bold text-mist">{rose.title}</span>
                <span className="sr-only">, </span>
                <span className="block text-[13px] text-mist/65">{rose.sub}</span>
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[12px] font-semibold tracking-[0.08em] text-bitmap-mid uppercase sm:flex-col sm:gap-1">
              {rose.action}
              <CtaArrow className="max-sm:rotate-90" />
            </div>
            <div className="flex min-w-0 flex-1 items-center self-stretch rounded-2xl border border-dashed border-white/20 px-5 py-4 text-mist/80">
              {rose.target}
            </div>
          </div>
          <figcaption className="sr-only">
            The two open source skill packages and OllyGarden&apos;s proprietary knowledge feed the
            OllyGarden brain, which Rose uses to open pull requests on your repositories.
          </figcaption>
        </figure>
      </div>
    </InView>
  );
}

function KnowledgeNode({
  layer,
  title,
  sub,
  href,
  muted = false,
}: {
  layer: string;
  title: string;
  sub: string;
  href?: string;
  muted?: boolean;
}) {
  return (
    <li
      className={`flex flex-col gap-1.5 rounded-2xl px-4 py-4 ${
        muted
          ? "border border-dashed border-white/15 bg-transparent"
          : "border border-sunflower/30 bg-[#002810]"
      }`}
    >
      <span
        className={`text-[11px] font-bold tracking-[0.12em] uppercase ${muted ? "text-mist/45" : "text-bitmap-mid"}`}
      >
        {layer}
      </span>
      <span className="sr-only">: </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[13px] font-semibold break-words text-mist underline-offset-2 hover:text-sunflower hover:underline"
        >
          {title}
        </a>
      ) : (
        <span className="text-[14px] font-semibold text-mist/80">{title}</span>
      )}
      <span className="sr-only"> — </span>
      <span className="text-[12.5px] leading-[1.4] text-mist/55">{sub}</span>
    </li>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-2 text-bitmap-mid" aria-hidden="true">
      <CtaArrow className="rotate-90" />
    </div>
  );
}

export function AgentSkillsInstall() {
  return (
    <InView as="section" className={sectionPad} aria-labelledby="install-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-12">
        <SectionHeader
          id="install-title"
          eyebrow={agentSkillsInstall.eyebrow}
          title={agentSkillsInstall.title}
          lede={agentSkillsInstall.lede}
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <a
              href={agentSkillsInstall.specHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sunflower underline-offset-2 hover:underline"
            >
              Agent Skills specification
            </a>
            <span className="sr-only"> · </span>
            <Link
              href={agentSkillsInstall.blogHref}
              className="font-semibold text-sunflower underline-offset-2 hover:underline"
            >
              {agentSkillsInstall.blogLink}
            </Link>
          </div>
        </SectionHeader>
        <div className="grid gap-6 lg:grid-cols-2">
          {skillRepositories.map((repository) => (
            <div
              key={repository.id}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-white/10 bg-[#0d1117] p-[clamp(1.25rem,3vw,1.75rem)]"
            >
              <h3 className="font-mono text-[15px] font-semibold text-mist">{repository.repo}</h3>
              <Command label="skills.sh" lines={[repository.install.skillsSh]} />
              <Command
                label="Claude Code"
                lines={[repository.install.marketplace, repository.install.plugin]}
              />
            </div>
          ))}
        </div>
      </div>
    </InView>
  );
}

function Command({ label, lines }: { label: string; lines: readonly string[] }) {
  return (
    <div className="min-w-0">
      <p className="text-[12px] font-bold tracking-[0.1em] text-mist/55 uppercase">{label}</p>
      <pre className="mt-2 rounded-xl break-all whitespace-pre-wrap border border-white/8 bg-black/40 px-4 py-3 font-mono text-[13px] leading-[1.7] text-bitmap-highlight">
        <code>{lines.join("\n")}</code>
      </pre>
    </div>
  );
}
