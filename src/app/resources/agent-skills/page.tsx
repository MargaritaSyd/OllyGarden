import {
  AgentSkillsHero,
  AgentSkillsInstall,
  AgentSkillsLayers,
  AgentSkillsRose,
} from "@/components/agent-skills";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { agentSkillsFaq, agentSkillsMeta } from "@/lib/agent-skills";
import { createPageMetadata } from "@/lib/metadata";
import { roseScanCta } from "@/lib/rose";
import { resourcesAgentSkillsGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: agentSkillsMeta.title,
  description: agentSkillsMeta.description,
  path: agentSkillsMeta.path,
  absoluteTitle: true,
});

export default function AgentSkillsPage() {
  return (
    <>
      <JsonLd data={resourcesAgentSkillsGraph()} />
      <AgentSkillsHero />
      <AgentSkillsLayers />
      <AgentSkillsRose />
      <AgentSkillsInstall />
      <div className="relative overflow-hidden">
        <div className="tulip-grid" aria-hidden="true" />
        <div className="relative z-[1]">
          <FaqAccordion content={agentSkillsFaq} startClosed />
        </div>
      </div>
      <SiteCta content={roseScanCta} />
    </>
  );
}
