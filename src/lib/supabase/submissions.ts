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

  if (!supabaseSendEmail()) {
    return;
  }

  const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
    body: payload,
  });
  if (emailError) {
    throw new SupabaseSubmitError("Failed to send email notification");
  }
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
  jobId?: string;
  jobTitle?: string;
}) {
  const fullName = input.fullName.trim();
  if (!fullName) {
    throw new SupabaseSubmitError("Full name is required.");
  }

  const email = requireEmail(input.email, "Email");
  const linkedinUrl = input.linkedinUrl.trim() || null;
  const githubUrl = input.githubUrl.trim() || null;
  const jobId = input.jobId?.trim() || OPEN_APPLICATION_JOB.jobId;
  const jobTitle = input.jobTitle?.trim() || OPEN_APPLICATION_JOB.jobTitle;

  const supabase = client();
  const { error: insertError } = await supabase.from("job_applications").insert({
    job_id: jobId,
    job_title: jobTitle,
    full_name: fullName,
    email,
    linkedin_url: linkedinUrl,
    github_url: githubUrl,
  });
  if (insertError) {
    throw new SupabaseSubmitError(`Error saving application: ${insertError.message}`);
  }

  if (!supabaseSendEmail()) {
    return;
  }

  const { error } = await supabase.functions.invoke("send-application-email", {
    body: {
      jobId,
      jobTitle,
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

const TULIP_TIERS = new Set(["standard", "enterprise"]);

export async function submitTulipLead(input: {
  name: string;
  email: string;
  company: string;
  message: string;
  supportTier: string;
}) {
  const name = input.name.trim();
  if (!name) {
    throw new SupabaseSubmitError("Name is required.");
  }

  const email = requireEmail(input.email, "Email");
  const supportTier = input.supportTier.trim();
  if (!TULIP_TIERS.has(supportTier)) {
    throw new SupabaseSubmitError("Support tier is required.");
  }

  const company = input.company.trim() || undefined;
  const message = input.message.trim() || undefined;

  const supabase = client();
  const { error: dbError } = await supabase.from("tulip_leads").insert({
    name,
    email,
    company: company ?? null,
    notes: message ?? null,
    support_tier: supportTier,
  });
  if (dbError) {
    throw new SupabaseSubmitError(dbError.message);
  }

  if (!supabaseSendEmail()) {
    return;
  }

  const { error: emailError } = await supabase.functions.invoke("send-tulip-lead-email", {
    body: {
      name,
      email,
      company,
      message,
      supportTier,
    },
  });
  if (emailError) {
    throw new SupabaseSubmitError("Failed to send email notification");
  }
}
