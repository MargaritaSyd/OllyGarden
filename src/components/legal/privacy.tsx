import { Fragment } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Database,
  Eye,
  LegalPage,
  legalLinkClass,
  Lock,
  Mail,
  Shield,
} from "@/components/legal/legal-page";
import {
  lastUpdated,
  legalContacts,
  legalEntities,
  supervisoryAuthority,
  websiteProcessors,
} from "@/lib/legal";

const link = legalLinkClass;

type Activity = {
  title: string;
  data: string;
  purpose: string;
  basis: string;
  retention: string;
};

const activityFields = [
  ["Data", "data"],
  ["Purpose", "purpose"],
  ["Legal basis", "basis"],
  ["Retention", "retention"],
] as const;

const websiteActivities: Activity[] = [
  {
    title: "Visiting the website",
    data: "IP address, browser and device details, requested URL, referrer, and time of the request.",
    purpose: "Delivering the website, keeping it secure, and diagnosing errors.",
    basis: "Our legitimate interest in operating a secure website (Art. 6(1)(f) GDPR).",
    retention: "Hosting logs are kept for the short period our hosting provider retains them.",
  },
  {
    title: "Website analytics (only with your consent)",
    data: "Pages viewed, clicks on links and buttons, time on page, scroll depth, performance measurements, browser and device type, approximate location derived from your IP address, and the referring site and campaign parameters. We remove URL query strings and fragments, mask page text, and do not record sessions.",
    purpose: "Understanding how the website is used so we can improve it.",
    basis: "Your consent (Art. 6(1)(a) GDPR).",
    retention: "Until you withdraw consent, and no longer than needed for trend analysis.",
  },
  {
    title: "Identifying visiting companies (only with your consent)",
    data: "Your IP address, the pages you visit, the referring site, campaign parameters, and an anonymous identifier stored in your browser. Our provider matches the IP address to the organization that owns the network. We do not use this to identify you as an individual.",
    purpose: "Understanding which organizations are interested in OllyGarden, so our sales team can prioritize follow-up.",
    basis: "Your consent (Art. 6(1)(a) GDPR).",
    retention: "Until you withdraw consent, or until the organization-level record is no longer relevant to sales.",
  },
  {
    title: "Contact, product inquiry, and open source application forms",
    data: "Name, email address, and, depending on the form, company, message, support tier, or GitHub repository URL.",
    purpose: "Responding to your request and evaluating your inquiry or application.",
    basis: "Steps you ask us to take before entering a contract (Art. 6(1)(b) GDPR) and our legitimate interest in answering inquiries (Art. 6(1)(f) GDPR).",
    retention: "As long as needed to handle your request and any resulting business relationship.",
  },
  {
    title: "Job applications",
    data: "Full name, email address, and optional LinkedIn and GitHub profile URLs, plus anything you share with us during the hiring process.",
    purpose: "Assessing your application and running our hiring process.",
    basis: "Steps prior to entering an employment contract (Art. 6(1)(b) GDPR, § 26 BDSG).",
    retention: "Until the position is filled and the period for legal claims has passed, unless you agree to a longer period.",
  },
];

