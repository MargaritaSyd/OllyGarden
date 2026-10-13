# Case studies

Customer stories live at `/resources/case-studies`, one page per story at
`/resources/case-studies/<slug>`. Every story is anonymized and every story is real: the
"Anonymized, but real" notice (`anonymizedNotice` in `src/lib/case-studies.ts`) appears on each
page, in its Markdown version, and in the hub cards. Do not publish a story that is not both.

## Where things live

| What                                                                | Where                                                                                     |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Story data: title, dek, facts, stats, narrative blocks, method note | `caseStudies` in `src/lib/case-studies.ts`                                                |
| Audio script, which is also the on-page transcript                  | `content/case-studies/<slug>.txt`                                                         |
| Rendered episode                                                    | `public/audio/case-studies/<slug>.mp3`                                                    |
| Open Graph card                                                     | `src/lib/og-cards.ts`, rendered to `public/og/resources/case-studies/<slug>.png`          |
| Hub and article components                                          | `src/components/case-studies.tsx`, `src/components/case-study-article.tsx`                |
| Markdown version (`.md`, `llms-full.txt`)                           | `src/lib/case-study-markdown.ts`, built from the same data                                |
| JSON-LD                                                             | `resourcesCaseStudiesGraph` and `resourcesCaseStudyGraph` in `src/lib/structured-data.ts` |
| Related links on products, solution pages, and the story itself     | `src/lib/related.ts`, `CaseStudyProof` in `src/components/case-studies.tsx`               |

Adding an entry to `caseStudies` puts the story in the hub, sitemap, `llms.txt`, and
`llms-full.txt`. Add its Open Graph card and commit the rendered PNG in the same change.

## Linking a new story

Most links come from the story's data; a few are editorial and need a manual check.

From the story's fields, with no other change:

| Field          | Puts the story on                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `industry`     | The solutions overview, always. The matching solution page when the value is one of `solutionIndustries` in `src/lib/case-studies.ts`; use the constant, not a string. |
| `products`     | The related-reading section of each listed product page, and the story's own "Keep reading" links to those products. List only products the customer actually used.    |
| `relatedPosts` | The story's "Keep reading" section and its Markdown version: two blog post slugs that continue the story.                                                              |

To review in the same change:

- **Product pages:** `productReadingContent` in `src/lib/related.ts` holds each product's recommended
  posts. A story that changes what a product is best known for may call for a different pick.
- **Blog posts:** link the new story from the posts on the same topic, with an absolute
  `https://ollygarden.com/...` URL in `content/blog/<slug>.html`.
- **A new industry:** a story in an industry without a solution page appears only on the overview
  and the hub. Add the solution page, or accept that.
- **SEO review:** run the `seo-review` skill on the new page, the hub, and every page above that
  now lists it.

## Source and approval

Each story starts from a Linear sub-issue of MAR-634, which holds the snapshot, findings, proof
points, measurement caveats, and approval status. Before publishing, confirm with the current
account owner that the customer approves an anonymized story, even when a contract grants logo
use.

The sub-issue is a summary and can carry misreadings. Before publishing, check every finding and
number in the story, and in the audio script, against the source reports and call notes the
sub-issue points to. Drop anything you cannot trace to a source.

## Anonymization

- No company, person, product, brand, internal service, hostname, cluster, repository, or channel
  names. Describe the customer by industry, region, rough size, and stack, and keep that
  combination generic enough that it does not narrow the field. Never name their observability
  vendor.
- Keep numbers that do not identify the customer. Round them or turn them into ratios when they
  could; publish ratios rather than sample-based absolute counts.
- No contract values, pricing, or deal stage.
- Customer quotes are paraphrased and labelled "(paraphrased)" unless the customer approved the
  exact words.
- Public copy never hints at approval status. Approval tracking stays in Linear.

## Storytelling

A story reads as a narrative, not a report. The current shape:

1. A `lead` paragraph that states the problem and the outcome in a few sentences. When no outcome
   was measured, it summarizes the findings instead and claims no customer result.
2. The situation and the constraint that made it hard, in the customer's own reasoning.
3. What OllyGarden found, with the numbers.
4. What changed, and the moment the process proved itself.
5. The results against the targets the customer set.
6. What happened next, including what did not go well and what is still open.
7. Lessons other teams can apply.

When an engagement has no measured outcomes, the story covers only what OllyGarden found: steps 1
to 3 and 7, with no plan of action, remediation, or results. Neither the story nor its method note
needs to say that no outcome is claimed.

Every number needs a plain-language meaning: say what was measured and over what. If a reader
would have to ask what a number refers to, rewrite the sentence or cut the number.

Every story ends with a `method` note that says how the numbers were measured and what they do
not claim. Only claim savings, especially in money, that the customer confirmed.

## Audio

Each story can carry a short episode in which Bianca and Florian, the OTel Drops hosts from
Telemetry Drops, tell it as a conversation. It is not an OTel Drops episode: they open by
introducing themselves, mention that listeners might know them from the podcast, and say they are
here to tell this story. There is no narrator intro, sponsor read, or quiz. The page says the
voices are AI-generated without naming the voice vendor.

1. Write `content/case-studies/<slug>.txt` in the OTel Drops script format: `[SECTION]` markers and
   `BIANCA:` or `FLORIAN:` lines. Follow the script and delivery rules in the `otel-podcast`
   repository's `AGENTS.md`, `config/elevenlabs.md`, and `config/hosts/`, including its
   `humanize-script` skill: spell out numbers, no version numbers, zero to three supported
   delivery tags per line. Aim for six to seven minutes, about 1,000 spoken words. The episode
   says only what the page says.
2. Render with the podcast CLI, which reads the ElevenLabs key and voice IDs from that repository's
   `.env`. Use a scratch `-root` so nothing lands in the podcast repository and no narrator intro
   is prepended:

   ```bash
   cd ../otel-podcast   # wherever the telemetrydrops/otel-podcast checkout lives
   set -a && . ./.env && set +a
   ./bin/otel-drops audio -root "$SCRATCH" -week <slug> -script <wicket>/content/case-studies/<slug>.txt
   ./bin/otel-drops stitch -root "$SCRATCH" -week <slug>
   ```

3. Encode the web copy and set `audio.duration` to its length as an ISO 8601 duration:

   ```bash
   ffmpeg -i "$SCRATCH/weekly/<slug>/episode.mp3" -ac 1 -ar 44100 -b:a 96k public/audio/case-studies/<slug>.mp3
   ffprobe -v error -show_entries format=duration -of csv=p=0 public/audio/case-studies/<slug>.mp3
   ```

The transcript on the page is generated from the script with the delivery tags removed, so edit
the script and re-render the audio together. To re-render after an edit, delete only the changed
segment files in `$SCRATCH/weekly/<slug>/segments/` and the stitched `episode.mp3`, run `audio` and
`stitch` again (unchanged segments are reused), re-encode, update `audio.duration`, and listen to
the changed segments before committing.
