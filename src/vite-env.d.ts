/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form id used by the contact form — see src/lib/form.ts. */
  readonly VITE_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
