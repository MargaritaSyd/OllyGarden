"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { appRedirectDialog } from "@/lib/app-redirect";
import { isPlainLeftClick } from "@/lib/dom";
import { capturePostHogEvent, urlWithoutQuery } from "@/lib/posthog";

const dialogButton =
  "inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-base font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-auto";

type AppRedirectLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  analytics?: { id: string; section: string };
  "aria-label"?: string;
};

/**
 * Anchor to the product app that confirms the hand-off first, so people know
 * account creation happens over there. Modifier-clicks bypass the dialog and
 * navigate natively, and so does every path where JS never runs.
 */
export function AppRedirectLink({
  href,
  className,
  children,
  onClick,
  analytics,
  "aria-label": ariaLabel,
}: AppRedirectLinkProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const titleId = useId();
  const bodyId = useId();
  const [open, setOpen] = useState(false);
  const handoffPending = useRef(false);

  function trackHandoff(
    event: "app_handoff_opened" | "app_handoff_confirmed" | "app_handoff_cancelled",
    method?: "dialog" | "modified_click" | "middle_click",
  ) {
    capturePostHogEvent(
      event,
      {
        button_id: analytics?.id,
        section: analytics?.section,
        destination_url: urlWithoutQuery(href),
        method,
      },
      event === "app_handoff_confirmed" ? { transport: "sendBeacon" } : undefined,
    );
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
      // showModal() does not lock the page behind it.
      document.body.style.overflow = "hidden";
      return;
    }
    if (dialog.open) {
      dialog.close();
    }
    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    // Returning via bfcache restores the open attribute and the scroll lock but
    // not top-layer membership, which would leave a locked page behind a
    // non-modal panel. Reset so the effect above runs clean.
    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        handoffPending.current = false;
        setOpen(false);
      }
    }
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.body.style.overflow = "";
    };
  }, []);

  function onTriggerClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.altKey) return;
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (!isPlainLeftClick(event)) {
      trackHandoff("app_handoff_confirmed", "modified_click");
      return;
    }
    event.preventDefault();
    handoffPending.current = true;
    trackHandoff("app_handoff_opened");
    setOpen(true);
  }

  function closeDialog() {
    if (handoffPending.current) {
      trackHandoff("app_handoff_cancelled");
      handoffPending.current = false;
    }
    setOpen(false);
    triggerRef.current?.focus();
  }

  function confirmHandoff(event: MouseEvent<HTMLAnchorElement>) {
    if (event.altKey) return;
    trackHandoff("app_handoff_confirmed", "dialog");
    handoffPending.current = false;
    setOpen(false);
  }

  return (
    <>
      <a
        ref={triggerRef}
        href={href}
        className={className}
        aria-label={ariaLabel}
        onClick={onTriggerClick}
        data-analytics-handoff
        onAuxClick={(event) => {
          if (event.button !== 1 || event.altKey) return;
          onClick?.(event);
          if (!event.defaultPrevented) trackHandoff("app_handoff_confirmed", "middle_click");
        }}
      >
        {children}
      </a>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        className="og-dialog m-auto text-left font-normal tracking-normal normal-case max-h-[calc(100dvh-2rem)] w-[min(100%-1.5rem,28rem)] overflow-y-auto rounded-2xl border border-sunflower/32 bg-[#021208] p-[clamp(1.5rem,3vw,2.25rem)] text-mist shadow-[0_24px_64px_rgba(0,0,0,0.55)] [scrollbar-width:none] backdrop:bg-black/70 [&::-webkit-scrollbar]:hidden"
        onClose={closeDialog}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeDialog();
          }
        }}
      >
        <h2
          id={titleId}
          className="text-[clamp(1.35rem,2.4vw,1.6rem)] leading-[1.28] font-bold tracking-[-0.01em]"
        >
          {appRedirectDialog.title}
        </h2>
        <p id={bodyId} className="mt-3 text-base leading-[1.55] text-mist/75">
          {appRedirectDialog.body}
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            className={`${dialogButton} border border-mist/50 bg-mist/12 text-mist hover:bg-mist/22 motion-safe:hover:scale-[1.03]`}
            onClick={closeDialog}
          >
            {appRedirectDialog.cancel}
          </button>
          <a
            // Keeps the dialog's own autofocus on the confirm action; without
            // it the algorithm falls back to "Stay Here", which is first in DOM
            // order (flex-col-reverse only reverses the visual order).
            autoFocus
            href={href}
            data-analytics-handoff
            onClick={confirmHandoff}
            onAuxClick={(event) => {
              if (event.button === 1) confirmHandoff(event);
            }}
            className={`${dialogButton} bg-mist text-forest motion-safe:hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(227,226,112,0.4)]`}
          >
            {appRedirectDialog.confirm}
          </a>
        </div>
      </dialog>
    </>
  );
}
