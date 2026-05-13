# Handoff: Motion Designer Showreel — Panos Lambrakis

## Quick start

1. Unzip this folder into your repo.
2. Drop your real files into `my_materials/` (videos, CV, LinkedIn export, optional bio notes). See `my_materials/README.md` for naming and format guidance.
3. Open Claude Code, Google Antigravity, or any agentic IDE in the repo and paste the prompt from `PROMPT.md`.
4. The agent will read your materials, draft a `CONTENT.md`, pause for your review, then build the site with your real content wired in.
5. When the build is ready to ship, follow `DEPLOY.md` to put it online for free (Netlify Drop, GitHub Pages, Vercel, or Cloudflare Pages).

## Overview

A single-page, cinematic dark portfolio site for an independent **graphic and motion designer** whose practice includes AI-assisted work. One long scrolling document containing six logical regions: an availability ticker, sticky top nav, hero with a large reel preview, a 16-tile selected-works grid (a mix of still and motion projects, with AI-assisted pieces flagged), a clients list, an about/info section, a contact CTA, and a footer. There is also a Tweaks panel (a floating in-page control surface in the design prototype) that lets the user swap typography pairing, accent color, base palette, and motion intensity at runtime. In a real production build the Tweaks panel is **optional** — if shipping a real portfolio site, the developer can either keep it (handy for the studio owner to A/B styling without redeploying) or remove it entirely and commit to a single set of tokens.

## About the Design Files

The files in this bundle are **design references created in HTML** — a high-fidelity prototype that shows the intended look, motion language, and information architecture. They are **not** production code to ship as-is. The task is to **recreate this design in the target codebase's existing environment** (React, Next.js, Astro, SvelteKit, Vue/Nuxt, plain HTML, etc.) using that codebase's established patterns, file structure, and CSS approach (CSS Modules, Tailwind, Styled Components, vanilla CSS — whatever it uses).

If there is no existing codebase, **Astro** or **Next.js (App Router) with static export** is recommended for this design — it is content-heavy, mostly static, motion-rich but JS-light, and benefits from server-rendered HTML for fast first paint. Tailwind is fine but not required; the design uses CSS custom properties heavily, which translate cleanly to either approach.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, and motion timings are all set. Recreate pixel-perfectly. The exact hex values, font families, weights, sizing, and animation durations are all listed below and visible in the source files.

## Screens / Views

This is a single-page site. The "views" are scroll-anchored sections within one document.

### 0 — Availability banner (top, full-width)

- **Purpose**: Communicates immediate availability and location.
- **Layout**: 32px tall horizontal bar, full-bleed across the viewport, with a horizontally scrolling ticker animating right-to-left in a continuous loop (60s per cycle at motion intensity = medium).
- **Typography**: JetBrains Mono, weight 500, 11px, 0.14em letter-spacing, uppercase.
- **Color**: `--bg` background, `--paper` text, with a `#6BE07A` "available" status dot (7px circle with a 4px semi-transparent halo, pulsing on a 2s `blink` keyframe — opacity 1 → 0.4 → 1).
- **Content (repeats twice for seamless loop)**: "Available for Q3 2026 commissions" · "Now booking · Brand films · Title sequences · Original work" · "Based in Athens · Working worldwide".
- **Bottom border**: 1px `--border`.

### 1 — Top navigation (sticky)

- **Purpose**: Anchor links to sections + studio metadata.
- **Layout**: 64px tall, `position: sticky; top: 0`, `backdrop-filter: blur(12px) saturate(120%)`, semi-transparent `--bg` background (`color-mix(in oklab, var(--bg) 86%, transparent)`), 1px `--border` bottom. Inside: max-width 1640px container with 32px side gutters. Three-column flex: brand mark + name on the left, anchor links centered, location + live clock on the right.
- **Brand mark**: 22px circle, `--paper` fill, with a `--bg` ring (3px inset) and a 6px `--accent` dot in the middle that pulses on a 3s keyframe (scale 1 → 0.7, opacity 1 → 0.4).
- **Brand text**: "Panos Lambrakis" in Varela Round weight 500 13px / `--mono` 0.04em letter-spacing, with "Motion Studio" muted (6px gap, `--muted` color).
- **Nav links**: 40px gap, JetBrains Mono 13px 0.04em, each link prefixed with a small `--muted` number ("01 Index" / "02 Clients" / "03 Info" / "04 Contact"). Hover color transitions to `--accent` over 0.2s. Anchor targets: `#work`, `#clients`, `#info`, `#contact`.
- **Right cluster**: "Athens, GR" in `--muted`, then a live clock in `--paper` (JS updates every second, tabular-nums, format `HH:MM:SS`).
- **Smooth scroll**: Nav anchors smooth-scroll to the target section with a -64px offset to account for the sticky nav.

