import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import { register } from "node:module";
import { after, before, beforeEach, describe, test } from "node:test";

// The Server Actions are exercised for real: the genuine @supabase/supabase-js
// client is pointed at an in-process HTTP server standing in for Supabase, so the
// assertions below are about the actual wire requests (table, row shape, Edge
// Function body) rather than about mocked method calls.
//
// The source uses the `@/` path alias and extensionless TypeScript imports, which
// Node's loader does not understand on its own. This resolve hook needs no CLI
// flag and only affects this test's process.
const projectRoot = new URL("../", import.meta.url);
register(
  `data:text/javascript,${encodeURIComponent(`
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    specifier = new URL("src/" + specifier.slice(2), ${JSON.stringify(projectRoot.href)}).href;
  }
  try {
    return await next(specifier, context);
  } catch (error) {
    // Only retry relative or absolute paths; a missing npm package must surface as itself.
    const isPath = /^(\\.\\.?\\/|\\/|file:)/.test(specifier);
    if (error?.code !== "ERR_MODULE_NOT_FOUND" || !isPath || /\\.[cm]?[jt]sx?$/.test(specifier)) {
      throw error;
    }
    return next(specifier + ".ts", context);
  }
}`)}`,
);

// Never inherit a developer's real Supabase configuration.
delete process.env.SUPABASE_URL;
delete process.env.SUPABASE_PUBLISHABLE_KEY;
delete process.env.SUPABASE_SEND_EMAIL;

const PUBLISHABLE_KEY = "sb_publishable_test_key";
const requests = [];
const overrides = { rest: null, functions: null };

const server = createServer((req, res) => {
  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    const { pathname } = new URL(req.url, "http://localhost");
    const kind = pathname.startsWith("/rest/v1/")
      ? "rest"
      : pathname.startsWith("/functions/v1/")
        ? "functions"
        : "other";
    let body = raw;
    try {
      body = JSON.parse(raw);
    } catch {
      // keep the raw string
    }
    requests.push({
      kind,
      method: req.method,
      target: pathname.split("/").at(-1),
      body,
      apikey: req.headers.apikey,
      authorization: req.headers.authorization,
    });
    const reply =
      overrides[kind] ??
      (kind === "rest" ? { status: 201, body: "" } : { status: 200, body: "{}" });
    res.writeHead(reply.status, { "content-type": "application/json" });
    res.end(reply.body);
  });
});

const restRequests = () => requests.filter((r) => r.kind === "rest");
const functionRequests = () => requests.filter((r) => r.kind === "functions");

const postgrestError = (message) => ({
  status: 400,
  body: JSON.stringify({ code: "PGRST204", message, details: null, hint: null }),
});
const edgeFunctionError = { status: 500, body: JSON.stringify({ error: "boom" }) };

const rejectsSubmit = (promise, message) =>
  assert.rejects(promise, { name: "SupabaseSubmitError", message });

let actions;

before(async () => {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  actions = await import("../src/lib/supabase/submissions.ts");
});

after(() => server.close());

beforeEach(() => {
  requests.length = 0;
  overrides.rest = null;
  overrides.functions = null;
  delete process.env.SUPABASE_SEND_EMAIL;
});

const contactInput = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello from the contact form",
};
const applicationInput = {
  fullName: "Grace Hopper",
  email: "grace@example.com",
  linkedinUrl: "https://www.linkedin.com/in/grace",
  githubUrl: "https://github.com/grace",
  jobId: "founding-enterprise-account-executive",
  jobTitle: "Founding Enterprise Account Executive",
};
const roseInput = {
  name: "Rose",
  email: "rose@example.com",
  githubUrl: "https://github.com/open-telemetry/opentelemetry-collector",
};

// getSupabase() caches the first client it builds, so the unconfigured case has to
// run before any test configures the environment.
test("refuses every action before Supabase is configured, without any request", async () => {
  await rejectsSubmit(
    actions.submitContactMessage(contactInput),
    "Supabase is not configured.",
  );
  await rejectsSubmit(
    actions.submitJobApplication(applicationInput),
    "Supabase is not configured.",
  );
  await rejectsSubmit(
    actions.submitRoseOpenSourceApplication(roseInput),
    "Supabase is not configured.",
  );
  assert.equal(requests.length, 0);
});

