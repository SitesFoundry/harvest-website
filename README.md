# Harvest Eco Solutions Limited — website

Marketing site for Harvest Eco Solutions Limited (solar systems, ESS storage and
AI smart energy-saving control), served at `https://harvest.cn/`.

This is a React single-page application built with Vite 7 and Tailwind 4,
published to GitHub Pages. It replaces the previous Manus-hosted deployment and
depends on nothing from Manus.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Two steps:

1. `vite build` writes the bundle into `dist/`.
2. `scripts/postbuild.mjs` completes `dist/`:
   - copies `index.html` to `404.html`, which is what makes deep links work on
     GitHub Pages (see below);
   - **asserts** the migration invariants — see "Build-time assertions" below.

`dist/` is the only folder that gets deployed. It is generated in CI and is not
committed.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`dist/` to GitHub Pages. One-time repository settings:

- `Settings → Pages → Build and deployment → Source`: **GitHub Actions**
- `Settings → Secrets and variables → Actions → Variables`: `FORMSPREE_ID`
  (see "Contact form")

### The `SITE_BASE` variable

`vite.config.ts` reads `SITE_BASE` and Vite exposes it as
`import.meta.env.BASE_URL`. Two places consume that single value:

- `src/App.tsx` — the wouter router base
- `src/lib/asset.ts` — the prefix applied to every image path

Because both read the same value, the router prefix and the asset prefix cannot
disagree.

| Serving context | `SITE_BASE` |
| --- | --- |
| GitHub Pages project-site preview (`/harvest-website/`) | `/harvest-website/` |
| Custom domain, from the domain root | `/` |

**At cutover**, change `SITE_BASE` to `/` and redeploy. Until then it must stay
`/harvest-website/`: with `/`, the preview loads a blank page and 404s every
asset, because the assets are requested from the domain root where they do not
exist.

## Contact form

The original site posted to a tRPC endpoint (`/api/trpc/contact.submit`) on the
Manus-hosted Express server, which relayed the inquiry over SMTP. GitHub Pages
has no backend, so the form now posts to **Formspree** — the same arrangement as
the ISCO site.

- `src/lib/form.ts` holds the delivery logic.
- The form id comes from `VITE_FORMSPREE_ID` at build time and is routed to the
  build from the repository variable `FORMSPREE_ID`.
- Suggested receiving address: `sales@harvest.cn` (the address the site itself
  publishes).

### It fails loudly, on purpose

When the endpoint is not configured, `submitInquiry()` throws, the page shows the
localised error message and points the visitor at WhatsApp. It must never report
success for an inquiry nobody will receive: a silently dropped lead looks to the
visitor exactly like a delivered one, so nobody goes looking for it.

For the same reason `postbuild.mjs` prints a prominent warning when
`VITE_FORMSPREE_ID` was not set. It does not fail the build — the site is worth
deploying without a form — but it never passes silently.

### ⚠️ Formspree's free plan is 50 submissions per month

That is a **production limit, not a suggestion**. When the quota is exhausted,
submissions stop being delivered. Check the Formspree dashboard's usage monthly,
and upgrade before inquiry volume approaches it.

### The honeypot

The invisible `website` field is off-screen (`position:absolute; left:-10000px`),
carries no `name` or `id`, sets `autocomplete=off`, and is removed from the tab
order and the accessibility tree. A submission that fills it is answered with the
**success** message and sends nothing — the same behaviour as the original
server, so a bot learns nothing about which field caught it.

Trade-off worth knowing: a form field filled by browser autofill rather than by a
bot would drop a genuine inquiry silently. The four attributes above are what
keep that unlikely.

### Verifying the contact form

**Only a real submission confirms the wiring.** A third-party endpoint has no
local failure mode — the page renders, every check passes, and the submission can
still be dropped by a spent quota, a renamed endpoint or a spam filter.

With the site running locally (or the preview deployed) and `FORMSPREE_ID` set:

```bash
node ../_tools/form-test.mjs <url>
```

The probe also covers the two paths that need no live endpoint: the unwired build
must show an error and keep the visitor's text, and the honeypot must send
nothing while still reporting success.

## Build-time assertions

`scripts/postbuild.mjs` fails the build rather than publishing a broken or
re-dependency site. It checks, in order:

