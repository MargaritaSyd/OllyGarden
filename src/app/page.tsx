import Link from "next/link";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site";

export const metadata = buildPageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLdScript
        data={webPageJsonLd({
          title: siteConfig.name,
          description: siteConfig.description,
          path: "/",
        })}
      />
      <main>
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-emerald-700">
            {siteConfig.tagline}
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
            Welcome to {siteConfig.name}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-stone-600">
            {siteConfig.description}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/about"
              className="rounded-full bg-emerald-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Learn more
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-emerald-200 px-8 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
            >
              Get in touch
            </Link>
          </div>
        </section>

        <section className="border-t border-emerald-100 bg-white">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 sm:grid-cols-3">
            {[
              {
                title: "Plan your space",
                description:
                  "Design beds, paths, and planting zones that fit your yard and lifestyle.",
              },
              {
                title: "Grow with confidence",
                description:
                  "Seasonal tips and reminders help you know what to plant, prune, and harvest.",
              },
              {
                title: "Enjoy the results",
                description:
                  "Track progress and celebrate every bloom, harvest, and quiet moment outdoors.",
              },
            ].map((feature) => (
              <article key={feature.title} className="rounded-2xl bg-stone-50 p-6">
                <h2 className="mb-2 text-lg font-semibold text-emerald-900">
                  {feature.title}
                </h2>
                <p className="text-sm leading-relaxed text-stone-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