### 2 — Hero

- **Purpose**: Establishes the practice, headline statement, vital stats, and previews the reel.
- **Layout**: Vertical padding `clamp(80px, 12vh, 160px) 0 clamp(60px, 8vh, 100px)`, inside the 1640px container.
- **Eyebrow row**: Small caps mono row at the top — `[line] SHOWREEL — Vol. IX · MMXXVI [longer line] 16 selected works`. Lines are 1px `--border` rules; left line is 56px, right line is `flex:1`. Mono 11px 0.18em uppercase `--muted`.
- **Hero title**: Three-line headline, display font (Varela Round at default), weight `var(--display-weight)` (700 at default), `clamp(56px, 11.5vw, 200px)`, line-height 0.92, letter-spacing `var(--display-tighten)` (-.02em at default), color `--paper`, max-width 14ch. Markup: `Graphic design, motion,<br><em>and the things between.</em>`. The `<em>` is colored `--accent`. With Varela Round (no italic variant), emphasis is communicated through color alone — for the optional serif pairings (see Typography Pairings) the same elements switch to true italic via `--display-italic`.
- **Hero foot**: 3-column grid (1fr / auto / 1fr, 60px gap, align-end, 80px top margin) containing:
  - **Bio paragraph** — Varela Round 16px / 1.45, color is 85% of `--paper`, max-width 36ch. Reads: *"Panos Lambrakis is an independent graphic and motion designer crafting identities, title sequences, key art and generative work — often with AI in the loop. Selected reel updated May 2026."* with name, "AI in the loop", and reel-date bolded (weight 500).
  - **Stats row** — three columns 48px apart. Each stat has a large display-font value (36px, `--paper`) and a small mono label below (11px 0.14em uppercase `--muted`). Values: **"87 Projects shipped"**, **"02 Disciplines — still & moving"**, **"14 Awards · Press"**.
  - **Scroll cue** — right-aligned column with mono label "Scroll to index" and a 1px gradient bar (32px tall, `--muted` → transparent) animating on a 2.4s `scrollcue` keyframe (translateY -6 → 14px, opacity 0.3 → 1 → 0).
- **Reel preview card** — see component spec below.

### 3 — Reel preview card

- **Purpose**: Big cinematic teaser tile, intended to be replaced with a real `<video>` when shipping.
- **Layout**: 100px top margin under hero foot, full container width, aspect-ratio 21/9, border-radius 8px, overflow hidden, cursor pointer. A meta strip sits 18px above it (display flex space-between, mono 11px 0.14em uppercase `--muted`): left side has three items "Reel · 2026" (paper) / "Director's cut" / "02:43 runtime" with 32px gap; right side has "Latest cut · May 2026".
- **Layered visual stack** (z-index ascending):
  1. `.reel-bg` — full-bleed soft radial-gradient composition (champagne + dusky blue + violet on near-black), blurred 20px and saturated 120%, animating on a 22s `reel-bg` keyframe (scale 1.05 → 1.18, slight x/y drift) alternating direction.
  2. `.reel-shape` — centered 28% (clamped 120-360px) circle with a 1px `rgba(236,231,221,.18)` border, two nested inset rings (one solid 1px at .1 opacity, one dashed at .16 opacity), spinning on a 40s linear loop.
  3. `.reel-grain` — full-bleed 3px-pitch dot grid at 8% opacity, mix-blend-mode overlay, jittering on a 0.4s `grain` keyframe stepped at 4 steps.
  4. `.reel-overlay` — three rows of foreground content with `clamp(24px, 3.5vw, 56px)` padding:
     - **Top row** — left "REC · 04 12 26", right 5-bar EQ animation (each bar 2px wide, paper, animating height 3 → 14px on a 1.2s `bar` ease-in-out with staggered delays).
     - **Center** — display-font "Play reel" at `clamp(36px, 6.5vw, 96px)` next to an 8vw circular play disc (1px paper border, triangular play glyph from `border-color: transparent transparent transparent var(--paper)`). On `.reel:hover` the disc background fills with `--paper`, the triangle inverts to `--bg`, and the "Play reel" text shifts to `--accent` — all over 0.25s.
     - **Bottom row** — left "02 : 43 / 02 : 43", right "● 4K · STEREO · DOLBY".
