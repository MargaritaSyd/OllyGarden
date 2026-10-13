"use client";

import { useRef } from "react";
import { capturePostHogEvent } from "@/lib/posthog";

type FailureType = "validation" | "persistence" | "notification";

export function captureFormEvent(
  event:
    | "form_started"
    | "form_submission_attempted"
    | "form_submitted"
    | "form_submission_failed"
    | "form_notification_failed",
  formName: string,
  properties: { failure_type?: FailureType; [key: string]: unknown } = {},
) {
  return capturePostHogEvent(event, { form_name: formName, ...properties });
}

export function useFormStarted(formName: string) {
  const started = useRef(false);
  return () => {
    if (started.current) return;
    started.current = captureFormEvent("form_started", formName);
  };
}
