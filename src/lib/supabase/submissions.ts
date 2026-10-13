"use server";

import { normalizeGitHubRepositoryUrl } from "@/lib/github-repository-url";
import { getSupabase, supabaseSendEmail } from "./client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export type SubmissionResult = { notification: "sent" | "skipped" | "failed" };

class SupabaseSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseSubmitError";
  }
}

function client() {
  try {
    return getSupabase();
  } catch {
    throw new SupabaseSubmitError("Supabase is not configured.");
  }
}

function requireEmail(value: string, label: string) {
  const email = value.trim();
  if (!email || !EMAIL_RE.test(email)) {
    throw new SupabaseSubmitError(`${label} is required.`);
  }
  return email;
}

async function sendNotification(
  supabase: ReturnType<typeof getSupabase>,
  functionName: string,
  body: Record<string, unknown>,
): Promise<SubmissionResult> {
  if (!supabaseSendEmail()) return { notification: "skipped" };
  try {
    const { error } = await supabase.functions.invoke(functionName, { body });
    return { notification: error ? "failed" : "sent" };
  } catch {
    return { notification: "failed" };
  }
}

export async function submitContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<SubmissionResult> {
  const name = input.name.trim();
  if (!name) {
    throw new SupabaseSubmitError("Name is required.");
  }

  const payload = {
    name,
    email: requireEmail(input.email, "Email"),
    message: input.message.trim(),
  };

  const supabase = client();
  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert([payload]);
  if (dbError) {
    throw new SupabaseSubmitError(dbError.message);
  }

  return sendNotification(supabase, "send-contact-email", payload);
}

/** Default when Apply is not tied to a listed role (open application CTAs). */
const OPEN_APPLICATION_JOB = {
  jobId: "open-application",
  jobTitle: "Open Application",
} as const;

export async function submitJobApplication(input: {
  fullName: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  coolProject?: string;
  motivation?: string;
  jobId?: string;
  jobTitle?: string;
}): Promise<SubmissionResult> {
  const fullName = input.fullName.trim();
  if (!fullName) {
    throw new SupabaseSubmitError("Full name is required.");
  }

  const email = requireEmail(input.email, "Email");
  const linkedinUrl = input.linkedinUrl.trim() || null;
  const githubUrl = input.githubUrl.trim() || null;
  const coolProject = input.coolProject?.trim() || null;
  const motivation = input.motivation?.trim() || null;
  const jobId = input.jobId?.trim() || OPEN_APPLICATION_JOB.jobId;
  const jobTitle = input.jobTitle?.trim() || OPEN_APPLICATION_JOB.jobTitle;

  const supabase = client();
  const { error: insertError } = await supabase
    .from("job_applications")
    .insert({
      job_id: jobId,
      job_title: jobTitle,
      full_name: fullName,
      email,
      linkedin_url: linkedinUrl,
      github_url: githubUrl,
      cool_project: coolProject,
      motivation,
    });
  if (insertError) {
    throw new SupabaseSubmitError(
      `Error saving application: ${insertError.message}`,
    );
  }

  return sendNotification(supabase, "send-application-email", {
    jobId,
    jobTitle,
    applicant: {
      fullName,
      email,
      linkedinUrl,
      githubUrl,
      coolProject,
      motivation,
    },
  });
}

export async function submitRoseOpenSourceApplication(input: {
  name: string;
  email: string;
  githubUrl: string;
}): Promise<SubmissionResult> {
  const name = input.name.trim();
  if (!name) throw new SupabaseSubmitError("Name is required.");
  const email = requireEmail(input.email, "Email");
  const githubUrl = normalizeGitHubRepositoryUrl(input.githubUrl);
  if (!githubUrl) {
    throw new SupabaseSubmitError("A valid GitHub URL is required.");
  }

  const { error } = await client()
    .from("rose_leads")
    .insert({
      name,
      email,
      notes: `GitHub repository: ${githubUrl}`,
      kind: "open_source",
    });
  if (error) throw new SupabaseSubmitError(error.message);
  return { notification: "skipped" };
}
