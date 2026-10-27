import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("agent discovery resources and live OpenAPI proxy are present", () => {
  for (const file of [
    "public/developers.md",
    "public/cli.md",
    "public/api-docs.md",
    "public/api-versioning.md",
  ]) {
    assert.ok(
      read(file).length > 200,
      `${file} should contain useful guidance`,
    );
  }
  assert.ok(existsSync(join(root, "src/app/llms.txt/route.ts")));
  assert.ok(existsSync(join(root, "src/app/llms-full.txt/route.ts")));
  assert.ok(existsSync(join(root, "src/app/openapi.json/route.ts")));
  assert.ok(
    !existsSync(join(root, "public/openapi.json")),
    "OpenAPI must not become a stale static copy",
  );
  assert.match(read("src/app/layout.tsx"), /service-desc/);
});

test("Markdown representations convert technical content faithfully", async () => {
  assert.ok(existsSync(join(root, "src/app/agent-content/[...slug]/route.ts")));

  assert.match(
    read("src/lib/agent-content.ts"),
    /"\/api-docs": "api-docs\.md"/,
  );
  const { htmlToMarkdown } = await import("../src/lib/html-to-markdown.ts");
  const technical = htmlToMarkdown(`
    <pre><code>payment.Amount &lt;= <span class="hljs-number">0</span></code></pre>
    <table><tr><th>Signal</th><th>Use</th></tr><tr><td>Trace</td><td>Latency</td></tr></table>
    <img src="diagram.png" alt="Signal diagram">
  `);
  assert.match(technical, /payment\.Amount <= 0/);
  assert.match(technical, /\| Signal \| Use \|/);
  assert.match(technical, /\| Trace \| Latency \|/);
  assert.match(technical, /!\[Signal diagram\]\(diagram\.png\)/);
  const headline = htmlToMarkdown(
    `<h1><span class="block">Clean, compliant</span><span class="block">telemetry for</span></h1><h2>Find and<br>fix</h2>`,
  );
  assert.match(headline, /^# Clean, compliant telemetry for$/m);
  assert.match(headline, /^## Find and fix$/m);
  const emphasis = htmlToMarkdown(`<button>Start</button><p><b>Note.</b> Text with <i>stress</i>.</p>`);
  assert.doesNotMatch(emphasis, /\*\*Start/, "<button> is not <b>");
  assert.match(emphasis, /\*\*Note\.\*\* Text with \*stress\*\./);
  assert.match(htmlToMarkdown("<dl><div><dt>Logs</dt><dd>The data model.</dd></div></dl>"), /^Logs: The data model\.$/m);
  const bare = htmlToMarkdown("<dl><dt>Purpose</dt><dd>Analytics</dd><dt>Retention</dt><dd>2 years</dd></dl><p>after</p>");
  assert.match(bare, /^Purpose: Analytics$/m);
  assert.match(bare, /^Retention: 2 years$/m);
  assert.match(bare, /^after$/m);
});

test("security headers cover every route", () => {
  const config = read("next.config.ts");
  for (const header of [
    "Content-Security-Policy",
    "Referrer-Policy",
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "X-Frame-Options",
  ]) {
    assert.match(config, new RegExp(header));
  }
  assert.match(config, /source: "\/:path\*"/);
});

test("legal, quiz, and role routes are canonical content rather than redirects", () => {
  const config = read("next.config.ts");
  for (const path of [
    "/terms-of-use",
    "/privacy-policy",
    "/data-protection-policy",
    "/rose-terms-of-service",
    "/subprocessors",
    "/security",
    "/imprint",
    "/otel-quiz",
    "/resources/trust-your-telemetry",
    "/careers/founding-enterprise-account-executive",
    "/careers/chief-of-staff",
    "/careers/ai-software-engineer",
  ]) {
    assert.ok(
      !config.includes(`["${path}",`),
      `${path} must not be redirected`,
    );
  }
  for (const route of [
    "terms-of-use",
    "privacy-policy",
    "data-protection-policy",
    "rose-terms-of-service",
    "subprocessors",
    "security",
    "imprint",
    "otel-quiz",
    "resources/trust-your-telemetry",
    "resources/trust-your-telemetry/booth",
    "careers/founding-enterprise-account-executive",
    "careers/chief-of-staff",
    "careers/ai-software-engineer",
  ]) {
    assert.ok(existsSync(join(root, `src/app/${route}/page.tsx`)));
  }
});

test("quiz selects ten questions with every topic and does not collect lead data", async () => {
  const quiz = await import("../src/lib/quiz/questions.ts");
  const selected = quiz.selectQuizQuestions();

  const { quizQuestionCount } = await import("../src/lib/quiz/score.ts");
  assert.equal(quiz.quizTopics.length, quizQuestionCount);
  assert.equal(selected.length, quizQuestionCount);
  assert.equal(new Set(selected.map((question) => question.topic)).size, 10);
  assert.equal(new Set(selected.map((question) => question.id)).size, 10);
  for (const question of selected) {
    assert.ok(
      question.correctIndex >= 0 &&
        question.correctIndex < question.options.length,
    );
  }
  assert.doesNotMatch(
    read("src/components/otel-quiz.tsx"),
    /email|fullName|submitQuizLead/i,
  );
});

test("quiz ladder covers every score once", async () => {
  const { quizLadder, quizQuestionCount, quizTier } = await import("../src/lib/quiz/score.ts");

  assert.equal(quizLadder.length, 5);
  const covered = quizLadder.flatMap((tier) =>
    Array.from({ length: tier.max - tier.min + 1 }, (_, offset) => tier.min + offset),
  );
  assert.deepEqual(
    covered,
    Array.from({ length: quizQuestionCount + 1 }, (_, score) => score),
  );
  for (const score of covered) {
    assert.equal(quizTier(score).name, quizLadder.find((tier) => score >= tier.min && score <= tier.max).name);
  }
});

test("quiz result links hide the score in a token that maps back to it", async () => {
  const quiz = await import("../src/lib/quiz/score.ts");
  for (const score of quiz.quizScores) {
    const token = quiz.quizResultToken(score);
    assert.match(token, /^[0-9a-z]{8}$/);
    assert.equal(quiz.quizScoreFromToken(token), score);
  }
  assert.equal(quiz.quizScoreFromToken("7"), null);
});

test("quiz copy closes every inline code span", async () => {
  const { allQuestions } = await import("../src/lib/quiz/questions.ts");
  for (const question of allQuestions) {
    for (const text of [
      question.question,
      ...question.options,
      question.explanation,
    ]) {
      assert.equal(
        (text.match(/`/g) ?? []).length % 2,
        0,
        `${question.id} has an unbalanced backtick: ${text}`,
      );
    }
  }
});

test("forms report validation, persistence, notification, and success without PII", () => {
  const files = [
    "src/components/contact-form.tsx",
    "src/components/careers-apply-cta.tsx",
    "src/components/rose-open-source-application.tsx",
  ]
    .map(read)
    .join("\n");
  for (const failure of ["validation", "persistence", "notification"])
    assert.match(files, new RegExp(`failure_type: "${failure}"`));
  assert.match(files, /form_submitted/);
  const analyticsCalls = [
    ...files.matchAll(/capture(?:FormEvent|PostHogEvent)\([^;]+/g),
  ]
    .map(([call]) => call)
    .join("\n");
  assert.doesNotMatch(
    analyticsCalls,
    /values\.(email|name|fullName|github)|githubUrl/,
  );
  for (const formName of [
    "contact_form",
    "job_application_form",
  ]) {
    assert.match(files, new RegExp(formName));
  }
  assert.match(
    read("src/components/job-posting-analytics.tsx"),
    /job_posting_viewed/,
  );
});

test("Rose accepts only normalized public GitHub repository URLs", async () => {
  const { normalizeGitHubRepositoryUrl } =
    await import("../src/lib/github-repository-url.ts");

  assert.equal(
    normalizeGitHubRepositoryUrl(
      "https://github.com/ollygarden/wicket/?tab=readme#top",
    ),
    "https://github.com/ollygarden/wicket",
  );
  for (const value of [
    "https://github.com/",
    "https://github.com/ollygarden",
    "https://github.com/ollygarden/wicket/issues",
    "https://example.com/ollygarden/wicket",
    "http://github.com/ollygarden/wicket",
    "https://user:password@github.com/ollygarden/wicket",
  ]) {
    assert.equal(normalizeGitHubRepositoryUrl(value), null, value);
  }
});

test("every local image referenced by blog HTML exists or has an explicit redirect", async () => {
  const { legacyBlogAssetRedirects } =
    await import("../src/lib/legacy-blog-assets.ts");
  const redirectSources = new Set(
    legacyBlogAssetRedirects.map(({ source }) => source),
  );
  const files = readdirSync(join(root, "content/blog")).filter((file) =>
    file.endsWith(".html"),
  );
  const missing = [];
  let checked = 0;
  for (const file of files) {
    const html = read(`content/blog/${file}`);
    for (const [, source] of html.matchAll(
      /(?:src|href)=["'](?:https:\/\/ollygarden\.com)?(\/(?:images|blog-images)\/[^"'#?]+)["']/g,
    )) {
      checked += 1;
      if (
        !existsSync(join(root, "public", source)) &&
        !redirectSources.has(source)
      )
        missing.push(`${file}: ${source}`);
    }
  }
  assert.ok(checked > 0, "the blog asset check must inspect inline images");
  assert.deepEqual(missing, []);
  for (const { destination } of legacyBlogAssetRedirects) {
    assert.ok(
      existsSync(join(root, "public", destination)),
      `redirect destination should exist: ${destination}`,
    );
  }
});

test("Markdown versions only re-render pages on this site's own origin", () => {
  // `/agent-content/%2F%2Fevil.example.md` decodes to the path `//evil.example`,
  // which `new URL()` resolves off-site unless the origin is checked.
  assert.match(
    read("src/lib/agent-content.ts"),
    /if \(target\.origin !== new URL\(requestUrl\)\.origin\) return null;/,
  );
});
