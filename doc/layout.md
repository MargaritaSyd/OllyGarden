# Layout

Chrome conventions for the OllyGarden marketing site. Product copy and routes still follow [`roadmap.md`](roadmap.md).

## Breakpoints

Tailwind 4 defaults:

| Token | Min width | Use here |
| --- | --- | --- |
| `sm` | 640px | Spacing tweaks only |
| `md` | 768px | Tablet: same chrome as phone, hamburger beside Get Started |
| `lg` | 1024px | Desktop: inline nav + hover `MegaMenu` |

Header chrome uses **two splits**.

| Viewport | Header |
| --- | --- |
| `< 768px` (phone) | Logo + Get Started on the first row; hamburger **below**, left; `MobileNav` |
| `768px–1023px` (tablet) | Logo left; Get Started + hamburger **on the same row**, right; `MobileNav` |
| `≥ 1024px` (desktop) | Inline nav + hover `MegaMenu`; no hamburger |

## Header components

- **`MegaMenu`** — desktop only (`lg:block`). Full-width panel, four-column items, hover to open.
- **`MobileNav`** — phone and tablet (`lg:hidden`). Title list; tap a title with children to reveal `MegaMenuItem` rows underneath. Reopening the hamburger shows titles only (no remembered section).
- **`MegaMenuItem`** — shared row (icon + title/subtitle). Hover and active URL use `bg-mist/10`.

## Header position and mobile scroll

The header is `absolute` at the top of the app (`body` is `relative`). It sits above page content instead of pushing it down. It is **not** `sticky` or `fixed`: scrolling the page moves the header away with the document.

`MobileNav` sizes to its content (titles only stay short). If an expanded section would overflow the viewport, the card caps at `100dvh` minus header padding and the **list** scrolls first. After the last item, further scroll moves the page: the open menu leaves the viewport and the rest of the app is visible.

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
