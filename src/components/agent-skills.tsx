import Link from "next/link";
import { AgentSkillsCatalog } from "@/components/agent-skills-catalog";
import { CopyCommand } from "@/components/agent-skills-copy";
import { GitHubMark } from "@/components/company-opensource";
import { CtaArrow } from "@/components/cta-arrow";
import { SectionHeader as GuideHeader } from "@/components/guide-ui";
import { HeroBlob } from "@/components/hero-blob";
import { InView } from "@/components/in-view";
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
      className="relative flex min-h-[814px] items-center overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[120px] pb-20 max-lg:min-h-0 max-lg:pt-[clamp(7.5rem,13vw,11rem)] max-lg:pb-16 max-[880px]:px-6 max-[880px]:pt-[132px] max-[880px]:pb-12"
      aria-labelledby="skills-title"
    >
      <HeroBlob variant="guide" />
      <div className="relative z-[1] mx-auto w-full max-w-[1232px] max-[1199px]:pr-[calc(341px-clamp(24px,7.25vw,104px))] max-[767px]:pr-0">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1.5 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/docs/badge-chevrons.svg" alt="" width={14} height={14} />
          {agentSkillsHero.badge}
        </div>
        <h1
          id="skills-title"
          className="ov-blur-rise mt-6 max-w-[760px] text-[clamp(36px,4.45vw,64px)] leading-[1.125] font-bold tracking-[-0.02em] text-mist [animation-delay:0.25s]"
        >
          {registerOpenTelemetry(agentSkillsHero.title)}
        </h1>
        <p className="ov-fade-up mt-4 max-w-[698px] text-base leading-[1.4] tracking-[0.02em] text-mist [animation-delay:0.7s]">
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
      className={`inline-flex h-[51px] items-center justify-center gap-2.5 rounded-2xl px-[30px] text-base font-semibold transition-colors max-sm:w-full ${
        primary
          ? "border border-transparent bg-white text-black hover:bg-sunflower"
          : "border border-white/50 bg-white/12 text-mist hover:bg-white/20"
      }`}
    >
      <GitHubMark />
      {repository.repo}
    </a>
  );
}

export function AgentSkillsLayers() {
  return (
    <InView as="section" className={`${sectionPad} relative overflow-hidden`} aria-labelledby="layers-title">
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <GuideHeader
          id="layers-title"
          eyebrow={agentSkillsLayers.eyebrow}
          title={agentSkillsLayers.title}
          lede={agentSkillsLayers.lede}
          mark={agentSkillsLayers.mark}
        />
        <AgentSkillsCatalog />
      </div>
    </InView>
  );
}

