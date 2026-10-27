// Wraps the OpenNext worker that `opennextjs-cloudflare build` generates in
// `.open-next/`. Typechecked through the handlers it imports, not on its own.
import openNext from "./.open-next/worker.js";
import { negotiateMarkdown } from "./src/edge/markdown-negotiation";
import { finalizeResponse, httpsRedirect } from "./src/edge/responses";

const worker = {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = httpsRedirect(request);
    if (redirect) return redirect;
    const response = await negotiateMarkdown(request, (forwarded) =>
      openNext.fetch(forwarded, env, ctx),
    );
    return finalizeResponse(request, response);
  },
};

export default worker;
