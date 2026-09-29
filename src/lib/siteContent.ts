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
   * Product shots for the two solar panel types, extracted from the
   * manufacturer's specification sheets (RGB rebuilt through a colour-managed
   * render, alpha from the sheet's own mask). No branding is visible in them.
   */
  panelStandard: asset("/images/solar-panel-standard.webp"),
  panelAllBlack: asset("/images/solar-panel-all-black.webp"),
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
      solarVisual: "Solar panels, inverters, photovoltaic cables and MC4 connectors",
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
      { value: "Tier 1", label: "Solar panel brand supply network" },
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
        "Solar panels sourced from Tier 1 brands and qualified suppliers",
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
      aiTitle: "AI Smart Control Solutions",
      categories: [
        { group: "Solar Panels", items: ["Standard solar panels", "All-black solar panels", "Flexible solar panels", "Foldable solar panels"] },
        { group: "Inverters", items: ["Off-grid inverters", "Hybrid inverters"] },
        { group: "ESS", items: ["Portable power banks", "Home energy storage systems"] },
        { group: "System Accessories", items: ["FRP composite solar panel frames", "PV cables and MC4 connectors"] },
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
      options: ["Solar panel sourcing", "Inverters", "ESS / Storage", "AI smart control", "Custom solution", "Other"],
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
      solarVisual: "Paneles solares, inversores, cables fotovoltaicos y conectores MC4",
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
      { value: "Tier 1", label: "Red de marcas de paneles solares" },
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
        "Paneles solares de marcas Tier 1 y proveedores calificados",
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
      aiTitle: "Soluciones de control inteligente con IA",
      categories: [
        { group: "Paneles solares", items: ["Paneles solares estándar", "Paneles solares all-black", "Paneles solares flexibles", "Paneles solares plegables"] },
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
      options: ["Paneles solares", "Inversores", "ESS / Almacenamiento", "Control inteligente IA", "Solución personalizada", "Otro"],
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
      solarVisual: "Panneaux solaires, onduleurs, câbles photovoltaïques et connecteurs MC4",
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
      { value: "Tier 1", label: "Réseau de marques de panneaux solaires" },
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
        "Panneaux solaires issus de marques Tier 1 et de fournisseurs qualifiés",
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
      aiTitle: "Solutions de contrôle intelligent IA",
      categories: [
        { group: "Panneaux solaires", items: ["Panneaux solaires standard", "Panneaux solaires entièrement noirs", "Panneaux solaires flexibles", "Panneaux solaires pliables"] },
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
      options: ["Panneaux solaires", "Onduleurs", "ESS / Stockage", "Contrôle intelligent IA", "Solution personnalisée", "Autre"],
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
 * Technical data for the two solar panel types shown on the products page.
 *
 * Both types come from one manufacturer platform and are nearly identical, so the
 * rows repeat deliberately: each card has to read as a complete specification
 * rather than sending the reader to the other card to fill in the blanks. If a
 * datasheet is revised, update BOTH cards for every language.
 *
 * Brand and model numbers are deliberately absent — the site describes a Tier 1
 * supply network without naming suppliers (see 03-关键决策记录).
 *
 * Source: manufacturer datasheets, revision HAITAI20250329EN.
 */
export type PanelSpecRow = { label: string; value: string };
export type PanelCardSpec = {
  name: string;
  tagline: string;
  imageAlt: string;
  specs: PanelSpecRow[];
};

export const panelSpecs: Record<
  Language,
  { eyebrow: string; title: string; subtitle: string; note: string; cards: PanelCardSpec[] }
> = {
  en: {
    eyebrow: "Solar Modules",
    title: "Technical data for our solar panels",
    subtitle:
      "Both types share one bifacial TOPCon platform and the same dimensions. The only difference is the finish: a white ceramic grid on the standard panel, a fully black one on the all-black panel.",
    note: "Certifications: IEC 61215, IEC 61730, ISO 9001 / 14001 / 45001. 30-year linear power warranty: under 1.0% degradation in year one, then 0.40% per year or less.",
    cards: [
      {
        name: "Standard solar panels",
        tagline: "N-type TOPCon bifacial · 430–450 W",
        imageAlt:
          "Standard bifacial solar panel: dark cells with white grid lines in a silver frame",
        specs: [
          { label: "Power range", value: "430 – 450 W" },
          { label: "Max. module efficiency", value: "23.04 %" },
          { label: "Cell technology", value: "N-type TOPCon · 108 half-cut" },
          { label: "Module dimensions", value: "1722 × 1134 × 30 mm" },
          { label: "Weight", value: "24.0 kg" },
          { label: "Front glass", value: "2.0 mm tempered, high transmittance" },
          { label: "Frame", value: "Anodised aluminium alloy" },
          { label: "Rear side", value: "White ceramic grid (bifacial)" },
          { label: "Bifacial gain", value: "up to +25 %" },
          { label: "Temperature coefficient (Pmax)", value: "−0.290 %/°C" },
        ],
      },
      {
        name: "All-black solar panels",
        tagline: "N-type TOPCon bifacial · 425–445 W",
        imageAlt:
          "All-black bifacial solar panel: black cells and frame with no visible grid lines",
        specs: [
          { label: "Power range", value: "425 – 445 W" },
          { label: "Max. module efficiency", value: "22.79 %" },
          { label: "Cell technology", value: "N-type TOPCon · 108 half-cut" },
          { label: "Module dimensions", value: "1722 × 1134 × 30 mm" },
          { label: "Weight", value: "24.0 kg" },
          { label: "Front glass", value: "2.0 mm tempered, high transmittance" },
          { label: "Frame", value: "Anodised aluminium alloy" },
          { label: "Rear side", value: "Black ceramic grid (bifacial)" },
          { label: "Bifacial gain", value: "up to +25 %" },
          { label: "Temperature coefficient (Pmax)", value: "−0.290 %/°C" },
        ],
      },
    ],
  },
  es: {
    eyebrow: "Módulos solares",
    title: "Datos técnicos de nuestros paneles solares",
    subtitle:
      "Ambos tipos comparten una misma plataforma bifacial TOPCon y las mismas dimensiones. La única diferencia es el acabado: rejilla cerámica blanca en el panel estándar y totalmente negra en el all-black.",
    note: "Certificaciones: IEC 61215, IEC 61730, ISO 9001 / 14001 / 45001. Garantía de potencia lineal de 30 años: menos del 1,0 % el primer año y 0,40 % anual o menos a partir del segundo.",
    cards: [
      {
        name: "Paneles solares estándar",
        tagline: "TOPCon tipo N bifacial · 430–450 W",
        imageAlt:
          "Panel solar bifacial estándar: células oscuras con líneas de rejilla blancas y marco plateado",
        specs: [
          { label: "Rango de potencia", value: "430 – 450 W" },
          { label: "Eficiencia máxima del módulo", value: "23,04 %" },
          { label: "Tecnología de células", value: "TOPCon tipo N · 108 medias células" },
          { label: "Dimensiones del módulo", value: "1722 × 1134 × 30 mm" },
          { label: "Peso", value: "24,0 kg" },
          { label: "Vidrio frontal", value: "Templado de 2,0 mm, alta transmitancia" },
          { label: "Marco", value: "Aleación de aluminio anodizado" },
          { label: "Cara posterior", value: "Rejilla cerámica blanca (bifacial)" },
          { label: "Ganancia bifacial", value: "hasta +25 %" },
          { label: "Coeficiente de temperatura (Pmax)", value: "−0,290 %/°C" },
        ],
      },
      {
        name: "Paneles solares all-black",
        tagline: "TOPCon tipo N bifacial · 425–445 W",
        imageAlt:
          "Panel solar bifacial all-black: células y marco negros, sin líneas de rejilla visibles",
        specs: [
          { label: "Rango de potencia", value: "425 – 445 W" },
          { label: "Eficiencia máxima del módulo", value: "22,79 %" },
          { label: "Tecnología de células", value: "TOPCon tipo N · 108 medias células" },
          { label: "Dimensiones del módulo", value: "1722 × 1134 × 30 mm" },
          { label: "Peso", value: "24,0 kg" },
          { label: "Vidrio frontal", value: "Templado de 2,0 mm, alta transmitancia" },
          { label: "Marco", value: "Aleación de aluminio anodizado" },
          { label: "Cara posterior", value: "Rejilla cerámica negra (bifacial)" },
          { label: "Ganancia bifacial", value: "hasta +25 %" },
          { label: "Coeficiente de temperatura (Pmax)", value: "−0,290 %/°C" },
        ],
      },
    ],
  },
  fr: {
    eyebrow: "Modules solaires",
    title: "Données techniques de nos panneaux solaires",
    subtitle:
      "Les deux types partagent la même plateforme bifaciale TOPCon et les mêmes dimensions. Seule la finition diffère : grille céramique blanche pour le panneau standard, entièrement noire pour le tout noir.",
    note: "Certifications : IEC 61215, IEC 61730, ISO 9001 / 14001 / 45001. Garantie de puissance linéaire de 30 ans : moins de 1,0 % la première année, puis 0,40 % par an au maximum.",
    cards: [
      {
        name: "Panneaux solaires standard",
        tagline: "TOPCon de type N bifacial · 430–450 W",
        imageAlt:
          "Panneau solaire bifacial standard : cellules sombres à lignes de grille blanches, cadre argenté",
        specs: [
          { label: "Plage de puissance", value: "430 – 450 W" },
          { label: "Rendement maximal du module", value: "23,04 %" },
          { label: "Technologie des cellules", value: "TOPCon de type N · 108 demi-cellules" },
          { label: "Dimensions du module", value: "1722 × 1134 × 30 mm" },
          { label: "Poids", value: "24,0 kg" },
          { label: "Verre avant", value: "Trempé 2,0 mm, haute transmission" },
          { label: "Cadre", value: "Alliage d’aluminium anodisé" },
          { label: "Face arrière", value: "Grille céramique blanche (bifaciale)" },
          { label: "Gain bifacial", value: "jusqu’à +25 %" },
          { label: "Coefficient de température (Pmax)", value: "−0,290 %/°C" },
        ],
      },
      {
        name: "Panneaux solaires entièrement noirs",
        tagline: "TOPCon de type N bifacial · 425–445 W",
        imageAlt:
          "Panneau solaire bifacial entièrement noir : cellules et cadre noirs, sans lignes de grille visibles",
        specs: [
          { label: "Plage de puissance", value: "425 – 445 W" },
          { label: "Rendement maximal du module", value: "22,79 %" },
          { label: "Technologie des cellules", value: "TOPCon de type N · 108 demi-cellules" },
          { label: "Dimensions du module", value: "1722 × 1134 × 30 mm" },
          { label: "Poids", value: "24,0 kg" },
          { label: "Verre avant", value: "Trempé 2,0 mm, haute transmission" },
          { label: "Cadre", value: "Alliage d’aluminium anodisé" },
          { label: "Face arrière", value: "Grille céramique noire (bifaciale)" },
          { label: "Gain bifacial", value: "jusqu’à +25 %" },
          { label: "Coefficient de température (Pmax)", value: "−0,290 %/°C" },
        ],
      },
    ],
  },
};