export function AgentSkillsRose() {
  const { brain, rose, proprietary } = agentSkillsRose;

  return (
    <InView as="section" className={sectionPad} aria-labelledby="rose-skills-title">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-14 max-[1023px]:gap-10">
        <GuideHeader
          id="rose-skills-title"
          eyebrow={agentSkillsRose.eyebrow}
          title={agentSkillsRose.title}
          lede={agentSkillsRose.lede}
          mark={agentSkillsRose.mark}
        >
          <p className="text-base leading-[1.4] tracking-[0.02em] text-mist">{agentSkillsRose.note}</p>
          <Link
            href={agentSkillsRose.roseHref}
            className="group w-max font-semibold text-sunflower"
          >
            <span className="underline-offset-4 group-hover:underline">{agentSkillsRose.roseLink}</span>
            <CtaArrow className="ml-1.5 inline-block translate-y-px" />
          </Link>
        </GuideHeader>

        <figure className="m-0 flex flex-col rounded-3xl border border-bitmap-highlight/25 bg-[#19321e] bg-[linear-gradient(rgba(1,30,12,0.5),rgba(1,30,12,0.82)),url('/images/texture-grain.png')] [background-repeat:no-repeat,repeat] [background-size:100%_100%,328px_140px] p-10 max-[1023px]:p-8 max-[767px]:p-6">
          <ul className="m-0 grid list-none grid-cols-3 gap-4 p-0 max-[1023px]:gap-3 max-[767px]:grid-cols-1">
            {skillRepositories.map((repository) => (
              <li
                key={repository.id}
                className="flex flex-col gap-1.5 rounded-2xl border border-[#d9e533]/45 bg-bitmap-shadow/32 px-6 py-5"
              >
                <span className="text-xs leading-[1.3] font-bold tracking-[0.1em] text-[#b5c11a] uppercase">
                  {repository.layer}
                </span>
                <span className="sr-only">: </span>
                <span className="font-mono text-[14.5px] leading-[1.35] font-medium break-words text-mist">
                  {repository.repo}
                </span>
                <span className="sr-only"> — </span>
                <span className="text-sm leading-[1.4] text-mist/60">{repository.origin}</span>
              </li>
            ))}
            <li className="flex flex-col gap-1.5 rounded-2xl border border-dashed border-mist/25 bg-[#011407]/40 px-6 py-5">
              <span className="text-xs leading-[1.3] font-bold tracking-[0.1em] text-mist/55 uppercase">
                {proprietary.layer}
              </span>
              <span className="sr-only">: </span>
              <span className="text-[17px] leading-[1.35] font-bold text-mist">{proprietary.title}</span>
              <span className="sr-only"> — </span>
              <span className="text-sm leading-[1.4] text-mist/60">{proprietary.sub}</span>
            </li>
          </ul>
          <FlowStems count={3} />
          <div className="as-flow-brain relative flex flex-col items-center gap-3.5 rounded-2xl border border-[#d9e533]/70 bg-[radial-gradient(60%_120%_at_50%_0,rgba(217,229,51,0.14),transparent_70%),rgba(1,20,7,0.55)] px-8 py-6 text-center max-[767px]:px-4 max-[767px]:py-5">
            <p className="text-[22px] leading-[1.27] font-bold tracking-[-0.01em] text-mist">{brain.title}</p>
            <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
              {brain.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/14 bg-[#011e0c]/70 px-3 py-[5px] text-[13px] leading-[1.3] font-medium text-bitmap-highlight"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <FlowStems count={1} />
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-4 max-[767px]:grid-cols-1 max-[767px]:gap-0">
            <div className="flex items-center gap-4 rounded-2xl border border-mist/15 bg-[#011407]/55 px-5 py-4">
              <span className="grid size-[52px] shrink-0 place-items-center rounded-full border border-[#d9e533]/30 bg-[#011407] shadow-[0_0_24px_rgba(217,229,51,0.2)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/solutions/financial/rose.svg" alt="" width={27} height={33} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-lg leading-[1.3] font-bold text-mist">{rose.title}</span>
                <span className="sr-only">, </span>
                <span className="text-sm leading-[1.4] text-mist/60">{rose.sub}</span>
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center gap-2.5 px-2 max-[767px]:flex-row max-[767px]:gap-3 max-[767px]:px-0 max-[767px]:py-3"
              aria-hidden="true"
            >
              <span className="text-xs leading-[1.3] font-bold tracking-[0.1em] whitespace-nowrap text-[#b5c11a] uppercase max-[767px]:order-2">
                {rose.action}
              </span>
              <span className="as-flow-run" />
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-mist/30 px-5 py-4 text-base leading-[1.3] text-mist">
              <RepoBranches />
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

function FlowStems({ count }: { count: 1 | 3 }) {
  return (
    <div
      aria-hidden="true"
      className={`grid gap-4 max-[1023px]:gap-3 max-[767px]:h-9 max-[767px]:grid-cols-1 ${
        count === 1 ? "h-11 grid-cols-1" : "h-11 grid-cols-3"
      }`}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={`as-flow-stem justify-self-center ${count === 1 ? "as-flow-stem-one" : "max-[767px]:[&:nth-child(n+2)]:hidden"}`}
        />
      ))}
    </div>
  );
}

function RepoBranches() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-bitmap-highlight"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 8.5v7M18 15.5V9a3 3 0 0 0-3-3h-4m0 0 2.5-2.5M11 6l2.5 2.5" />
    </svg>
  );
}

const installLink =
  "group inline-flex h-[51px] items-center justify-center gap-2.5 rounded-2xl border border-white/50 bg-white/12 px-[30px] text-base font-semibold text-mist transition-[background,transform] duration-300 hover:bg-white/22 motion-safe:hover:scale-[1.03] max-[767px]:w-full";

