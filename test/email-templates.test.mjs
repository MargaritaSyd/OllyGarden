import assert from "node:assert/strict";
import { describe, test } from "node:test";

const { applicationEmails, contactEmail, escapeHtml, safeHttpUrl } = await import(
  "../supabase/functions/_shared/email.ts"
);

const application = {
  jobId: "open-application",
  jobTitle: "Open Application",
  applicant: {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    linkedinUrl: "https://www.linkedin.com/in/ada",
    githubUrl: null,
    coolProject: null,
    motivation: null,
  },
};

describe("email templates", () => {
  test("escapeHtml neutralizes markup and quotes", () => {
    assert.equal(
      escapeHtml(`<a href="x" onclick='y'>&</a>`),
      "&lt;a href=&quot;x&quot; onclick=&#39;y&#39;&gt;&amp;&lt;/a&gt;",
    );
    assert.equal(escapeHtml(null), "");
  });

  test("safeHttpUrl keeps http(s) links and rejects other schemes", () => {
    assert.equal(safeHttpUrl(" https://github.com/ada "), "https://github.com/ada");
    assert.equal(safeHttpUrl("javascript:alert(1)"), null);
    assert.equal(safeHttpUrl("data:text/html,hi"), null);
    assert.equal(safeHttpUrl("not a url"), null);
  });

  describe("applicationEmails", () => {
    test("returns null when a required field is missing", () => {
      assert.equal(applicationEmails({ ...application, jobId: "" }), null);
      assert.equal(
        applicationEmails({ ...application, applicant: { ...application.applicant, email: " " } }),
        null,
      );
      assert.equal(applicationEmails({}), null);
    });

    test("includes both optional answers, escaped, with line breaks kept", () => {
      const emails = applicationEmails({
        ...application,
        applicant: {
          ...application.applicant,
          coolProject: "A <script>alert(1)</script> collector\nwith two lines",
          motivation: "I love gardens & telemetry",
        },
      });
      const html = emails.hiring.html;
      assert.match(html, /Tell us something cool you built:/);
      assert.match(html, /A &lt;script&gt;alert\(1\)&lt;\/script&gt; collector<br>with two lines/);
      assert.match(html, /Why do you want to become an OllyGardener\?/);
      assert.match(html, /I love gardens &amp; telemetry/);
      assert.doesNotMatch(html, /<script>/);
    });

    test("omits the answer sections when the answers are blank", () => {
      const html = applicationEmails(application).hiring.html;
      assert.doesNotMatch(html, /something cool you built/);
      assert.doesNotMatch(html, /OllyGardener/);
    });

    test("never links a non-http URL", () => {
      const html = applicationEmails({
        ...application,
        applicant: { ...application.applicant, githubUrl: "javascript:alert(1)" },
      }).hiring.html;
      assert.doesNotMatch(html, /href="javascript:/);
      assert.match(html, /GitHub\/Portfolio:<\/strong> javascript:alert\(1\)/);
      assert.match(html, /<a href="https:\/\/www\.linkedin\.com\/in\/ada">/);
    });

    test("escapes the applicant name in the confirmation email", () => {
      const emails = applicationEmails({
        ...application,
        applicant: { ...application.applicant, fullName: "<b>Ada</b>" },
      });
      assert.match(emails.confirmation.html, /Dear &lt;b&gt;Ada&lt;\/b&gt;,/);
      assert.equal(emails.applicantEmail, "ada@example.com");
    });
  });

  describe("contactEmail", () => {
    test("accepts a submission without a message, as /contact allows", () => {
      const email = contactEmail({ name: "Ada", email: "ada@example.com", message: "" });
      assert.ok(email);
      assert.match(email.html, /\(no message\)/);
    });

    test("requires name and email", () => {
      assert.equal(contactEmail({ name: "", email: "ada@example.com", message: "hi" }), null);
      assert.equal(contactEmail({ name: "Ada", email: "", message: "hi" }), null);
    });

    test("escapes the message and keeps its line breaks", () => {
      const email = contactEmail({
        name: "Ada",
        email: "ada@example.com",
        message: "<img src=x onerror=alert(1)>\nsecond line",
      });
      assert.match(email.html, /&lt;img src=x onerror=alert\(1\)&gt;<br>second line/);
      assert.doesNotMatch(email.html, /<img/);
    });
  });
});
