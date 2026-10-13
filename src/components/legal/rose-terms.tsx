/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FileText,
  LegalPage,
  legalLinkClass,
} from "@/components/legal/legal-page";
import { lastUpdated } from "@/lib/legal";

const RoseTerms = () => {
  return (
    <LegalPage
      title="Rose Terms of Service"
      icon={<FileText />}
      updated={lastUpdated("/rose-terms-of-service")}
    >
        <Card className="bg-card border-border">
          <CardContent className="pt-6 space-y-4 text-muted-foreground">
            <p>
              These Terms of Service ("Agreement") govern your access to and use
              of Rose, an AI-Agent ("Service") provided by OllyGarden, Inc.
              ("OllyGarden," "we," "our," or "us"). By accessing or using the
              Service, you ("Customer," "you," or "your") agree to be bound by
              this Agreement.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">1. Service Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1.1 Rose Functionality
              </h3>
              <p className="mb-3">
                Rose is an AI-Agent that analyzes OpenTelemetry® instrumentation
                in source code and provides automated suggestions in pull
                requests and dashboards. Rose is able to automatically apply and
                fix detected suggestions. The Service operates by:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Analyzing code in designated repositories</li>
                <li>Creating branches for suggested modifications</li>
                <li>
                  Opening pull requests containing code review suggestions
                </li>
                <li>Adding comments to existing pull requests</li>
                <li>
                  Creating issues for tracking insights and recommendations
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1.2 Scope of Repository Access
              </h3>
              <p className="mb-3">The Service is authorized solely to:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Create branches in designated repositories</li>
                <li>
                  Open pull requests containing suggested code modifications
                </li>
                <li>Add comments to existing pull requests</li>
                <li>Create issues for tracking insights</li>
                <li>
                  Read repository metadata and content necessary for code
                  analysis
                </li>
              </ul>
              <p className="mb-3 font-semibold text-foreground">
                The Service SHALL NOT:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Directly commit to protected branches</li>
                <li>
                  Merge pull requests without explicit human authorization
                </li>
                <li>Delete branches, files, or repositories</li>
                <li>Modify repository settings or access controls</li>
                <li>
                  Access repositories beyond those explicitly authorized by
                  Customer
                </li>
                <li>
                  Access secrets, environment variables, or credentials stored
                  in repositories
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1.3 Required Permissions
              </h3>
              <p className="mb-3">
                The Service requires the following GitHub/GitLab permissions:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  <strong>Read</strong> access to actions, checks, discussions,
                  members, and metadata
                </li>
                <li>
                  <strong>Read</strong> and <strong>write</strong> access to
                  code, commit statuses, issues, and pull requests
                </li>
              </ul>
              <p>
                <strong>Permissions NOT Requested:</strong> Repository deletion,
                settings modification, collaborator management, access to
                secrets or environment variables, workflow modification.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1.4 Human Review Requirement
              </h3>
              <p className="mb-3 font-semibold text-foreground">
                All code modifications generated by the Service require human
                review and approval before integration.
              </p>
              <p className="mb-3">Customer acknowledges and agrees that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  The Service cannot and will not merge code without human
                  intervention
                </li>
                <li>
                  Customer maintains sole responsibility for reviewing, testing,
                  and approving all suggested changes
                </li>
                <li>
                  Customer's designated personnel must affirmatively approve and
                  merge all pull requests created by the Service
                </li>
                <li>
                  If Customer enables automated merge functionality in their
                  repository settings, Customer accepts full responsibility for
                  any code merged through such automation
                </li>
                <li>
                  OllyGarden bears no responsibility for code changes merged
                  without adequate human review
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              2. Account Registration and Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                2.1 Account Creation
              </h3>
              <p className="mb-3">To use the Service, you must:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>
                  Promptly notify OllyGarden of any unauthorized use of your
                  account
                </li>
                <li>
                  Be at least 18 years old or the age of majority in your
                  jurisdiction
                </li>
                <li>
                  Have the authority to bind your organization to this Agreement
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                2.2 Account Responsibility
              </h3>
              <p>
                You are responsible for all activity occurring under your
                account, including actions taken by authorized users,
                contractors, or agents accessing the Service through your
                account.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                2.3 Repository Authorization
              </h3>
              <p>
                You represent and warrant that you have the legal right and
                authority to authorize the Service to access, analyze, and
                create branches and pull requests in all repositories you
                designate for use with the Service.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              3. Intellectual Property Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3.1 Customer Code Ownership
              </h3>
              <p>
                Customer retains all ownership of and responsibility for
                Customer's source code, repositories, and all content provided
                to the Service ("Customer Code").
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3.2 AI Output Ownership
              </h3>
              <p className="mb-3">
                OllyGarden assigns to Customer all right, title, and interest
                (if any) in AI-generated suggestions, code fixes, review
                comments, and related outputs created by the Service and
                incorporated into Customer's repositories ("AI Output").
              </p>
              <p className="mb-3">Customer acknowledges and agrees that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Similar Outputs:</strong> Due to the nature of machine
                  learning and AI technology, the Service may generate similar
                  or identical AI Output for different customers providing
                  similar code or requesting similar analyses. This ownership
                  assignment does not apply to AI Output generated for other
                  customers.
                </li>
                <li>
                  <strong>Copyright Eligibility:</strong> AI Output may not be
                  eligible for copyright protection under applicable law,
                  depending on the level of human creativity involved in its
                  creation and the jurisdiction's copyright standards.
                </li>
                <li>
                  <strong>Open Source Licensing:</strong> AI Output may be
                  similar to, derived from, or contain elements of publicly
                  available open-source code. Customer is responsible for
                  ensuring compliance with applicable open-source licenses.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3.3 OllyGarden IP
              </h3>
              <p className="mb-3">
                OllyGarden retains all rights, title, and interest in and to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  The Service, including all software, algorithms, machine
                  learning models, and documentation
                </li>
                <li>
                  OllyGarden's trademarks, service marks, logos, and brand
                  features
                </li>
                <li>
                  Aggregated, anonymized data derived from Customer's use of the
                  Service that does not identify Customer or Customer Code
                </li>
                <li>
                  All improvements, modifications, and derivative works of the
                  above
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3.4 Feedback
              </h3>
              <p>
                If you provide OllyGarden with any suggestions, comments, or
                other feedback regarding the Service ("Feedback"), OllyGarden
                may use such Feedback without restriction or obligation to you.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              4. AI Technology Limitations and Disclaimers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                4.1 AI Technology Acknowledgment
              </h3>
              <p className="mb-3 font-semibold text-foreground uppercase">
                The Service uses artificial intelligence and machine learning
                that generates probabilistic outputs based on patterns in
                training data.
              </p>
              <p className="mb-3">Customer acknowledges and agrees that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Errors and Defects:</strong> AI-generated code
                  suggestions, analysis results, and recommendations may contain
                  errors, bugs, security vulnerabilities, performance issues, or
                  other defects.
                </li>
                <li>
                  <strong>False Positives and False Negatives:</strong> Analysis
                  results may incorrectly identify issues that do not exist
                  (false positives) or fail to identify issues that do exist
                  (false negatives).
                </li>
                <li>
                  <strong>Best Practices:</strong> Suggestions may not reflect
                  current industry best practices, security standards, or the
                  specific requirements of Customer's environment.
                </li>
                <li>
                  <strong>Variability:</strong> Outputs may vary over time due
                  to model updates, improvements, or changes in underlying AI
                  technology.
                </li>
                <li>
                  <strong>Human Review Essential:</strong> Human review,
                  testing, and validation are essential before deploying any
                  AI-generated code or implementing any AI-generated
                  recommendations in production environments.
                </li>
                <li>
                  <strong>Experimental Nature:</strong> AI technology is rapidly
                  evolving and may produce unexpected, incomplete, or incorrect
                  outputs.
                </li>
                <li>
                  <strong>No Security Guarantee:</strong> The Service does not
                  guarantee detection of all security vulnerabilities, and
                  AI-generated code may introduce new vulnerabilities.
                </li>
                <li>
                  <strong>Safety-Critical Systems:</strong> The Service is not
                  designed for or suitable for use in safety-critical systems
                  without extensive additional human oversight, testing, and
                  validation.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                4.2 No Warranty
              </h3>
              <p className="mb-3 font-semibold text-foreground uppercase">
                The Service and all AI Output are provided "as is" and "as
                available" without warranties of any kind, whether express,
                implied, statutory, or otherwise.
              </p>
              <p className="mb-3">
                OllyGarden specifically disclaims all warranties, including but
                not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Merchantability:</strong> Warranties that the Service
                  is merchantable or suitable for any particular purpose
                </li>
                <li>
                  <strong>Fitness for Purpose:</strong> Warranties that the
                  Service will meet Customer's specific requirements
                </li>
                <li>
                  <strong>Non-Infringement:</strong> Warranties that AI Output
                  will not infringe third-party intellectual property rights
                  (subject to indemnification provisions in Section 9)
                </li>
                <li>
                  <strong>Accuracy:</strong> Warranties regarding the accuracy,
                  completeness, or reliability of analysis results or
                  suggestions
                </li>
                <li>
                  <strong>Security:</strong> Warranties that suggestions will be
                  free from security vulnerabilities or defects
                </li>
                <li>
                  <strong>Uninterrupted Service:</strong> Warranties that the
                  Service will be uninterrupted, timely, secure, or error-free
                </li>
                <li>
                  <strong>Data Accuracy:</strong> Warranties regarding the
                  accuracy or reliability of information obtained through the
                  Service
                </li>
              </ul>
              <p className="mt-3">
                Customer's use of AI Output is at Customer's sole risk and
                discretion.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              5. Customer Responsibilities and Acceptable Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                5.1 Customer Obligations
              </h3>
              <p className="mb-3">Customer shall:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Use the Service in compliance with all applicable laws and
                  regulations
                </li>
                <li>
                  Implement reasonable security measures for account access
                </li>
                <li>
                  Review and test all AI-generated code before production
                  deployment
                </li>
                <li>
                  Ensure all individuals accessing the Service through
                  Customer's account comply with this Agreement
                </li>
                <li>
                  Maintain current contact information for legal and security
                  notices
                </li>
                <li>
                  Promptly notify OllyGarden of any suspected security incidents
                  or unauthorized access
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                5.2 Acceptable Use Policy
              </h3>
              <p className="mb-3">Customer shall not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Illegal Activity:</strong> Use the Service for any
                  unlawful purpose or in violation of any applicable laws or
                  regulations
                </li>
                <li>
                  <strong>Unauthorized Access:</strong> Access or attempt to
                  access repositories, systems, or data Customer is not
                  authorized to access
                </li>
                <li>
                  <strong>Malicious Code:</strong> Intentionally use the Service
                  to generate, analyze, or distribute malware, ransomware,
                  viruses, or other malicious code intended to cause harm
                </li>
                <li>
                  <strong>Fraud and Deception:</strong> Use the Service for
                  impersonation, phishing, fraud, or other deceptive practices
                </li>
                <li>
                  <strong>Service Integrity:</strong> Interfere with or disrupt
                  the integrity or performance of the Service
                </li>
                <li>
                  <strong>Reverse Engineering:</strong> Reverse engineer,
                  decompile, disassemble, or otherwise attempt to discover the
                  source code or underlying algorithms of the Service (except to
                  the extent expressly permitted by applicable law)
                </li>
                <li>
                  <strong>Competitive Use:</strong> Use the Service to build,
                  train, or improve a competitive product or service
                </li>
                <li>
                  <strong>Excessive Use:</strong> Use the Service in a manner
                  that imposes an unreasonable or disproportionately large load
                  on OllyGarden's infrastructure
                </li>
                <li>
                  <strong>AI Manipulation:</strong> Attempt to manipulate the
                  Service to generate content that violates this Agreement or
                  applicable law, including through prompt injection or
                  adversarial inputs
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                5.3 Enforcement
              </h3>
              <p>
                OllyGarden reserves the right to investigate and take
                appropriate action against violations of this Agreement,
                including suspending or terminating access to the Service,
                removing content, and reporting violations to law enforcement
                authorities.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              6. Data Protection and Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.1 Source Code Confidentiality
              </h3>
              <p className="mb-3">
                Customer Code and repository contents constitute Customer's
                Confidential Information. OllyGarden shall:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use Customer Code solely to provide the Service</li>
                <li>
                  Not disclose Customer Code to third parties except as
                  necessary for Service delivery or as required by law
                </li>
                <li>
                  Implement industry-standard administrative, physical, and
                  technical security measures to protect Customer Code
                </li>
                <li>
                  Limit access to Customer Code to personnel with a legitimate
                  need to access it for Service delivery
                </li>
                <li>
                  Ensure personnel with access to Customer Code are bound by
                  confidentiality obligations
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.2 Data Processing and Retention
              </h3>
              <div className="space-y-3">
                <p>
                  <strong>Ephemeral Processing:</strong> Full Customer Code
                  files are processed ephemerally during analysis. Complete
                  source files are not retained on OllyGarden servers after
                  completion of the analysis session.
                </p>
                <p>
                  <strong>Code Snippets and Learning Retention:</strong>{" "}
                  OllyGarden may retain limited information for Service
                  functionality and improvement, including extracted code
                  snippets relevant to OpenTelemetry analysis, Rose learning
                  data and insights, repository identifiers and structure
                  information, analysis timestamps and session logs, aggregated
                  usage statistics, error logs and diagnostic information.
                </p>
                <p>
                  <strong>No Complete Source File Storage:</strong> OllyGarden
                  does not maintain databases or archives of complete Customer
                  Code files. Only extracted snippets and derived insights are
                  retained.
                </p>
                <p>
                  <strong>Temporary Caching:</strong> Customer Code may be
                  temporarily cached in memory during processing and is deleted
                  upon completion of analysis.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.3 AI Model Training
              </h3>
              <p className="mb-3 font-semibold text-foreground">
                OllyGarden shall not use Customer Code to train, develop, or
                improve general-purpose AI models.
              </p>
              <p className="mb-3">This prohibition includes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Using Customer Code as training data for machine learning
                  models
                </li>
                <li>
                  Fine-tuning publicly available models using Customer Code
                </li>
                <li>
                  Sharing Customer Code with third parties for model training
                  purposes
                </li>
              </ul>
              <p className="mt-3">
                <strong>Exception:</strong> Customer-specific fine-tuning or
                personalization, if explicitly requested by Customer in writing,
                shall not breach this obligation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.4 Third-Party AI Providers
              </h3>
              <p className="mb-3">
                The Service uses third-party AI providers for code analysis.
                By default, these providers do not use Customer Code to train
                their models, but their standard API retention may apply for up
                to 30 days, depending on the provider and API feature. Explicit
                zero-data-retention routing and EU-only processing are separate
                Enterprise add-ons available on request and may incur additional
                charges. The agreed EU-only configuration covers the entire Rose
                service, including AI processing, managed sandboxes, storage,
                and telemetry.
              </p>
              <p>
                <strong>Current Third-Party AI Providers:</strong> OpenRouter,
                which routes requests to OpenAI and Anthropic providers.
                OllyGarden may add AI providers or open-weight model deployments
                only if they meet the same security and privacy standards,
                preserve agreed training, retention, and data-residency
                obligations, and satisfy applicable subprocessor requirements.
                The current list of subprocessors, with their locations, is
                published on our{" "}
                <Link href="/subprocessors" className={legalLinkClass}>
                  subprocessors page
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.5 Data Security Measures
              </h3>
              <p className="mb-3">OllyGarden implements and maintains:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  AES-256 encryption for data at rest; TLS 1.3 (or TLS 1.2
                  minimum) for data in transit
                </li>
                <li>
                  Role-based access controls limiting personnel access to
                  Customer repositories
                </li>
                <li>
                  Multi-factor authentication for administrative access to
                  production systems
                </li>
                <li>
                  Security monitoring and logging of system access and
                  activities
                </li>
                <li>
                  Regular security assessments, penetration testing, and
                  vulnerability scanning
                </li>
                <li>
                  Documented incident response procedures and security incident
                  management
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.6 Security Incident Notification
              </h3>
              <p>
                In the event of a security incident affecting Customer Code or
                Customer's account, OllyGarden shall notify Customer within
                seventy-two (72) hours of discovery, including the nature and
                scope of the incident, categories of data potentially affected,
                measures taken to contain and remediate the incident, and
                recommended actions for Customer.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.7 Data Deletion
              </h3>
              <p>
                Upon termination of this Agreement or upon Customer's written
                request, OllyGarden shall cease accessing Customer's
                repositories and delete or anonymize Customer metadata within
                thirty (30) days. OllyGarden may retain information as required
                by law or as necessary for legitimate business purposes (e.g.,
                billing records, audit logs for security investigations).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.8 Data Protection Addendum
              </h3>
              <p>
                For Customers subject to the EU General Data Protection
                Regulation (GDPR), UK GDPR, or similar data protection laws, the
                Data Processing Addendum is available upon request.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.9 International Data Transfers
              </h3>
              <p>
                Subject to agreed data-residency requirements, including any
                EU-only configuration, Customer data may be processed in the
                United States and other jurisdictions where OllyGarden or its
                subprocessors operate. For transfers from the EEA, United
                Kingdom, or Switzerland, OllyGarden relies on the EU-U.S. Data
                Privacy Framework, Standard Contractual Clauses approved by the
                European Commission, and other lawful transfer mechanisms as
                detailed in the Data Processing Addendum.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6.10 Privacy Policy
              </h3>
              <p>
                OllyGarden's collection and use of personal information is
                described in our{" "}
                <a
                  href="/privacy-policy"
                  className="text-olly-green hover:underline"
                >
                  Privacy Policy
                </a>
                . The Privacy Policy is incorporated into this Agreement by
                reference.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">7. Fees and Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                7.1 Subscription Fees
              </h3>
              <p className="mb-3">
                Customer shall pay the subscription fees specified in the
                applicable order form or pricing page ("Fees"). Fees are based
                on:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Number of repositories</li>
                <li>Number of pull requests analyzed</li>
                <li>Usage tier or plan selected</li>
                <li>Additional features or services purchased</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                7.2 Payment Terms
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Fees are due in advance on a monthly or annual basis as
                  specified
                </li>
                <li>
                  Payment must be made via credit card or other payment method
                  accepted by OllyGarden
                </li>
                <li>
                  All Fees are non-refundable except as expressly provided in
                  this Agreement
                </li>
                <li>
                  OllyGarden may suspend access for non-payment after providing
                  ten (10) days' written notice
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                7.3 Taxes
              </h3>
              <p>
                Fees do not include any taxes, levies, duties, or similar
                governmental assessments ("Taxes"). Customer is responsible for
                all Taxes except those based on OllyGarden's net income.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                7.4 Fee Changes
              </h3>
              <p>
                OllyGarden may change Fees upon thirty (30) days' written
                notice. Fee changes apply to subsequent subscription renewal
                periods. If you object to a Fee increase, you may terminate this
                Agreement before the renewal date.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                7.5 Free Trials
              </h3>
              <p>
                OllyGarden may offer free trials or promotional periods. During
                such periods, the Service is provided "AS IS" with no warranties
                or support commitments. OllyGarden may terminate free trials at
                any time.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              8. Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                8.1 General Liability Cap
              </h3>
              <p className="mb-3 font-semibold text-foreground uppercase text-sm">
                Except for excluded claims, neither party's total aggregate
                liability arising out of or related to this Agreement shall
                exceed the amounts paid by Customer to OllyGarden in the twelve
                (12) months preceding the event giving rise to the claim.
              </p>
              <p>
                For Customers on free plans or trials where no fees have been
                paid, the liability cap is one hundred dollars ($100.00).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                8.2 Excluded Claims
              </h3>
              <p className="mb-3">
                The following are excluded from the general liability cap:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Indemnification obligations under Section 9</li>
                <li>
                  Either party's gross negligence, willful misconduct, or
                  intentional breach
                </li>
                <li>
                  OllyGarden's breach of confidentiality or data security
                  obligations under Section 6, capped at three times (3x) the
                  amounts paid in the preceding twelve months
                </li>
                <li>
                  OllyGarden's infringement of Customer's intellectual property
                  rights
                </li>
                <li>
                  Claims for death or bodily injury caused by either party's
                  negligence
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                8.3 Consequential Damages Exclusion
              </h3>
              <p className="mb-3 font-semibold text-foreground uppercase text-sm">
                In no event shall either party be liable for any special,
                incidental, consequential, exemplary, punitive, or indirect
                damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>
                  Loss of data or cost of procurement of substitute goods or
                  services
                </li>
                <li>Loss of goodwill or reputation</li>
                <li>Business interruption</li>
                <li>False positive or false negative code analysis results</li>
                <li>
                  Bugs, vulnerabilities, or defects in AI-generated code
                  suggestions
                </li>
                <li>
                  Damage or loss arising from Customer's deployment of AI Output
                  without adequate testing or human review
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                8.4 Liability Acknowledgments
              </h3>
              <p className="mb-3 font-semibold text-foreground">
                Customer specifically acknowledges and agrees that OllyGarden
                shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Code changes Customer chooses to merge without adequate review
                  or testing
                </li>
                <li>
                  Security vulnerabilities in AI-generated code suggestions
                </li>
                <li>False positives or false negatives in code analysis</li>
                <li>
                  Compatibility issues or performance degradation from
                  implementing AI-generated suggestions
                </li>
                <li>
                  Damages resulting from Customer's failure to implement
                  recommended security measures
                </li>
                <li>
                  Actions or omissions of third-party AI providers, repository
                  hosting platforms, or other third-party services
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                8.5 Essential Purpose
              </h3>
              <p>
                Customer acknowledges that the limitations of liability in this
                Section 8 are an essential element of the basis of the bargain
                between the parties and reflect a reasonable allocation of risk.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">9. Indemnification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                9.1 OllyGarden Indemnification
              </h3>
              <p className="mb-3">
                OllyGarden shall defend Customer against any third-party claim
                alleging that the Service, as provided and used in accordance
                with this Agreement, infringes or misappropriates such third
                party's intellectual property rights ("IP Claim"), and shall
                indemnify Customer for any damages finally awarded or agreed to
                in a settlement approved by OllyGarden.
              </p>
              <p className="mb-3">
                OllyGarden's indemnification obligation is conditioned on
                Customer providing prompt written notice, reasonable
                cooperation, and granting OllyGarden sole control of the defense
                and settlement.
              </p>
              <p>
                OllyGarden has no indemnification obligation for IP Claims
                arising from Customer's modification of AI Output, combination
                with third-party software not provided by OllyGarden, use in
                violation of this Agreement, or use after OllyGarden notified
                Customer to discontinue use.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                9.2 Customer Indemnification
              </h3>
              <p>
                Customer shall defend OllyGarden against any third-party claim
                arising from Customer's use of the Service in violation of this
                Agreement or applicable law, Customer's modification of AI
                Output, Customer Data, Customer's failure to comply with export
                control or sanctions laws, and claims by Customer's users
                related to their use of the Service through Customer's account.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                9.3 Indemnification Cap
              </h3>
              <p>
                OllyGarden's total liability under Section 9.1 for all IP Claims
                shall be capped at three times (3x) the amounts paid by Customer
                to OllyGarden in the twelve (12) months preceding the first IP
                Claim.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                9.4 Exclusive Remedy
              </h3>
              <p>
                This Section 9 states the parties' sole and exclusive remedy and
                liability for intellectual property infringement claims.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">10. Term and Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                10.1 Agreement Term
              </h3>
              <p>
                This Agreement begins on the Effective Date and continues until
                terminated in accordance with this Section 10.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                10.2 Subscription Term
              </h3>
              <p>
                Subscriptions are for the initial term specified in the order
                form and automatically renew for successive periods of the same
                duration unless either party provides written notice of
                non-renewal at least thirty (30) days before the end of the
                then-current term.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                10.3 Termination for Convenience
              </h3>
              <p className="mb-3">Either party may terminate this Agreement:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>By Customer:</strong> At any time by discontinuing use
                  of the Service and providing written notice. Termination is
                  effective at the end of the then-current paid subscription
                  term. No refunds will be provided for early termination.
                </li>
                <li>
                  <strong>By OllyGarden:</strong> With thirty (30) days' written
                  notice. OllyGarden will provide a pro-rata refund for prepaid
                  Fees covering the period after termination.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                10.4 Termination for Breach
              </h3>
              <p className="mb-3">
                Either party may terminate this Agreement immediately upon
                written notice if the other party materially breaches this
                Agreement and fails to cure within thirty (30) days of written
                notice (or ten (10) days for payment breaches).
              </p>
              <p>
                OllyGarden may suspend access to the Service immediately if
                Customer violates the Acceptable Use policy, poses a security
                risk, uses the Service in a manner that could subject OllyGarden
                to liability, or fails to pay Fees when due.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                10.5 Effect of Termination
              </h3>
              <p className="mb-3">
                Upon termination or expiration: Customer's access will be
                terminated, OllyGarden will cease accessing Customer's
                repositories, and Customer shall pay any outstanding Fees.
              </p>
              <p>
                Sections 3, 4, 6.7, 8, 9, 10.5, and 11 shall survive
                termination.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                10.6 No Refunds
              </h3>
              <p>
                Except as expressly provided in this Agreement, all Fees are
                non-refundable. No refunds will be provided for partial months
                or years of service, features or capacity not utilized,
                termination by Customer before the end of the subscription term,
                or termination by OllyGarden for Customer's breach.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">11. General Provisions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                11.1 Governing Law and Jurisdiction
              </h3>
              <p>
                This Agreement shall be governed by the laws of the State of
                Delaware, United States of America, without regard to its
                conflicts of law principles.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                11.2 Dispute Resolution
              </h3>
              <p className="mb-3">
                Before initiating formal proceedings, the parties shall attempt
                to resolve disputes through good-faith negotiation for at least
                thirty (30) days. Any dispute shall be finally resolved by
                binding arbitration administered by the American Arbitration
                Association ("AAA") under its Commercial Arbitration Rules,
                conducted by a single arbitrator in Wilmington, Delaware (or
                remotely by mutual agreement).
              </p>
              <p className="font-semibold text-foreground uppercase text-sm">
                Class Action Waiver: To the maximum extent permitted by law,
                each party agrees that any arbitration or legal proceeding shall
                be conducted only on an individual basis and not as a class,
                consolidated, or representative action.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                11.3 Export Compliance
              </h3>
              <p>
                Customer represents and warrants that Customer is not located in
                any country subject to a U.S. Government embargo, is not listed
                on any U.S. Government list of prohibited parties, and will
                comply with all applicable export control, sanctions, and
                anti-boycott laws and regulations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                11.4 Entire Agreement
              </h3>
              <p>
                This Agreement, together with any order forms, Data Processing
                Addendum, and Privacy Policy, constitutes the entire agreement
                between the parties and supersedes all prior or contemporaneous
                agreements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                11.5 Amendments
              </h3>
              <p>
                OllyGarden may modify this Agreement from time to time by
                posting an updated version and/or sending notice. Continued use
                of the Service after the effective date constitutes acceptance.
                Material adverse changes will be communicated with at least
                thirty (30) days' advance notice.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                11.6 Assignment
              </h3>
              <p>
                Customer may not assign this Agreement without OllyGarden's
                prior written consent. OllyGarden may assign this Agreement
                without consent in connection with a merger, acquisition, or
                sale of all or substantially all of its assets.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                11.7 Notices
              </h3>
              <p>
                All notices must be in writing and delivered via email to the
                address on file (for Customer) or{" "}
                <a
                  href="mailto:legal@ollygarden.com"
                  className="text-olly-green hover:underline"
                >
                  legal@ollygarden.com
                </a>{" "}
                (for OllyGarden), certified mail, or nationally recognized
                overnight courier. Notices are effective upon receipt or, if by
                email, 24 hours after sending.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-2">
              <p>
                <strong>OllyGarden, Inc.</strong>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:legal@ollygarden.com"
                  className="text-olly-green hover:underline"
                >
                  legal@ollygarden.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://ollygarden.com"
                  className="text-olly-green hover:underline"
                >
                  ollygarden.com
                </a>
              </p>
            </div>
            <div className="space-y-2">
              <p>For security incidents or data privacy inquiries:</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:security@ollygarden.com"
                  className="text-olly-green hover:underline"
                >
                  security@ollygarden.com
                </a>
              </p>
            </div>
            <p className="mt-4 font-semibold text-foreground">
              By using the Service, you acknowledge that you have read,
              understood, and agree to be bound by this Agreement.
            </p>
          </CardContent>
        </Card>
    </LegalPage>
  );
};

export default RoseTerms;