- **Mask**: A pseudo-element overlays a vignette/scrim — `radial-gradient(140% 100% at 50% 0%, transparent 55%, rgba(0,0,0,.45) 100%)` and a bottom-edge `linear-gradient(180deg, transparent 75%, rgba(0,0,0,.55) 100%)`.

### 4 — Selected works grid

- **Purpose**: 16-project gallery covering both disciplines (graphic stills and motion), with a deliberate editorial rhythm.
- **Section head**: 1px `--border` top, 24px top padding, 56px bottom margin. Three-column grid (auto / 1fr / auto): a display-font label "01 Selected works" (with a small mono numeral inline), an empty middle column, and a right-aligned mono lede in 13px 1.5 line-height (75% paper color). Display label is `clamp(28px, 3.5vw, 48px)`. Lede reads: *"Sixteen pieces — brand identity, title sequences, key art, posters, ad campaigns, and AI-assisted experiments. Hover to glimpse."*
- **Grid**: 12-column CSS grid, 32px row gap, 24px column gap. Each project sets a `--col` custom property to control its `grid-column: span`. The rhythm is intentional: it alternates between wide pairs, full-bleed features, triplets of small tiles, and asymmetric duos. Five projects are flagged AI-assisted (see the table); roughly a third of the grid is still-led work, two-thirds is motion-led. Default layout:

  | # | Project | Span | Discipline | Category | Client | Year |
  |---|---|---|---|---|---|---|
  | 01 | Parallax | 7 | **Still** | Editorial · Cover series | Sports Tribune | 2025 |
  | 02 | Aurora | 5 | **Motion · AI** | Title sequence | A24 Short Films | 2025 |
  | 03 | **Closer** *(featured)* | 12 | **Motion** | Ad campaign · Kinetic typography | Nike Running | 2024 |
  | 04 | Halcyon | 4 | **Still** | Brand identity | Halcyon Studios | 2024 |
  | 05 | Slow Burn | 4 | **Motion** | Title sequence | Netflix Originals | 2024 |
  | 06 | Vertex | 4 | **Motion · AI** | Experimental · Generative | Self-initiated | 2024 |
  | 07 | Margin | 6 | **Still** | Brand identity | Margin Capital | 2024 |
  | 08 | New Earth | 6 | **Still · AI** | Key art · Campaign | Patagonia | 2023 |
  | 09 | Orbit | 4 | **Motion** | Logo motion | Orbit Health | 2023 |
  | 10 | Static | 4 | **Motion · AI** | Experimental · Generative | Self-initiated | 2023 |
  | 11 | Night Shift | 4 | **Motion** | Title sequence | FX Network | 2023 |
  | 12 | **Echo** *(featured)* | 12 | **Motion** | Ad campaign | Sonos | 2023 |
  | 13 | Meridian | 6 | **Still** | Brand identity · Packaging | Meridian Coffee | 2022 |
  | 14 | Pulse | 6 | **Motion** | Experimental · Audio reactive | Self-initiated | 2022 |
  | 15 | Dreamscape | 8 | **Motion · AI** | Title sequence | HBO | 2022 |
  | 16 | Zero | 4 | **Motion** | Logo motion | Zero Studio | 2022 |