const serviceActivities: Activity[] = [
  {
    title: "Your account",
    data: "Name, email address, authentication identifiers, organization memberships, and sign-in timestamps.",
    purpose: "Creating and securing your account and giving you access to the OllyGarden platform.",
    basis: "Performance of our contract with you or your organization (Art. 6(1)(b) GDPR).",
    retention: "For as long as the account exists. Upon deletion, within 30 days, except where the law requires us to keep records.",
  },
  {
    title: "Product analytics, session recordings, and error monitoring (only with your consent)",
    data: "A pseudonymous user identifier, account creation and last sign-in times, pages viewed in the app, errors, and performance measurements. We also record sessions: replays of your interactions with the app, such as clicks, scrolling, and page layout. All text on screen and in form fields is masked in your browser before recordings are sent, so recordings do not contain what you read or type. We remove URL query strings before analytics events are sent.",
    purpose: "Keeping the platform reliable, reproducing and fixing errors, and improving features.",
    basis: "Your consent (Art. 6(1)(a) GDPR).",
    retention: "Session recordings are deleted after 90 days. Other analytics data is kept no longer than needed for trend analysis and troubleshooting.",
  },
  {
    title: "Rose managed repository analysis",
    data: "Repository source code and metadata; file contents, searches, and command output selected during analysis; findings, suggested fixes, execution records, and Rose pull request comments. Operational telemetry can include secret-redacted model and tool inputs and outputs, truncated to 4 KB per item, and therefore code excerpts.",
    purpose: "Analyzing OpenTelemetry instrumentation, presenting findings, preparing proposed fixes for human review, securing and operating Rose, and monitoring quality and reliability.",
    basis: "Performance of our contract with you or your organization (Art. 6(1)(b) GDPR) and our legitimate interest in operating a secure and reliable service (Art. 6(1)(f) GDPR).",
    retention: "Full repository checkouts and build artifacts are destroyed with each sandbox. Findings, metadata, execution and follow-up records are kept for the lifetime of the account or until deletion is requested. Rose operational telemetry in Grafana Cloud and Datadog is retained indefinitely and is not removed by deletion requests; telemetry collection can be disabled on request. AI providers may retain prompts and responses for up to 30 days by default. Zero-data-retention routing is available as a separate Enterprise add-on.",
  },
  {
    title: "Billing",
    data: "Billing contact, company details, and payment information. Our payment provider processes card details; we do not store them.",
    purpose: "Charging for paid plans and meeting accounting obligations.",
    basis: "Performance of a contract (Art. 6(1)(b) GDPR) and legal obligations (Art. 6(1)(c) GDPR).",
    retention: "As required by tax and commercial law.",
  },
  {
    title: "Business contacts and sales outreach",
    data: "Name, business email address, job title, employer, and professional profile information from business databases or from your interactions with us.",
    purpose: "Reaching out to organizations that may benefit from OllyGarden and managing our customer relationships.",
    basis: "Our legitimate interest in business-to-business marketing (Art. 6(1)(f) GDPR). You can object at any time and we will stop.",
    retention: "Until you object, or until the contact is no longer relevant to our business.",
  },
];

