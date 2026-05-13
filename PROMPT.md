# Build prompt — Showreel

Copy everything between the `---` lines below and paste it into your agentic IDE. This works in:

- **Google Antigravity** (Gemini-based agent IDE)
- **Claude Code**
- **Cursor** (Agent mode)
- **Windsurf / Cascade**
- Any IDE with a planning/agent mode

Before you run it, make sure `my_materials/` contains:
- `my_materials/videos/` — your motion clips
- `my_materials/stills/` — your graphic / still work (posters, identity, editorial, key art)
- `my_materials/posters/` — optional poster JPGs for motion clips
- `my_materials/cv.{pdf,docx,md}` — your CV
- `my_materials/linkedin.pdf` — your exported LinkedIn profile
- `my_materials/bio.md` — optional tone/copy notes

Flag AI-assisted projects by appending `-ai` to the filename (e.g. `dreamscape-ai.mp4`).

---

```
PROJECT
=======
Build a single-page motion + graphic design portfolio website ("showreel")
and populate it with my real content from `my_materials/`. Work in tasks:
plan first, get my approval on the plan, then execute. Don't write any
code until I confirm the plan.

DESIGN REFERENCE
================
The full design spec is in `design_handoff_showreel/`. Start by reading
`design_handoff_showreel/README.md` end to end. The HTML / CSS / JSX files
in that folder are design references, not code to ship — recreate the
design in this codebase using its existing framework and patterns. If the
repo is empty, scaffold with **Astro** (preferred for this static,
content-heavy, motion-rich page) or **Next.js App Router with static
export**. Use CSS custom properties for tokens; don't pull in a CSS
framework unless this repo already uses one. Reference screenshots are in
`design_handoff_showreel/screenshots/` — open them to verify your
recreation matches.

PRODUCTION RULES (all apply)
============================
- Pixel-perfect to the README's tokens, spacing, type scale, and motion.
- Recreate all 16 thumbnail animations as CSS keyframes (no JS motion).
- Smooth-scroll nav anchors with -64px sticky-nav offset.
- Live clock locked to my city's timezone via `Intl.DateTimeFormat`
  (pick the timezone from my CV/LinkedIn).
- `prefers-reduced-motion: reduce` disables ticker, embers, EQ bars,
  static field, and grain.
- Add a real mobile menu under 900px viewport (the prototype just hides
  the desktop nav — design one).
- Accessibility: real `<button>` / `<a>` wrappers on every interactive
  surface, visible focus rings, `aria-label`s, contrast verified.
- Drop the Tweaks panel — hard-code the default tokens (Round / Ink /
  Champagne / motion 1.0) at `:root`.
- Self-host Varela Round + JetBrains Mono with `<link rel="preload">`.
- Page meta: title, description, OG/Twitter cards, favicon.

MY CONTENT
==========
My real materials are in `design_handoff_showreel/my_materials/`:
- `videos/` — motion clips
- `stills/` — graphic / still work (posters, identity, editorial, key art)
- `posters/` — optional poster JPGs matching motion clip filenames
- `cv.{pdf,docx,md}` — my CV
- `linkedin.pdf` — exported LinkedIn profile
- `bio.md` — optional tone/copy notes (read if present)

Project taxonomy: every project tile has a **discipline** (Still / Motion)
and an optional **AI** flag. I flag AI-assisted work by appending `-ai`
to the filename. Honor this in the discipline pill at the top of each
tile (Still / Motion on the left, AI badge on the right when applicable).

PLAN PHASE — do this BEFORE writing any code
============================================

1. Read `cv.*` and `linkedin.pdf`. Extract:
   - Full name and the spelling I use professionally
   - Studio / practice name (if any)
   - City, country, and timezone I work from
   - Years in the industry
   - Total notable projects (rough but honest)
   - Awards and press (titles + years)
   - Speaking engagements (event + year)
   - Past employers and current role
   - Which AI / generative tools I use (Midjourney, Runway, Sora,
     Stable Diffusion, ComfyUI, Kling, Pika, etc.) and what for
   - Email address
   - Social / portfolio URLs (Instagram, Vimeo, Behance, Are.na, etc.)
   - A 2–3 sentence first-person bio mentioning both disciplines + AI
   - A one-line tagline summarizing what I do across both disciplines

2. List `videos/` and `stills/`. For each asset, derive what you can from:
   - The folder it sits in (decides discipline: motion vs still)
   - The filename (project title)
   - The `-ai` suffix (decides AI flag)
   - Any sidecar `.json` (overrides everything)
   - Cross-reference with the CV / LinkedIn for client names, dates,
     and categories where the filename is ambiguous.

3. Compile a `CONTENT.md` at the repo root with everything extracted,
   organized by section (Hero / Works / Clients / About / Contact). The
   Works section should be a table with columns:
   `# | Title | Discipline | AI? | Category | Client | Year | Asset path`.
   For anything you couldn't confidently extract, mark it
   `[NEEDS CONFIRMATION]` with your best guess + source.

4. **Stop and show me `CONTENT.md` before continuing.** Do not write any
   site code until I approve it.

BUILD PHASE — only after I approve `CONTENT.md`
==============================================

5. Scaffold the project (Astro or Next.js, your call — explain why).

6. Recreate the design per the README. Wire content:
   - Motion projects → `<video autoplay muted loop playsinline poster=...>`
   - Stills → `<img>` with subtle hover motion (1.5% scale-breath on a
     slow loop, OR mouse-parallax — don't leave them frozen).
   - Every tile gets a `.thumb-disc` pill showing **Still** or **Motion**
     at the top-left, and the **AI** badge at the top-right when applicable.
   - The hero `.reel` should be a real montage video (stills + motion).

7. If I have fewer than 16 projects total, reduce the grid gracefully —
   keep the editorial rhythm (mix of 4/6/8/12 spans). Don't leave empty
   tiles. Don't pad with placeholders.

8. Use my real name, location, bio, stats, clients, awards, press,
   speaking, AI tool list, email, and socials throughout. Replace every
   "Panos Lambrakis" and "Athens" placeholder. The "Tools · AI" column
   in the About section must list **my actual** tools from CONTENT.md,
   not the defaults in the design reference.

9. Run the build. Report any errors. Optimize: compress hero video to
   ≤ 8 MB, generate WebP variants of stills, lazy-load below-the-fold
   tiles.

10. Stop and let me review before any final polish.

IF SOMETHING IS MISSING
=======================
- If `my_materials/` is missing or empty, stop and ask me to add files.
- If a project has no asset, drop it from the grid rather than leaving
  a blank tile.
- If you can't determine a project's year or category from the filename
  and the CV doesn't help, mark `[NEEDS CONFIRMATION]` in CONTENT.md
  and ask me before guessing.
```
