/*
 * Contact-form delivery.
 *
 * The original site posted to a tRPC endpoint on the Manus-hosted Express
 * server, which sent the inquiry over SMTP. GitHub Pages has no backend, so the
 * form now posts to Formspree instead — the same arrangement as the ISCO site.
 *
 * The governing rule here is to FAIL LOUDLY. When the endpoint is not
 * configured, this throws, the page shows the localised error message, and the
 * visitor is pointed at WhatsApp. It must never report success for an inquiry
 * nobody will ever receive: a silently dropped lead looks to the visitor exactly
 * like a delivered one, so nobody notices.
 */
export type Inquiry = {
  name: string;
  email: string;
  company: string;
  country: string;
  type: string;
  message: string;
  /** Honeypot. A real visitor cannot see it; a naive bot fills it in. */
  website: string;
  language: "en" | "es" | "fr";
};

/*
 * The Formspree form id (the "xxxxxxx" in https://formspree.io/f/xxxxxxx),
 * injected at build time. It is not a secret — it is visible in the page's own
 * network requests — but keeping it in configuration rather than source means a
 * missing value is detectable instead of looking like working code.
 */
const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID ?? "").trim();

export const formEndpoint = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : null;

export async function submitInquiry(inquiry: Inquiry): Promise<void> {
  // Honeypot: answer as though it worked, so a bot learns nothing. No request is
  // made and no real visitor is affected — the field is invisible and off the
  // tab order.
  if (inquiry.website.trim() !== "") {
    return;
  }

  if (!formEndpoint) {
    throw new Error(
      "Contact form is not configured: VITE_FORMSPREE_ID is missing at build time.",
    );
  }

  const response = await fetch(formEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company,
      country: inquiry.country,
      type: inquiry.type,
      message: inquiry.message,
      language: inquiry.language,
      // Subject line, matching the wording the SMTP backend used.
      _subject: `Harvest Eco Solutions inquiry — ${inquiry.type}`,
      // Formspree's own honeypot field, so spam is filtered server-side too.
      _gotcha: "",
    }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const body = (await response.json()) as { error?: string; errors?: unknown };
      detail = body.error ?? JSON.stringify(body.errors ?? "");
    } catch {
      /* non-JSON error body */
    }
    throw new Error(
      `Formspree rejected the submission: HTTP ${response.status} ${detail}`.trim(),
    );
  }
}
