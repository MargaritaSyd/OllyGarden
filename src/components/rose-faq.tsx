import { FaqAccordion } from "@/components/faq-accordion";
import { roseFaq } from "@/lib/rose";

/** Rose FAQ: the shared accordion on the dashed grid, with Figma spacing. */
export function RoseFaq() {
  return (
    <div className="relative overflow-hidden">
      <div className="tulip-grid" aria-hidden="true" />
      <FaqAccordion content={roseFaq} variant="rose" />
    </div>
  );
}
