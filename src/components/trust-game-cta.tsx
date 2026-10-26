"use client";

const startEvent = "trust-game-start";

export function requestTrustGameStart() {
  window.dispatchEvent(new Event(startEvent));
}

export function onTrustGameStart(listener: () => void) {
  window.addEventListener(startEvent, listener);
  return () => window.removeEventListener(startEvent, listener);
}

/** Starts the game, or scrolls back to it once a round is underway. */
export function TrustGameCta() {
  function onClick() {
    const stage = document.getElementById("trust-game-stage");
    if (stage?.dataset.active === "true") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stage.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      return;
    }
    requestTrustGameStart();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-mist px-8 text-base font-medium text-forest transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight"
    >
      Play Now
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-y-0.5"
      >
        <path
          d="M8 2v11M3.5 8.5 8 13l4.5-4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
