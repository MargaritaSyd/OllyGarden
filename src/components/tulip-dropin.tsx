import { tulipDropin } from "@/lib/tulip";

export function TulipDropin() {
  return (
    <section aria-labelledby="di-title" className="px-6 py-16 sm:px-12 lg:px-[104px] lg:py-24">
      <div className="mx-auto max-w-[1328px]">
        <DropinMark />
        <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
          {tulipDropin.eyebrow}
        </p>
        <h2
          id="di-title"
          className="mt-4 max-w-[860px] text-[clamp(2rem,3.4vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-mist"
        >
          {tulipDropin.title}
        </h2>
        <p className="mt-5 max-w-[640px] text-base leading-[1.66] text-mist/75">
          {tulipDropin.body}
        </p>

        <div className="relative mt-12 mb-[60px]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#071008]">
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <i className="block size-2.5 rounded-full bg-[#ff5f57]" />
                <i className="block size-2.5 rounded-full bg-[#febc2e]" />
                <i className="block size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="text-sm text-mist/70">{tulipDropin.file}</span>
            </div>
            <pre
              className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-mist/80"
              tabIndex={0}
              aria-label="deployment.yaml — replace the collector image with the Tulip image"
            >
              {tulipDropin.lines.map((line, index) => (
                <span
                  key={index}
                  className={`block ${
                    line.kind === "rm"
                      ? "bg-[#5a1d1d]/55 text-[#f2b8b8]"
                      : line.kind === "add"
                        ? "bg-[#1d4a28]/70 text-[#b7e3b4]"
                        : ""
                  }`}
                >
                  {line.kind === "rm" ? "- " : line.kind === "add" ? "+ " : "  "}
                  {line.text.trimStart()}
                  {"\n"}
                </span>
              ))}
            </pre>
          </div>

          <aside className="absolute -right-8 -bottom-[60px] z-10 w-[min(494px,calc(100%+2rem))]">
            <div className="surface-grain rounded-3xl border border-[#e3e270]/40 bg-[#19321e] p-8 shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
              <TipIcon />
              <p className="mt-4 text-[15px] leading-[1.5] text-mist/[0.92]">
                {tulipDropin.tip}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TipIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 69 69" fill="none" aria-hidden="true">
      <path
        d="M68.698 34.33C68.698 53.312 53.32 68.698 34.349 68.698C34.349 49.716 49.726 34.33 68.698 34.33Z"
        fill="#E3E270"
      />
      <path
        d="M0 34.33C0 53.312 15.378 68.698 34.349 68.698C34.349 49.716 18.972 34.33 0 34.33Z"
        fill="#E3E270"
      />
      <path
        d="M34.349 34.368C15.378 34.368 0 18.982 0 0h68.698C68.698 18.982 53.32 34.368 34.349 34.368Z"
        fill="#E3E270"
      />
    </svg>
  );
}

function DropinMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 69 69" fill="none" aria-hidden="true">
      <path
        d="M68.698 34.33C68.698 53.312 53.32 68.698 34.349 68.698C34.349 49.716 49.726 34.33 68.698 34.33Z"
        fill="#9CA703"
      />
      <path
        d="M0 34.33C0 53.312 15.378 68.698 34.349 68.698C34.349 49.716 18.972 34.33 0 34.33Z"
        fill="#9CA703"
      />
      <path
        d="M34.349 34.368C15.378 34.368 0 18.982 0 0h68.698C68.698 18.982 53.32 34.368 34.349 34.368Z"
        fill="#9CA703"
      />
    </svg>
  );
}
