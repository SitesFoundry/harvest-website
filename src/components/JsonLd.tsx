import { useEffect } from "react";

/*
 * Adds one JSON-LD block to <head> while the page is mounted.
 *
 * The site is a client-rendered single-page app, so a schema block written into
 * a component is only present after React runs. Google renders the page before
 * indexing it, which is why this is enough for search — the earlier migration
 * notes show Google is already reading rendered copy from these same routes.
 *
 * Static, build-generated BreadcrumbList markup still lives in the HTML head of
 * every route (see scripts/postbuild.mjs), so a crawler that does not execute
 * JavaScript still gets the page hierarchy.
 *
 * The script is keyed and removed on unmount, so switching language replaces the
 * graph instead of stacking a second copy of it.
 */
export default function JsonLd({ id, data }: { id: string; data: unknown }) {
  const json = JSON.stringify(data);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoId = id;
    script.textContent = json;
    document.head.appendChild(script);
    return () => script.remove();
  }, [id, json]);

  return null;
}
