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
import { lastUpdated, legalEntities } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

const link = legalLinkClass;
const { inc, gmbh } = legalEntities;

function Address({ lines }: { lines: readonly string[] }) {
  return (
    <address className="not-italic">
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </address>
  );
}

const Imprint = () => {
  return (
    <LegalPage title="Imprint" icon={<FileText />} updated={`Impressum | ${lastUpdated("/imprint")}`}>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Service provider</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p className="text-foreground">{inc.name}</p>
          <Address lines={inc.address} />
          <p>Represented by {inc.representative}</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Establishment in Germany</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p className="text-foreground">{gmbh.name}</p>
          <Address lines={gmbh.address} />
          <p>Managing director: {gmbh.managingDirector}</p>
          <p>{gmbh.register}</p>
          <p>VAT ID: {gmbh.vatId}</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Email:{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className={link}>
              {siteConfig.contactEmail}
            </a>
          </p>
          <p>
            You can also reach us through our{" "}
            <Link href="/contact" className={link}>
              contact form
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Responsible for content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Responsible for editorial content under § 18(2) MStV:</p>
          <p>
            {gmbh.managingDirector}, {gmbh.address.join(", ")}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Consumer dispute resolution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            OllyGarden offers its services to businesses. We are neither obliged nor willing to take
            part in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </CardContent>
      </Card>
    </LegalPage>
  );
};

export default Imprint;
