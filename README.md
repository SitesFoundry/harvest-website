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

Nothing else has to be configured — the contact form's endpoint is committed (see
below).

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

- `src/lib/form.ts` holds the delivery logic **and the form id**.
- The id is a committed default (`DEFAULT_FORMSPREE_ID`). It is a public value —
  it is the last segment of the endpoint URL in every submission — so putting it
  in a repository variable would add a way for the form to be unwired (a missed
  setup step, a fork, a preview) without protecting anything.
  `VITE_FORMSPREE_ID` still overrides it, which is how the failure-path test
  points a build at a form that does not exist.
- The receiving address is configured in Formspree, not here. The site publishes
  `sales@harvest.cn`.

### It fails loudly, on purpose

When the endpoint is not configured, `submitInquiry()` throws, the page shows the
localised error message and points the visitor at WhatsApp. It must never report
success for an inquiry nobody will receive: a silently dropped lead looks to the
visitor exactly like a delivered one, so nobody goes looking for it.

For the same reason `postbuild.mjs` prints a prominent warning when
`VITE_FORMSPREE_ID` was not set. It does not fail the build — the site is worth
deploying without a form — but it never passes silently.

### ⚠️ Know what the free plan is

```
free:         account_monthly_submissions: 50     "For testing and development"
Personal:                               200     $15/month
Professional:                         2,000
```

Read from Formspree's own plans page. The 50/month cap is real, but the more
important part is that Formspree describes the free plan as **"For testing and
development"**, with a 30-day submission archive. It is not a production tier —
plan to upgrade once inquiry volume is steady, and check usage monthly.

I could not verify what Formspree returns when the quota is exhausted. If it is a
non-2xx status the visitor sees the error message (that path is tested against a
real rejection); if it is a 200 with the submission dropped, a visitor would see a
success nobody receives. Worth confirming deliberately once.

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

Three probes, each needing a differently-built site:

```bash
# 1. Honeypot — works against any build. No request must be sent, and the
#    visitor must still be told it succeeded, so the filter stays hidden.
node ../_tools/form-test.mjs <url>/contact

# 2. Success path — sends a REAL email and spends one submission.
node ../_tools/form-success-test.mjs <url>/contact

# 3. Failure path — build a site whose endpoint really rejects, then check the
#    visitor is told the truth and their text is not cleared.
#    (in the repo)  VITE_FORMSPREE_ID=this-form-does-not-exist SITE_BASE=/harvest-website/ npm run build
node ../_tools/form-failure-test.mjs <url>/contact
```

All three passed on 2026-09-23: the real endpoint answered 200 and the success
branch ran; a bogus id produced a 404 and the page raised the error while keeping
the visitor's text; the honeypot sent nothing.

## Build-time assertions

`scripts/postbuild.mjs` fails the build rather than publishing a broken or
re-dependency site. It checks, in order:

| Check | Why it is not optional |
| --- | --- |
| `dist/index.html` exists, non-empty, has `#root` | A build that emits nothing is better caught than deployed |
| `404.html` is byte-identical to `index.html` | The copy is what makes deep links work; a silent no-op copy is worse than no copy |
| `sitemap.xml` has ≥1 `<url>` | Publishing an empty sitemap is a silent regression |
| No Manus host, storage path, `__manus` path, `/api/trpc` endpoint anywhere in `dist/` | This repository exists to remove those dependencies; one pasted URL would restore one |
| Every email address in `dist/` is on the `harvest.cn` allowlist | Catches a personal or stray address without this file having to name one — a blocklist of addresses would publish the very address it guards |
| Every `/images/…` reference resolves to a shipped file | A wrong filename renders as a broken icon while every other check passes |
| The contact form id is present in the built JavaScript | Fails the build if the wiring does not survive; a form that posts nowhere is not a form |

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
src/lib/form.ts                ★ contact-form delivery; holds the form id
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

## Canonical host: `harvest.cn`, the bare domain

`rel=canonical`, `og:url`, the `hreflang` alternates, `sitemap.xml` and
`robots.txt` all name `https://harvest.cn/`.

The original source declared `https://www.harvest.cn/` as canonical while
`www.harvest.cn` 301-redirected to the bare domain — the declarations pointed at a
host that sent visitors somewhere else. Search engines resolve redirects before
they honour a canonical hint, so the bare domain was already the host being
served; naming it as canonical makes the declarations agree with reality and
leaves the visitor-visible behaviour untouched. Paths are preserved through the
redirect.

### Domain cutover — not done yet

Manus still serves the site. Two DNS records carry that dependency:
`www.harvest.cn` is a **CNAME to `cname.manus.space`**, and the bare domain's A
records point at **Cloudflare addresses belonging to Manus**. Both stop working
when the subscription ends, so there is no "leave it alone" option.

At the DNS provider (GoDaddy):

| Name | Type | Action | Note |
| --- | --- | --- | --- |
| `www` | AAAA | **delete first** | A CNAME cannot coexist with AAAA at the same name |
| `www` | CNAME | set to `sitesfoundry.github.io` | replaces `cname.manus.space` |
| `@` | A | set to `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` | replaces the two Cloudflare addresses |

**Leave MX and TXT alone.** Email runs on 263 (`mx.263.net`); the SPF and
site-verification TXT records have nothing to do with web hosting. The rule when
editing DNS here: only look at the `Type` column, and never touch a row whose type
is `MX` or `TXT`.

Then set the custom domain in `Settings → Pages`. **In that order**: entering the
custom domain while DNS still points at Manus fails GitHub's DNS check, GitHub
does not retry it on its own, and the TLS certificate is never issued. Recovering
means removing and re-adding the domain.

Finally change `SITE_BASE` to `/` and redeploy.

Configuring the bare domain as GitHub's custom domain makes GitHub redirect
`www` to it — the same direction as today, so visitors see no change.

## Licence

MIT.
