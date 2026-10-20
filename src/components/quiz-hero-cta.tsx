"use client";

const startEvent = "otel-quiz-start";

export function requestQuizStart() {
  window.dispatchEvent(new Event(startEvent));
}

export function onQuizStart(listener: () => void) {
  window.addEventListener(startEvent, listener);
  return () => window.removeEventListener(startEvent, listener);
}

/** Starts the quiz, or scrolls back to it once a round is underway. */
export function QuizHeroCta() {
  function onClick() {
    const stage = document.getElementById("quiz-stage");
    if (stage?.dataset.active === "true") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stage.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      return;
    }
    requestQuizStart();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-mist px-8 text-base font-medium text-forest transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight"
    >
      Take Quiz Now
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
