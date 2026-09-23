import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { assets, content, languages, type Language } from "@/lib/siteContent";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

function detectLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("harvest-language") as Language | null;
  if (stored && stored in languages) return stored;
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("fr")) return "fr";
  return "en";
}

export default function NotFound() {
  const [language, setLanguage] = useState<Language>(() => detectLanguage());
  const t = content[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${t.notFound.title} | Harvest Eco Solutions Limited`;
    window.localStorage.setItem("harvest-language", language);
  }, [language, t.notFound.title]);

  return (
    <main className="not-found-page">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <Link href="/" className="not-found-brand" aria-label={t.a11y.homeLink}>
          <img src={assets.logo} alt={t.a11y.logo} />
          <span>Harvest Eco Solutions Limited</span>
        </Link>
        <LanguageSwitcher
          language={language}
          setLanguage={setLanguage}
          ariaLabel={t.a11y.language}
          className="mx-auto mb-8 w-fit"
        />
        <p className="not-found-code">404</p>
        <h1 id="not-found-title">{t.notFound.title}</h1>
        <p>{t.notFound.text}</p>
        <Button asChild className="rounded-full bg-[#0d2b28] px-6 text-[#fff8ea] hover:bg-[#173f3b]">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />{t.notFound.action}</Link>
        </Button>
      </section>
    </main>
  );
}
