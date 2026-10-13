import { pathToFileURL } from "node:url";

export function validateNetlifyEnvironment(environment) {
  if (environment.NETLIFY !== "true") {
    return null;
  }

  const projectToken = environment.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim();
  const legacyToken = environment.VITE_POSTHOG_API_KEY?.trim();

  if (projectToken || legacyToken) {
    return null;
  }

  const deployContext = environment.CONTEXT?.trim() || "unknown";
  const unsupportedTokenHint = environment.NEXT_PUBLIC_POSTHOG_TOKEN?.trim()
    ? " NEXT_PUBLIC_POSTHOG_TOKEN is present, but the application does not read that key."
    : "";

  return `PostHog is not configured for the Netlify ${deployContext} build. Set NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN with Build scope for this deploy context.${unsupportedTokenHint}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const error = validateNetlifyEnvironment(process.env);

  if (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
