import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LegalPage,
  legalLinkClass,
  Lock,
} from "@/components/legal/legal-page";
import { lastUpdated, legalContacts, legalEntities } from "@/lib/legal";

const link = legalLinkClass;
const securityMail = `mailto:${legalContacts.security}`;

const Security = () => {
  return (
    <LegalPage
      title="Security"
      icon={<Lock />}
      updated={`${legalEntities.inc.name} | ${lastUpdated("/security")}`}
    >
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">How we protect customer data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <ul className="space-y-2">
            <li>
              • {legalEntities.inc.name} has completed a SOC 2® Type II examination covering security,
              availability, and confidentiality. Customers and prospects can request the report
              under NDA.
            </li>
            <li>
              • The core platform runs in Google Cloud in the EU (Netherlands) by default. The
              managed Rose service uses the locations described below.
            </li>
            <li>
              • Data is encrypted in transit with TLS and at rest, and telemetry samples are
              encrypted with a separate key for each organization.
            </li>
            <li>
              • Production access is disabled by default, granted just in time, and protected by
              multi-factor authentication.
            </li>
            <li>• We run penetration tests at least once a year.</li>
          </ul>
          <p>
            Our{" "}
            <Link href="/data-protection-policy" className={link}>
              Data Protection Policy
            </Link>{" "}
            describes these controls in detail, and our{" "}
            <Link href="/subprocessors" className={link}>
              subprocessor list
            </Link>{" "}
            names every third party that processes customer data. For security questionnaires,
            email{" "}
            <a href={securityMail} className={link}>
              {legalContacts.security}
            </a>
            .
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">How Rose handles source code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            The managed Rose GitHub App runs entirely on OllyGarden-managed infrastructure. Each
            execution makes a full clone at the exact commit being analyzed inside a dedicated E2B
            micro-VM. The checkout and build artifacts are destroyed with the sandbox. The sandbox
            receives credential placeholders; an egress proxy attaches short-lived credentials
            only for approved services. It has general outbound internet access so repository build
            and test scripts can install dependencies and read public documentation.
          </p>
          <p>
            Rose sends the file contents, search results, and command output selected during an
            analysis through OpenRouter to OpenAI and Anthropic models. These providers do not use
            inputs or outputs to train their models by default, but standard API retention may apply
            for up to 30 days. Zero-data-retention routing and EU-only processing are separate
            Enterprise add-ons available on request. The EU-only configuration covers AI
            processing, managed sandboxes, storage, and telemetry.
          </p>
          <p>
            Rose records operational telemetry through our collector in Grafana Cloud and Datadog
            EU. It can include secret-redacted model and tool inputs and outputs, truncated to 4 KB
            per item. It can therefore contain code excerpts. Telemetry collection can be disabled
            on request. We do not use customer code or data to train models on any plan. See our{" "}
            <Link href="/privacy-policy" className={link}>
              Privacy Policy
            </Link>{" "}
            for retention details and our{" "}
            <Link href="/subprocessors" className={link}>
              subprocessor list
            </Link>{" "}
            for provider locations.
          </p>
          <p>
            The Rose CLI runs in the customer&apos;s own automation environment. It is stateless, does
            not persist findings or repository data on OllyGarden&apos;s side, and emits OpenTelemetry
            only when the customer explicitly configures it.
          </p>
        </CardContent>
      </Card>

      <Card id="vulnerability-disclosure" className="bg-card border-border scroll-mt-24">
        <CardHeader>
          <CardTitle className="text-xl">Reporting a vulnerability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            If you believe you have found a security vulnerability in ollygarden.com,
            ollygarden.app, our APIs, or our open source projects, email{" "}
            <a href={securityMail} className={link}>
              {legalContacts.security}
            </a>
            . Include the affected URL or component, the steps to reproduce the issue, and its
            impact as you understand it.
          </p>
          <p>When you report in good faith, we will:</p>
          <ul className="space-y-2">
            <li>• Acknowledge your report within 3 business days</li>
            <li>• Keep you informed while we investigate and fix the issue</li>
            <li>• Credit you once the issue is fixed, if you wish</li>
            <li>• Not pursue legal action for research that follows this policy</li>
          </ul>
          <p>Please:</p>
          <ul className="space-y-2">
            <li>• Only access data that you own, or the minimum needed to show the issue</li>
            <li>• Give us reasonable time to fix the issue before disclosing it publicly</li>
            <li>
              • Not run denial-of-service tests, social engineering, spam, or physical attacks
            </li>
            <li>• Not degrade the service for other customers</li>
          </ul>
          <p>We do not currently run a paid bug bounty program.</p>
        </CardContent>
      </Card>
    </LegalPage>
  );
};

export default Security;