| Check | Why it is not optional |
| --- | --- |
| `dist/index.html` exists, non-empty, has `#root` | A build that emits nothing is better caught than deployed |
| `404.html` is byte-identical to `index.html` | The copy is what makes deep links work; a silent no-op copy is worse than no copy |
| `sitemap.xml` has ≥1 `<url>` | Publishing an empty sitemap is a silent regression |
| No Manus host, storage path, `__manus` path, `/api/trpc` endpoint or personal address anywhere in `dist/` | This repository exists to remove those dependencies; one pasted URL would restore one |
| Every `/images/…` reference resolves to a shipped file | A wrong filename renders as a broken icon while every other check passes |
| `VITE_FORMSPREE_ID` present (warning only) | A silently unwired form drops every inquiry |

The invariant scan matches **hosts and paths**, not the bare word "manus", so
that source comments explaining the migration do not produce noise — a check that
cries wolf gets switched off.

## Third-party requests

One remains, unchanged from the original: **Google Fonts** for the Carlito
family, loaded both from `index.html` and an `@import` in `src/index.css`. Every
visitor's IP reaches Google. Self-hosting the font files would remove it; see
HANDOFF.md.

Everything else is same-origin: six images in `public/images/`, plus
`favicon.png`, `favicon.ico` and `manifest.webmanifest`, which the Manus host
used to supply and are now repository files.

## Structure

```
index.html                     metadata, OG tags, structured data, fonts
src/main.tsx                   mount
src/App.tsx                    providers and routes; sets the wouter base
src/lib/asset.ts               ★ applies the deployment prefix to image paths
src/lib/form.ts                contact-form delivery (Formspree)
src/lib/siteContent.ts         all copy, 3 languages, company details, assets
src/index.css                  design tokens and all layout/responsive rules
src/pages/Home.tsx             every page section, all four routes
src/pages/NotFound.tsx         404
src/components/                ErrorBoundary, LanguageSwitcher, ui/* (button,
                               input, textarea, dialog, tooltip)
src/contexts/ThemeContext.tsx  light/dark provider (light only in use)
src/hooks/                     useComposition, usePersistFn
scripts/postbuild.mjs          completes and asserts dist/
public/images/                 the six site images
```

Routes are `/`, `/about`, `/products` and `/contact`. All four are rendered by
`src/pages/Home.tsx`; the router picks the sections. Language is client-side
state (`localStorage`, `?lang=` in the canonical links) shared by all three
translations on one URL.

### Why `asset()` exists

Vite rewrites the asset references it handles — imports, CSS `url()`, and the
tags in `index.html` — but it does **not** touch string literals inside
components. A hard-coded `/images/hero.webp` therefore works at a domain root and
404s under `/harvest-website/`, while the file still exists, the URL still
resolves on the live domain, and every structural check still passes. All image
paths go through `asset()` for that reason, applied in one place in
`siteContent.ts`.

### Why `404.html` is a copy of `index.html`

GitHub Pages answers an unknown path with the *contents* of `404.html`, so deep
links such as `/products` start the app and the client-side router renders the
right page. The cost is an HTTP 404 status on those responses, which crawlers
see. Accepted in exchange for staying a single-page app.

## Content changes made after the migration

The migration first copied the content unchanged. Two defects inherited from the
original source were then corrected on request:

1. **Removed the Facebook link.** It pointed at ISCO GmbH's page rather than one
   belonging to Harvest, and it appeared both in the footer social column and in
   the structured data. Only WhatsApp remains under Social.
   `src/lib/siteContent.ts` records how to restore it if a Harvest page exists.
2. **Corrected the address** from "Industria Development Zone" to "Industrial
   Development Zone", in both `src/lib/siteContent.ts` and the structured data.
   The rest of the address (no street or number) was left as found.

## Still open: which host is canonical

`rel=canonical`, `og:url`, the `hreflang` alternates, `sitemap.xml` and
`robots.txt` all name `https://www.harvest.cn/`, but `www.harvest.cn` currently
**301-redirects to the bare domain** `harvest.cn` — which is the host that
answers 200. The declarations contradict the redirect.

This has to be settled before the domain cutover, because GitHub Pages serves one
host and redirects the other. See HANDOFF.md for the analysis and the DNS work
it implies.

## Licence

MIT.
