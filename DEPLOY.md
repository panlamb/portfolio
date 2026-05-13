# Deploying the showreel

Once Antigravity (or you) has built the site, here's how to put it online for free — no domain required. Four options, easiest first.

---

## Option 1 — Netlify Drop (fastest, no terminal)

**Best for**: One-off shares. 30 seconds end-to-end.

1. Run the build in your terminal: `npm run build` (or whatever the framework uses — Astro spits out `dist/`, Next.js with static export spits out `out/`).
2. Open **[app.netlify.com/drop](https://app.netlify.com/drop)** in your browser.
3. Drag the `dist/` (or `out/`) folder onto the page.
4. You get a URL like `loud-falcon-9b2c.netlify.app` instantly. Done.

To change the subdomain or update later, sign up for a free Netlify account and link the deployment.

---

## Option 2 — GitHub Pages (free forever, version-controlled)

**Best for**: Long-term hosting. You own the URL, the site updates automatically when you push.

### Step-by-step

1. **Create a GitHub account** at [github.com](https://github.com) if you don't have one.

2. **Create a new repository**:
   - Click the `+` → **New repository**.
   - Name it `showreel` (or whatever).
   - Set **Public** (Pages requires public for free accounts).
   - Don't add a README — your project already has files.

3. **Push your project** from the terminal (in the project folder, after the build is committed):

   ```bash
   git init
   git add .
   git commit -m "Initial showreel"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/showreel.git
   git push -u origin main
   ```

4. **Add a GitHub Actions workflow** to build + deploy on every push. Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             # CHANGE THIS to your build output folder:
             # Astro → dist
             # Next.js (static export) → out
             # Vite → dist
             path: ./dist

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

5. **Enable GitHub Pages**:
   - Go to your repo on github.com → **Settings** → **Pages** (in the left sidebar).
   - Under **Source**, select **GitHub Actions**.
   - Save.

6. **Push the workflow file**:

   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GH Pages deploy workflow"
   git push
   ```

7. Wait 1–2 minutes. Your site is live at:

   `https://YOUR-USERNAME.github.io/showreel/`

   Watch the deploy progress under the repo's **Actions** tab.

### Framework-specific base path note

GitHub Pages serves your site under `/repo-name/` (unless you use a custom domain or a `username.github.io` repo). Tell your framework about that base path so asset URLs resolve correctly:

**Astro** — in `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/showreel',
});
```

**Next.js (static export)** — in `next.config.js`:
```js
module.exports = {
  output: 'export',
  basePath: '/showreel',
  images: { unoptimized: true },
};
```

Skip the base path entirely if you name your repo `YOUR-USERNAME.github.io` — that gives you `https://YOUR-USERNAME.github.io/` as the root.

### Future updates

Every `git push` to `main` redeploys automatically. Edit, commit, push, done.

---

## Option 3 — Vercel (most ergonomic, free for hobby)

**Best for**: If you're going to iterate constantly and want previews on every PR.

1. Sign up at [vercel.com](https://vercel.com) with GitHub.
2. **Import** your repo.
3. Vercel auto-detects Astro / Next.js / Vite — accept the defaults.
4. Deploy. You get `your-showreel.vercel.app`.

Every push to `main` redeploys; pull requests get their own preview URLs.

---

## Option 4 — Cloudflare Pages (fast, generous free tier)

**Best for**: If you want the snappiest global CDN.

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com).
2. **Connect to GitHub** and pick the repo.
3. Set build command (`npm run build`) and output (`dist` or `out`).
4. Deploy. You get `your-showreel.pages.dev`.

---

## When you want a real domain later

Buy one from [Porkbun](https://porkbun.com) (~$10/yr for `.studio`) or [Cloudflare](https://www.cloudflare.com/products/registrar/) (at cost — usually the cheapest).

Then in your host (Netlify / Vercel / Cloudflare Pages / GitHub Pages settings):
1. Add the domain as a **custom domain**.
2. Copy the DNS records the host gives you.
3. Paste them into your domain registrar's DNS settings.
4. Wait 5–60 minutes for propagation.

HTTPS is automatic on all four platforms.

---

## Asking Antigravity to set this up

If you want the agent to configure GitHub Pages for you, paste this **after** it has finished the initial build:

```
Now configure deployment to GitHub Pages.

1. Add the GitHub Actions workflow from `design_handoff_showreel/DEPLOY.md`
   at `.github/workflows/deploy.yml`. Use the `dist` or `out` path that
   matches the framework you used.
2. Configure the framework's base path so assets resolve under
   `/REPO-NAME/`. If the framework is Astro, edit `astro.config.mjs`;
   if Next.js, edit `next.config.js`. Use a placeholder REPO-NAME I can
   find-and-replace before pushing.
3. Add a `.gitignore` covering `node_modules/`, build outputs, and
   `.env*` files.
4. Add a top-level `README.md` explaining how to run locally, how to
   build, and how to push to deploy.
5. Stop and tell me the exact `git` commands I need to run from the
   project folder to:
   a) initialize the repo,
   b) push to a brand-new GitHub repo I'll create at github.com,
   c) verify the deploy is live.

Don't run `git` commands yourself — I'll do those on my machine after
I create the GitHub repo.
```