export function AgentSkillsInstall() {
  return (
    <InView as="section" className={`${sectionPad} relative overflow-hidden`} aria-labelledby="install-title">
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-14 max-[1023px]:gap-10">
        <GuideHeader
          id="install-title"
          eyebrow={agentSkillsInstall.eyebrow}
          title={agentSkillsInstall.title}
          lede={agentSkillsInstall.lede}
          ledeClassName="max-w-[640px]"
          mark={agentSkillsInstall.mark}
        >
          <div className="flex flex-wrap gap-x-6 gap-y-4 pt-2 max-[767px]:flex-col">
            <a
              href={agentSkillsInstall.specHref}
              target="_blank"
              rel="noopener noreferrer"
              className={installLink}
            >
              {agentSkillsInstall.specLink}
              <CtaArrow />
            </a>
            <Link href={agentSkillsInstall.blogHref} className={installLink}>
              {agentSkillsInstall.blogLink}
              <CtaArrow />
            </Link>
          </div>
        </GuideHeader>
        <div className="flex flex-col gap-6">
          {skillRepositories.map((repository) => (
            <article
              key={repository.id}
              aria-labelledby={`as-inst-${repository.id}`}
              className="grid items-start gap-10 rounded-3xl border border-bitmap-highlight/40 bg-[#19321e] bg-[linear-gradient(rgba(1,30,12,0.42),rgba(1,30,12,0.78)),url('/images/texture-grain.png')] [background-repeat:no-repeat,repeat] [background-size:100%_100%,328px_140px] p-8 max-[1023px]:gap-6 max-[1023px]:p-6 min-[1024px]:grid-cols-[minmax(0,300px)_minmax(0,1fr)]"
            >
              <div className="flex flex-col items-start gap-3.5">
                <p className="text-[13px] leading-[1.3] font-bold tracking-[0.1em] text-bitmap-mid uppercase">
                  {repository.layer}
                </p>
                <a
                  id={`as-inst-${repository.id}`}
                  href={repository.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-start gap-2 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-base leading-[1.4] font-medium text-mist hover:text-sunflower"
                >
                  <GitHubMark className="mt-0.5 size-[18px] shrink-0" />
                  <span>{repository.repo}</span>
                </a>
                <p className="inline-flex items-center rounded-full border border-white/14 bg-[#19321e] bg-[url('/images/texture-grain.png')] bg-repeat [background-size:328px_140px] px-[13px] py-1 text-sm leading-[1.28] font-medium tracking-[0.01em] text-bitmap-highlight">
                  {skillCount(repository)} skills
                </p>
              </div>
              <div className="flex min-w-0 flex-col gap-4">
                <Command label="skills.sh" lines={[repository.install.skillsSh]} />
                <Command
                  label="Claude Code"
                  lines={[repository.install.marketplace, repository.install.plugin]}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </InView>
  );
}

function Command({ label, lines }: { label: string; lines: readonly string[] }) {
  const text = lines.join("\n");

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#212c25]/60 bg-[#092611]">
      <div className="flex items-center gap-4 border-b border-[#1d3d1d] bg-[#04160a] py-2.5 pr-3 pl-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="block size-3 rounded-full bg-[rgba(251,44,54,0.8)]" />
          <span className="block size-3 rounded-full bg-[rgba(240,177,0,0.8)]" />
          <span className="block size-3 rounded-full bg-[rgba(0,201,80,0.8)]" />
        </span>
        <span className="font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-xs leading-4 whitespace-nowrap text-[#90a1b9]">
          {label}
        </span>
        <CopyCommand text={text} name={label} />
      </div>
      <pre className="m-0 px-5 pt-4 pb-[18px] font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-sm leading-[1.7] wrap-anywhere whitespace-pre-wrap text-bitmap-highlight max-[767px]:overflow-x-auto max-[767px]:px-4 max-[767px]:pt-3.5 max-[767px]:pb-4 max-[767px]:text-[13px] max-[767px]:wrap-normal max-[767px]:whitespace-pre">
        <code>{text}</code>
      </pre>
    </div>
  );
}
