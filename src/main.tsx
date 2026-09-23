import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/*
 * The original entry point also wired up a tRPC client, a React Query cache, a
 * Manus OAuth login redirect and a cookie helper. None of that is needed to
 * serve a static site, and none of it has a backend to talk to any more, so the
 * whole layer is gone rather than left pointing at endpoints that no longer
 * exist.
 */
createRoot(document.getElementById("root")!).render(<App />);
