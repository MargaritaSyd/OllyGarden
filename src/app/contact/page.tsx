import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { contactPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site";

const description =
  "Contact the OllyGarden team. We would love to hear from you about partnerships, support, or feedback.";

export const metadata = buildPageMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLdScript data={contactPageJsonLd()} />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-emerald-950">
          Contact us
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-stone-600">
          Have a question, idea, or collaboration in mind? Reach out — we read
          every message and typically respond within two business days.
        </p>

        <section
          aria-labelledby="contact-details-heading"
          className="rounded-2xl border border-emerald-100 bg-white p-8"
        >
          <h2
            id="contact-details-heading"
            className="mb-4 text-xl font-semibold text-emerald-900"
          >
            Get in touch
          </h2>
          <dl className="space-y-4 text-stone-600">
            <div>
              <dt className="text-sm font-medium text-stone-500">Email</dt>
              <dd>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-emerald-700 hover:text-emerald-900"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-stone-500">
                Office hours
              </dt>
              <dd>Monday – Friday, 9:00 AM – 5:00 PM (EST)</dd>
            </div>
          </dl>
        </section>
      </main>
    </>
  );
}
