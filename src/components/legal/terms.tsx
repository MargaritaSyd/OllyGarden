/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FileText,
  LegalPage,
} from "@/components/legal/legal-page";
import { lastUpdated } from "@/lib/legal";

const Terms = () => {
  return (
    <LegalPage
      title="OllyGarden, Inc. Terms of Service"
      icon={<FileText />}
      updated={lastUpdated("/terms-of-use")}
    >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Agreement Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              If you signed a separate Cover Page to access the Product with the
              same account, and that agreement has not ended, the terms below do
              not apply to you. Instead, your separate Cover Page applies to
              your use of the Product.
            </p>
            <p>
              This Agreement is between OllyGarden, Inc. and the company or
              person accessing or using the Product. This Agreement consists of:
              (1) the Order Form below and (2) the Framework Terms defined
              below.
            </p>
            <p>
              If you are accessing or using the Product on behalf of your
              company, you represent that you are authorized to accept this
              Agreement on behalf of your company. By signing up, accessing, or
              using the Product, Customer indicates its acceptance of this
              Agreement and agrees to be bound by the terms and conditions of
              this Agreement.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Cover Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">
              Order Form
            </h3>
            <p>
              <strong>Framework Terms:</strong> This Order Form incorporates and
              is governed by the Framework Terms that are made up of the Key
              Terms below and the Common Paper Cloud Service Agreement Standard
              Terms Version 2.1 (
              <a
                href="https://commonpaper.com/standards/cloud-service-agreement/2.1/"
                className="text-olly-green hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Common Paper Cloud Service Agreement Standard Terms Version 2.1
              </a>
              ), which are incorporated by reference. Any modifications to the
              Standard Terms made in the Cover Page will control over conflicts
              with the Standard Terms. Capitalized words have the meanings given
              in the Cover Page or the Standard Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-3">
              <div>
                <strong>Cloud Service:</strong> OllyGarden Insights is a B2B
                Software-as-a-Service (SaaS) platform designed to help
                Observability Engineers assess and improve the quality of their
                organization's OpenTelemetry® instrumentation across traces,
                metrics, and logs.
              </div>
              <div>
                <strong>Telemetry Samples:</strong> Provider may store samples
                of Customer's telemetry for a limited period for deeper
                analysis, such as telemetry analysis reports. Enterprise
                customers may opt out of sampling or agree on specific
                retention windows in their Order Form.
              </div>
              <div>
                <strong>Order Date:</strong> The Effective Date
              </div>
              <div>
                <strong>Subscription Period:</strong> 1 month(s)
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Cloud Service Fees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Certain parts of the Product have different pricing plans, which
              are available at the{" "}
              <a
                href="/products/insights#pricing"
                className="text-olly-green hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Provider's pricing page
              </a>
              . Customer will pay Provider the applicable Fees based on the
              Product tier and Customer's usage. Provider may update Product
              pricing by giving at least 30 days notice to Customer (including
              by email or notification within the Product), and the change will
              apply in the next Subscription Period. Modifying Section 5.1, fees
              are inclusive of taxes.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Payment Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              <strong>Automatic payment:</strong> Customer authorizes Provider
              to bill and charge Customer's payment method on file Monthly for
              immediate payment or deduction without further approval.
            </p>
            <p>
              <strong>Non-Renewal Notice Period:</strong> At least 30 days
              before the end of the current Subscription Period.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              Service Limitations & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-3">
              <div>
                <strong>Use Limitations:</strong> Provider may apply ingestion
                limits to the Cloud Service, without affecting the quality of
                the service provided. Any such limits apply per organization and
                are shared across all services in that organization.
              </div>
              <div>
                <strong>Technical Support:</strong> For support, customers
                should email their requests to{" "}
                <a
                  href="mailto:support@ollygarden.com"
                  className="text-olly-green hover:underline"
                >
                  support@ollygarden.com
                </a>
                . Additionally, OllyGarden provides comprehensive technical
                assistance including onboarding and implementation support to
                ensure a smooth experience.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              Service Level Agreement (SLA)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Provider will use commercially reasonable efforts to provide and
              maintain the Cloud Service without excessive errors and
              interruptions. If Provider does not meet the SLA in two
              consecutive months or over three months in any 12-month period,
              then Customer may, as its only remedy, terminate this Order Form
              upon notice and receive a prorated refund of prepaid fees for the
              remainder of the Subscription Period.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Key Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-3">
              <div>
                <strong>Customer:</strong> The company or person who accesses or
                uses the Product. If the person accepting this Agreement is
                doing so on behalf of a company, all use of the word "Customer"
                in the Agreement will mean that company.
              </div>
              <div>
                <strong>Provider:</strong> OllyGarden, Inc.
              </div>
              <div>
                <strong>Effective Date:</strong> The date Customer first accepts
                this Agreement.
              </div>
              <div>
                <strong>Governing Law:</strong> The laws of the State of
                Delaware
              </div>
              <div>
                <strong>Chosen Courts:</strong> The state or federal courts
                located in Delaware
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Covered Claims</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-3">
              <div>
                <strong>Provider Covered Claims:</strong> Any action,
                proceeding, or claim that the Cloud Service, when used by
                Customer according to the terms of the Agreement, violates,
                misappropriates, or otherwise infringes upon anyone else's
                intellectual property or other proprietary rights.
              </div>
              <div>
                <strong>Customer Covered Claims:</strong> Any action,
                proceeding, or claim that (1) the Customer Content, when used
                according to the terms of the Agreement, violates,
                misappropriates, or otherwise infringes upon anyone else's
                intellectual property or other proprietary rights; or (2)
                results from Customer's breach or alleged breach of Section 2.1
                (Restrictions on Customer).
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">General Cap Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              The fees paid or payable by Customer to provider in the 12 month
              period immediately before the claim
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Notice Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-2">
              <p>
                <strong>For Provider:</strong>{" "}
                <a
                  href="mailto:notices@ollygarden.com"
                  className="text-olly-green hover:underline"
                >
                  notices@ollygarden.com
                </a>
              </p>
              <p>
                <strong>For Customer:</strong> The main email address on
                Customer's account
              </p>
            </div>
          </CardContent>
        </Card>
    </LegalPage>
  );
};

export default Terms;
