/*
 * Completes dist/ after `vite build`.
 *
 * Two jobs:
 *
 *  1. GitHub Pages deep-link support. A path that is not a real file gets the
 *     CONTENTS OF 404.html with an HTTP 404 status. Copying index.html to
 *     404.html is therefore what makes /products and /contact work when they are
 *     opened directly rather than navigated to from the home page.
 *
 *  2. Migration-invariant assertions. The whole point of this repository is that
 *     the site no longer depends on Manus. That property is easy to break by
 *     accident later — one pasted CDN URL is enough — and a broken image passes
 *     every structural check. So every step below asserts its own output, and
 *     the scan fails the build if a Manus host or a personal address is back in
 *     the built artifacts.
 *
 * A silent no-op is worse than a failure here: a copy that did not happen, or a
 * scan that inspected zero files, must not report success.
 */
import { readFile, readdir, mkdir, stat, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

/*
 * fileURLToPath, not URL.pathname.
 *
 * This checkout lives under "Harvest Website", a directory whose name contains
 * a space. URL.pathname keeps it percent-encoded ("Harvest%20Website"), so every
 * fs call below would miss and the script would report an empty build. The trap
 * is that CI never sees it — GitHub's runner paths have no spaces — so the build
 * would be green in Actions and broken only on the machine doing the work.
 */
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const ROOT = fileURLToPath(new URL("../", import.meta.url));

/*
 * References that must not survive into the published output. Manus hosted this
 * site: its CDN held the images, its runtime was injected into the HTML, and its
 * Express server received the contact form. None of that may come back.
 *
 * These match HOSTS AND PATHS, not the bare word "manus". The source comments
 * explain the migration and legitimately name Manus; flagging prose would train
 * whoever runs the build to ignore this check, which is worse than not having it.
 * A real regression is always a URL, a path or an endpoint.
 */
const FORBIDDEN = [
  { pattern: /cloudfront\.net/i, why: "Manus image CDN host" },
  { pattern: /manuscdn\.com/i, why: "Manus image CDN host" },
  { pattern: /manus-storage/i, why: "Manus storage path" },
  { pattern: /manus-analytics/i, why: "Manus analytics beacon" },
  { pattern: /manus\.im/i, why: "Manus platform host" },
  { pattern: /__manus/i, why: "Manus runtime / manifest path" },
  { pattern: /\/api\/trpc/i, why: "removed Manus backend endpoint" },
];

/*
 * Email addresses are checked against an ALLOWLIST of domains rather than a list
 * of forbidden addresses.
 *
 * Naming a personal address here would publish it — in a regex that spells it out
 * in full — which is precisely what the check exists to prevent. The first
 * version of this file did exactly that. An allowlist catches that address and
 * every other stray one without ever writing one down.
 */
const ALLOWED_EMAIL_DOMAINS = ["harvest.cn"];

function findDisallowedEmails(text) {
  const found = new Set();
  for (const match of text.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) {
    const domain = (match[0].split("@")[1] ?? "").toLowerCase();
    const allowed = ALLOWED_EMAIL_DOMAINS.some(
      (d) => domain === d || domain.endsWith(`.${d}`),
    );
    if (!allowed) found.add(match[0]);
  }
  return [...found];
}

const TEXT_EXT = new Set([
  ".html",
  ".js",
  ".mjs",
  ".css",
  ".json",
  ".xml",
  ".txt",
  ".webmanifest",
  ".map",
]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

/* ------------------------------------------------------------------ 1. index */

const indexPath = join(DIST, "index.html");
const indexStat = await stat(indexPath).catch(() => null);
if (!indexStat?.isFile() || indexStat.size === 0) {
  fail("dist/index.html is missing or empty — vite build did not produce a site.");
}
const indexHtml = await readFile(indexPath, "utf8");
if (!indexHtml.includes('id="root"')) {
  fail('dist/index.html has no #root element — the bundle would mount nowhere.');
}
console.log(`  index.html        ${indexStat.size} bytes, #root present`);

/* ------------------------------------------------------------- 2. 404 fallback */

const notFoundPath = join(DIST, "404.html");
await writeFile(notFoundPath, indexHtml);
const notFoundStat = await stat(notFoundPath);
/* Assert the copy actually landed and matches, rather than trusting writeFile. */
if (notFoundStat.size !== indexStat.size) {
  fail(
    `404.html is ${notFoundStat.size} bytes but index.html is ${indexStat.size} — the copy did not complete.`,
  );
}
console.log(`  404.html          ${notFoundStat.size} bytes, byte-identical to index.html`);

/* -------------------------------------------------------- 3. one page per route */

/*
 * GitHub Pages serves a directory's index.html with status 200 and answers
 * anything else with 404.html and status 404. A single-page app whose only HTML
 * file is the root therefore answers 404 for every sub-route: the page renders
 * for a human, and a crawler drops it. The sitemap then reports errors and the
 * sub-pages never enter an index — which is exactly what happened here before
 * this step existed.
 *
 * So every route gets its own directory page: a copy of the root document with
 * the head rewritten for that route. No application code changes — the same
 * script tag mounts the same app, and the router reads the path as it always did.
 *
 * The route list and the per-route text come from src/data/pageMeta.json, the
 * same file the client uses, so the two cannot drift apart.
 */
const ORIGIN = "https://www.harvest.cn";
const pageMeta = JSON.parse(await readFile(join(ROOT, "src/data/pageMeta.json"), "utf8"));

function rewriteHead(html, { path, title, description }) {
  const url = `${ORIGIN}${path}`;
  let out = html;
  /* Every swap asserts it matched. A silent no-op here would publish a page
   * declaring the wrong canonical, which is the defect this step exists to fix. */
  const swap = (pattern, replacement, label) => {
    const before = out;
    out = out.replace(pattern, replacement);
    if (out === before) {
      fail(`rewriting ${label} for ${path} did not match — index.html's head changed shape`);
    }
  };
  swap(/<title>[^<]*<\/title>/, `<title>${title}</title>`, "<title>");
  swap(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${description}$2`,
    "meta description",
  );
  swap(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, "canonical");
  swap(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, "og:url");
  swap(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`, "og:title");
  swap(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${description}$2`,
    "og:description",
  );
  swap(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`, "twitter:title");
  swap(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${description}$2`,
    "twitter:description",
  );
  /*
   * No hreflang alternates are rewritten here. They were removed rather than
   * carried over: the three languages share one URL, no code ever read the
   * ?lang= parameter, and each alternate canonicalised back to the plain URL —
   * the exact conflict Google warns about, so the set was ignored at best.
   * See the note in index.html.
   */
  return out;
}

const generatedRoutes = [];
for (const [key, route] of Object.entries(pageMeta)) {
  if (route.path === "/") continue; // the root document already is this page
  const en = route.meta.en;
  const page = rewriteHead(indexHtml, {
    path: route.path,
    title: en.title,
    description: en.description,
  });

  /* Assert the rewrite landed, and that the root canonical is gone: a
   * sub-page still claiming to be the home page is the bug being fixed. */
  const canonical = `${ORIGIN}${route.path}`;
  if (!page.includes(`<link rel="canonical" href="${canonical}" />`)) {
    fail(`${key}: generated page does not declare canonical ${canonical}`);
  }
  if (!page.includes(`<title>${en.title}</title>`)) {
    fail(`${key}: generated page does not carry its own <title>`);
  }
  if (page.includes(`href="${ORIGIN}/" />`) && route.path !== "/") {
    fail(`${key}: generated page still contains the root canonical`);
  }

  const dir = join(DIST, route.path.replace(/^\/+/, "").replace(/\/+$/, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), page);
  /* Compare BYTES. String.length counts UTF-16 code units and the document
   * contains multi-byte characters (em dashes in its comments), so comparing
   * length to stat().size reports a mismatch for a write that landed fine. */
  const expectedBytes = Buffer.byteLength(page, "utf8");
  const written = await stat(join(dir, "index.html"));
  if (written.size !== expectedBytes) {
    fail(`${key}: wrote ${written.size} bytes but the page is ${expectedBytes} bytes`);
  }
  generatedRoutes.push(`${route.path} (${written.size} bytes)`);
}
if (generatedRoutes.length === 0) {
  fail("generated no route pages — the sitemap would advertise 404s again.");
}
console.log(`  route pages       ${generatedRoutes.join(", ")}`);

/* ------------------------------------------- 4. sitemap, checked against disk */

/*
 * Every URL the sitemap advertises must resolve to a real file. A sitemap that
 * lists URLs the host answers with 404 is worse than no sitemap: it spends crawl
 * budget, and Search Console reports it as broken. This check would have caught
 * the state of this site before the step above existed.
 */
const sitemapPath = join(DIST, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8").catch(() => null);
if (sitemap === null) fail("dist/sitemap.xml is missing (expected from public/).");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locations.length === 0) fail("dist/sitemap.xml contains no <loc> entries.");

const unresolved = [];
for (const loc of locations) {
  if (!loc.startsWith(ORIGIN)) {
    unresolved.push(`${loc} (not on ${ORIGIN})`);
    continue;
  }
  const path = loc.slice(ORIGIN.length).split("?")[0];
  const candidates =
    path === "/"
      ? [join(DIST, "index.html")]
      : path.endsWith("/")
        ? [join(DIST, path, "index.html")]
        : [join(DIST, path), join(DIST, path, "index.html")];
  let found = false;
  for (const candidate of candidates) {
    const s = await stat(candidate).catch(() => null);
    if (s?.isFile()) {
      found = true;
      break;
    }
  }
  if (!found) unresolved.push(`${loc} (no file in dist/ serves it)`);
}
if (unresolved.length > 0) {
  fail(
    `the sitemap lists ${unresolved.length} URL(s) that nothing serves, so the host\n` +
      `  would answer 404 for them:\n    ${unresolved.join("\n    ")}`,
  );
}
console.log(`  sitemap.xml       ${locations.length} URLs, every one backed by a file`);

/* -------------------------------------------------- 5. migration invariants */

const files = await walk(DIST);
const textFiles = files.filter((f) => TEXT_EXT.has(extname(f)));
if (textFiles.length === 0) {
  fail("scanned 0 text files in dist/ — the scan itself is broken, so it proves nothing.");
}

const findings = [];
for (const file of textFiles) {
  const body = await readFile(file, "utf8");
  for (const { pattern, why } of FORBIDDEN) {
    const match = body.match(pattern);
    if (!match) continue;
    const at = body.indexOf(match[0]);
    findings.push({
      file: file.replace(DIST, ""),
      found: match[0],
      why,
      context: body.slice(Math.max(0, at - 60), at + 60).replace(/\s+/g, " "),
    });
  }
  for (const address of findDisallowedEmails(body)) {
    const at = body.indexOf(address);
    findings.push({
      file: file.replace(DIST, ""),
      found: address,
      why: `email address outside ${ALLOWED_EMAIL_DOMAINS.join(", ")}`,
      context: body.slice(Math.max(0, at - 60), at + 60).replace(/\s+/g, " "),
    });
  }
}

if (findings.length > 0) {
  console.error(`\n✗ ${findings.length} forbidden reference(s) in the built output:\n`);
  for (const f of findings) {
    console.error(`  ${f.file}\n    found: ${f.found}  (${f.why})\n    ...${f.context}...\n`);
  }
  process.exit(1);
}
console.log(
  `  invariants        ${textFiles.length} files scanned, no Manus host / storage path / backend endpoint / non-company email`,
);

/* ----------------------------------------------------------------- 6. images */

/*
 * Every image the page asks for must be a file that ships.
 *
 * This is the failure that structural checks miss: a wrong filename in
 * siteContent.ts renders as a broken-image icon in the corner of the hero while
 * the build, the links and the file sizes all look fine. So collect the image
 * names referenced anywhere in the built text (the bundle carries them, not
 * index.html, because siteContent.ts computes them through asset()) and require
 * each one to exist in dist/.
 */
const images = files.filter((f) => /\.(webp|png|jpe?g|svg|avif|gif|ico)$/i.test(f));
if (images.length === 0) fail("dist/ contains no image files at all.");
const shippedImages = new Set(images.map((f) => f.split("/").pop()));

const referencedImages = new Set();
for (const file of textFiles) {
  const body = await readFile(file, "utf8");
  for (const m of body.matchAll(/\/images\/([A-Za-z0-9._-]+)/g)) {
    referencedImages.add(m[1]);
  }
}
if (referencedImages.size === 0) {
  fail("found no /images/ references in the built output — the page would show no pictures.");
}

const missingImages = [...referencedImages].filter((name) => !shippedImages.has(name));
if (missingImages.length > 0) {
  fail(
    `referenced but not shipped: ${missingImages.join(", ")}\n` +
      `  shipped: ${[...shippedImages].sort().join(", ")}`,
  );
}
const unusedImages = [...shippedImages].filter(
  (name) => !referencedImages.has(name) && !/^favicon\./.test(name),
);
console.log(
  `  images            ${referencedImages.size} referenced, all ${shippedImages.size} shipped files present` +
    (unusedImages.length ? ` (unused: ${unusedImages.join(", ")})` : ""),
);

/* ------------------------------------------------------------- 7. form wiring */

/*
 * Check the BUILD CONFIGURATION, not the bundle text.
 *
 * The bundle always contains the literal "https://formspree.io/f/" because
 * form.ts builds the URL from a variable, so grepping the bundle reports
 * "wired" even when the id is empty. That check passed while proving nothing —
 * the exact failure mode this whole script exists to prevent. The id is an
 * input to the build, so that is what gets read.
 *
 * Not a hard failure: the site is worth deploying without the form, and the form
 * fails loudly in the browser when unwired. But it must never pass silently,
 * because a form that drops every inquiry is the failure this project exists to
 * prevent.
 */
/*
 * Check the form against the artifact, not against the environment.
 *
 * The id lives in src/lib/form.ts as a committed default (it is a public value —
 * it is in the endpoint URL of every submission), with VITE_FORMSPREE_ID as an
 * optional override. An earlier version of this check read the environment
 * variable only, so it reported "NOT wired" on a build whose form was wired
 * perfectly well. A check that lies in either direction is worse than none.
 *
 * So: read the declared default out of the source, pick the override when one is
 * set, and then require that id to be present in the built JavaScript. That
 * proves the wiring survived the build rather than assuming it did.
 */
const formSource = await readFile(join(ROOT, "src/lib/form.ts"), "utf8");
const declaredId = formSource.match(/DEFAULT_FORMSPREE_ID\s*=\s*"([^"]+)"/)?.[1];
if (!declaredId) {
  fail(
    'could not read DEFAULT_FORMSPREE_ID from src/lib/form.ts — if the form id\n' +
      "  moved, update this check rather than deleting it.",
  );
}
const overrideId = (process.env.VITE_FORMSPREE_ID ?? "").trim();
const expectedFormId = overrideId || declaredId;

const jsFiles = textFiles.filter((f) => f.endsWith(".js"));
if (jsFiles.length === 0) fail("dist/ contains no JavaScript to check the form wiring in.");
const jsText = (await Promise.all(jsFiles.map((f) => readFile(f, "utf8")))).join("\n");

if (!jsText.includes(expectedFormId)) {
  fail(
    `the form id "${expectedFormId}" is not present in the built JavaScript — the\n` +
      "  contact form would post nowhere. Check src/lib/form.ts.",
  );
}
console.log(
  `  contact form      wired to Formspree form ${expectedFormId}` +
    (overrideId ? " (from VITE_FORMSPREE_ID)" : " (committed default)"),
);

console.log("\n✓ dist/ is complete\n");
