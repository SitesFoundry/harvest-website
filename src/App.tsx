import { TooltipProvider } from "@/components/ui/tooltip";
import Home, { AboutPage, ContactPage, ProductsPage } from "@/pages/Home";
import NotFound from "@/pages/NotFound";
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
      <Route path="/products" component={ProductsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <WouterRouter base={BASE}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
