import { languages, type Language } from "@/lib/siteContent";

const languageOrder: Language[] = ["en", "es", "fr"];

function FlagIcon({ language }: { language: Language }) {
  if (language === "en") {
    return (
      <svg className="flag-icon" viewBox="0 0 60 36" aria-hidden="true" focusable="false">
        <rect width="60" height="36" rx="4" fill="#012169" />
        <path d="M0 0 60 36M60 0 0 36" stroke="#fff" strokeWidth="8" />
        <path d="M0 0 60 36M60 0 0 36" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="12" />
        <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="7" />
      </svg>
    );
  }

  if (language === "es") {
    return (
      <svg className="flag-icon" viewBox="0 0 60 36" aria-hidden="true" focusable="false">
        <rect width="60" height="36" rx="4" fill="#AA151B" />
        <rect y="9" width="60" height="18" fill="#F1BF00" />
      </svg>
    );
  }

  return (
    <svg className="flag-icon" viewBox="0 0 60 36" aria-hidden="true" focusable="false">
      <rect width="20" height="36" rx="4" fill="#0055A4" />
      <rect x="20" width="20" height="36" fill="#fff" />
      <rect x="40" width="20" height="36" rx="4" fill="#EF4135" />
    </svg>
  );
}

export function LanguageSwitcher({
  language,
  setLanguage,
  ariaLabel,
  className = "",
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div className={`language-switcher ${className}`.trim()} role="group" aria-label={ariaLabel}>
      {languageOrder.map((key) => (
        <button
          key={key}
          type="button"
          className={`language-option${language === key ? " is-active" : ""}`}
          aria-pressed={language === key}
          aria-label={languages[key].label}
          onClick={() => setLanguage(key)}
        >
          <FlagIcon language={key} />
          <span className="language-short-code">{languages[key].short}</span>
        </button>
      ))}
    </div>
  );
}
