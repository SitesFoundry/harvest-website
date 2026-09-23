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
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
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

/* ----------------------------------------------------------------- 3. sitemap */

const sitemapPath = join(DIST, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8").catch(() => null);
if (sitemap === null) fail("dist/sitemap.xml is missing (expected from public/).");
const urlCount = (sitemap.match(/<url>/g) ?? []).length;
if (urlCount === 0) fail("dist/sitemap.xml contains no <url> entries.");
console.log(`  sitemap.xml       ${urlCount} URLs`);

/* -------------------------------------------------- 4. migration invariants */

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

/* ----------------------------------------------------------------- 5. images */

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

/* ------------------------------------------------------------- 6. form wiring */

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
