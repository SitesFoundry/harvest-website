import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { assets, company, content, languages, type Language } from "@/lib/siteContent";
import { submitInquiry } from "@/lib/form";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  CircuitBoard,
  Globe2,
  House,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PanelTop,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  SunMedium,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";

type SitePageKind = "home" | "about" | "products" | "contact";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  country: string;
  type: string;
  message: string;
  website: string;
};

const pageMeta: Record<SitePageKind, Record<Language, { title: string; description: string }>> = {
  home: {
    en: {
      title: "Harvest Eco Solutions Limited | Solar Systems & AI Energy Saving Solutions",
      description: "Harvest Eco Solutions Limited provides solar systems, ESS storage and AI smart control solutions for global clean-energy markets.",
    },
    es: {
      title: "Harvest Eco Solutions Limited | Sistemas solares y soluciones IA",
      description: "Harvest Eco Solutions Limited ofrece sistemas solares, almacenamiento ESS y soluciones inteligentes de ahorro energético para mercados globales.",
    },
    fr: {
      title: "Harvest Eco Solutions Limited | Systèmes solaires et solutions IA",
      description: "Harvest Eco Solutions Limited fournit des systèmes solaires, du stockage ESS et des solutions intelligentes d’économie d’énergie pour les marchés mondiaux.",
    },
  },
  about: {
    en: { title: "About Harvest Eco Solutions Limited", description: "Learn about Harvest Eco Solutions Limited, founded in 2004 and serving customers across more than 50 countries and regions." },
    es: { title: "Nosotros | Harvest Eco Solutions Limited", description: "Conozca Harvest Eco Solutions Limited, fundada en 2004 y presente en más de 50 países y regiones." },
    fr: { title: "À propos | Harvest Eco Solutions Limited", description: "Découvrez Harvest Eco Solutions Limited, fondée en 2004 et active dans plus de 50 pays et régions." },
  },
  products: {
    en: { title: "Products & Solutions | Solar, ESS and AI Smart Control", description: "Explore solar panels, inverters, ESS storage, PV accessories and AI smart control solutions from Harvest Eco Solutions Limited." },
    es: { title: "Productos y soluciones | Solar, ESS e IA", description: "Explore paneles solares, inversores, almacenamiento ESS, accesorios FV y soluciones inteligentes con IA." },
    fr: { title: "Produits et solutions | Solaire, ESS et IA", description: "Explorez panneaux solaires, onduleurs, stockage ESS, accessoires PV et solutions intelligentes IA." },
  },
  contact: {
    en: { title: "Contact Harvest Eco Solutions Limited", description: "Contact Harvest Eco Solutions Limited for solar systems, AI energy saving solutions and customized procurement support." },
    es: { title: "Contacto | Harvest Eco Solutions Limited", description: "Contacte con Harvest Eco Solutions Limited para sistemas solares, soluciones IA y compras personalizadas." },
    fr: { title: "Contact | Harvest Eco Solutions Limited", description: "Contactez Harvest Eco Solutions Limited pour systèmes solaires, solutions IA et approvisionnement personnalisé." },
  },
};

function detectLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("harvest-language") as Language | null;
  if (stored && stored in languages) return stored;
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("fr")) return "fr";
  return "en";
}

function useSiteLanguage(page: SitePageKind) {
  const [language, setLanguageState] = useState<Language>(() => detectLanguage());

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("harvest-language", next);
  };

  useEffect(() => {
    const meta = pageMeta[page][language];
    document.documentElement.lang = language;
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", meta.description);
  }, [language, page]);

  return { language, setLanguage, t: content[language] };
}

function ProtectedEmail({ className = "", label }: { className?: string; label: string }) {
  const [revealed, setRevealed] = useState(false);
  const email = `${company.emailUser}@${company.emailDomain}`;

  return (
    <button
      type="button"
      className={`email-safe ${className}`}
      aria-label={label}
      onClick={() => setRevealed(true)}
      data-u={company.emailUser}
      data-d={company.emailDomain}
    >
      <Mail className="h-4 w-4" aria-hidden="true" />
      <span>{revealed ? email : "sales [at] harvest [dot] cn"}</span>
    </button>
  );
}

