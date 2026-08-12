import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const description =
  "Learn about OllyGarden — our mission to make gardening approachable, joyful, and sustainable for everyone.";

export const metadata = buildPageMetadata({
  title: "About",
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLdScript
        data={webPageJsonLd({
          title: "About",
          description,
          path: "/about",
        })}
      />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-emerald-950">
          About OllyGarden
        </h1>
        <div className="space-y-6 text-lg leading-relaxed text-stone-600">
          <p>
            OllyGarden was built for people who love the idea of a garden but
            feel unsure where to start. We believe everyone deserves a green
            space they can be proud of — whether it is a windowsill herb box or
            a full backyard oasis.
          </p>
          <p>
            Our team combines horticulture expertise with thoughtful design to
            create tools that are simple to use and grounded in real-world
            gardening experience. We focus on clarity over complexity, so you
            can spend less time searching and more time growing.
          </p>
          <p>
            From planning and planting to maintenance and harvest, OllyGarden
            supports you at every stage of the journey. We are committed to
            sustainable practices and helping gardeners build healthy ecosystems
            in their own backyards.
          </p>
        </div>
      </main>
    </>
  );
}