- **Project tile structure**:
  - `.thumb` — 16:9 aspect-ratio surface, border-radius 6px, overflow hidden, `container-type: inline-size` on the parent so all internal sizing can use `cqw`/`cqh` to stay proportional regardless of grid span. A pseudo-element on the thumb adds an inset 1px `--border` "frame" that transitions to `color-mix(in oklab, var(--accent) 70%, transparent)` on parent hover. The thumb also has a vignette overlay.
  - `.thumb-disc` (top of thumb, full width minus 14px side padding) — a mono 9.5px 0.18em uppercase row holding the **discipline label** on the left (`Still` / `Motion` / `Motion · Featured`) and, when relevant, an **AI badge** on the right. The AI badge is a small accent-bordered pill: `padding: 4px 6px 3px; border: .5px solid color-mix(in oklab, var(--accent) 55%, transparent); border-radius: 3px; background: color-mix(in oklab, var(--accent) 10%, transparent); color: var(--accent); letter-spacing: .2em`. This is the at-a-glance signal that lets viewers scan the grid and immediately know which pieces are still vs motion vs AI-assisted.
  - `.thumb-cap` (bottom-left) — mono 10px 0.14em uppercase, 68% paper opacity, with a 5px `--accent` status dot inside a 3px-radius halo, holding the category (e.g. "Editorial · Cover series", "Title sequence", "Brand identity").
  - `.thumb-runtime` (bottom-right) — same mono treatment as the cap. For motion pieces this is a runtime ("02 : 14"); for stills it's a format spec ("A1 · Print", "Identity", "Identity · Print", "Digital · OOH").
  - `.meta` — under the thumb, 16px top padding, 4px side padding, grid `1fr auto / auto` 24px column gap. Holds the display-font project title (italic-if-available, `clamp(22px, 1.9vw, 28px)`), the mono catalog number ("SW—01"), and a tag row spanning both columns (mono 11px 0.08em uppercase `--muted`, with `--border`-colored "/" separators and the client name colored to 70% paper opacity).
  - Tile hover: `transform: translateY(-4px)` over 0.5s `cubic-bezier(.2,.7,.2,1)`, plus the accent border highlight.

- **Sixteen animated thumbnails**: Each tile uses a unique CSS-only motion poster, defined in `thumbnails.css`. They share two contracts: they all respect `var(--motion-speed)` (a divisor on every animation duration — 1.0 default, 0.55 subtle, 1.7 heavy) and they all read `var(--accent)` for their highlight color so the palette stays cohesive when the user swaps colors. The animations are placeholders — in production every tile gets replaced with a real `<video>` (for motion projects) or a still image / very subtly animated still (for graphic projects). The thumbnails are designed as previews: even still-work tiles use subtle motion (rotating monogram, drifting wordmark layers, soft pulse) so the grid breathes. Full per-tile spec:

  | # | Class | Mechanism |
  |---|---|---|
  | 01 | `.thumb-parallax` | Three giant wordmark layers ("PARALLAX") at different sizes and 7–14% opacity, translating horizontally at 22s / 15s / 28s, two forward + one reversed. |
  | 02 | `.thumb-aurora` | Three soft horizontal light bands (90deg gradients masking to blur 28px), screen-blend-mode, at 11/14/17s ease-in-out alternating skew + Y drift. |
  | 03 | `.thumb-closer` | Marquee — display-font "Closer" repeated horizontally, accent-color separators, translating -50% in 14s linear. |
  | 04 | `.thumb-halcyon` | "H" monogram made of two vertical bars + a crossbar; the whole mono spins on a 20s loop while the crossbar pulses scaleX 0.4 ↔ 1 on a 4s loop. |
  | 05 | `.thumb-slowburn` | 8 ember particles (3px accent-colored dots with glow shadow) rising from bottom with staggered delays, 7–10s duration. Translate up 110cqh + slight x drift, fade in then out. |
  | 06 | `.thumb-vertex` | Inline SVG wireframe icosahedron — pentagon + cross-lines + central circle, paper-colored strokes with one accent-colored polygon, rotating 22s linear. |
  | 07 | `.thumb-margin` | Dot-grid background (22px pitch, paper at .22 opacity) overlaid with a screen-blend `--accent` radial glow that walks a square pattern over 10s. |
  | 08 | `.thumb-newearth` | Three concentric rings expanding on staggered 6s ease-out loops, with a small `--paper` core glowing in accent. |
  | 09 | `.thumb-orbit` | Dashed circle "track" rotating on a 12s loop, with an accent dot pinned to its top edge so it orbits a static paper nucleus. |
  | 10 | `.thumb-static` | Eight overlapping radial-gradient dot textures shifting position on a 0.5s `steps(8)` infinite, with a soft `--accent` scanline gradient translating Y on a 7s linear. |
  | 11 | `.thumb-nightshift` | Vertical paper-colored ghost bars spaced across the frame; centered display-font "NIGHT SHIFT" in `--accent` with a glow text-shadow, flickering on a 5s ease-in-out keyframe. |
  | 12 | `.thumb-echo` | 18-bar EQ across the bottom — 1.8s ease-in-out scaleY 0.4 ↔ 8 with hand-staggered delays. Every third bar uses `--accent` instead of `--paper`. |
  | 13 | `.thumb-meridian` | Soft sun (38% radial-gradient circle blending accent + warm orange) rising over a 3-line horizon, 14s ease-in-out translateY 40% ↔ -10%. |
  | 14 | `.thumb-pulse` | Inline SVG ECG path, accent-colored 1.4px stroke, with `stroke-dasharray: 600` and `stroke-dashoffset` animating 600 → -600 in 4s linear. |
  | 15 | `.thumb-dreamscape` | Three large soft-blur (40px) blobs in accent / dusky-blue / dusty-rose, screen-blend, drifting and scaling on 13–20s ease-in-out loops. |
  | 16 | `.thumb-zero` | Stacked digits "3 / 2 / 1 / 0" cycling visibility on staggered 4.8s `steps(1)` keyframes (the "0" is accent-colored), with an expanding ring pseudo-element behind. |

