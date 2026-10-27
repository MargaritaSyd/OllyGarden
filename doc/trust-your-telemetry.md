# Trust Your Telemetry?

A short game: each round shows an on-call situation, real anonymized OpenTelemetry data (a trace,
logs, a span, a table, a chart, or a service map), and a conclusion someone drew from it. Every
case asks the same question, "Does the telemetry back this up?", answered **Yes, it holds** or
**No, something's off**. The player always judges the conclusion, never the data alone. The reveal
stamps the conclusion **Holds up** or **Doesn't hold up**, then says whether the data was accurate,
gives the tell, the fix, and, where one exists, the OllyGarden insight that flags the problem.
Linear: E-4236.

A conclusion fails in one of two ways, and the reveal names which: the telemetry itself misleads
(wrong severity, epoch timestamps, a missing parent, no `service.name`), or accurate telemetry was
misread (a gRPC failure behind HTTP 200, a long-poll wait read as latency, a retry loop read as an
outage).

## Routes

| Route | Indexed | Purpose |
| --- | --- | --- |
| `/trust-your-telemetry` | yes | The game inside the site shell (`PageHero` + `PageBody`), plus crawlable copy and the FAQ |
| `/trust-your-telemetry/result/<token>` | no | Shared-result landing page; the token works like the quiz's (`src/lib/result-token.ts`) |
| `/trust-your-telemetry/booth` | no | Full-screen kiosk for event booths; not in the sitemap or navigation |

## Where things live

- `src/lib/trust-game/cases.ts`: the cases and their types. Imported by tests outside the path
  aliases, so it stays import-free.
- `src/lib/trust-game/content.ts`: page copy, the anonymized notice, the results pitch, and the FAQ.
  Nav, resources, `llms.txt`, Markdown, and JSON-LD read it.
- `src/lib/trust-game/score.ts`: routes, deck size, tiers, and result tokens. `og-cards.ts` loads it
  outside the path aliases.
- `src/lib/trust-game/deck.ts` deals balanced decks; `booth-stats.ts` keeps the booth's counters.
- `src/components/trust-game.tsx` is the game (one client component, `mode="web"` or `"booth"`);
  `trust-game-panels.tsx` renders the telemetry panels.

## Rules

- A game deals equal numbers of trustworthy and deceptive cases, shuffled: 10 on the web, 10 or the
  full balanced set (`trustGameFullDeckSize`) in the booth. One point per correct verdict; no timer.
- Tiers are fractions of the deck, so 10- and 20-case games share them. Shared results are always
  scored out of 10, and each tier has its own Open Graph card (`/trust-your-telemetry/tier/<id>`).
- Verdicts never appear in server-rendered HTML, Markdown, `llms.txt`, or JSON-LD; the cases ship
  only in the client bundle.

## Adding or changing a case

1. Write it in `cases.ts`. Ids are `T<n>` when the conclusion holds and `D<n>` when it fails, and
   never change: analytics groups by them. Write `claim` as a conclusion someone drew from the data,
   in their voice, not as a description of the data. Deceptive cases need a `fix` and a `flaw`
   (`data` when the telemetry misleads, `reading` when accurate telemetry was misread); `detector`
   names an OllyGarden insight only where one exists today; the `TrustCase` type rejects a deceptive
   case without `fix` and `flaw`. `headline` is the takeaway; the reveal adds the verdict.
2. Mark the element that holds the tell with `hl: true` (a trace or log row, table row, span
   attribute, event, chart, or a footer as `{ text, hl: true }`), and error values with `err: true`.
3. Keep the counts balanced; `test/trust-game.test.mjs` checks balance, ids, fixes, flaws,
   highlights, and panel shapes.
4. Record what the case is based on in the private `weekly` repository
   (`events/kubecon-na-2026/README.md`), never here.

## Content rules

The public anonymization rules in [case-studies.md](case-studies.md) apply, plus:

- Every service, host, endpoint, topic, and ID name is invented.
- No industry per case and no scenario domain that hints at the source industry. Some sources have
  published anonymized case studies, and per-case industries would let readers join the two.
- Ratios instead of raw counts, and no thousands separators.
- The anonymized notice appears on the game page, the booth attract screen, and the results.

`test/content-rules.test.mjs` enforces the mechanical part (em-dashes, thousands separators, and the
banned source companies, vendors, and industry words in `test/fixtures/banned-terms.json`).

## Analytics

The web game sends the events in [operations.md](../operations.md#telemetry-inventory) after
consent. Per-case accuracy (`trust_game_case_answered` grouped by `case_id`) shows which cases are
too easy or unfair. `verdict` keeps its original values: `trust` is "Yes, it holds" and `distrust` is
"No, something's off". The booth sends nothing: it is chromeless (`src/lib/chrome.ts`), so it has no
consent banner and never starts PostHog or Apollo, and the game itself only reports in web mode.

## Booth checklist

1. Open `/trust-your-telemetry/booth` in a fresh browser profile on the booth machine, full screen.
   The page loads its fonts from the site, so it needs a network connection.
2. Keys: `Y` it holds, `N` something's off, `Enter` or `Space` next, `Esc` back to the attract
   screen. On a touchscreen the verdict buttons are the main control. After 120 seconds without
   input the game returns to the attract screen.
3. The attract screen shows games played and average accuracy on this device. Press `S` there for
   per-case accuracy, and copy that table at the end of each day: the counters live only in that
   browser's local storage (`ollygarden-trust-game-booth`), and clearing site data resets them.
