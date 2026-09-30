import { asset } from "@/lib/asset";

export type Language = "en" | "es" | "fr";

export const languages: Record<Language, { label: string; short: string; locale: string; flag: string }> = {
  en: { label: "English", short: "EN", locale: "en_US", flag: "🇬🇧" },
  es: { label: "Español", short: "ES", locale: "es_ES", flag: "🇪🇸" },
  fr: { label: "Français", short: "FR", locale: "fr_FR", flag: "🇫🇷" },
};

/*
 * All six images are served from this repository's own public/images/.
 *
 * They were previously split across two Manus services: the five photographs sat
 * on a CloudFront distribution, and the logo came from a /manus-storage/ path
 * that 307-redirected to a SIGNED CloudFront URL (so it would have expired even
 * while the Manus account was still paid for). Both would have died with the
 * subscription.
 *
 * Every value goes through asset() so the deployment base is applied in one
 * place. A raw "/images/..." string would work at a domain root and 404 under
 * the sub-path preview, passing every structural check while rendering broken
 * images.
 */
export const assets = {
  logo: asset("/images/harvest-logo.png"),
  hero: asset("/images/harvest-hero-solar-ai.webp"),
  solar: asset("/images/harvest-solar-products.webp"),
  ai: asset("/images/harvest-ai-control.webp"),
  ess: asset("/images/harvest-ess-storage.webp"),
  logistics: asset("/images/harvest-global-logistics.webp"),
  /*
   * Product shots for the four module types, extracted from the manufacturer's
   * datasheets by _tools/extract-pdf-figure.py — colour from a colour-managed
   * render of the page, transparency from the sheet's own alpha mask. No
   * branding is visible in them.
   */
  module630: asset("/images/solar-module-630-650.webp"),
  module715: asset("/images/solar-module-715-735.webp"),
  module425: asset("/images/solar-module-425-445.webp"),
  module430: asset("/images/solar-module-430-450.webp"),
  /*
   * Product shots for the category pages (/products/inverters/, /products/ess/,
   * /products/system-accessories/). Extracted from the manufacturer's single-sheet
   * datasheets with _tools/extract-pdf-figure.py, then cleared of the visible
   * supplier mark with _tools/erase-region.py — the site describes a Tier 1
   * supply network without naming suppliers, so the mark on the case had to go.
   */
  inverterSinglePhase: asset("/images/hybrid-inverter-single-phase.webp"),
  inverterThreePhase: asset("/images/hybrid-inverter-three-phase.webp"),
  homeStorage: asset("/images/home-storage-stackable.webp"),
  portablePower: asset("/images/portable-power-station.webp"),
};

export const company = {
  name: "Harvest Eco Solutions Limited",
  year: "2004",
  markets: "50+",
  customers: "1000+",
  /*
   * Written in full. The address used to be split into emailUser/emailDomain so
   * the page could obfuscate it; that hid nothing, because the structured data
   * in index.html carries the whole address in plain text anyway (see the README).
   */
  email: "sales@harvest.cn",
  /*
   * The former ownerEmailUser/ownerEmailDomain pair (a personal Gmail address)
   * was removed here. It was only ever read by the server-side mailer, which
   * this static migration drops, and this repository is public — a personal
   * address does not belong in it.
   */
  /*
   * whatsappDisplay and whatsappUrl were removed here, together with the footer's
   * Social column and the floating bubble. The contact form and the protected
   * email are now the site's only contact routes. To restore them, add the fields
   * back and re-add the markup in src/pages/Home.tsx.
   */
  /*
   * The Facebook entry that was here pointed at facebook.com/iscogmbh.com —
   * ISCO GmbH's page, not this company's. It was inherited from the site this
   * one was modelled on, and it was removed rather than guessed at. To restore
   * a footer link, add back a `facebook` field here and the anchor in
   * src/pages/Home.tsx (footer-social), plus the sameAs entry in index.html.
   */
  address: "Industrial Development Zone, Fengxian Dist., Shanghai 201404, China",
};