function SiteShell({ page, children }: { page: SitePageKind; children: React.ReactNode }) {
  const { language, setLanguage, t } = useSiteLanguage(page);
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t.nav.home, key: "home" },
    { href: "/about", label: t.nav.about, key: "about" },
    { href: "/products", label: t.nav.products, key: "products" },
    { href: "/contact", label: t.nav.contact, key: "contact" },
  ];

  const withLanguage = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <div className="site-shell bg-background text-foreground">
      <header className="site-header" role="banner">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label={t.a11y.homeLink}>
            <img src={assets.logo} alt={t.a11y.logo} className="brand-logo" />
            <span className="brand-text">{company.name}</span>
          </Link>

          <nav className="desktop-nav" aria-label={t.a11y.primaryNav}>
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className={location === item.href ? "nav-link active" : "nav-link"}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <LanguageSwitcher language={language} setLanguage={setLanguage} ariaLabel={t.a11y.language} />
            <Button asChild className="hidden rounded-full bg-[#0d2b28] px-5 text-[#fff8ea] hover:bg-[#173f3b] lg:inline-flex">
              <Link href="/contact">{t.cta}</Link>
            </Button>
            <button className="mobile-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={t.a11y.openMenu}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-nav container" aria-label={t.a11y.mobileNav}>
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main>
        {typeof children === "function" ? null : children}
        {page === "home" && <HomeContent languageBundle={withLanguage} />}
        {page === "about" && <AboutContent languageBundle={withLanguage} />}
        {page === "products" && <ProductsContent languageBundle={withLanguage} />}
        {page === "contact" && <ContactContent languageBundle={withLanguage} />}
      </main>

      <WhatsAppBubble label={t.a11y.whatsapp} />
      <Footer language={language} />
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="section-eyebrow">{children}</p>;
}

