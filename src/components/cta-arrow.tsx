export function CtaArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-[3px] ${className}`}
    >
      <path
        d="M1 6h13M9.5 1.5 14 6l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
