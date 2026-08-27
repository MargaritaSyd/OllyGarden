import { tulipSupport } from "@/lib/tulip";

const KEY = "text-[#49969d]";
const ENTITY = "text-[#d25b4d]";
const PUNCT = "text-[#c4cec9]";

export function TulipSupport() {
  return (
    <section aria-labelledby="ts-title" className="px-6 py-16 sm:px-12 lg:px-[104px] lg:py-24">
      <div className="mx-auto max-w-[1328px]">
        <div className="mx-auto max-w-[860px] text-center">
          <SupportMark />
          <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {tulipSupport.eyebrow}
          </p>
          <h2
            id="ts-title"
            className="mt-4 text-[clamp(1.875rem,3.8vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-balance text-mist"
          >
            {tulipSupport.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-base leading-[1.66] text-mist/75">
            {tulipSupport.body}
          </p>
        </div>

        <div className="relative mt-12 pb-10">
          <div className="overflow-hidden rounded-2xl border border-[#212c25]/60 bg-[rgba(2,6,24,0.9)] shadow-[0_24px_60px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <i className="block size-2.5 rounded-full bg-[#ff5f57]" />
                <i className="block size-2.5 rounded-full bg-[#febc2e]" />
                <i className="block size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="font-mono text-sm text-mist/70">{tulipSupport.file}</span>
            </div>
            <pre className="overflow-x-auto p-8 font-mono text-[14px] leading-[1.6] text-[#c4cec9]">
              {tulipSupport.lines.map((line, index) => (
                <ManifestLine key={index} line={line} />
              ))}
            </pre>
          </div>

          <a
            href={tulipSupport.cardHref}
            target="_blank"
            rel="noreferrer noopener"
            className="absolute right-6 -bottom-9 z-10 w-[min(494px,calc(100%-3rem))] transition-[transform] hover:-translate-y-0.5"
          >
            <span className="surface-grain flex flex-col gap-3 rounded-3xl border border-[#e3e270]/40 bg-forest/60 p-8 shadow-[0_20px_44px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] hover:border-[#e3e270]/60 hover:shadow-[0_26px_54px_rgba(0,0,0,0.5)]">
              <span className="text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                {tulipSupport.cardTitle}
              </span>
              <span className="break-all text-sm leading-[1.45] text-mist">
                Link Component Manifest: {tulipSupport.cardHref}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ManifestLine({
  line,
}: {
  line: (typeof tulipSupport.lines)[number];
}) {
  if (line.kind === "blank") {
    return <span className="block min-h-[1.6em]">{"\n"}</span>;
  }

  if (line.kind === "head") {
    return (
      <span className="block">
        <span className={KEY}>{line.text.replace(/:$/, "")}</span>
        <span className={PUNCT}>:</span>
        {"\n"}
      </span>
    );
  }

  if (line.kind === "kv") {
    const valueIsEntity =
      line.key === "module" ||
      line.key === "name" ||
      line.value.includes("github.com") ||
      line.value.startsWith("go.");
    return (
      <span className="block">
        {"  "}
        <span className={KEY}>{line.key}</span>
        <span className={PUNCT}>: </span>
        <span className={valueIsEntity ? ENTITY : KEY}>{line.value}</span>
        {"\n"}
      </span>
    );
  }

  const [path, version] = splitGomod(line.value);
  return (
    <span className="block">
      <span className={PUNCT}>{"  - "}</span>
      <span className={KEY}>gomod</span>
      <span className={PUNCT}>: </span>
      <span className={ENTITY}>{path}</span>
      {version ? <span className={KEY}>{` ${version}`}</span> : null}
      {"\n"}
    </span>
  );
}

function splitGomod(value: string): [string, string | null] {
  const match = value.match(/^(.*)\s+(v[\d.]+)$/);
  if (!match?.[1] || !match[2]) {
    return [value, null];
  }
  return [match[1], match[2]];
}

function SupportMark() {
  return (
    <svg
      className="mx-auto"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.485 12.062C4.114 12.811 1.881 14.121 0 16c1.881 1.88 4.112 3.191 6.485 3.938C5.336 22.146 4.688 24.653 4.688 27.313c2.66 0 5.167-.65 7.374-1.798C12.811 27.886 14.121 30.12 16 32c1.88-1.88 3.191-4.112 3.938-6.485 2.208 1.149 4.716 1.798 7.375 1.798 0-2.661-.65-5.167-1.798-7.375C27.886 19.189 30.12 17.879 32 16c-1.88-1.88-4.112-3.191-6.485-3.938C26.664 9.855 27.313 7.347 27.313 4.688c-2.661 0-5.167.65-7.375 1.797C19.189 4.114 17.879 1.881 16 0c-1.88 1.881-3.191 4.112-3.938 6.485C9.855 5.336 7.347 4.688 4.688 4.688c0 2.66.65 5.167 1.797 7.374Z"
        fill="#9CA703"
      />
    </svg>
  );
}
