"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { GitHubMark } from "@/components/company-opensource";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { skillCount, skillHref, skillRepositories, type SkillRepository } from "@/lib/agent-skills";

const packageCard =
  "as-lift flex h-full flex-col gap-4 rounded-3xl border border-bitmap-highlight/40 bg-[#19321e] bg-[url('/images/texture-grain.png')] bg-repeat [background-size:328px_140px] p-8 max-[767px]:p-6";

function PrincipleText({ text }: { text: string }) {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={index}
        className="rounded-md border border-bitmap-highlight/22 bg-bitmap-highlight/10 px-[0.4em] py-px font-mono text-[0.86em] font-medium text-bitmap-highlight"
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}

function SkillArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M4 10 10 4M5 4h5v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RepositorySummary({
  repository,
  onBrowse,
}: {
  repository: SkillRepository;
  onBrowse: (id: SkillRepository["id"]) => void;
}) {
  const titleId = `repo-${repository.id}`;
  const count = skillCount(repository);
  const panelId = `as-panel-${repository.id}`;

  function browse(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    onBrowse(repository.id);
  }

  return (
    <article aria-labelledby={titleId} className={packageCard}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold tracking-[0.14em] text-bitmap-mid uppercase">{repository.layer}</p>
        <p className="rounded-full border border-white/14 bg-[#19321e] px-[13px] py-1 text-sm text-bitmap-highlight">
          {count} skills
        </p>
      </div>
      <h3
        id={titleId}
        className="text-[clamp(26px,2.23vw,32px)] leading-[1.2] font-bold tracking-[-0.02em] text-mist"
      >
        {repository.title}
      </h3>
      <a
        href={repository.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-max max-w-full items-center gap-2 font-mono text-sm break-words text-sunflower underline-offset-2 hover:underline"
      >
        <GitHubMark className="size-4 shrink-0" />
        {repository.repo}
      </a>
      <p className="text-[15px] leading-[1.5] text-mist/80">{repository.summary}</p>
      <ul className="flex flex-col gap-1.5 text-[15px] leading-[1.5] text-mist/80">
        {repository.principles.map((principle) => (
          <li key={principle} className="flex gap-2.5">
            <span className="mt-[0.55em] size-1.5 shrink-0 bg-sunflower" aria-hidden="true" />
            <span>
              <PrincipleText text={principle} />
            </span>
          </li>
        ))}
      </ul>
      <a
        href={`#${panelId}`}
        onClick={browse}
        className="group mt-auto inline-flex w-max max-w-full gap-x-[0.25em] pt-2 text-left text-lg leading-[1.28] font-bold tracking-[-0.01em] text-sunflower"
      >
        <span>Browse the {count}</span>
        <span className="inline-flex items-center whitespace-nowrap">
          skills
          <span className="ml-1.5 inline-flex rotate-90">
            <CtaArrow />
          </span>
        </span>
      </a>
    </article>
  );
}

function SkillGroup({
  repository,
  title,
  skills,
  index,
}: {
  repository: SkillRepository;
  title: string;
  skills: SkillRepository["groups"][number]["skills"];
  index: number;
}) {
  const nameWidth =
    repository.id === "opinions"
      ? "[--as-name-w:450px] max-[1199px]:[--as-name-w:360px] max-[1023px]:[--as-name-w:280px]"
      : "[--as-name-w:330px] max-[1199px]:[--as-name-w:300px] max-[1023px]:[--as-name-w:230px]";

  return (
    <section
      aria-labelledby={`${repository.id}-${title.toLowerCase().replaceAll(" ", "-")}`}
      style={{ "--g": index } as CSSProperties}
      className={`as-skill-group overflow-hidden rounded-[20px] border border-bitmap-highlight/25 bg-[#19321e] bg-[linear-gradient(rgba(1,30,12,0.42),rgba(1,30,12,0.78)),url('/images/texture-grain.png')] [background-repeat:no-repeat,repeat] [background-size:100%_100%,328px_140px] ${nameWidth}`}
    >
      <h3
        id={`${repository.id}-${title.toLowerCase().replaceAll(" ", "-")}`}
        className="border-b border-bitmap-highlight/15 bg-[#011407]/35 px-6 py-[18px] text-sm leading-[1.3] font-bold tracking-[0.1em] text-bitmap-mid uppercase"
      >
        {title} <span className="ml-1.5 font-medium tracking-[0.02em] text-mist/45">{skills.length}</span>
      </h3>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name} className="border-t border-mist/8 first:border-t-0">
            <a
              href={skillHref(repository, skill.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[minmax(0,1fr)_16px] items-baseline gap-x-4 gap-y-1 px-5 py-4 text-inherit no-underline transition-colors duration-200 hover:bg-sunflower/6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-bitmap-highlight min-[768px]:grid-cols-[var(--as-name-w,320px)_minmax(0,1fr)_16px] min-[768px]:gap-6 min-[768px]:px-6 min-[768px]:py-[18px] motion-reduce:transition-none"
            >
              <code className="font-mono text-[15px] leading-[1.45] font-medium break-words text-bitmap-highlight transition-colors group-hover:text-sunflower max-[767px]:col-start-1">
                {skill.name}
                <span className="sr-only"> (opens the skill on GitHub)</span>
              </code>
              <span className="text-[15px] leading-[1.5] text-mist/75 max-[767px]:col-start-1 max-[767px]:row-start-2 max-[767px]:text-[14.5px]">
                {skill.description}
              </span>
              <span className="self-center text-sunflower opacity-35 transition duration-200 group-hover:opacity-100 group-hover:[translate:2px_-2px] motion-reduce:transition-none motion-reduce:group-hover:[translate:0] max-[767px]:col-start-2 max-[767px]:row-start-1 max-[767px]:row-span-2">
                <SkillArrow />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AgentSkillsCatalog() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState<SkillRepository["id"]>("facts");
  const listRef = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ x: 0, width: 0 });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const tab = list.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!tab) return;
      setBar({ x: tab.offsetLeft, width: tab.offsetWidth });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  function select(id: SkillRepository["id"]) {
    setActive(id);
  }

  function browse(id: SkillRepository["id"]) {
    select(id);
    document.getElementById("skills-catalog")?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = skillRepositories.findIndex((repository) => repository.id === active);
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % skillRepositories.length
        : event.key === "ArrowLeft"
          ? (index - 1 + skillRepositories.length) % skillRepositories.length
          : event.key === "Home"
            ? 0
            : skillRepositories.length - 1;
    const id = skillRepositories[nextIndex].id;
    select(id);
    document.getElementById(`as-tab-${id}`)?.focus();
  }

  return (
    <div className="flex flex-col gap-14">
      <noscript>
        <style>{`#as-panel-facts,#as-panel-opinions{display:block !important}`}</style>
      </noscript>
      <div className="grid grid-cols-1 gap-6 min-[1024px]:grid-cols-2 min-[1024px]:gap-8">
        {skillRepositories.map((repository) => (
          <RepositorySummary key={repository.id} repository={repository} onBrowse={browse} />
        ))}
      </div>
      <div id="skills-catalog" className="scroll-mt-28">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Skill packages"
          aria-orientation="horizontal"
          onKeyDown={onTabsKeyDown}
          className="relative flex overflow-x-auto shadow-[inset_0_-4px_rgba(255,255,255,0.49)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {skillRepositories.map((repository) => {
            const selected = repository.id === active;
            const count = skillCount(repository);
            return (
              <button
                key={repository.id}
                id={`as-tab-${repository.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`as-panel-${repository.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(repository.id)}
                className={`flex-[1_0_auto] cursor-pointer bg-transparent px-4 pt-1 pb-5 text-sm font-bold tracking-[0.1em] whitespace-nowrap uppercase transition-colors focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-bitmap-highlight min-[768px]:px-8 min-[768px]:pb-7 min-[768px]:text-base ${
                  selected ? "text-sunflower" : "text-white/50 hover:text-white/85"
                }`}
              >
                <span className="max-[767px]:hidden">{repository.tab.prefix} </span>
                {repository.tab.label}{" "}
                <span
                  className={`ml-2 inline-grid h-[22px] min-w-7 place-items-center rounded-full px-2 align-[1px] text-xs font-medium tracking-[0.02em] normal-case ${
                    selected ? "bg-sunflower/15" : "bg-white/8"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-1 bg-sunflower transition-[transform,width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ width: bar.width, transform: `translateX(${bar.x}px)` }}
          />
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {skillRepositories.map((repository) => {
            const selected = repository.id === active;
            return (
              <div
                key={repository.id}
                id={`as-panel-${repository.id}`}
                role="tabpanel"
                aria-labelledby={`as-tab-${repository.id}`}
                hidden={!selected}
                tabIndex={selected ? 0 : undefined}
                className="flex scroll-mt-28 flex-col gap-4 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bitmap-highlight"
              >
                {repository.groups.map((group, index) => (
                  <SkillGroup
                    key={group.title}
                    repository={repository}
                    title={group.title}
                    skills={group.skills}
                    index={index}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
