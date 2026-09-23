import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const PROJECT_ROOT = import.meta.dirname;

/*
 * The site is served from the root of harvest.cn once the custom domain is
 * live, but from /harvest-website/ while it is previewed as a GitHub Pages
 * project site. The deploy workflow sets SITE_BASE for the target, so one
 * source builds correctly for both. See src/App.tsx (router base) and
 * src/lib/asset.ts (image paths) — both read this same value.
 */
const base = process.env.SITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "src"),
    },
  },
  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,
  },
});
