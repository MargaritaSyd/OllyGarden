import type { MenuIconName } from "@/lib/nav";

export function MenuItemIcon({ name }: { name: MenuIconName }) {
  const className = "h-6 w-6 text-sunflower";

  switch (name) {
    case "insights":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M20 4a10 10 0 0 0-6.5 17.6c.6.5 1 1.2 1.2 2V26h10.6v-2.4c.2-.8.6-1.5 1.2-2A10 10 0 0 0 20 4Zm-3.3 24v2.2h6.6V28H16.7Zm1.2 4.2v2.3h4.2v-2.3h-4.2Z" />
          <circle cx="14" cy="14" r="2.2" />
          <circle cx="26" cy="14" r="2.2" />
          <circle cx="20" cy="8.5" r="1.6" />
        </svg>
      );
    case "rose":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M20 8c2.4 3.2 3.2 6.4 2.4 8.8 2.4-.8 5.6 0 8.8 2.4-3.2 2.4-6.4 3.2-8.8 2.4.8 2.4 0 5.6-2.4 8.8-2.4-3.2-3.2-6.4-2.4-8.8-2.4.8-5.6 0-8.8-2.4 3.2-2.4 6.4-3.2 8.8-2.4C16.8 14.4 17.6 11.2 20 8Z" />
          <circle cx="20" cy="20" r="3.2" />
        </svg>
      );
    case "tulip":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M20 4c4.8 4 7.2 8.8 7.2 13.2 0 4-3.2 6.8-7.2 6.8s-7.2-2.8-7.2-6.8C12.8 12.8 15.2 8 20 4Z" />
          <path d="M19 24h2v12h-2z" />
          <path d="M20 30c-4 0-7 2-8.5 5h3c1-1.6 3-2.6 5.5-2.6 2.5 0 4.5 1 5.5 2.6h3C27 32 24 30 20 30Z" />
        </svg>
      );
    case "polder":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <circle cx="20" cy="20" r="6" />
          <circle cx="10" cy="10" r="3.2" />
          <circle cx="30" cy="10" r="3.2" />
          <circle cx="10" cy="30" r="3.2" />
          <circle cx="30" cy="30" r="3.2" />
        </svg>
      );
    case "overview":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="22" y="6" width="12" height="12" rx="2" />
          <rect x="6" y="22" width="12" height="12" rx="2" />
          <rect x="22" y="22" width="12" height="12" rx="2" />
        </svg>
      );
    case "financial":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M20 4 6 14h28L20 4Z" />
          <path d="M8 16h4v14H8zm10 0h4v14h-4zm10 0h4v14h-4z" />
          <path d="M4 32h32v4H4z" />
        </svg>
      );
    case "retail":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M10 12h20l-1.6 20.4A3 3 0 0 1 25.4 35H14.6a3 3 0 0 1-3-2.6L10 12Z" />
          <path d="M14 12V9a6 6 0 0 1 12 0v3h-3.2V9a2.8 2.8 0 0 0-5.6 0v3H14Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
        </svg>
      );
    case "enterprise":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <rect x="6" y="6" width="28" height="8" rx="1.5" />
          <rect x="6" y="16" width="28" height="8" rx="1.5" />
          <rect x="6" y="26" width="28" height="8" rx="1.5" />
          <circle cx="11" cy="10" r="1.4" fill="var(--color-forest)" />
          <circle cx="11" cy="20" r="1.4" fill="var(--color-forest)" />
          <circle cx="11" cy="30" r="1.4" fill="var(--color-forest)" />
        </svg>
      );
    case "blog":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M8 32.5 27.2 6.8a3 3 0 0 1 4.3-.4l1.6 1.5a3 3 0 0 1 .4 4.3L14.3 34.8 8 36.2z" />
          <path d="M24.5 10.5 29 14.6" stroke="var(--color-forest)" strokeWidth="2" />
        </svg>
      );
    case "docs":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M6 8h12c2.2 0 4 1.4 4 4v20c0-2.2-1.8-4-4-4H6V8Z" />
          <path d="M22 12c0-2.6 1.8-4 4-4h8v20h-8c-2.2 0-4 1.8-4 4V12Z" />
        </svg>
      );
    case "quiz":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M20 4a16 16 0 1 1 0 32 16 16 0 0 1 0-32Zm0 8.2c-2.6 0-4.4 1.6-4.4 4h3.2c0-.9.6-1.5 1.2-1.5 1 0 1.5.6 1.5 1.4 0 1.4-1.6 2-2.3 3.4-.4.8-.5 1.6-.5 2.5h3.2c0-.6.1-1.1.4-1.6.7-1.3 2.4-2.1 2.4-4.3 0-2.6-2-4-4.7-4ZM18.4 28.2h3.2v-3.2h-3.2v3.2Z"
          />
        </svg>
      );
    case "community":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <circle cx="20" cy="12" r="5" />
          <circle cx="9" cy="14" r="3.6" />
          <circle cx="31" cy="14" r="3.6" />
          <path d="M8 32c0-5.2 4.4-8.5 12-8.5S32 26.8 32 32H8Z" />
          <path d="M4 30.5c0-3.4 2.4-5.6 6.2-6.4C8.4 26 7.4 28.2 7.4 31H4v-.5ZM36 30.5c0-3.4-2.4-5.6-6.2-6.4 1.8 1.9 2.8 4.1 2.8 6.9H36v-.5Z" />
        </svg>
      );
    case "sprout":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M19 36V18c0-6 4-10 10-12-1 7-5 11-10 12 5 1 9 5 10 12-6-2-10-6-10-12Z" />
          <path d="M21 18c0-6-4-10-10-12 1 7 5 11 10 12-5 1-9 5-10 12 6-2 10-6 10-12Z" />
          <path d="M19 18h2v18h-2z" />
        </svg>
      );
    case "contact":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M6 10h28v20H6V10Z" />
          <path d="m6 12 14 10L34 12" fill="none" stroke="var(--color-forest)" strokeWidth="2.4" />
        </svg>
      );
    case "careers":
      return (
        <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M14 12V9.5A3.5 3.5 0 0 1 17.5 6h5A3.5 3.5 0 0 1 26 9.5V12h8v20H6V12h8Zm3.2-2.2V12h5.6V9.8a.8.8 0 0 0-.8-.8h-4a.8.8 0 0 0-.8.8Z" />
        </svg>
      );
  }
}
