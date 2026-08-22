import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

const stubs: Record<string, { title: string; description: string }> = {
  "webinars-conferences": {
    title: "Webinars & Conferences",
    description: "Watch deep dives, demos, and conference talks.",
  },
  webinars: {
    title: "Webinars & Conferences",
    description: "Watch deep dives, demos, and conference talks.",
  },
  community: {
    title: "Community & Events",
    description: "Meet the team at talks, meetups, and conferences.",
  },
  faq: {
    title: "FAQ",
    description: "Answers to the questions we hear most.",
  },
};

export function generateStaticParams() {
  return Object.keys(stubs).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stub = stubs[slug];

  return stubMetadata(
    stub?.title ?? "Resources",
    `/resources/${slug}`,
    stub?.description,
  );
}

export default async function ResourceStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stub = stubs[slug];

  if (!stub) {
    notFound();
  }

  return <ComingSoon title={stub.title} description={stub.description} />;
}
