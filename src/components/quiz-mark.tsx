/** Growth mark for a quiz tier. Stages match `quizLadder` in score.ts, from seed to tree. */
export function QuizMark({
  stage,
  size = 48,
  className = "",
}: {
  stage: number;
  size?: number;
  className?: string;
}) {
  const leafLeft = "a9 9 0 0 0 9 -9 a9 9 0 0 0 -9 9Z";
  const leafRight = "a9 9 0 0 1 -9 -9 a9 9 0 0 1 9 9Z";

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 36.5H44"
        stroke="#5E6E35"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        strokeLinecap="round"
      />
      {stage === 0 ? (
        <>
          <path d="M13 36a11 11 0 0 1 22 0Z" fill="#6A7A2A" />
          <circle cx="24" cy="30.5" r="3" fill="#D1D100" />
        </>
      ) : null}
      {stage === 1 ? (
        <>
          <path d="M24 36V27" stroke="#9CA703" strokeWidth="2" strokeLinecap="round" />
          <path d={`M24 28${leafLeft}`} fill="#D1D100" />
          <path d={`M24 28${leafRight}`} fill="#9CA703" />
        </>
      ) : null}
      {stage === 2 ? (
        <>
          <path d="M24 36V17" stroke="#9CA703" strokeWidth="2" strokeLinecap="round" />
          <path d={`M24 31${leafLeft}`} fill="#9CA703" />
          <path d={`M24 31${leafRight}`} fill="#6A7A2A" />
          <path d={`M24 21${leafLeft}`} fill="#D1D100" />
          <path d={`M24 21${leafRight}`} fill="#9CA703" />
        </>
      ) : null}
      {stage === 3 ? (
        <>
          <path d="M24 36V20" stroke="#9CA703" strokeWidth="2" strokeLinecap="round" />
          <path d={`M24 32${leafLeft}`} fill="#9CA703" />
          <path d={`M24 32${leafRight}`} fill="#6A7A2A" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle
              key={angle}
              cx="24"
              cy="7.5"
              r="4"
              fill={angle % 120 === 0 ? "#D1D100" : "#E3E270"}
              transform={`rotate(${angle} 24 13.5)`}
            />
          ))}
          <circle cx="24" cy="13.5" r="3.2" fill="#FAF9F0" />
        </>
      ) : null}
      {stage === 4 ? (
        <>
          <path
            d="M24 36v8M24 38l-7 6M24 38l7 6M24 41l-3.5 4M24 41l3.5 4"
            stroke="#9CA703"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M24 36V22" stroke="#9CA703" strokeWidth="3" strokeLinecap="round" />
          <circle cx="15.5" cy="18" r="8" fill="#6A7A2A" />
          <circle cx="32.5" cy="18" r="8" fill="#9CA703" />
          <circle cx="24" cy="11" r="9" fill="#D1D100" />
        </>
      ) : null}
    </svg>
  );
}