### 5 — Clients

- **Purpose**: Selected clients list.
- **Layout**: Section head exactly like the works section ("02 Selected clients"). The list is a 4-column grid (responsive: 2-column under 900px) with each cell a 32px-vertical-padded row, 1px `--border` bottom, display-font italic-or-not `clamp(24px, 2.2vw, 34px)` -.02em letter-spacing. Each cell starts with a 24px-min-width right-aligned mono numeral (01–16) followed by the client name. Hover: the cell's color transitions to `--accent` over 0.2s.
- **Content (16 items)**: Nike, A24, Netflix, HBO, Patagonia, Sonos, FX Network, Halcyon Studios, Sports Tribune, Margin Capital, Orbit Health, Meridian Coffee, Apple TV+, It's Nice That, Adidas Originals, Klim Type Foundry.

### 6 — Info / About

- **Purpose**: Bio, recognition, press, speaking — framed around the dual graphic-and-motion practice and the AI-augmented workflow.
- **Layout**: Section head "03 Information" with a one-line lede. Below: a 2-column grid (1fr 1fr, 80px gap, becomes 1-column under 900px).
  - **Left column**: `.about-lead` — display-font, weight `var(--display-weight)`, `clamp(28px, 3vw, 44px)`, line-height 1.15, max-width 18ch, with one `<em>` colored `--accent`. Reads: *"Twelve years making things — still and in motion."* (with "still and in motion" emphasized).
  - **Right column**: a nested 2-column grid of body text — Varela Round 14px 1.65, 78% paper opacity. Two short paragraphs per column, p+p sibling has 1em top margin. Paragraph 1 introduces the dual practice (identities, title sequences, editorial covers, key art, generative work). Paragraph 2 covers history (lead motion designer at Buck, then Berlin design director, now teaches an AI-augmented design workshop at the Royal Academy in The Hague). Paragraph 3 covers the studio model (small, with collaborators, with generative AI tools folded in as a sketchpad / moodboard / collaborator). Paragraph 4 is the contact prompt (film opening, brand launch, poster, audio, or stranger ideas — inbox open through October 2026).
  - **Below both, spanning full width**: a 4-column `<dl>` grid (1px `--border` top, 48px top padding/margin), each item a `<dt>`/`<dd>` pair. `<dt>` is mono 10px 0.14em uppercase `--muted` with 14px bottom margin; `<dd>` is sans 13px 1.6 `--paper` with bold (weight 500) lines. The four sections are:
    1. **Practice** — Graphic design / Motion design / AI-assisted, plus location (Athens · By appointment).
    2. **Tools · AI** — Midjourney (stills) / Runway (motion) / Sora (film) / Stable Diffusion (custom), plus a small-text note "+ AE, Cinema 4D, Figma".
    3. **Recognition** — ADC Gold 2024 / D&AD Pencil 2023 / Motionographer FOTY 2022.
    4. **Press · Speaking** — It's Nice That feature / OFFF Barcelona 2025 / Pictoplasma 2024 / STASH 156.

### 7 — Contact CTA

