import { TooltipProvider } from "@/components/ui/tooltip";
import Home, { AboutPage, ContactPage, EssPage, InvertersPage, ProductsPage, SolarModulesPage, SystemAccessoriesPage } from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

/*
 * wouter wants the router base WITHOUT a trailing slash ("/harvest-website"),
 * while Vite's BASE_URL always carries one ("/harvest-website/"). This is the
 * same value that src/lib/asset.ts uses to prefix image paths, so the router
 * prefix and the asset prefix cannot drift apart — one build variable drives
 * both, and there is no way to change one without the other.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/products/solar-modules" component={SolarModulesPage} />
      <Route path="/products/inverters" component={InvertersPage} />
      <Route path="/products/ess" component={EssPage} />
      <Route path="/products/system-accessories" component={SystemAccessoriesPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

/*
 * Keeps the scroll position honest across a client-side navigation.
 *
 * Two things go wrong without it:
 *
 *   * history.pushState does not scroll, so a visitor who clicks a link near the
 *     bottom of a page arrives at the next page still scrolled to the bottom;
 *   * a link into a section of a page — /products/solar-modules/#all-black, which
 *     is how the products overview points at the two module groups — is pushed as
 *     a hash, and pushState does not scroll to that either. The browser's own
 *     anchor jump cannot help, because the page is rendered *after* the click, so
 *     at that moment the element it should scroll to does not exist yet.
 *
 * wouter's location is the pathname only, so a push that changes just the hash
 * produces no re-render, and its popstate coverage would not fire on pushState at
 * all. This listens to the history events directly instead, which also covers the
 * back and forward buttons.
 *
 * A reload keeps its own position: the browser restores scroll for the history
 * entry, and nothing here scrolls on mount unless the URL carries a hash — which
 * a reload cannot have handled itself, for the reason above.
 */
function ScrollManager() {
  useEffect(() => {
    const jump = () => {
      const id = location.hash.slice(1);
      const target = id ? document.getElementById(decodeURIComponent(id)) : null;
      if (target) target.scrollIntoView({ block: "start", behavior: "smooth" });
      /* Instant, not smooth: the page under the cursor has already changed. */
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    /*
     * Called on a history event, which fires inside pushState — before React has
     * rendered the page being navigated to. The first frames therefore have no
     * target to scroll to, so the search is retried until the element appears.
     */
    const seek = (tries = 0) => {
      const id = location.hash.slice(1);
      if (!id || document.getElementById(decodeURIComponent(id))) return jump();
      if (tries < 30) requestAnimationFrame(() => seek(tries + 1));
    };

    let previous = location.pathname + location.hash;
    const onHistoryEvent = () => {
      const current = location.pathname + location.hash;
      if (current === previous) return;
      previous = current;
      requestAnimationFrame(() => seek());
    };

    /* A deep link: the browser looked for the anchor before this app rendered it. */
    if (location.hash) requestAnimationFrame(() => seek());

    const events = ["popstate", "pushState", "replaceState", "hashchange"];
    events.forEach((event) => addEventListener(event, onHistoryEvent));
    return () => events.forEach((event) => removeEventListener(event, onHistoryEvent));
  }, []);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <WouterRouter base={BASE}>
            {/* After <Router />: React runs an effect after its own subtree and
                after its siblings that come first, and this one reads elements the
                router renders. */}
            <Router />
            <ScrollManager />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
