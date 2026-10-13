import { readFile } from "node:fs/promises";
import { cache } from "react";
import {
  anonymizedNotice,
  caseStudyAudioIntro,
  caseStudiesMeta,
  caseStudyHref,
  caseStudyPage,
  getCaseStudy,
  type CaseStudy,
  type CaseStudyBlock,
} from "@/lib/case-studies";
import { caseStudyReading } from "@/lib/related";
import { getAbsoluteUrl } from "@/lib/site";

export type TranscriptLine = { speaker: string; text: string };

/** Dialogue lines of `content/case-studies/<slug>.txt`, without ElevenLabs delivery tags. */
export const readCaseStudyTranscript = cache(
  async function readCaseStudyTranscript(
    slug: string,
  ): Promise<TranscriptLine[]> {
    const script = await readFile(
      `${process.cwd()}/content/case-studies/${slug}.txt`,
      "utf8",
    );
    return script.split("\n").flatMap((line) => {
      const match = line.match(/^([A-Z]+):\s*(.+)$/);
      if (!match) return [];
      const [, speaker, text] = match;
      return [
        {
          speaker: speaker[0] + speaker.slice(1).toLowerCase(),
          text: text.replace(/\[[^\]]*\]\s*/g, "").trim(),
        },
      ];
    });
  },
);

function blockMarkdown(block: CaseStudyBlock) {
  switch (block.type) {
    case "lead":
    case "p":
      return block.text;
    case "h2":
      return `## ${block.text}`;
    case "quote":
      return `> ${block.quote}\n>\n> — ${block.attribution}`;
    case "list":
      return block.items.map((item) => `- ${item}`).join("\n");
    case "callout":
      return `**${block.title}.** ${block.text}`;
  }
}

function relatedMarkdown(study: CaseStudy) {
  const links = caseStudyReading(study).map(
    (link) => `- [${link.title}](${getAbsoluteUrl(link.href)}): ${link.description}`,
  );
  return `## ${caseStudyPage.related}\n\n${links.join("\n")}`;
}

async function studyMarkdown(study: CaseStudy) {
  const path = caseStudyHref(study.slug);
  const parts = [
    `# ${study.title}`,
    study.dek,
    `> **${anonymizedNotice.label}.** ${anonymizedNotice.text}`,
    `Published: ${study.date}\nCanonical URL: ${getAbsoluteUrl(path)}`,
    `## ${caseStudyPage.glance}\n\n${study.facts.map((fact) => `- **${fact.label}:** ${fact.value}`).join("\n")}`,
    `## Key numbers\n\n${study.stats.map((stat) => `- **${stat.value}** ${stat.label} (${stat.detail})`).join("\n")}`,
    ...study.body.map(blockMarkdown),
    `## ${caseStudyPage.method}\n\n${study.method}`,
    relatedMarkdown(study),
  ];

  if (study.audio) {
    const transcript = await readCaseStudyTranscript(study.slug);
    parts.push(
      `## ${caseStudyPage.listen}\n\n${caseStudyAudioIntro}\n\n[Episode (MP3)](${getAbsoluteUrl(study.audio.src)})`,
      `### Transcript\n\n${transcript.map((line) => `**${line.speaker}:** ${line.text}`).join("\n\n")}`,
    );
  }

  return parts.join("\n\n");
}

/** Markdown for a case study page, or null when the path is not one. */
export async function caseStudyMarkdown(path: string) {
  const prefix = `${caseStudiesMeta.path}/`;
  const study = path.startsWith(prefix)
    ? getCaseStudy(path.slice(prefix.length))
    : undefined;
  return study ? studyMarkdown(study) : null;
}