- **Purpose**: Big closing call-to-action with email + socials.
- **Layout**: 1px `--border` top, vertical padding `clamp(120px, 18vh, 200px)`. Eyebrow "↘  Let's talk" in mono 11px 0.18em uppercase `--muted` (the arrow glyph is `--paper`). Headline `<h2>`: three lines of display-font at `clamp(64px, 12vw, 220px)` line-height 0.9 letter-spacing `var(--display-tighten)`, with the third line `<em>` accented. Reads: *"Have something to make — / a brand, a film, a poster, / or somewhere between?"*
- **Foot**: 80px top margin, 2-column grid (1fr 1fr, 32px gap, align-end).
  - **Left**: `mailto:` link styled as the email itself — display-font italic-if-available `clamp(28px, 3.2vw, 48px)` with a 1px `--border` bottom (18px padding-bottom), inline-flex 18px gap with an SVG-equivalent CSS arrow (28px-wide currentColor bar + 8px square chevron rotated 45deg). Hover: color and border-color both transition to `--accent` over 0.25s.
  - **Right**: 32px-gap horizontal list of social links (mono 13px 0.06em, color `--muted`, hover to `--paper`).
- **Email**: `hello@lambrakis.studio` — replace with the real address.

### 8 — Footer

- **Layout**: 1px `--border` top, 28px top + 32px bottom padding. 3-column grid (1fr 1fr 1fr, center-aligned), mono 11px 1.5 0.04em `--muted`.
- **Content**: © 2026 line on the left, a centered tagline ("Site built in Athens — no analytics, no cookies, no nonsense"), version + back-to-top link on the right.

## Interactions & Behavior

- **Live clock**: `setInterval(1000)` updates the top-right time display. Format `HH:MM:SS`, tabular-nums. Reads the visitor's local time (in production, lock to Athens / `Europe/Athens` for accuracy regardless of visitor).
- **Smooth scroll**: All `a[href^="#"]` links get a click handler that `preventDefault()`s and calls `window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 64, behavior: 'smooth' })` to account for the sticky nav.
- **Hover states**:
  - Project tile — translateY(-4px) over 0.5s `cubic-bezier(.2,.7,.2,1)`, inset border becomes `--accent`.
  - Reel — play disc fills, triangle inverts, "Play reel" text becomes accent (0.25s).
  - Clients list cell — color → `--accent` (0.2s).
  - Contact email — color and underline → `--accent` (0.25s).
  - Social links — `--muted` → `--paper` (0.2s).
  - Nav links — color → `--accent` (0.2s).
- **Ticker**: Top banner translates `0 → -50%` over 60s linear, infinite. Content is duplicated in the markup so the loop is seamless.
- **Reel click**: In the prototype, currently no-op. In production wire it to either open a modal video player or navigate to `/reel`.
- **All keyframe animations** use `var(--motion-speed)` as a divisor on `animation-duration` — when the Tweaks panel sets it to 0.55 (subtle), every animation slows; at 1.7 (heavy) every animation speeds up.
- **Responsive**: Under 900px viewport, the works grid collapses to 1-column (every project `grid-column: span 12 !important`), clients list goes to 2-column, about/contact grids stack, nav links hide (a mobile menu is **not** in the prototype — design and add one for production).

## State Management

The only stateful pieces are:
- The Tweaks panel's four values (`typography`, `accent`, `palette`, `motion`) — held in the React `useTweaks` hook in the prototype. In production, if shipping the Tweaks panel, persist these to `localStorage`. If removing the panel, hard-code the values into the CSS custom properties at `:root` and delete the React/Babel runtime entirely.
- The live clock — interval-driven, no persistence.

No data fetching. The content is fully static (replace with CMS-driven content if the client wants to update without redeploying — Sanity, Contentful, or just MDX files all work).

## Design Tokens

### Colors

The palette is driven by CSS custom properties on `:root`. Three preset palettes are defined; pick one to commit to (default is **Ink**) or keep all three available via the Tweaks panel.

**Ink (default)**
- `--bg`: `#06080d`
- `--surface`: `#10141c`
- `--border`: `#1d2330`
- `--paper`: `#ECE7DD`
- `--muted`: `#6C7080`

**Navy**
- `--bg`: `#070b18`
- `--surface`: `#101732`
- `--border`: `#1b2547`
- `--paper`: `#ECE7DD`
- `--muted`: `#6C7080`

**Graphite**
- `--bg`: `#0e0e10`
- `--surface`: `#181820`
- `--border`: `#26262e`
- `--paper`: `#F0EDE6`
- `--muted`: `#7A7782`

**Accent (one of four)**
- Champagne `#D9B97A` (default)
- Electric Ice `#86B5FF`
- Signal Coral `#FF6B47`
- Acid Lime `#9CFF66`

**Status / utility**
- Availability dot: `#6BE07A`
- Selection: `--accent` background, `--bg` text

