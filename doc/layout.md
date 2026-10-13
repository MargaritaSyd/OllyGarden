# Layout

Chrome conventions for the OllyGarden marketing site. Product copy and routes still follow [`roadmap.md`](roadmap.md).

## Breakpoints

Tailwind 4 defaults:

| Token | Min width | Use here |
| --- | --- | --- |
| `sm` | 640px | Spacing tweaks only |
| `md` | 768px | Tablet: same chrome as phone, hamburger beside Sign In |
| `lg` | 1024px | Desktop: inline nav + hover `MegaMenu` |

Header chrome uses **two splits**.

| Viewport | Header |
| --- | --- |
| `< 768px` (phone) | Logo + Sign In on the first row; hamburger **below**, left; `MobileNav` |
| `768px–1023px` (tablet) | Logo left; Sign In + hamburger **on the same row**, right; `MobileNav` |
| `≥ 1024px` (desktop) | Inline nav + hover `MegaMenu`; no hamburger |

## Header components

- **`MegaMenu`** — desktop only (`lg:block`). Full-width panel, four-column items, hover to open.
- **`MobileNav`** — phone and tablet (`lg:hidden`). Title list; tap a title with children to reveal `MegaMenuItem` rows underneath. Reopening the hamburger shows titles only (no remembered section).
- **`MegaMenuItem`** — shared row (icon + title/subtitle). Hover and active URL use `bg-mist/10`.

## Announcement bar

`AnnouncementBar` (`src/components/announcement-bar.tsx`) is the first child of `body` on every page: a full-width `bitmap-highlight` bar with a forest **NEW** pill and one sentence whose trailing link is underlined (Figma 2383:42299). The whole bar is the link. Copy and the destination live in `src/lib/announcement.ts`; the Rose MVI section reuses the same destination. It is in normal flow, so it scrolls away with the header. It publishes its measured height as `--announcement-height` on `html` for the mobile nav cap.

## Header position and mobile scroll

The header is `absolute` at the top of the wrapper that holds it together with `PageMotif` and `main`, directly below the announcement bar. It sits above page content instead of pushing it down. It is **not** `sticky` or `fixed`: scrolling the page moves the header away with the document.

`MobileNav` sizes to its content (titles only stay short). If an expanded section would overflow the viewport, the card caps at `100dvh` minus header padding minus the announcement bar (`--announcement-height`, measured by `AnnouncementBar`) and the **list** scrolls first. After the last item, further scroll moves the page: the open menu leaves the viewport and the rest of the app is visible.

Do not use `sticky`/`fixed` on the header, and do not stretch the open mobile menu to full screen when the title list is enough.

## Surface

The header card is forest, not a flat fill: class `surface-grain` in `globals.css`. The overlay is **monochrome** paper grain (`feTurbulence` + `feColorMatrix` saturate 0), blended with `mix-blend-mode: overlay` at opacity `0.8`.

Tune in that `::before` rule:

| Knob | Current | Effect |
| --- | --- | --- |
| `opacity` | `0.8` | Strength (0 to 1) |
| `mix-blend-mode` | `overlay` | How grain sits on forest |
| `baseFrequency` | `0.18` | Speck size in the SVG (lower = larger) |
| `background-size` | `120px` | How large each 256px tile is drawn |

Keep the noise desaturated. RGB turbulence + `screen` reads as colored camera noise; `multiply` crushes the card to black.

Reuse `surface-grain` for other forest chrome (footer, panels) instead of a second noise recipe.

The large pixel mosaic behind the page is separate. It belongs on the home/page background, not on the header fill.

## Page motif

`PageMotif` sits in the root layout, `absolute` at the top of the header/main wrapper, below the announcement bar (`-z-10` inside `body.isolate`), first viewport only (`h-[100dvh]`), `pointer-events-none`. It is a **frame** of 48px bitmap cells (`src/lib/motif.ts`): colored squares from the bitmap tokens, `public/brand/layout/flower.svg` on the left, `public/brand/layout/chevrons.svg` on the top / right / bottom. Cells within 170px of the cursor redraw at full opacity. `public/brand/layout/image.svg` is the Figma cluster (vocabulary), not the live frame.

The header stays `z-50` and sits on the thin top edge. Page copy paints above the motif; do not put an opaque full-bleed fill on `main`.

The frame is roughly three cells (about 150px) deep on each edge of the first viewport, so copy that lands there is unreadable. Pages that keep the global frame (they are not excluded in `PageMotif`) must open with `PageHero` from `src/components/page-hero.tsx`: a `min-h-dvh` section that holds only the eyebrow, title, lede, and an optional CTA, inset from the side columns. Body content goes in `PageBody` after it. `PageBody` starts below the motif only because the hero's `min-h-dvh` matches the motif's `h-[100dvh]`; change both together. Careers job pages, the OpenTelemetry quiz, and the legal pages follow this. The `ComingSoon` stubs are the exception: they center a short title block and carry no body copy. Product and resource heroes and the not-found page instead own a scoped `MotifField` or `HeroBlob` and are excluded from the global frame.
