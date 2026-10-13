import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Database,
  LegalPage,
  legalLinkClass,
} from "@/components/legal/legal-page";
import { lastUpdated, legalContacts, legalEntities, subprocessorGroups } from "@/lib/legal";

const link = legalLinkClass;

const Subprocessors = () => {
  return (
    <LegalPage
      title="Subprocessors"
      icon={<Database />}
      updated={`${legalEntities.inc.name} | ${lastUpdated("/subprocessors")}`}
    >
      <Card className="bg-card border-border">
        <CardContent className="space-y-4 pt-6 text-muted-foreground">
          <p>
            {legalEntities.inc.name} uses the third parties below to process customer data, such as
            telemetry, source code, and account information, on our behalf under applicable
            contractual terms. Transfers outside the European Economic Area rely on the EU-U.S.
            Data Privacy Framework where the provider is certified, on an adequacy decision, or on
            the European Commission&apos;s Standard Contractual Clauses.
          </p>
          <p>
            Rose uses OpenRouter to access OpenAI and Anthropic models. By default, those providers
            do not use inputs or outputs to train their models, but standard API retention may
            apply for up to 30 days. Zero-data-retention routing and EU-only processing are separate
            Enterprise add-ons available on request. We do not use customer code or data to train
            models on any plan.
          </p>
          <p>
            We update this list before a new subprocessor begins processing customer data. To be
            notified of changes, email{" "}
            <a
              href={`mailto:${legalContacts.privacy}?subject=Subprocessor%20updates`}
              className={link}
            >
              {legalContacts.privacy}
            </a>{" "}
            with the subject &ldquo;Subprocessor updates&rdquo;. How we handle personal data is
            described in our{" "}
            <Link href="/privacy-policy" className={link}>
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      {subprocessorGroups.map((group) => (
        <Card key={group.title} className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>{group.description}</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="text-foreground">
                  <tr className="border-b border-white/10">
                    <th scope="col" className="py-2 pr-4 font-medium">Subprocessor</th>
                    <th scope="col" className="py-2 pr-4 font-medium">Purpose</th>
                    <th scope="col" className="py-2 font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {group.entries.map((entry) => (
                    <tr key={entry.name} className="border-b border-white/5 align-top">
                      <th scope="row" className="py-2 pr-4 font-normal text-foreground">
                        {entry.name}
                      </th>
                      <td className="py-2 pr-4">{entry.purpose}</td>
                      <td className="py-2">{entry.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </LegalPage>
  );
};

export default Subprocessors;