### Typography

Font is delivered via Google Fonts (`<link href="https://fonts.googleapis.com/...">`). Default pairing is **Round** (Varela Round + JetBrains Mono). Three alternates are available.

| Pairing | Display | Sans (body) | Mono | `--display-tighten` | `--display-italic` | `--display-weight` |
|---|---|---|---|---|---|---|
| Round (default) | Varela Round | Varela Round | JetBrains Mono | -.02em | normal | 400 |
| Soft | Nunito | Nunito | JetBrains Mono | -.025em | normal | 800 |
| Geometric | Quicksand | Quicksand | Space Mono | -.02em | normal | 700 |
| Comfort | Comfortaa | Mulish | IBM Plex Mono | -.02em | normal | 700 |

None of these fonts have a true italic; emphasis is communicated through `--accent` color on `<em>`. The `--display-italic` variable is plumbed throughout so swapping to a serif pairing with real italics works without source changes.

**Type scale (rendered values)**
- Hero title: `clamp(56px, 11.5vw, 200px)` / line-height 0.92
- Contact title: `clamp(64px, 12vw, 220px)` / line-height 0.9
- Section labels: `clamp(28px, 3.5vw, 48px)` / line-height 1
- About lead: `clamp(28px, 3vw, 44px)` / line-height 1.15
- Project title: `clamp(22px, 1.9vw, 28px)` / line-height 1
- Clients cell: `clamp(24px, 2.2vw, 34px)`
- Email link: `clamp(28px, 3.2vw, 48px)`
- Reel center: `clamp(36px, 6.5vw, 96px)`
- Hero bio body: 16px / 1.45
- About body: 14px / 1.65
- About info dd: 13px / 1.6
- Mono labels: 11px / 1 / 0.14em or 0.18em letter-spacing depending on context
- Footer / fine print: 11px / 1.5 / 0.04em

### Spacing

- Container max-width: **1640px**
- Container side gutters: **32px** (`--gutter`)
- Section vertical padding: `clamp(80px, 12vh, 160px)` (most) / `clamp(120px, 18vh, 200px)` (contact)
- Hero vertical padding: `clamp(80px, 12vh, 160px) 0 clamp(60px, 8vh, 100px)`
- Section-head bottom margin: 56px
- Grid row gap (works): 32px
- Grid col gap (works): 24px
- Project meta top padding: 16px
- About grid gap: 80px
- About cols gap: 32px
- About info top padding/margin: 48px
- Contact foot top margin: 80px
- Nav height: 64px
- Banner height: 32px
- Footer padding: 28px top / 32px bottom

### Border radii

- Reel card: 8px
- Project thumb: 6px
- Tweaks panel & buttons: 6–7px (lives inside the prototype only)

### Shadows / glows

- Availability dot halo: `0 0 0 4px rgba(107, 224, 122, .18)`
- Brand mark dot: pulsing scale only (no shadow)
- Reel play-disc on hover: solid paper fill (no shadow)
- Slow Burn embers: `0 0 8px color-mix(in oklab, var(--accent) 60%, #ff7b3a)`
- Orbit accent dot: `0 0 20px color-mix(in oklab, var(--accent) 80%, transparent)`
- Pulse trace: `drop-shadow(0 0 6px color-mix(in oklab, var(--accent) 80%, transparent))`
- Reel grain: `mix-blend-mode: overlay` at 8% opacity
- Aurora bands: `filter: blur(28px); mix-blend-mode: screen`
- Dreamscape blobs: `filter: blur(40px); mix-blend-mode: screen`

### Motion / timing

- Default speed multiplier: 1.0 (Tweaks: subtle 0.55, heavy 1.7). All keyframe `animation-duration` values are divided by this multiplier so the same CSS works for all three intensities.
- Easing for hover transforms: `cubic-bezier(.2, .7, .2, 1)`
- Standard hover transition durations: 0.2–0.25s (links and small elements), 0.5s (tile lift)
- Ticker loop: 60s linear (at speed 1)
- All other named keyframes and their base durations are documented in the thumbnail table above.

## Assets

There are **no binary assets** in this design — every visual is CSS/SVG generated. Production should:

