import { getSupabase, supabaseSendEmail } from "./client";

export class SupabaseSubmitError extends Error {
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

export async function submitContactMessage(input: {
  name: string;
  email: string;
  message: string;
}) {
  const supabase = client();

  const payload = {
    name: input.name,
    email: input.email,
    message: input.message,
  };

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
  const supabase = client();

  const linkedinUrl = input.linkedinUrl || null;
  const githubUrl = input.githubUrl || null;

  const { error: insertError } = await supabase.from("job_applications").insert({
    job_id: OPEN_APPLICATION_JOB.jobId,
    job_title: OPEN_APPLICATION_JOB.jobTitle,
    full_name: input.fullName,
    email: input.email,
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
        fullName: input.fullName,
        email: input.email,
        linkedinUrl,
        githubUrl,
      },
    },
  });
  if (error) {
    throw new SupabaseSubmitError(`Error sending email: ${error.message}`);
  }
}
