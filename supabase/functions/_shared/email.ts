// Email templates for the form notification functions. Every value comes from a public form, so it
// is escaped before it reaches HTML. No imports: Deno serves this file and Node's type stripping
// runs it in test/email-templates.test.mjs.

export type Email = { subject: string; html: string };

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/** Escaped text with the sender's line breaks kept. */
export function escapeMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

/** The URL when it is http(s), else null, so a link can never carry `javascript:` or similar. */
export function safeHttpUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function link(label: string, value: unknown): string {
  const url = safeHttpUrl(value);
  if (url) {
    return `<p><strong>${label}:</strong> <a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>`;
  }
  const raw = text(value);
  return raw ? `<p><strong>${label}:</strong> ${escapeHtml(raw)}</p>` : "";
}

function answer(label: string, value: unknown): string {
  const raw = text(value);
  return raw ? `<p><strong>${label}</strong></p>\n<p>${escapeMultiline(raw)}</p>` : "";
}

export type ApplicationPayload = {
  jobId?: unknown;
  jobTitle?: unknown;
  applicant?: {
    fullName?: unknown;
    email?: unknown;
    linkedinUrl?: unknown;
    githubUrl?: unknown;
    coolProject?: unknown;
    motivation?: unknown;
  };
};

/** Null when a required field is missing. */
export function applicationEmails(
  payload: ApplicationPayload,
): { hiring: Email; confirmation: Email; applicantEmail: string } | null {
  const jobId = text(payload?.jobId);
  const jobTitle = text(payload?.jobTitle);
  const applicant = payload?.applicant ?? {};
  const fullName = text(applicant.fullName);
  const email = text(applicant.email);
  if (!jobId || !jobTitle || !fullName || !email) return null;

  const hiringHtml = [
    "<h2>New Garden Volunteer Application</h2>",
    `<p><strong>Position:</strong> ${escapeHtml(jobTitle)}</p>`,
    `<p><strong>Job ID:</strong> ${escapeHtml(jobId)}</p>`,
    "<h3>Gardener Information:</h3>",
    `<p><strong>Name:</strong> ${escapeHtml(fullName)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    link("LinkedIn", applicant.linkedinUrl),
    link("GitHub/Portfolio", applicant.githubUrl),
    answer("Tell us something cool you built:", applicant.coolProject),
    answer("Why do you want to become an OllyGardener?", applicant.motivation),
  ]
    .filter(Boolean)
    .join("\n");

  const confirmationHtml = [
    "<h2>Thank You for Your Application</h2>",
    `<p>Dear ${escapeHtml(fullName)},</p>`,
    `<p>Thank you for applying to the <strong>${escapeHtml(jobTitle)}</strong> position at OllyGarden. We've received your application and our team will review it shortly.</p>`,
    "<p>We appreciate your interest in joining our garden of innovation!</p>",
    "<p>Best regards,<br>The OllyGarden Team</p>",
  ].join("\n");

  return {
    hiring: {
      subject: `New Garden Enthusiast: ${jobTitle} (Job ID: ${jobId})`,
      html: hiringHtml,
    },
    confirmation: {
      subject: `Thank you for applying to join our Garden - ${jobTitle}`,
      html: confirmationHtml,
    },
    applicantEmail: email,
  };
}

export type ContactPayload = { name?: unknown; email?: unknown; message?: unknown };

/** Null when name or email is missing. The message is optional, as it is on /contact. */
export function contactEmail(payload: ContactPayload): Email | null {
  const name = text(payload?.name);
  const email = text(payload?.email);
  if (!name || !email) return null;
  const message = text(payload?.message);

  return {
    subject: "New Contact Form Submission",
    html: [
      "<h2>New Contact Form Submission</h2>",
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      "<p><strong>Message:</strong></p>",
      message ? `<p>${escapeMultiline(message)}</p>` : "<p><em>(no message)</em></p>",
    ].join("\n"),
  };
}