- **Motion tiles** (10 of 16): replace the CSS animation with a real video clip — `<video autoplay muted loop playsinline poster="cover.jpg" src="my-clip.mp4">`. Keep the 16:9 aspect ratio, the inset-border hover treatment, and the `.thumb-disc` + `.thumb-cap` + `.thumb-runtime` overlays sitting on top.
- **Still tiles** (6 of 16): replace the CSS animation with a high-resolution still image (or a very subtly animated still — a slow zoom, parallax layers, or a gentle scale-breath). The same overlay chrome stays on top.
- **AI-tagged tiles** (5 of 16, see the works table): just keep the `<span class="ai">AI</span>` inside `.thumb-disc` so the badge renders. No other visual change — the badge is the signal.
- **Hero reel preview**: replace `.reel-bg + .reel-shape + .reel-grain` with a real `<video>` (the reel is a stills + motion montage). Keep the `.reel-overlay` and play-disc treatment on top — the play disc should trigger a fullscreen modal or navigate to `/reel`.
- Provide a real client list (the current 16 are illustrative).
- Provide real bio copy, AI tool list, recognition / press / speaking entries.
- Add favicons and an OG image (not currently in the prototype).
- Add real social URLs to the contact section.
- If the studio commissions a logo, replace the CSS-drawn brand mark (concentric paper-and-accent circle) with the real mark.

The Google Fonts dependency can stay as a CDN link, or self-host the WOFF2 files for performance and privacy.

## Screenshots

Eight reference screenshots are bundled in `screenshots/`, captured at ~900px viewport width and ordered top-to-bottom through the page:

1. `01-showreel.png` — Top: availability banner + nav + hero title
2. `02-showreel.png` — Hero foot (bio / stats / scroll cue) + start of reel preview
3. `03-showreel.png` — Reel preview card + Selected Works section head
4. `04-showreel.png` — Works grid, upper rows (Parallax, Aurora, Closer feature)
5. `05-showreel.png` — Works grid, middle rows
6. `06-showreel.png` — Clients list
7. `07-showreel.png` — Info / About section
8. `08-showreel.png` — Contact CTA + footer

These are still frames — the page is heavily animated and the thumbnails are CSS keyframe loops, so the live prototype is the source of truth for motion timings.

## Files

Files included in this handoff folder:

- `Showreel.html` — the full markup, base styles, and small interaction script. Self-contained except for the two referenced CSS/JSX files and the React/Babel CDN.
- `thumbnails.css` — the per-tile motion-poster CSS for all 16 project thumbnails plus the shared `.thumb` shell rules.
- `app.jsx` — the Tweaks panel app (typography pairing / accent / palette / motion intensity). React component. Optional in production.
- `tweaks-panel.jsx` — the generic Tweaks UI shell (panel chrome, form controls, drag, host messaging). Only needed if shipping the Tweaks panel.

Open `Showreel.html` in any modern browser to see the prototype. The Tweaks panel only appears when the host application activates "edit mode" — in a standalone deployment it's invisible unless you keep the panel and wire up a button to post the `__activate_edit_mode` message yourself, or remove the React/Babel block entirely and commit to one set of tokens.

## Production checklist

1. Pick the framework (Astro / Next.js / plain HTML / etc.).
2. Decide whether to keep or remove the Tweaks panel.
3. Port the CSS custom-property tokens to your framework's tokens system (or keep them as CSS variables).
4. Recreate the section markup with semantic HTML, using your framework's components for any repeated structure (project tile, section head, about info item).
5. Implement the 16 thumbnail animations — they translate to any framework as plain CSS, no JS required. You may want a `<motion-tile>` web component or React component that takes a `kind` prop and renders the right inner markup.
6. Wire the reel and tile placeholders to real `<video>` elements.
7. Lock the clock timezone to `Europe/Athens` (or wherever the studio lives) using `Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Athens', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })`.
8. Add a mobile menu — the current responsive treatment hides the nav links below 900px without providing an alternative.
9. Add `prefers-reduced-motion: reduce` queries to gate the high-frequency animations (ticker, ember drift, EQ bars, static field, grain). Replace with static stand-ins.
10. Add page metadata: `<title>`, `<meta name="description">`, OG/Twitter cards, favicons.
11. Self-host fonts or pre-load them (`<link rel="preload" as="font" crossorigin>`) to avoid the FOUT.
12. Accessibility pass: confirm all interactive elements (project tiles, reel) have a real `<button>` or `<a>` wrapper with descriptive `aria-label`s, ensure focus rings are visible, verify color contrast (the muted-text-on-bg ratios are close to the floor — check with the actual chosen accent).