function HomeContent({ languageBundle }: { languageBundle: ReturnType<typeof useSiteLanguage> }) {
  const { t } = languageBundle;

  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-image" style={{ backgroundImage: `url(${assets.hero})` }} />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <SectionEyebrow>{t.hero.eyebrow}</SectionEyebrow>
            <h1 id="hero-title">{t.hero.title}</h1>
            <p>{t.hero.subtitle}</p>
            <div className="hero-buttons">
              <Button asChild className="rounded-full bg-[#d5a84f] px-7 py-6 text-base font-extrabold text-[#10201f] hover:bg-[#efc871]">
                <Link href="/products">
                  {t.hero.primary} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/40 bg-white/10 px-7 py-6 text-base text-white backdrop-blur hover:bg-white/20">
                <Link href="/contact">{t.hero.secondary}</Link>
              </Button>
            </div>
          </div>
          <div className="hero-card" aria-label={t.a11y.highlights}>
            {t.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container intro-section" aria-labelledby="intro-title">
        <div>
          <SectionEyebrow>Harvest Eco Solutions Limited</SectionEyebrow>
          <h2 id="intro-title">{t.intro.title}</h2>
        </div>
        <p>{t.intro.body}</p>
      </section>

      <section className="container advantage-grid" aria-label={t.a11y.advantages}>
        {t.advantages.map((item, index) => {
          const icons = [ShieldCheck, Bot, Globe2];
          const Icon = icons[index] ?? CheckCircle2;
          return (
            <article className="advantage-card" key={item.title}>
              <span className="icon-pill"><Icon className="h-5 w-5" /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="split-feature" aria-labelledby="solution-title">
        <div className="container split-grid">
          <div className="feature-media"><img src={assets.solar} alt={t.a11y.solarVisual} /></div>
          <div className="feature-copy">
            <SectionEyebrow>{t.products.solarEyebrow}</SectionEyebrow>
            <h2 id="solution-title">{t.products.solarTitle}</h2>
            <p>{t.products.subtitle}</p>
            <div className="mini-list">
              {t.products.categories.slice(0, 4).map((category) => (
                <span key={category.group}><CheckCircle2 className="h-4 w-4" />{category.group}</span>
              ))}
            </div>
            <Button asChild variant="outline" className="rounded-full border-[#0d2b28] text-[#0d2b28] hover:bg-[#efe4c8]">
              <Link href="/products">{t.hero.primary}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="ai-feature" aria-labelledby="ai-title">
        <div className="container ai-grid">
          <div>
            <SectionEyebrow>{t.products.aiEyebrow}</SectionEyebrow>
            <h2 id="ai-title">{t.products.aiTitle}</h2>
            <p>{t.products.aiItems[0].text}</p>
          </div>
          <img src={assets.ai} alt={t.a11y.aiDashboard} />
        </div>
      </section>
    </>
  );
}

function AboutContent({ languageBundle }: { languageBundle: ReturnType<typeof useSiteLanguage> }) {
  const { t } = languageBundle;
  return (
    <>
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} subtitle={t.about.subtitle} image={assets.logistics} alt={t.a11y.pageVisual} />
      <section className="container about-grid" aria-label={t.a11y.capabilities}>
        <div className="about-panel dark-panel">
          <SectionEyebrow>{t.about.foundedLabel} {company.year}</SectionEyebrow>
          <h2>{t.about.logisticsTitle}</h2>
          <p>{t.about.logisticsText}</p>
        </div>
        <div className="capability-list">
          {t.about.pillars.map((pillar) => (
            <article key={pillar}>
              <BadgeCheck className="h-5 w-5" />
              <p>{pillar}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container timeline-section" aria-label={t.a11y.timeline}>
        {t.about.timeline.map((item) => (
          <article key={item.value} className="timeline-card">
            <strong>{item.value}</strong>
            <p>{item.text}</p>
          </article>
        ))}
        <article className="timeline-card">
          <strong><MapPin className="h-8 w-8" /></strong>
          <p><b>{t.about.addressTitle}</b><br />{company.address}</p>
        </article>
      </section>
    </>
  );
}

function ProductsContent({ languageBundle }: { languageBundle: ReturnType<typeof useSiteLanguage> }) {
  const { t } = languageBundle;
  return (
    <>
      <PageHero eyebrow={t.products.eyebrow} title={t.products.title} subtitle={t.products.subtitle} image={assets.solar} alt={t.a11y.pageVisual} />
      <section className="container product-section" aria-labelledby="solar-products-title">
        <div className="section-heading">
          <SectionEyebrow>{t.products.solarEyebrow}</SectionEyebrow>
          <h2 id="solar-products-title">{t.products.solarTitle}</h2>
        </div>
        <div className="product-grid">
          {t.products.categories.map((category, index) => {
            const icons = [PanelTop, Zap, SunMedium, CircuitBoard];
            const Icon = icons[index] ?? Sparkles;
            return (
              <article className="product-card" key={category.group}>
                <span className="icon-pill"><Icon className="h-5 w-5" /></span>
                <h3>{category.group}</h3>
                <ul>
                  {category.items.map((item) => (
                    <li key={item}><CheckCircle2 className="h-4 w-4" />{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
      <section className="container ai-solution-panel" aria-labelledby="ai-solutions-title">
        <img src={assets.ai} alt={t.a11y.aiControl} />
        <div>
          <SectionEyebrow>{t.products.aiEyebrow}</SectionEyebrow>
          <h2 id="ai-solutions-title">{t.products.aiTitle}</h2>
          <div className="ai-card-list">
            {t.products.aiItems.map((item) => (
              <article key={item.title}>
                <Sparkles className="h-5 w-5" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container ess-banner" aria-label={t.a11y.essSection}>
        <img src={assets.ess} alt={t.a11y.essVisual} />
        <div>
          <h2>{t.products.essTitle}</h2>
          <p>{t.products.essText}</p>
        </div>
      </section>
    </>
  );
}

function ContactContent({ languageBundle }: { languageBundle: ReturnType<typeof useSiteLanguage> }) {
  const { language, t } = languageBundle;
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    company: "",
    country: "",
    type: t.contact.options[0],
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, setPending] = useState(false);

  const update = (field: keyof ContactFormState, value: string) => setForm((current) => ({ ...current, [field]: value }));

  /*
   * Posts straight to Formspree now instead of the Manus tRPC endpoint. The
   * failure branch is the one that matters: it must surface an error rather
   * than a false success, so a dropped inquiry is never mistaken for a
   * delivered one.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setPending(true);
    try {
      await submitInquiry({ ...form, language });
      setStatus("success");
      setForm({ name: "", email: "", company: "", country: "", type: t.contact.options[0], message: "", website: "" });
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("error");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} image={assets.hero} alt={t.a11y.pageVisual} />
      <section className="container contact-grid" aria-labelledby="contact-form-title">
        <div className="contact-card">
          <h2 id="contact-form-title">{t.contact.formTitle}</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" value={form.website} onChange={(event) => update("website", event.target.value)} className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-row">
              <label>{t.contact.fields.name}<Input required value={form.name} onChange={(event) => update("name", event.target.value)} /></label>
              <label>{t.contact.fields.email}<Input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
            </div>
            <div className="form-row">
              <label>{t.contact.fields.company}<Input value={form.company} onChange={(event) => update("company", event.target.value)} /></label>
              <label>{t.contact.fields.country}<Input value={form.country} onChange={(event) => update("country", event.target.value)} /></label>
            </div>
            <label>{t.contact.fields.type}
              <select className="form-select" value={form.type} onChange={(event) => update("type", event.target.value)}>
                {t.contact.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label>{t.contact.fields.message}<Textarea required rows={6} value={form.message} onChange={(event) => update("message", event.target.value)} /></label>
            <Button type="submit" disabled={pending} className="rounded-full bg-[#0d2b28] px-7 py-6 text-[#fff8ea] hover:bg-[#173f3b] disabled:opacity-60">{pending ? t.contact.sending : t.contact.send}</Button>
            {status === "success" && <p className="form-status" role="status">{t.contact.success}</p>}
            {status === "error" && <p className="form-status error" role="alert">{t.contact.error}</p>}
          </form>
        </div>
        <aside className="contact-details" aria-label={t.a11y.contactDetails}>
          <div>
            <p className="detail-label">{t.contact.emailLabel}</p>
            <ProtectedEmail label={t.a11y.revealEmail} />
          </div>
          <div>
            <p className="detail-label">{t.contact.addressLabel}</p>
            <p><MapPin className="h-4 w-4" />{company.address}</p>
          </div>
        </aside>
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, subtitle, image, alt }: { eyebrow: string; title: string; subtitle: string; image: string; alt: string }) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <img src={image} alt={alt} />
      <div className="page-hero-content container">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1 id="page-title">{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

function Footer({ language }: { language: Language }) {
  const t = content[language];
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-grid">
        <div className="footer-tagline">
          <p>{t.footer.tagline}</p>
        </div>
        <div className="footer-contact">
          <h2>{company.name}</h2>
          <p className="footer-address"><House className="h-4 w-4" aria-hidden="true" /> <span>{company.address}</span></p>
          <ProtectedEmail className="footer-email" label={t.a11y.revealEmail} />
        </div>
        <div className="footer-social">
          <h2>Social</h2>
          <a className="footer-social-link" href={company.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" aria-hidden="true" /> <span>WhatsApp</span></a>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Harvest Eco Solutions Limited. {t.footer.rights}</div>
    </footer>
  );
}

function WhatsAppBubble({ label }: { label: string }) {
  return (
    <a className="whatsapp-bubble" href={company.whatsappUrl} target="_blank" rel="noreferrer" aria-label={label}>
      <PhoneCall className="h-5 w-5" />
      <span>WhatsApp</span>
    </a>
  );
}

export function AboutPage() {
  return <SiteShell page="about"> </SiteShell>;
}

export function ProductsPage() {
  return <SiteShell page="products"> </SiteShell>;
}

export function ContactPage() {
  return <SiteShell page="contact"> </SiteShell>;
}

export default function Home() {
  return <SiteShell page="home"> </SiteShell>;
}
