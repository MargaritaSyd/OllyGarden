import { initApolloTracker } from "@/lib/apollo";
import { initHubSpotTracker } from "@/lib/hubspot";
import { initPostHog } from "@/lib/posthog";
import { isChromeless } from "@/lib/chrome";

if (!isChromeless(window.location.pathname)) {
  initPostHog();
  initApolloTracker();
  initHubSpotTracker();
}
