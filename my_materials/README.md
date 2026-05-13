# Your materials go here

This folder is where **you** drop your real files. Claude Code reads from this folder when you give it the prompt — it does **not** scrape the web.

## Structure

```
my_materials/
├── videos/        ← motion clips
├── stills/        ← graphic / still work (posters, editorial, key art, identity)
├── posters/       ← optional poster frames for motion clips (matching filenames)
├── cv.pdf         ← your CV (pdf, docx, or md all work)
├── linkedin.pdf   ← export from LinkedIn → Me → Save to PDF
└── bio.md         ← optional notes / tone preferences
```

## What to put where

### `videos/` and `stills/`

Drop your project assets here. Two folders because the site supports both:

- `videos/` — motion clips (MP4)
- `stills/` — graphic / print / editorial / key-art images (JPG or PNG)

Suggested naming (number = display order on the site):

```
videos/01-parallax.mp4
videos/02-aurora.mp4
stills/03-margin.jpg
stills/04-meridian.png
...
```

If a project is **AI-assisted**, just append `-ai` to the filename and Claude Code will surface the AI badge automatically:

```
videos/05-dreamscape-ai.mp4
stills/06-new-earth-ai.jpg
```

The name after the dash becomes the project title. Claude Code will cross-reference your CV/LinkedIn for the client + year + category.

If a video name is ambiguous and you want to be explicit, drop a sidecar JSON next to it:

```
videos/03-closer.mp4
videos/03-closer.json   ← optional
```

```json
{
  "title": "Closer",
  "client": "Nike Running",
  "year": 2024,
  "category": "Ad campaign",
  "discipline": "motion",
  "ai": false,
  "runtime": "00:30",
  "featured": true
}
```

For stills, use `"discipline": "still"` and replace `runtime` with `format` (e.g. `"A1 · Print"`, `"Identity"`, `"Digital · OOH"`).

Recommended encoding: H.264 MP4, 1920×1080 or smaller, ≤ 8 MB each so the site loads fast. The motion tiles will autoplay muted and loop, so keep clips short (5–20 sec) and edit them as seamless loops where possible. Stills should be at least 2400px on the long edge.

### `posters/`

Optional — but recommended for fast first paint. JPG poster frames with the same filename as the video:

```
posters/01-parallax.jpg
posters/02-aurora.jpg
```

If you skip this, Claude Code will tell `<video>` to use its first frame as the poster.

### `cv.{pdf,docx,md}`

Your CV in any of those formats. Claude Code will pull your bio, years of experience, employers, awards, press, and speaking engagements from this.

### `linkedin.pdf`

LinkedIn doesn't allow scraping (auth wall), so you have to export it:

1. Open LinkedIn → click your profile photo (top right) → **View Profile**
2. Click **More** (under your name) → **Save to PDF**
3. Rename the download to `linkedin.pdf` and drop it here

### `bio.md` (optional)

Free-form notes if you want to guide tone, copy preferences, what to omit, or things not on your CV/LinkedIn that you want included. Example:

```markdown
# Tone

- Keep the bio in first person, two sentences max.
- Don't mention the Berlin studio years — I want to focus on the solo practice.
- Lead with the title-sequence work; that's what I'm leaning into for 2026.

# Things to include

- I'm currently teaching at the Royal Academy in The Hague.
- The available banner should say Q3 2026 specifically.
- Email is hello@yourdomain.com, not the one on LinkedIn.
```

## After dropping your files

Open Claude Code in this repo and paste the prompt from `PROMPT.md`. Claude Code will:

1. Read your CV + LinkedIn + bio notes
2. Read your video filenames (and sidecar JSON if you wrote any)
3. Compile a `CONTENT.md` draft showing everything it extracted
4. **Stop and wait for you to review** before writing any code
5. After you approve, build the site with your real content wired in
