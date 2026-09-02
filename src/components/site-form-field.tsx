import type { ChangeEvent } from "react";

export const siteFormFieldClass =
  "w-full rounded-lg border border-[#212c25] bg-[#05140a] px-4 py-3.5 text-base text-mist outline-none placeholder:text-mist/42 transition-[border-color,box-shadow] duration-[180ms] ease-out hover:border-[#3b4a3e] focus-visible:border-bitmap-highlight focus-visible:shadow-[0_0_0_3px_rgba(227,226,112,0.25)] aria-invalid:border-[#e98b7d]";

export function SiteFormField({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  required = false,
  type = "text",
  value,
  error,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  type?: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const errorId = `${id}-err`;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm leading-none font-medium text-mist" htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-0.5 text-sunflower" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        value={value}
        onChange={onChange}
        className={siteFormFieldClass}
      />
      {error ? (
        <p className="text-[13px] leading-[1.4] text-[#f0a99e]" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
