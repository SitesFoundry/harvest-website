/*
 * Prefixes a public/ path with the deployment base.
 *
 * Why this exists: Vite rewrites the asset references IT handles — imports, CSS
 * url(), and the tags in index.html — but it does NOT touch string literals
 * inside components. A hard-coded "/images/hero.webp" therefore works when the
 * site is served from a domain root and 404s when it is served from a
 * sub-path (the GitHub Pages project-site preview), while every structural
 * check — file exists, URL resolves, byte count correct — still passes.
 *
 * Vite exposes the base as import.meta.env.BASE_URL; the deploy workflow sets it
 * through SITE_BASE. Keeping every path routed through this one function means
 * the asset prefix and the router base can never disagree.
 */
const BASE = import.meta.env.BASE_URL;

export function asset(path: string): string {
  return `${BASE}${path.replace(/^\/+/, "")}`;
}