export const content = {
  en: {
    nav: { home: "Home", about: "About", products: "Products & Solutions", contact: "Contact" },
    a11y: {
      homeLink: "Harvest Eco Solutions Limited home",
      logo: "Harvest Eco Solutions Limited logo",
      primaryNav: "Primary navigation",
      language: "Select website language",
      openMenu: "Open navigation menu",
      mobileNav: "Mobile navigation",
      highlights: "Company highlights",
      advantages: "Core advantages",
      solarVisual: "Solar modules, inverters, photovoltaic cables and MC4 connectors",
      aiDashboard: "AI smart energy control dashboard connected to solar and storage systems",
      capabilities: "Company capabilities",
      timeline: "Company timeline and service model",
      aiControl: "AI smart control solution for energy saving products",
      essSection: "Energy storage systems",
      essVisual: "Portable power bank and home energy storage system",
      contactDetails: "Company contact details",
      pageVisual: "Harvest Eco Solutions clean energy visual",
    },
    cta: "Request a Quote",
    hero: {
      eyebrow: "Solar Systems · AI Energy Intelligence · Global Sourcing",
      title: "Elegant clean-energy solutions engineered for smarter global markets.",
      subtitle:
        "Since 2004, Harvest Eco Solutions Limited has helped customers source, design, customize and deploy reliable solar systems and AI-powered energy saving solutions across more than 50 countries and regions.",
      primary: "Explore Solutions",
      secondary: "Talk to Our Team",
    },
    stats: [
      { value: "20+", label: "Years of international trade experience" },
      { value: "50+", label: "Countries and regions served" },
      { value: "1000+", label: "Customers supported worldwide" },
      { value: "Tier 1", label: "Solar module brand supply network" },
    ],
    intro: {
      title: "More than products: integrated design, procurement and after-sales support.",
      body:
        "Harvest Eco Solutions Limited partners with qualified suppliers and Tier 1 solar brands to provide customized solutions, competitive sourcing, reliable logistics, warranty support and digital energy intelligence for international customers.",
    },
    advantages: [
      { title: "Solution-led sourcing", text: "We combine product procurement with design guidance, helping customers match solar, storage and control technologies to real market needs." },
      { title: "AI-ready efficiency", text: "Our team actively applies AI to make energy products smarter, easier to control remotely and more transparent through digital feedback." },
      { title: "Global trade expertise", text: "A professional international trade and logistics team supports full-cycle procurement from supplier coordination to after-sales service." },
    ],
    about: {
      eyebrow: "About Harvest",
      title: "Built for global clean-energy trade since 2004.",
      subtitle:
        "We operate at the intersection of solar technology, customized energy saving solutions and international supply chain execution.",
      addressTitle: "Shanghai office address",
      foundedLabel: "Founded in",
      timeline: [
        { value: "2004", text: "Company established with a focus on international trade and practical customer service." },
        { value: "50+", text: "Business presence expanded across global markets and regional requirements." },
        { value: "AI", text: "Energy products are increasingly connected with smarter control, remote visibility and digital feedback." },
      ],
      pillars: [
        "Personalized service for customer-specific market requirements",
        "One-stop procurement with competitive pricing and full-scope warranty support",
        "Professional trade and logistics execution for cross-border delivery",
        "Solar modules sourced from Tier 1 brands and qualified suppliers",
      ],
      logisticsTitle: "International execution with local attention to detail",
      logisticsText:
        "Our experience across more than 50 countries and regions allows us to support customers with documentation, quality coordination, logistics planning and product adaptation for diverse market conditions.",
    },
    products: {
      eyebrow: "Products & Solutions",
      solarEyebrow: "Solar Systems",
      aiEyebrow: "AI Intelligence",
      essTitle: "ESS for portable and residential energy resilience",
      essText: "Portable power bank and home storage solutions designed to complement solar generation, remote control and energy independence.",
      title: "Products and intelligent energy solutions",
      subtitle:
        "A focused portfolio covering solar generation, inverter systems, compact storage, installation accessories and AI-enabled control solutions.",
      solarTitle: "Solar System Portfolio",
      /* Label for the link from the products overview to the module page. */
      modulesLink: "Technical data for our solar modules",
      aiTitle: "AI Smart Control Solutions",
      categories: [
        { group: "Solar Modules", items: ["Standard solar modules", "All-black solar modules", "Flexible solar modules", "Foldable solar modules"] },
        { group: "Inverters", items: ["Off-grid inverters", "Hybrid inverters"] },
        { group: "ESS", items: ["Portable power banks", "Home energy storage systems"] },
        { group: "System Accessories", items: ["FRP composite solar module frames", "PV cables and MC4 connectors"] },
      ],
      aiItems: [
        { title: "Self-developed AI energy-saving products", text: "Intelligent control logic designed for practical energy efficiency and remote visibility." },
        { title: "Customized energy-saving solutions", text: "Customer-specific solution design for changing market needs and differentiated product strategies." },
        { title: "Green energy consulting", text: "Consulting support for product selection, configuration and market-ready sustainability solutions." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Start a conversation with Harvest Eco Solutions.",
      subtitle: "Tell us about your market, product requirement or project scope. Our team will respond with a practical next step.",
      formTitle: "Request information",
      fields: { name: "Full name", email: "Business email", company: "Company", country: "Country / Region", type: "Requirement type", message: "Project details" },
      options: ["Solar module sourcing", "Inverters", "ESS / Storage", "AI smart control", "Custom solution", "Other"],
      send: "Send inquiry",
      sending: "Sending...",
      error: "We could not submit the inquiry right now. Please try again or contact us via WhatsApp.",
      /*
       * Was "Protected email". The address is no longer obfuscated, so claiming
       * it is protected would be false; the labels now just name the field.
       */
      emailLabel: "Email",
      addressLabel: "Office address",
      success: "Thank you. Your inquiry has been submitted securely. Our team will follow up shortly.",
    },
    footer: {
      tagline: "Solar systems and AI intelligent energy-saving solutions for global markets.",
      rights: "All rights reserved.",
    },
    notFound: { title: "Page not found", text: "The page you are looking for may have moved or is no longer available.", action: "Return home" },
  },
  es: {
    nav: { home: "Inicio", about: "Nosotros", products: "Productos y soluciones", contact: "Contacto" },
    a11y: {
      homeLink: "Inicio de Harvest Eco Solutions Limited",
      logo: "Logotipo de Harvest Eco Solutions Limited",
      primaryNav: "Navegación principal",
      language: "Seleccionar idioma del sitio web",
      openMenu: "Abrir menú de navegación",
      mobileNav: "Navegación móvil",
      highlights: "Datos destacados de la empresa",
      advantages: "Ventajas principales",
      solarVisual: "Módulos solares, inversores, cables fotovoltaicos y conectores MC4",
      aiDashboard: "Panel de control inteligente de energía con IA conectado a sistemas solares y de almacenamiento",
      capabilities: "Capacidades de la empresa",
      timeline: "Cronología de la empresa y modelo de servicio",
      aiControl: "Solución de control inteligente con IA para productos de ahorro energético",
      essSection: "Sistemas de almacenamiento de energía",
      essVisual: "Batería portátil y sistema doméstico de almacenamiento de energía",
      contactDetails: "Datos de contacto de la empresa",
      pageVisual: "Imagen de energía limpia de Harvest Eco Solutions",
    },
    cta: "Solicitar cotización",
    hero: {
      eyebrow: "Sistemas solares · Inteligencia energética con IA · Abastecimiento global",
      title: "Soluciones de energía limpia elegantes para mercados globales más inteligentes.",
      subtitle:
        "Desde 2004, Harvest Eco Solutions Limited ayuda a clientes a adquirir, diseñar, personalizar e implementar sistemas solares y soluciones de ahorro energético con IA en más de 50 países y regiones.",
      primary: "Explorar soluciones",
      secondary: "Hablar con el equipo",
    },
    stats: [
      { value: "20+", label: "Años de experiencia en comercio internacional" },
      { value: "50+", label: "Países y regiones atendidos" },
      { value: "1000+", label: "Clientes apoyados mundialmente" },
      { value: "Tier 1", label: "Red de marcas de módulos solares" },
    ],
    intro: {
      title: "Más que productos: diseño, compras y soporte posventa integrados.",
      body:
        "Harvest Eco Solutions Limited colabora con proveedores calificados y marcas solares Tier 1 para ofrecer soluciones personalizadas, abastecimiento competitivo, logística confiable, garantía e inteligencia energética digital.",
    },
    advantages: [
      { title: "Abastecimiento orientado a soluciones", text: "Combinamos compras con orientación de diseño para adaptar tecnologías solares, almacenamiento y control a las necesidades reales del mercado." },
      { title: "Eficiencia preparada para IA", text: "Aplicamos IA para que los productos energéticos sean más inteligentes, controlables a distancia y transparentes mediante datos digitales." },
      { title: "Experiencia comercial global", text: "Un equipo profesional de comercio y logística internacional acompaña todo el ciclo de compra y servicio." },
    ],
    about: {
      eyebrow: "Nosotros",
      title: "Construidos para el comercio global de energía limpia desde 2004.",
      subtitle: "Operamos en la intersección de tecnología solar, soluciones personalizadas de ahorro energético y ejecución internacional.",
      addressTitle: "Dirección de la oficina en Shanghái",
      foundedLabel: "Fundada en",
      timeline: [
        { value: "2004", text: "La empresa se estableció con enfoque en comercio internacional y servicio práctico al cliente." },
        { value: "50+", text: "La presencia comercial se amplió a mercados globales y requisitos regionales." },
        { value: "IA", text: "Los productos energéticos se conectan cada vez más con control inteligente, visibilidad remota y datos digitales." },
      ],
      pillars: [
        "Servicio personalizado para requisitos específicos de mercado",
        "Compras integrales con precios competitivos y soporte de garantía",
        "Ejecución profesional de comercio y logística transfronteriza",
        "Módulos solares de marcas Tier 1 y proveedores calificados",
      ],
      logisticsTitle: "Ejecución internacional con atención local al detalle",
      logisticsText:
        "Nuestra experiencia en más de 50 países y regiones permite apoyar documentación, coordinación de calidad, logística y adaptación de productos para mercados diversos.",
    },
    products: {
      eyebrow: "Productos y soluciones",
      solarEyebrow: "Sistemas solares",
      aiEyebrow: "Inteligencia IA",
      essTitle: "ESS para resiliencia energética portátil y residencial",
      essText: "Baterías portátiles y soluciones domésticas de almacenamiento diseñadas para complementar la generación solar, el control remoto y la independencia energética.",
      title: "Productos y soluciones energéticas inteligentes",
      subtitle: "Una cartera enfocada en generación solar, inversores, almacenamiento compacto, accesorios e inteligencia de control con IA.",
      solarTitle: "Portafolio de sistemas solares",
      modulesLink: "Datos técnicos de nuestros módulos solares",
      aiTitle: "Soluciones de control inteligente con IA",
      categories: [
        { group: "Módulos solares", items: ["Módulos solares estándar", "Módulos solares all-black", "Módulos solares flexibles", "Módulos solares plegables"] },
        { group: "Inversores", items: ["Inversores fuera de red", "Inversores híbridos"] },
        { group: "ESS", items: ["Baterías portátiles", "Sistemas domésticos de almacenamiento"] },
        { group: "Accesorios", items: ["Marcos compuestos FRP", "Cables FV y conectores MC4"] },
      ],
      aiItems: [
        { title: "Productos propios de ahorro energético con IA", text: "Lógica inteligente para eficiencia práctica y visibilidad remota." },
        { title: "Soluciones personalizadas", text: "Diseño específico para necesidades cambiantes y estrategias diferenciadas." },
        { title: "Consultoría verde", text: "Apoyo en selección, configuración y soluciones sostenibles listas para el mercado." },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Inicie una conversación con Harvest Eco Solutions.",
      subtitle: "Cuéntenos su mercado, necesidad de producto o alcance del proyecto. Responderemos con un siguiente paso práctico.",
      formTitle: "Solicitar información",
      fields: { name: "Nombre completo", email: "Correo empresarial", company: "Empresa", country: "País / Región", type: "Tipo de necesidad", message: "Detalles del proyecto" },
      options: ["Módulos solares", "Inversores", "ESS / Almacenamiento", "Control inteligente IA", "Solución personalizada", "Otro"],
      send: "Enviar consulta",
      sending: "Enviando...",
      error: "No pudimos enviar la consulta en este momento. Inténtelo de nuevo o contáctenos por WhatsApp.",
      emailLabel: "Correo electrónico",
      addressLabel: "Dirección",
      success: "Gracias. Su consulta se ha enviado de forma segura. Nuestro equipo responderá pronto.",
    },
    footer: { tagline: "Sistemas solares y soluciones inteligentes de ahorro energético con IA para mercados globales.", rights: "Todos los derechos reservados." },
    notFound: { title: "Página no encontrada", text: "La página que busca puede haber cambiado o no estar disponible.", action: "Volver al inicio" },
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", products: "Produits et solutions", contact: "Contact" },
    a11y: {
      homeLink: "Accueil de Harvest Eco Solutions Limited",
      logo: "Logo de Harvest Eco Solutions Limited",
      primaryNav: "Navigation principale",
      language: "Sélectionner la langue du site",
      openMenu: "Ouvrir le menu de navigation",
      mobileNav: "Navigation mobile",
      highlights: "Points forts de l’entreprise",
      advantages: "Avantages principaux",
      solarVisual: "Modules solaires, onduleurs, câbles photovoltaïques et connecteurs MC4",
      aiDashboard: "Tableau de bord énergétique intelligent avec IA connecté aux systèmes solaires et de stockage",
      capabilities: "Capacités de l’entreprise",
      timeline: "Chronologie de l’entreprise et modèle de service",
      aiControl: "Solution de contrôle intelligent avec IA pour produits d’économie d’énergie",
      essSection: "Systèmes de stockage d’énergie",
      essVisual: "Batterie portable et système domestique de stockage d’énergie",
      contactDetails: "Coordonnées de l’entreprise",
      pageVisual: "Visuel d’énergie propre de Harvest Eco Solutions",
    },
    cta: "Demander un devis",
    hero: {
      eyebrow: "Systèmes solaires · Intelligence énergétique IA · Approvisionnement mondial",
      title: "Des solutions d’énergie propre élégantes pour des marchés mondiaux plus intelligents.",
      subtitle:
        "Depuis 2004, Harvest Eco Solutions Limited aide ses clients à sourcer, concevoir, personnaliser et déployer des systèmes solaires et des solutions d’économie d’énergie alimentées par l’IA dans plus de 50 pays et régions.",
      primary: "Explorer les solutions",
      secondary: "Parler à notre équipe",
    },
    stats: [
      { value: "20+", label: "Ans d’expérience en commerce international" },
      { value: "50+", label: "Pays et régions desservis" },
      { value: "1000+", label: "Clients accompagnés dans le monde" },
      { value: "Tier 1", label: "Réseau de marques de modules solaires" },
    ],
    intro: {
      title: "Plus que des produits : conception, achat et support après-vente intégrés.",
      body:
        "Harvest Eco Solutions Limited travaille avec des fournisseurs qualifiés et des marques solaires Tier 1 pour fournir des solutions personnalisées, un sourcing compétitif, une logistique fiable, une garantie et une intelligence énergétique numérique.",
    },
    advantages: [
      { title: "Sourcing orienté solution", text: "Nous associons achat et conseil de conception pour adapter solaire, stockage et contrôle aux besoins réels du marché." },
      { title: "Efficacité prête pour l’IA", text: "Nous appliquons l’IA pour rendre les produits énergétiques plus intelligents, contrôlables à distance et transparents grâce aux données." },
      { title: "Expertise commerciale mondiale", text: "Une équipe professionnelle de commerce international et de logistique accompagne l’ensemble du cycle d’approvisionnement." },
    ],
    about: {
      eyebrow: "À propos",
      title: "Conçus pour le commerce mondial de l’énergie propre depuis 2004.",
      subtitle: "Nous combinons technologie solaire, solutions personnalisées d’économie d’énergie et exécution internationale.",
      addressTitle: "Adresse du bureau de Shanghai",
      foundedLabel: "Fondée en",
      timeline: [
        { value: "2004", text: "L’entreprise a été créée avec un accent sur le commerce international et le service client pratique." },
        { value: "50+", text: "La présence commerciale s’est étendue aux marchés mondiaux et aux exigences régionales." },
        { value: "IA", text: "Les produits énergétiques intègrent davantage de contrôle intelligent, de visibilité à distance et de retour d’information numérique." },
      ],
      pillars: [
        "Service personnalisé pour les exigences propres à chaque marché",
        "Approvisionnement complet avec prix compétitifs et support de garantie",
        "Exécution professionnelle du commerce et de la logistique transfrontaliers",
        "Modules solaires issus de marques Tier 1 et de fournisseurs qualifiés",
      ],
      logisticsTitle: "Exécution internationale avec attention locale aux détails",
      logisticsText:
        "Notre expérience dans plus de 50 pays et régions permet de soutenir la documentation, la qualité, la logistique et l’adaptation produit pour divers marchés.",
    },
    products: {
      eyebrow: "Produits et solutions",
      solarEyebrow: "Systèmes solaires",
      aiEyebrow: "Intelligence IA",
      essTitle: "ESS pour la résilience énergétique portable et résidentielle",
      essText: "Solutions de batteries portables et de stockage domestique conçues pour compléter la production solaire, le contrôle à distance et l’indépendance énergétique.",
      title: "Produits et solutions énergétiques intelligentes",
      subtitle: "Un portefeuille ciblé couvrant génération solaire, onduleurs, stockage, accessoires et contrôle intelligent par IA.",
      solarTitle: "Portefeuille de systèmes solaires",
      modulesLink: "Données techniques de nos modules solaires",
      aiTitle: "Solutions de contrôle intelligent IA",
      categories: [
        { group: "Modules solaires", items: ["Modules solaires standard", "Modules solaires entièrement noirs", "Modules solaires flexibles", "Modules solaires pliables"] },
        { group: "Onduleurs", items: ["Onduleurs hors réseau", "Onduleurs hybrides"] },
        { group: "ESS", items: ["Batteries portables", "Systèmes domestiques de stockage"] },
        { group: "Accessoires", items: ["Cadres composites FRP", "Câbles PV et connecteurs MC4"] },
      ],
      aiItems: [
        { title: "Produits IA d’économie d’énergie développés en interne", text: "Logique de contrôle intelligente pour une efficacité pratique et une visibilité à distance." },
        { title: "Solutions personnalisées", text: "Conception adaptée aux besoins changeants et aux stratégies différenciées." },
        { title: "Conseil en énergie verte", text: "Support pour sélection, configuration et solutions durables prêtes au marché." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Entamez une conversation avec Harvest Eco Solutions.",
      subtitle: "Décrivez votre marché, vos besoins produit ou votre projet. Notre équipe proposera une prochaine étape concrète.",
      formTitle: "Demander des informations",
      fields: { name: "Nom complet", email: "E-mail professionnel", company: "Entreprise", country: "Pays / Région", type: "Type de besoin", message: "Détails du projet" },
      options: ["Modules solaires", "Onduleurs", "ESS / Stockage", "Contrôle intelligent IA", "Solution personnalisée", "Autre"],
      send: "Envoyer la demande",
      sending: "Envoi...",
      error: "Nous n’avons pas pu envoyer la demande pour le moment. Réessayez ou contactez-nous via WhatsApp.",
      emailLabel: "E-mail",
      addressLabel: "Adresse",
      success: "Merci. Votre demande a été envoyée de manière sécurisée. Notre équipe vous répondra bientôt.",
    },
    footer: { tagline: "Systèmes solaires et solutions intelligentes d’économie d’énergie IA pour les marchés mondiaux.", rights: "Tous droits réservés." },
    notFound: { title: "Page introuvable", text: "La page recherchée a peut-être été déplacée ou n’est plus disponible.", action: "Retour à l’accueil" },
  },
} as const;

/*
 * Technical data for the solar module range, shown on its own page
 * (/products/solar-modules/).
 *
 * Two groups, two variants each:
 *
 *   Standard   - two power classes on different platforms (182 mm / 78 half-cut
 *                and 210 mm / 66 half-cut), both with a white ceramic rear grid.
 *   All-black  - one residential platform (182 mm / 108 half-cut) in two
 *                rear-grid finishes; the fully black grid costs one power bin.
 *
 * The rows repeat between variants on purpose: each card has to read as a
 * complete specification rather than sending the reader to another card to fill
 * in the blanks. If a datasheet is revised, update every variant that shares the
 * value.
 *
 * Brand and model numbers are deliberately absent — the site describes a Tier 1
 * supply network without naming suppliers (see 03-关键决策记录).
 *
 * Source: manufacturer datasheets, revision HAITAI20250329EN (plus the 715-735 W
 * sheet of the same generation, which carries a higher-resolution figure).
 * Packaging figures are NOT included: they are
 * garbled in the source PDFs and need confirming with the supplier first.
 */
export type ModuleSpecRow = { label: string; value: string };
export type ModuleVariant = {
  power: string;
  finish: string;
  imageAlt: string;
  specs: ModuleSpecRow[];
};
export type ModuleGroup = {
  name: string;
  intro: string;
  variants: ModuleVariant[];
};

export const moduleSpecs: Record<
  Language,
  { eyebrow: string; title: string; subtitle: string; note: string; groups: ModuleGroup[] }
> = {
  en: {
    eyebrow: "Solar Modules",
    title: "Technical data for our solar modules",
    subtitle:
      "Four module types in two product groups: high-power standard modules for utility and commercial installations, and a residential platform offered in an all-black finish.",
    note: "Certifications: IEC 61215, IEC 61730, ISO 9001 / 14001 / 45001. 30-year linear power warranty: under 1.0% degradation in year one, then 0.40% per year or less. Data taken from the manufacturer's datasheets and subject to change — confirm the exact power bin before ordering.",
    groups: [
      {
        name: "Standard solar modules",
        intro:
          "Two power classes on different platforms, both N-type TOPCon bifacial with a white ceramic rear grid and the same 30-year linear power warranty.",
        variants: [
          {
            power: "630 – 650 W",
            finish: "182 mm platform · 78 half-cut cells",
            imageAlt:
              "Standard bifacial solar module, 630 to 650 watts, with white grid lines and a silver frame",
            specs: [
              { label: "Power range", value: "630 – 650 W" },
              { label: "Max. module efficiency", value: "23.25 %" },
              { label: "Cell technology", value: "N-type TOPCon · 156 half-cut (6×26)" },
              { label: "Module dimensions", value: "2465 × 1134 × 30 mm" },
              { label: "Weight", value: "34.5 kg" },
            ],
          },
          {
            power: "715 – 735 W",
            finish: "210 mm platform · 66 half-cut cells",
            imageAlt:
              "Standard bifacial solar module, 715 to 735 watts, with large 210 mm cells and a silver frame",
            specs: [
              { label: "Power range", value: "715 – 735 W" },
              { label: "Max. module efficiency", value: "23.66 %" },
              { label: "Cell technology", value: "N-type TOPCon · 132 half-cut (6×22) · 210 mm cells" },
              { label: "Module dimensions", value: "2384 × 1303 × 33 mm" },
              { label: "Weight", value: "37.5 kg" },
            ],
          },
        ],
      },
      {
        name: "All-black solar modules",
        intro:
          "One residential platform in two rear-grid finishes. The fully black grid gives a uniform dark appearance; the white grid returns one power bin.",
        variants: [
          {
            power: "425 – 445 W",
            finish: "All-black rear grid · 182 mm platform",
            imageAlt:
              "All-black bifacial solar module, 425 to 445 watts, with black cells and frame and no visible grid lines",
            specs: [
              { label: "Power range", value: "425 – 445 W" },
              { label: "Max. module efficiency", value: "22.79 %" },
              { label: "Cell technology", value: "N-type TOPCon · 108 half-cut (6×18)" },
              { label: "Module dimensions", value: "1722 × 1134 × 30 mm" },
              { label: "Weight", value: "24.0 kg" },
            ],
          },
          {
            power: "430 – 450 W",
            finish: "White rear grid · 182 mm platform",
            imageAlt:
              "Bifacial solar module, 430 to 450 watts, with white grid lines and a silver frame",
            specs: [
              { label: "Power range", value: "430 – 450 W" },
              { label: "Max. module efficiency", value: "23.04 %" },
              { label: "Cell technology", value: "N-type TOPCon · 108 half-cut (6×18)" },
              { label: "Module dimensions", value: "1722 × 1134 × 30 mm" },
              { label: "Weight", value: "24.0 kg" },
            ],
          },
        ],
      },
    ],
  },
  es: {
    eyebrow: "Módulos solares",
    title: "Datos técnicos de nuestros módulos solares",
    subtitle:
      "Cuatro tipos de módulo en dos grupos de producto: módulos estándar de alta potencia para instalaciones industriales y comerciales, y una plataforma residencial con acabado all-black.",
    note: "Certificaciones: IEC 61215, IEC 61730, ISO 9001 / 14001 / 45001. Garantía de potencia lineal de 30 años: menos del 1,0 % el primer año y 0,40 % anual o menos a partir del segundo. Datos tomados de las fichas del fabricante y sujetos a cambios: confirme el bin de potencia exacto antes de pedir.",
    groups: [
      {
        name: "Módulos solares estándar",
        intro:
          "Dos clases de potencia en plataformas distintas, ambas TOPCon tipo N bifaciales con rejilla cerámica blanca y la misma garantía de potencia lineal de 30 años.",
        variants: [
          {
            power: "630 – 650 W",
            finish: "Plataforma de 182 mm · 78 medias células",
            imageAlt:
              "Módulo solar bifacial estándar, de 630 a 650 vatios, con líneas de rejilla blancas y marco plateado",
            specs: [
              { label: "Rango de potencia", value: "630 – 650 W" },
              { label: "Eficiencia máxima del módulo", value: "23,25 %" },
              { label: "Tecnología de células", value: "TOPCon tipo N · 156 medias células (6×26)" },
              { label: "Dimensiones del módulo", value: "2465 × 1134 × 30 mm" },
              { label: "Peso", value: "34,5 kg" },
            ],
          },
          {
            power: "715 – 735 W",
            finish: "Plataforma de 210 mm · 66 medias células",
            imageAlt:
              "Módulo solar bifacial estándar, de 715 a 735 vatios, con células grandes de 210 mm y marco plateado",
            specs: [
              { label: "Rango de potencia", value: "715 – 735 W" },
              { label: "Eficiencia máxima del módulo", value: "23,66 %" },
              { label: "Tecnología de células", value: "TOPCon tipo N · 132 medias células (6×22) · células de 210 mm" },
              { label: "Dimensiones del módulo", value: "2384 × 1303 × 33 mm" },
              { label: "Peso", value: "37,5 kg" },
            ],
          },
        ],
      },
      {
        name: "Módulos solares all-black",
        intro:
          "Una plataforma residencial con dos acabados de rejilla posterior. La rejilla totalmente negra da un aspecto oscuro uniforme; la blanca devuelve un escalón de potencia.",
        variants: [
          {
            power: "425 – 445 W",
            finish: "Rejilla posterior negra · plataforma de 182 mm",
            imageAlt:
              "Módulo solar bifacial all-black, de 425 a 445 vatios, con células y marco negros y sin líneas de rejilla visibles",
            specs: [
              { label: "Rango de potencia", value: "425 – 445 W" },
              { label: "Eficiencia máxima del módulo", value: "22,79 %" },
              { label: "Tecnología de células", value: "TOPCon tipo N · 108 medias células (6×18)" },
              { label: "Dimensiones del módulo", value: "1722 × 1134 × 30 mm" },
              { label: "Peso", value: "24,0 kg" },
            ],
          },
          {
            power: "430 – 450 W",
            finish: "Rejilla posterior blanca · plataforma de 182 mm",
            imageAlt:
              "Módulo solar bifacial, de 430 a 450 vatios, con líneas de rejilla blancas y marco plateado",
            specs: [
              { label: "Rango de potencia", value: "430 – 450 W" },
              { label: "Eficiencia máxima del módulo", value: "23,04 %" },
              { label: "Tecnología de células", value: "TOPCon tipo N · 108 medias células (6×18)" },
              { label: "Dimensiones del módulo", value: "1722 × 1134 × 30 mm" },
              { label: "Peso", value: "24,0 kg" },
            ],
          },
        ],
      },
    ],
  },
  fr: {
    eyebrow: "Modules solaires",
    title: "Données techniques de nos modules solaires",
    subtitle:
      "Quatre types de modules en deux groupes de produits : des modules standard de forte puissance pour les installations industrielles et commerciales, et une plateforme résidentielle déclinée en finition tout noir.",
    note: "Certifications : IEC 61215, IEC 61730, ISO 9001 / 14001 / 45001. Garantie de puissance linéaire de 30 ans : moins de 1,0 % la première année, puis 0,40 % par an au maximum. Données issues des fiches du fabricant et susceptibles d’évoluer : confirmez le bin de puissance exact avant commande.",
    groups: [
      {
        name: "Modules solaires standard",
        intro:
          "Deux classes de puissance sur des plateformes différentes, toutes deux TOPCon de type N bifaciales avec une grille céramique blanche et la même garantie de puissance linéaire de 30 ans.",
        variants: [
          {
            power: "630 – 650 W",
            finish: "Plateforme 182 mm · 78 demi-cellules",
            imageAlt:
              "Module solaire bifacial standard, de 630 à 650 watts, à lignes de grille blanches et cadre argenté",
            specs: [
              { label: "Plage de puissance", value: "630 – 650 W" },
              { label: "Rendement maximal du module", value: "23,25 %" },
              { label: "Technologie des cellules", value: "TOPCon de type N · 156 demi-cellules (6×26)" },
              { label: "Dimensions du module", value: "2465 × 1134 × 30 mm" },
              { label: "Poids", value: "34,5 kg" },
            ],
          },
          {
            power: "715 – 735 W",
            finish: "Plateforme 210 mm · 66 demi-cellules",
            imageAlt:
              "Module solaire bifacial standard, de 715 à 735 watts, à grandes cellules 210 mm et cadre argenté",
            specs: [
              { label: "Plage de puissance", value: "715 – 735 W" },
              { label: "Rendement maximal du module", value: "23,66 %" },
              { label: "Technologie des cellules", value: "TOPCon de type N · 132 demi-cellules (6×22) · cellules 210 mm" },
              { label: "Dimensions du module", value: "2384 × 1303 × 33 mm" },
              { label: "Poids", value: "37,5 kg" },
            ],
          },
        ],
      },
      {
        name: "Modules solaires entièrement noirs",
        intro:
          "Une plateforme résidentielle en deux finitions de grille arrière. La grille entièrement noire donne un aspect sombre uniforme ; la blanche rend un cran de puissance.",
        variants: [
          {
            power: "425 – 445 W",
            finish: "Grille arrière noire · plateforme 182 mm",
            imageAlt:
              "Module solaire bifacial entièrement noir, de 425 à 445 watts, cellules et cadre noirs, sans lignes de grille visibles",
            specs: [
              { label: "Plage de puissance", value: "425 – 445 W" },
              { label: "Rendement maximal du module", value: "22,79 %" },
              { label: "Technologie des cellules", value: "TOPCon de type N · 108 demi-cellules (6×18)" },
              { label: "Dimensions du module", value: "1722 × 1134 × 30 mm" },
              { label: "Poids", value: "24,0 kg" },
            ],
          },
          {
            power: "430 – 450 W",
            finish: "Grille arrière blanche · plateforme 182 mm",
            imageAlt:
              "Module solaire bifacial, de 430 à 450 watts, à lignes de grille blanches et cadre argenté",
            specs: [
              { label: "Plage de puissance", value: "430 – 450 W" },
              { label: "Rendement maximal du module", value: "23,04 %" },
              { label: "Technologie des cellules", value: "TOPCon de type N · 108 demi-cellules (6×18)" },
              { label: "Dimensions du module", value: "1722 × 1134 × 30 mm" },
              { label: "Poids", value: "24,0 kg" },
            ],
          },
        ],
      },
    ],
  },
};

/*
 * The three category pages under /products/: inverters, energy storage and system
 * accessories.
 *
 * Each page shows one group of product cards. A card carries:
 *
 *   name   - the product name, in the same words the products overview uses, so
 *            the two pages describe the same catalogue;
 *   image  - looked up by key in productCardImages below, never written here,
 *            because a photo is the same in every language;
 *   specs  - OPTIONAL, and the card renders the table only when it is present.
 *
 * The specs rows are deliberately absent for now. Only the hybrid inverters and
 * the home storage range have confirmed datasheets, so a table on two cards out
 * of seven would read as an accident. When a datasheet is confirmed, add the
 * rows to that card in all three languages and the table appears — no component
 * change needed. The shape is ModuleSpecRow, the same one the module page uses,
 * so the tables match.
 *
 * Where no datasheet exists, the card shows the product name and nothing else:
 * no invented figures, and no "coming soon" placeholder. That is why some cards
 * have no image and no table, which the card layout handles (it does not reserve
 * space for either).
 */
export type ProductCardKey =
  | "hybridSinglePhase"
  | "hybridThreePhase"
  | "offGrid"
  | "homeStorage"
  | "portablePower"
  | "moduleFrames"
  | "pvCables";

export type ProductCard = {
  key: ProductCardKey;
  name: string;
  imageAlt?: string;
  specs?: ModuleSpecRow[];
};

export type ProductGroup = { name: string; intro: string; cards: ProductCard[] };
export type ProductLine = {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
  groups: ProductGroup[];
};
export type ProductLineKey = "inverters" | "ess" | "accessories";

/* Cards without an entry here are the ones with no confirmed material. */
export const productCardImages: Partial<Record<ProductCardKey, string>> = {
  hybridSinglePhase: assets.inverterSinglePhase,
  hybridThreePhase: assets.inverterThreePhase,
  homeStorage: assets.homeStorage,
  portablePower: assets.portablePower,
};

export const productLines: Record<ProductLineKey, Record<Language, ProductLine>> = {
  inverters: {
    en: {
      eyebrow: "Inverters",
      title: "Hybrid and off-grid inverters",
      subtitle:
        "Hybrid units manage solar input, battery charging and the grid connection together; off-grid units run a site that has no utility connection at all.",
      note: "Model-level datasheets for the units we supply are available on request.",
      groups: [
        {
          name: "Inverters",
          intro:
            "Two hybrid platforms — single-phase for residential systems, three-phase for larger installations — and off-grid inverters for sites that run on a battery bank alone.",
          cards: [
            {
              key: "hybridSinglePhase",
              name: "Single-phase hybrid inverter",
              imageAlt:
                "Single-phase hybrid inverter in a wall-mounted white housing, with a display on the front",
            },
            {
              key: "hybridThreePhase",
              name: "Three-phase hybrid inverter",
              imageAlt:
                "Three-phase hybrid inverter in a wall-mounted white housing, with a control panel on the front",
            },
            { key: "offGrid", name: "Off-grid inverters" },
          ],
        },
      ],
    },
    es: {
      eyebrow: "Inversores",
      title: "Inversores híbridos y fuera de red",
      subtitle:
        "Los equipos híbridos gestionan a la vez la entrada solar, la carga de baterías y la conexión a red; los equipos fuera de red alimentan instalaciones sin conexión alguna a la red.",
      note: "Las fichas técnicas por modelo de los equipos que suministramos están disponibles a petición.",
      groups: [
        {
          name: "Inversores",
          intro:
            "Dos plataformas híbridas —monofásica para instalaciones residenciales y trifásica para instalaciones mayores— e inversores fuera de red para emplazamientos que funcionan solo con banco de baterías.",
          cards: [
            {
              key: "hybridSinglePhase",
              name: "Inversor híbrido monofásico",
              imageAlt:
                "Inversor híbrido monofásico en carcasa blanca de montaje en pared, con pantalla en el frontal",
            },
            {
              key: "hybridThreePhase",
              name: "Inversor híbrido trifásico",
              imageAlt:
                "Inversor híbrido trifásico en carcasa blanca de montaje en pared, con panel de control en el frontal",
            },
            { key: "offGrid", name: "Inversores fuera de red" },
          ],
        },
      ],
    },
    fr: {
      eyebrow: "Onduleurs",
      title: "Onduleurs hybrides et hors réseau",
      subtitle:
        "Les appareils hybrides gèrent ensemble l’entrée solaire, la charge des batteries et le raccordement au réseau ; les appareils hors réseau alimentent un site dépourvu de tout raccordement.",
      note: "Les fiches techniques par modèle des appareils que nous fournissons sont disponibles sur demande.",
      groups: [
        {
          name: "Onduleurs",
          intro:
            "Deux plateformes hybrides — monophasée pour le résidentiel, triphasée pour les installations plus importantes — et des onduleurs hors réseau pour les sites alimentés uniquement par un parc de batteries.",
          cards: [
            {
              key: "hybridSinglePhase",
              name: "Onduleur hybride monophasé",
              imageAlt:
                "Onduleur hybride monophasé en boîtier blanc mural, avec écran en façade",
            },
            {
              key: "hybridThreePhase",
              name: "Onduleur hybride triphasé",
              imageAlt:
                "Onduleur hybride triphasé en boîtier blanc mural, avec panneau de commande en façade",
            },
            { key: "offGrid", name: "Onduleurs hors réseau" },
          ],
        },
      ],
    },
  },
  ess: {
    en: {
      eyebrow: "ESS & Storage",
      title: "Portable and residential energy storage",
      subtitle:
        "Stackable low-voltage batteries for residential solar systems, and portable power stations for outdoor work, emergency backup and travel.",
      note: "Capacity options for both ranges, and their datasheets, are available on request.",
      groups: [
        {
          name: "Energy storage",
          intro:
            "Home storage that grows from a single battery module to a multi-module bank, and portable stations that bring mains power to sites away from a fixed installation.",
          cards: [
            {
              key: "homeStorage",
              name: "Home energy storage systems",
              imageAlt:
                "Stackable home battery modules, shown as a two-module and a three-module stack",
            },
            {
              key: "portablePower",
              name: "Portable power banks",
              imageAlt:
                "Portable power station with a carry handle, a display and AC outlets",
            },
          ],
        },
      ],
    },
    es: {
      eyebrow: "ESS y almacenamiento",
      title: "Almacenamiento portátil y residencial",
      subtitle:
        "Baterías apilables de baja tensión para instalaciones solares residenciales y estaciones portátiles para trabajo en exteriores, respaldo de emergencia y viajes.",
      note: "Las capacidades disponibles en ambas gamas, y sus fichas técnicas, están disponibles a petición.",
      groups: [
        {
          name: "Almacenamiento de energía",
          intro:
            "Almacenamiento doméstico que crece desde un solo módulo de batería hasta un banco de varios módulos, y estaciones portátiles que llevan corriente de red a emplazamientos sin instalación fija.",
          cards: [
            {
              key: "homeStorage",
              name: "Sistemas domésticos de almacenamiento de energía",
              imageAlt:
                "Módulos de batería doméstica apilables, mostrados en configuración de dos y de tres módulos",
            },
            {
              key: "portablePower",
              name: "Baterías portátiles",
              imageAlt:
                "Estación de energía portátil con asa de transporte, pantalla y tomas de corriente alterna",
            },
          ],
        },
      ],
    },
    fr: {
      eyebrow: "ESS et stockage",
      title: "Stockage portable et résidentiel",
      subtitle:
        "Des batteries empilables basse tension pour les installations solaires résidentielles et des stations portables pour le travail en extérieur, le secours d’urgence et les déplacements.",
      note: "Les capacités disponibles dans les deux gammes, ainsi que leurs fiches techniques, sont disponibles sur demande.",
      groups: [
        {
          name: "Stockage d’énergie",
          intro:
            "Un stockage domestique qui passe d’un seul module de batterie à un parc de plusieurs modules, et des stations portables qui apportent le courant du réseau aux sites dépourvus d’installation fixe.",
          cards: [
            {
              key: "homeStorage",
              name: "Systèmes de stockage domestiques",
              imageAlt:
                "Modules de batterie domestique empilables, présentés en configuration de deux et de trois modules",
            },
            {
              key: "portablePower",
              name: "Batteries portables",
              imageAlt:
                "Station d’énergie portable avec poignée de transport, écran et prises de courant alternatif",
            },
          ],
        },
      ],
    },
  },
  accessories: {
    en: {
      eyebrow: "System Accessories",
      title: "System accessories for solar installations",
      subtitle:
        "Module frames and DC wiring components that complete an installation alongside the modules and inverters.",
      note: "Tell us the module type and the array layout and we will confirm the matching frames, cables and connectors.",
      groups: [
        {
          name: "System accessories",
          intro:
            "Everything in a solar installation apart from the modules themselves: module frames, and the cabling and connectors that carry DC current between the modules and the equipment.",
          cards: [
            { key: "moduleFrames", name: "FRP composite solar module frames" },
            { key: "pvCables", name: "PV cables and MC4 connectors" },
          ],
        },
      ],
    },
    es: {
      eyebrow: "Accesorios",
      title: "Accesorios para instalaciones solares",
      subtitle:
        "Marcos de módulo y componentes de cableado de continua que completan una instalación junto con los módulos y los inversores.",
      note: "Indíquenos el tipo de módulo y la disposición del conjunto y confirmaremos los marcos, cables y conectores correspondientes.",
      groups: [
        {
          name: "Accesorios del sistema",
          intro:
            "Todo lo que hay en una instalación solar aparte de los propios módulos: marcos de módulo, y el cableado y los conectores que conducen la corriente continua entre los módulos y los equipos.",
          cards: [
            { key: "moduleFrames", name: "Marcos compuestos FRP para módulos solares" },
            { key: "pvCables", name: "Cables FV y conectores MC4" },
          ],
        },
      ],
    },
    fr: {
      eyebrow: "Accessoires",
      title: "Accessoires pour installations solaires",
      subtitle:
        "Cadres de module et composants de câblage continu qui complètent une installation aux côtés des modules et des onduleurs.",
      note: "Indiquez-nous le type de module et la disposition du champ, et nous confirmerons les cadres, câbles et connecteurs correspondants.",
      groups: [
        {
          name: "Accessoires système",
          intro:
            "Tout ce qui compose une installation solaire en dehors des modules eux-mêmes : cadres de module, et le câblage et les connecteurs qui transportent le courant continu entre les modules et les équipements.",
          cards: [
            { key: "moduleFrames", name: "Cadres composites FRP pour modules solaires" },
            { key: "pvCables", name: "Câbles PV et connecteurs MC4" },
          ],
        },
      ],
    },
  },
};
