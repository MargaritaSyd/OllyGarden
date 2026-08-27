import { CommunityJoin } from "@/components/community-join";
import { CompanyHero } from "@/components/company-hero";
import { CompanyMission } from "@/components/company-mission";
import { CompanyOpenSource } from "@/components/company-opensource";
import { CompanyPrinciples } from "@/components/company-principles";
import { CompanyStory } from "@/components/company-story";
import { CompanyTeam } from "@/components/company-team";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { companyHero, companyMeta } from "@/lib/company";
import { createPageMetadata } from "@/lib/metadata";
import { companyGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: companyMeta.title,
  description: companyHero.ledes[0],
  path: companyMeta.path,
  absoluteTitle: true,
});

export default function CompanyPage() {
  return (
    <>
      <JsonLd data={companyGraph()} />
      <CompanyHero />
      <CompanyStory />
      <CompanyMission />
      <CompanyPrinciples />
      <CompanyTeam />
      <CompanyOpenSource />
      <CommunityJoin />
      <SiteCta />
    </>
  );
}