function ActivityList({ activities }: { activities: Activity[] }) {
  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.title}>
          <h3 className="text-lg font-semibold text-foreground">{activity.title}</h3>
          <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-[9rem_1fr]">
            {activityFields.map(([label, field]) => (
              <Fragment key={field}>
                <dt className="font-medium text-foreground">{label}</dt>
                <dd>{activity[field]}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

const Privacy = () => {
  return (
    <LegalPage
      title="Privacy Policy"
      icon={<Shield />}
      updated={`${legalEntities.inc.name} | ${lastUpdated("/privacy-policy")}`}
    >
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Who we are</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            OllyGarden, Inc. (&ldquo;OllyGarden&rdquo;, &ldquo;we&rdquo;) is the controller of the
            personal data described in this policy. It covers our website at ollygarden.com, the
            OllyGarden platform at ollygarden.app (including Insights and Rose), and our
            sales and support communications.
          </p>
          <p>
            OllyGarden, Inc. is located at {legalEntities.inc.address.join(", ")}. Our establishment
            in the European Union is {legalEntities.gmbh.name},{" "}
            {legalEntities.gmbh.address.join(", ")}, which is also our contact point in the EU. See
            our{" "}
            <Link href="/imprint" className={link}>
              imprint
            </Link>{" "}
            for company details.
          </p>
          <p>
            Questions and requests about your personal data can be sent to{" "}
            <a href={`mailto:${legalContacts.privacy}`} className={link}>
              {legalContacts.privacy}
            </a>
            .
          </p>
          <p>
            When customers send us telemetry, source code, or other content to analyze, we process
            it on their behalf as a processor, under our agreement with that customer and our{" "}
            <a href={`mailto:${legalContacts.privacy}?subject=Data%20Processing%20Addendum`} className={link}>
              Data Processing Addendum
            </a>
            , which is available on request. The customer&apos;s own privacy notice governs that data.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Our website
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <ActivityList activities={websiteActivities} />
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Database className="h-5 w-5" />
            The OllyGarden platform and our business relationships
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <ActivityList activities={serviceActivities} />
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Cookies and similar technologies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Our website stores your cookie choice in your browser for 12 months. This is strictly
            necessary and needs no consent.
          </p>
          <p>
            Analytics and company identification use cookies and browser local storage, and start
            only after you select <strong>Accept analytics</strong>. If you choose essential cookies
            only, neither runs. You can change your choice at any time through{" "}
            <strong>Cookie settings</strong> in the website footer. Withdrawing consent stops
            collection from your next page view and clears the related local storage; it does not
            affect processing that took place before.
          </p>
          <p>
            The OllyGarden platform uses cookies and local storage that are necessary to sign you in
            and keep your session secure. Product analytics and session recordings start only after
            you accept them in the app, and you can change your choice at any time in the app&apos;s
            settings.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Who receives your data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            We share personal data only with service providers that process it on our behalf and
            under our instructions and applicable contractual terms:
          </p>
          <ul className="space-y-2">
            {websiteProcessors.map(([name, role]) => (
              <li key={name}>
                • <span className="text-foreground">{name}</span>: {role}
              </li>
            ))}
          </ul>
          <p>
            The providers that host and operate the OllyGarden platform, including the AI providers
            that Rose uses, are listed with their purpose and location on our{" "}
            <Link href="/subprocessors" className={link}>
              subprocessors page
            </Link>
            .
          </p>
          <p>
            We may also disclose personal data where the law requires it, or to protect our rights.
            We do not sell personal data.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">International transfers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Some of our service providers process data in the United States and other countries
            outside the European Economic Area. By default, the managed Rose service analyzes
            repositories in E2B&apos;s managed United States region and sends selected repository
            content through OpenRouter to provider-managed OpenAI and Anthropic endpoints. An
            agreed EU-only Enterprise configuration covers the entire Rose service, including AI
            processing, managed sandboxes, storage, and telemetry; this is separate from optional
            zero-data-retention model routing. Our Grafana Cloud monitoring runs in the United
            Kingdom. For transfers to the United Kingdom we rely on the European Commission&apos;s
            adequacy decision. For other transfers we rely on the EU-U.S. Data Privacy Framework
            where the provider is certified, and otherwise on the European Commission&apos;s Standard
            Contractual Clauses.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Your rights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Under the GDPR and similar laws, you have the right to:</p>
          <ul className="space-y-2">
            <li>• Access the personal data we hold about you and receive a copy</li>
            <li>• Have inaccurate data corrected</li>
            <li>• Have your data deleted</li>
            <li>• Restrict how we process your data</li>
            <li>• Receive your data in a portable format</li>
            <li>
              • Object to processing based on our legitimate interests, including sales outreach
            </li>
            <li>• Withdraw your consent at any time</li>
            <li>• Lodge a complaint with a data protection supervisory authority</li>
          </ul>
          <p>
            You can complain to the supervisory authority where you live or work. The authority
            responsible for our EU establishment is the {supervisoryAuthority.name} (
            <a href={supervisoryAuthority.url} className={link} lang="de">
              {supervisoryAuthority.localName}
            </a>
            ).
          </p>
          <p>
            To exercise a right, email{" "}
            <a href={`mailto:${legalContacts.privacy}`} className={link}>
              {legalContacts.privacy}
            </a>
            . For deletion, use the subject{" "}
            <a
              href={`mailto:${legalContacts.privacy}?subject=Data%20Deletion%20Request`}
              className={link}
            >
              &ldquo;Data Deletion Request&rdquo;
            </a>
            . We acknowledge requests within 5 business days, verify your identity before acting,
            and complete verified requests within 30 days.
          </p>
          <p>
            We do not make decisions about you based solely on automated processing that produce
            legal or similarly significant effects.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            We protect personal data with encryption in transit and at rest, access controls, and
            monitoring. Our{" "}
            <Link href="/data-protection-policy" className={link}>
              Data Protection Policy
            </Link>{" "}
            describes these controls, and our{" "}
            <Link href="/security" className={link}>
              security page
            </Link>{" "}
            explains how to report a vulnerability to{" "}
            <a href={`mailto:${legalContacts.security}`} className={link}>
              {legalContacts.security}
            </a>
            .
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Children and changes to this policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            OllyGarden is a business service and is not directed at children under 16. We do not
            knowingly collect their personal data.
          </p>
          <p>
            We update this policy when our practices change and show the date of the latest change
            at the top of this page.
          </p>
        </CardContent>
      </Card>
    </LegalPage>
  );
};

export default Privacy;
