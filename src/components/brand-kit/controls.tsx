"use client";

export function Segmented({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string; disabled?: boolean }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`bk-seg ${className}`.trim()} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={`bk-seg-btn${value === option.value ? " is-on" : ""}`}
          disabled={option.disabled}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
