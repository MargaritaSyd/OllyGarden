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

// Production builds start from the Deploy production workflow's build hook, whose body is the
// commit it migrated the Website Supabase project for. Building anything else could publish code
// before the schema it needs.
export function validateProductionDeploy(environment) {
  if (environment.NETLIFY !== "true" || environment.CONTEXT !== "production") {
    return null;
  }

  const migratedCommit = environment.INCOMING_HOOK_BODY?.trim();
  const commit = environment.COMMIT_REF?.trim();

  if (!migratedCommit) {
    return "Production builds start only from the Deploy production workflow in GitHub Actions, which applies Supabase migrations first. Run that workflow (Actions → Deploy production → Run workflow) instead of triggering a deploy in Netlify.";
  }

  if (migratedCommit !== commit) {
    return `This production build is for ${commit}, but the Deploy production workflow migrated ${migratedCommit}. The workflow run for the newer commit publishes it.`;
  }

  return null;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const errors = [
    validateNetlifyEnvironment(process.env),
    validateProductionDeploy(process.env),
  ].filter(Boolean);

  for (const error of errors) {
    console.error(error);
  }

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}