describe("with Supabase configured", () => {
  before(() => {
    process.env.SUPABASE_URL = `http://127.0.0.1:${server.address().port}`;
    process.env.SUPABASE_PUBLISHABLE_KEY = PUBLISHABLE_KEY;
  });

  describe("contact form", () => {
    test("rejects a blank name before touching Supabase", async () => {
      await rejectsSubmit(
        actions.submitContactMessage({ ...contactInput, name: "   " }),
        "Name is required.",
      );
      assert.equal(requests.length, 0);
    });

    test("rejects missing or malformed emails before touching Supabase", async () => {
      for (const email of ["", "   ", "not-an-email", "ada@localhost", "ada @example.com"]) {
        await rejectsSubmit(
          actions.submitContactMessage({ ...contactInput, email }),
          "Email is required.",
        );
      }
      assert.equal(requests.length, 0);
    });

    test("inserts one trimmed row into contact_submissions and skips mail by default", async () => {
      const result = await actions.submitContactMessage({
        name: "  Ada Lovelace  ",
        email: "  ada@example.com ",
        message: "  Hello from the contact form\n",
      });

      assert.deepEqual(result, { notification: "skipped" });
      assert.equal(requests.length, 1);
      const [insert] = restRequests();
      assert.equal(insert.method, "POST");
      assert.equal(insert.target, "contact_submissions");
      assert.deepEqual(insert.body, [contactInput]);
      assert.equal(insert.apikey, PUBLISHABLE_KEY);
      assert.equal(insert.authorization, `Bearer ${PUBLISHABLE_KEY}`);
      assert.equal(functionRequests().length, 0);
    });

    test('treats SUPABASE_SEND_EMAIL values other than "true" as mail off', async () => {
      for (const value of ["false", "TRUE", "1", "yes", ""]) {
        process.env.SUPABASE_SEND_EMAIL = value;
        const result = await actions.submitContactMessage(contactInput);
        assert.deepEqual(result, { notification: "skipped" }, `value ${JSON.stringify(value)}`);
      }
      assert.equal(restRequests().length, 5);
      assert.equal(functionRequests().length, 0);
    });

    test("invokes send-contact-email with the stored row after a successful insert", async () => {
      process.env.SUPABASE_SEND_EMAIL = "true";
      const result = await actions.submitContactMessage(contactInput);

      assert.deepEqual(result, { notification: "sent" });
      assert.deepEqual(
        requests.map((r) => [r.kind, r.target]),
        [
          ["rest", "contact_submissions"],
          ["functions", "send-contact-email"],
        ],
      );
      assert.deepEqual(functionRequests()[0].body, contactInput);
    });

    test("surfaces the insert error and never invokes the Edge Function", async () => {
      process.env.SUPABASE_SEND_EMAIL = "true";
      overrides.rest = postgrestError("permission denied for table contact_submissions");

      await rejectsSubmit(
        actions.submitContactMessage(contactInput),
        "permission denied for table contact_submissions",
      );
      assert.equal(restRequests().length, 1);
      assert.equal(functionRequests().length, 0);
    });

    test("reports a failed notification while keeping the persisted row a success", async () => {
      process.env.SUPABASE_SEND_EMAIL = "true";
      overrides.functions = edgeFunctionError;

      const result = await actions.submitContactMessage(contactInput);

      assert.deepEqual(result, { notification: "failed" });
      assert.equal(restRequests().length, 1);
      assert.equal(functionRequests().length, 1);
    });
  });

  describe("job application", () => {
    test("rejects a blank full name or malformed email before touching Supabase", async () => {
      await rejectsSubmit(
        actions.submitJobApplication({ ...applicationInput, fullName: " " }),
        "Full name is required.",
      );
      await rejectsSubmit(
        actions.submitJobApplication({ ...applicationInput, email: "grace@" }),
        "Email is required.",
      );
      assert.equal(requests.length, 0);
    });

    test("inserts the listed role's id and title with optional links as null", async () => {
      const result = await actions.submitJobApplication({
        ...applicationInput,
        fullName: " Grace Hopper ",
        email: " grace@example.com ",
        linkedinUrl: "   ",
        githubUrl: "",
        coolProject: "   ",
      });

      assert.deepEqual(result, { notification: "skipped" });
      assert.equal(requests.length, 1);
      const [insert] = restRequests();
      assert.equal(insert.target, "job_applications");
      assert.deepEqual(insert.body, {
        job_id: "founding-enterprise-account-executive",
        job_title: "Founding Enterprise Account Executive",
        full_name: "Grace Hopper",
        email: "grace@example.com",
        linkedin_url: null,
        github_url: null,
        cool_project: null,
        motivation: null,
      });
    });

    test("defaults untargeted applications to the open-application job", async () => {
      await actions.submitJobApplication({
        ...applicationInput,
        jobId: undefined,
        jobTitle: undefined,
      });
      await actions.submitJobApplication({ ...applicationInput, jobId: "  ", jobTitle: "" });

      for (const insert of restRequests()) {
        assert.equal(insert.body.job_id, "open-application");
        assert.equal(insert.body.job_title, "Open Application");
      }
      assert.equal(restRequests().length, 2);
    });

    test("sends the application notification with the same ids and links as the insert", async () => {
      process.env.SUPABASE_SEND_EMAIL = "true";
      const result = await actions.submitJobApplication({
        ...applicationInput,
        coolProject: "  Built a compiler.\nIt runs on a tiny computer.  ",
        motivation: "  I want to make telemetry useful.  ",
      });

      assert.deepEqual(result, { notification: "sent" });
      const [insert] = restRequests();
      assert.equal(insert.body.cool_project, "Built a compiler.\nIt runs on a tiny computer.");
      assert.equal(insert.body.motivation, "I want to make telemetry useful.");
      const [notification] = functionRequests();
      assert.equal(notification.target, "send-application-email");
      assert.deepEqual(notification.body, {
        jobId: applicationInput.jobId,
        jobTitle: applicationInput.jobTitle,
        applicant: {
          fullName: applicationInput.fullName,
          email: applicationInput.email,
          linkedinUrl: applicationInput.linkedinUrl,
          githubUrl: applicationInput.githubUrl,
          coolProject: "Built a compiler.\nIt runs on a tiny computer.",
          motivation: "I want to make telemetry useful.",
        },
      });
    });

    test("prefixes the insert error and never invokes the Edge Function", async () => {
      process.env.SUPABASE_SEND_EMAIL = "true";
      overrides.rest = postgrestError('invalid input syntax for type uuid: "open-application"');

      await rejectsSubmit(
        actions.submitJobApplication(applicationInput),
        'Error saving application: invalid input syntax for type uuid: "open-application"',
      );
      assert.equal(functionRequests().length, 0);
    });

    test("reports a failed notification after the application was stored", async () => {
      process.env.SUPABASE_SEND_EMAIL = "true";
      overrides.functions = edgeFunctionError;

      assert.deepEqual(await actions.submitJobApplication(applicationInput), {
        notification: "failed",
      });
      assert.equal(restRequests().length, 1);
    });
  });

  describe("rose open source application", () => {
    test("rejects names, emails, and non-repository GitHub URLs before touching Supabase", async () => {
      await rejectsSubmit(
        actions.submitRoseOpenSourceApplication({ ...roseInput, name: " " }),
        "Name is required.",
      );
      await rejectsSubmit(
        actions.submitRoseOpenSourceApplication({ ...roseInput, email: "rose@example" }),
        "Email is required.",
      );
      for (const githubUrl of [
        "",
        "github.com/open-telemetry/opentelemetry-collector",
        "http://github.com/open-telemetry/opentelemetry-collector",
        "https://github.com/open-telemetry",
        "https://gitlab.com/open-telemetry/opentelemetry-collector",
        "https://user:pw@github.com/open-telemetry/opentelemetry-collector",
      ]) {
        await rejectsSubmit(
          actions.submitRoseOpenSourceApplication({ ...roseInput, githubUrl }),
          "A valid GitHub URL is required.",
        );
      }
      assert.equal(requests.length, 0);
    });

    test("stores the normalized repository URL in rose_leads notes and never sends mail", async () => {
      process.env.SUPABASE_SEND_EMAIL = "true";
      const result = await actions.submitRoseOpenSourceApplication({
        ...roseInput,
        githubUrl: " https://github.com/open-telemetry/opentelemetry-collector/?tab=readme#top ",
      });

      assert.deepEqual(result, { notification: "skipped" });
      assert.equal(requests.length, 1);
      const [insert] = restRequests();
      assert.equal(insert.target, "rose_leads");
      assert.deepEqual(insert.body, {
        name: "Rose",
        email: "rose@example.com",
        notes: "GitHub repository: https://github.com/open-telemetry/opentelemetry-collector",
        kind: "open_source",
      });
    });

    test("surfaces the insert error", async () => {
      overrides.rest = postgrestError("rose_leads is read only");
      await rejectsSubmit(
        actions.submitRoseOpenSourceApplication(roseInput),
        "rose_leads is read only",
      );
    });
  });

  test("never logs or echoes submitted personal data to the client", async () => {
    const sentinel = "pii-7f3c";
    const inputs = [
      [actions.submitContactMessage, { name: `${sentinel}-name`, email: `${sentinel}@example.com`, message: `${sentinel}-message` }],
      [actions.submitJobApplication, { fullName: `${sentinel}-name`, email: `${sentinel}@example.com`, linkedinUrl: `https://linkedin.com/in/${sentinel}`, githubUrl: "" }],
      [actions.submitRoseOpenSourceApplication, { name: `${sentinel}-name`, email: `${sentinel}@example.com`, githubUrl: `https://github.com/${sentinel}/repo` }],
    ];
    const logged = [];
    const originals = {};
    for (const method of ["log", "info", "warn", "error", "debug"]) {
      originals[method] = console[method];
      console[method] = (...args) => logged.push([method, ...args]);
    }

    try {
      process.env.SUPABASE_SEND_EMAIL = "true";
      for (const [action, input] of inputs) {
        overrides.rest = null;
        overrides.functions = edgeFunctionError;
        const result = await action(input);
        assert.deepEqual(Object.keys(result), ["notification"]);
        assert.doesNotMatch(JSON.stringify(result), new RegExp(sentinel));

        overrides.rest = postgrestError("insert rejected");
        const error = await action(input).catch((e) => e);
        assert.equal(error.name, "SupabaseSubmitError");
        assert.doesNotMatch(error.message, new RegExp(sentinel));

        const invalid = await action({ ...input, email: `${sentinel}-not-an-email` }).catch((e) => e);
        assert.doesNotMatch(invalid.message, new RegExp(sentinel));
      }
    } finally {
      Object.assign(console, originals);
    }

    assert.deepEqual(logged, []);
  });
});
