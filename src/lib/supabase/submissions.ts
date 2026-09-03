"use server";

import { getSupabase, supabaseSendEmail } from "./client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function submitContactMessage(input: {
  name: string;
  email: string;
  message: string;
}) {
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
  const { error: dbError } = await supabase.from("contact_submissions").insert([payload]);
  if (dbError) {
    throw new SupabaseSubmitError(dbError.message);
  }

  if (!supabaseSendEmail) {
    return;
  }

  const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
    body: payload,
  });
  if (emailError) {
    throw new SupabaseSubmitError("Failed to send email notification");
  }
}

/** Postgres requires job_id; there are no listings yet, so both CTAs share this. */
const OPEN_APPLICATION_JOB = {
  jobId: "open-application",
  jobTitle: "Open Application",
} as const;

export async function submitJobApplication(input: {
  fullName: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}) {
  const fullName = input.fullName.trim();
  if (!fullName) {
    throw new SupabaseSubmitError("Full name is required.");
  }

  const email = requireEmail(input.email, "Email");
  const linkedinUrl = input.linkedinUrl.trim() || null;
  const githubUrl = input.githubUrl.trim() || null;

  const supabase = client();
  const { error: insertError } = await supabase.from("job_applications").insert({
    job_id: OPEN_APPLICATION_JOB.jobId,
    job_title: OPEN_APPLICATION_JOB.jobTitle,
    full_name: fullName,
    email,
    linkedin_url: linkedinUrl,
    github_url: githubUrl,
  });
  if (insertError) {
    throw new SupabaseSubmitError(`Error saving application: ${insertError.message}`);
  }

  if (!supabaseSendEmail) {
    return;
  }

  const { error } = await supabase.functions.invoke("send-application-email", {
    body: {
      jobId: OPEN_APPLICATION_JOB.jobId,
      jobTitle: OPEN_APPLICATION_JOB.jobTitle,
      applicant: {
        fullName,
        email,
        linkedinUrl,
        githubUrl,
      },
    },
  });
  if (error) {
    throw new SupabaseSubmitError(`Error sending email: ${error.message}`);
  }
}
