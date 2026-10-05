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
   * branding is visible in them: the frames in these drawings are clean, so
   * unlike the category-page shots nothing had to be erased.
   *
   * Keyed by the low bin of the power family and named on disk by the whole
   * range, because one datasheet covers several power bins.
   */
  module440: asset("/images/solar-module-440-465.webp"),
  module490: asset("/images/solar-module-490-510.webp"),
  module615: asset("/images/solar-module-615-640.webp"),
  module710: asset("/images/solar-module-710-730.webp"),
  /*
   * Product shots for the category pages (/products/inverters/, /products/bess/,
   * /products/system-accessories/). Extracted from the manufacturer's single-sheet
   * datasheets with _tools/extract-pdf-figure.py, then cleared of the visible
   * supplier mark with _tools/erase-region.py — the site describes a Tier 1
   * supply network without naming suppliers, so the mark on the case had to go.
   */
  inverter6kw: asset("/images/hybrid-inverter-6-2kw.webp"),
  inverter7k5to15k: asset("/images/hybrid-inverter-7-5-15kw.webp"),
  inverterThreePhase: asset("/images/hybrid-inverter-three-phase.webp"),
  /*
   * The three storage units took one further step than the inverters. Their
   * datasheets show each unit from a single angle, so the supplier's mark cannot
   * be avoided by choosing a different view: it was erased with
   * _tools/erase-region.py and a Harvest wordmark put in its place, taken from the
   * same solid-white file the header logo is worked from. On the home battery the
   * wordmark sits below the round display rather than where the mark had been.
   *
   * The erases are interpolated between the lines just outside the box, or copied
   * from clean panel beside the mark when the mark is large — a flat fill would
   * show as a plate on a shaded surface. On the side panel of the commercial
   * cabinet the mark runs next to the corner seam, so the copy starts to the right
   * of that seam and the seam survives intact.
   */
  homeStorage: asset("/images/home-storage-16kwh.webp"),
  portablePower: asset("/images/portable-power-station-1kwh.webp"),
  commercialStorage: asset("/images/commercial-storage-261kwh.webp"),
  /*
   * The utility-scale skid needed its mark erased from three doors, not one: the
   * photograph shows six door panels and the supplier's mark sits on the second,
   * fourth and sixth. The Harvest badge goes back on the second, where the mark
   * was — the alternatives were covering a door's high-voltage warning label or
   * leaving the panel bare.
   */
  largeStorage: asset("/images/large-scale-storage-5mwh.webp"),
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
    nav: { home: "Home", about: "About", products: "Products", contact: "Contact" },
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
      essSection: "Battery energy storage systems",
      essVisual: "Portable power station, home battery, commercial storage cabinet and utility-scale storage skid",
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
      eyebrow: "Products",
      solarEyebrow: "Solar Systems",
      aiEyebrow: "AI Intelligence",
      essTitle: "BESS for portable, residential, commercial and utility-scale storage",
      essText: "Portable stations, home batteries and all-in-one cabinets that complement solar generation, remote control and energy independence.",
      title: "Products and intelligent energy solutions",
      subtitle:
        "A focused portfolio covering solar generation, inverter systems, compact storage, installation accessories and AI-enabled control solutions.",
      solarTitle: "Solar System Portfolio",
      aiTitle: "AI Smart Control Solutions",
      /*
       * The catalogue as the products overview shows it — and the reason its pages
       * are reachable at all: every entry is a link to the page that carries that
       * product. There used to be one link at the bottom of the overview, which
       * left the product names themselves dead text.
       *
       * The two module groups point into the module page by anchor, because one
       * page holds both: they are one product family in two finishes, and
       * splitting them would split one datasheet across two pages.
       *
       * hrefs are written the way the router wants them — leading slash, no
       * deployment prefix. <Link> adds the prefix. A prefixed path here would work
       * at the domain root and 404 under the sub-path preview, which is the trap
       * src/lib/asset.ts exists for.
       */
      categories: [
        {
          group: "Solar Modules",
          href: "/products/solar-modules/",
          items: [
            { label: "Standard solar modules", href: "/products/solar-modules/#standard" },
            { label: "All-black solar modules", href: "/products/solar-modules/#all-black" },
          ],
        },
        {
          group: "Inverters",
          href: "/products/inverters/",
          items: [
            { label: "Single-phase hybrid inverters", href: "/products/inverters/" },
            { label: "Three-phase hybrid inverters", href: "/products/inverters/" },
          ],
        },
        {
          group: "BESS",
          href: "/products/bess/",
          items: [
            { label: "Portable power stations", href: "/products/bess/" },
            { label: "Home energy storage", href: "/products/bess/" },
            { label: "Commercial and industrial storage", href: "/products/bess/" },
            { label: "Utility-scale storage skids", href: "/products/bess/" },
          ],
        },
        {
          group: "System Accessories",
          href: "/products/system-accessories/",
          items: [
            { label: "FRP composite solar module frames", href: "/products/system-accessories/" },
            { label: "PV cables and MC4 connectors", href: "/products/system-accessories/" },
          ],
        },
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
      options: ["Solar module sourcing", "Inverters", "BESS / Storage", "AI smart control", "Custom solution", "Other"],
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
    nav: { home: "Inicio", about: "Nosotros", products: "Productos", contact: "Contacto" },
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
      essSection: "Sistemas de almacenamiento de energía con baterías",
      essVisual: "Estación de energía portátil, batería doméstica, armario de almacenamiento comercial y plataforma a gran escala",
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
      eyebrow: "Productos",
      solarEyebrow: "Sistemas solares",
      aiEyebrow: "Inteligencia IA",
      essTitle: "BESS para almacenamiento portátil, residencial, comercial y a gran escala",
      essText: "Estaciones portátiles, baterías domésticas y armarios todo en uno que complementan la generación solar, el control remoto y la independencia energética.",
      title: "Productos y soluciones energéticas inteligentes",
      subtitle: "Una cartera enfocada en generación solar, inversores, almacenamiento compacto, accesorios e inteligencia de control con IA.",
      solarTitle: "Portafolio de sistemas solares",
      aiTitle: "Soluciones de control inteligente con IA",
      categories: [
        {
          group: "Módulos solares",
          href: "/products/solar-modules/",
          items: [
            { label: "Módulos solares estándar", href: "/products/solar-modules/#standard" },
            { label: "Módulos solares all-black", href: "/products/solar-modules/#all-black" },
          ],
        },
        {
          group: "Inversores",
          href: "/products/inverters/",
          items: [
            { label: "Inversores híbridos monofásicos", href: "/products/inverters/" },
            { label: "Inversores híbridos trifásicos", href: "/products/inverters/" },
          ],
        },
        {
          group: "BESS",
          href: "/products/bess/",
          items: [
            { label: "Estaciones de energía portátiles", href: "/products/bess/" },
            { label: "Almacenamiento doméstico", href: "/products/bess/" },
            { label: "Almacenamiento comercial e industrial", href: "/products/bess/" },
            { label: "Plataformas de almacenamiento a gran escala", href: "/products/bess/" },
          ],
        },
        {
          group: "Accesorios",
          href: "/products/system-accessories/",
          items: [
            { label: "Marcos compuestos FRP", href: "/products/system-accessories/" },
            { label: "Cables FV y conectores MC4", href: "/products/system-accessories/" },
          ],
        },
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
      options: ["Módulos solares", "Inversores", "BESS / Almacenamiento", "Control inteligente IA", "Solución personalizada", "Otro"],
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
    nav: { home: "Accueil", about: "À propos", products: "Produits", contact: "Contact" },
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
      essSection: "Systèmes de stockage d’énergie par batteries",
      essVisual: "Station portable, batterie domestique, armoire de stockage commerciale et plateforme à grande échelle",
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
      eyebrow: "Produits",
      solarEyebrow: "Systèmes solaires",
      aiEyebrow: "Intelligence IA",
      essTitle: "BESS pour le stockage portable, résidentiel, commercial et à grande échelle",
      essText: "Stations portables, batteries domestiques et armoires tout-en-un qui complètent la production solaire, le contrôle à distance et l’indépendance énergétique.",
      title: "Produits et solutions énergétiques intelligentes",
      subtitle: "Un portefeuille ciblé couvrant génération solaire, onduleurs, stockage, accessoires et contrôle intelligent par IA.",
      solarTitle: "Portefeuille de systèmes solaires",
      aiTitle: "Solutions de contrôle intelligent IA",
      categories: [
        {
          group: "Modules solaires",
          href: "/products/solar-modules/",
          items: [
            { label: "Modules solaires standard", href: "/products/solar-modules/#standard" },
            { label: "Modules solaires entièrement noirs", href: "/products/solar-modules/#all-black" },
          ],
        },
        {
          group: "Onduleurs",
          href: "/products/inverters/",
          items: [
            { label: "Onduleurs hybrides monophasés", href: "/products/inverters/" },
            { label: "Onduleurs hybrides triphasés", href: "/products/inverters/" },
          ],
        },
        {
          group: "BESS",
          href: "/products/bess/",
          items: [
            { label: "Stations d’énergie portables", href: "/products/bess/" },
            { label: "Stockage domestique", href: "/products/bess/" },
            { label: "Stockage commercial et industriel", href: "/products/bess/" },
            { label: "Plateformes de stockage à grande échelle", href: "/products/bess/" },
          ],
        },
        {
          group: "Accessoires",
          href: "/products/system-accessories/",
          items: [
            { label: "Cadres composites FRP", href: "/products/system-accessories/" },
            { label: "Câbles PV et connecteurs MC4", href: "/products/system-accessories/" },
          ],
        },
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
      options: ["Modules solaires", "Onduleurs", "BESS / Stockage", "Contrôle intelligent IA", "Solution personnalisée", "Autre"],
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
 * Two groups, two variants each. The card title is the power bin the range is
 * named after, and the power range itself sits under it, because one datasheet
 * covers a whole family of bins — printing a single number as if it were the
 * module's rating would be wrong, and printing only a range hides the bin a
 * buyer recognises:
 *
 *   Standard   - 630 W over 615 – 640 W (182 × 105 mm cells, 132 half-cut) and
 *                720 W over 710 – 730 W (210 × 105 mm cells), both N-type TOPCon
 *                bifacial with a white ceramic rear grid.
 *   All-black  - 450 W over 440 – 465 W (96 half-cut) and 500 W over
 *                490 – 510 W (108 half-cut), black frame and black rear grid.
 *
 * The rows repeat between variants on purpose: each card has to read as a
 * complete specification rather than sending the reader to another card to fill
 * in the blanks. If a datasheet is revised, update every variant that shares the
 * value.
 *
 * Only the key figures are published. The sheets also carry per-bin voltage,
 * current, NMOT and bifacial-gain tables, temperature coefficients and packaging
 * counts; none of that is on the page, so a buyer who needs it has to ask (the
 * page says the data is available on request).
 *
 * Brand and model numbers are deliberately absent — the site describes a Tier 1
 * supply network without naming suppliers (see 03-关键决策记录).
 *
 * Source: the four manufacturer datasheets filed in the project folder under
 * specification sheet/solar module/ — one per power family above. Repeat a figure
 * from the sheet, never from another card.
 */
export type ModuleSpecRow = { label: string; value: string };
/*
 * A full technical-data table, rendered as its own block below the group's cards.
 * A row with no value is a section heading, the way the datasheet groups its own
 * table ("Mechanical parameters", "Others"), so the heading travels with the rows
 * it labels instead of needing a nested group type.
 */
export type TechDataRow = { label: string; value?: string };
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
      "Four module types in two product groups: two high-power standard modules for utility and commercial installations, and two all-black modules for roofs where a uniform dark appearance matters.",
    note: "Certifications: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, IEC 62941:2019, IEC 61215:2021 and IEC 61730:2023. 12-year product warranty and 30-year linear power warranty: under 1.0% degradation in year one, then 0.40% per year or less. Data taken from the manufacturer's datasheets and subject to change — every type ships in several power bins, so confirm the exact bin before ordering. The full datasheet, with the per-bin voltage and current, NMOT data, bifacial gain tables, temperature coefficients and packaging counts, is available on request.",
    groups: [
      {
        name: "Standard solar modules",
        intro:
          "Two power classes on different cell platforms, both N-type TOPCon bifacial with a white ceramic rear grid and the same 30-year linear power warranty.",
        variants: [
          {
            power: "630 W",
            finish: "Standard bifacial · 615 – 640 W power range",
            imageAlt:
              "Standard bifacial solar module, 615 to 640 watts, shown from the front and the rear, with white grid lines and a silver frame",
            specs: [
              { label: "Power range", value: "615 – 640 W · 6 power bins" },
              { label: "Max. module efficiency", value: "23.69 %" },
              { label: "Cell technology", value: "N-type TOPCon · 132 half-cut (6×22) · 182 × 105 mm cells" },
              { label: "Module dimensions", value: "2382 × 1134 × 30 mm" },
              { label: "Weight", value: "32.5 kg" },
            ],
          },
          {
            power: "720 W",
            finish: "Standard bifacial · 710 – 730 W power range",
            imageAlt:
              "Standard bifacial solar module, 710 to 730 watts, with large 210 mm cells, shown from the front and the rear",
            specs: [
              { label: "Power range", value: "710 – 730 W · 5 power bins" },
              { label: "Max. module efficiency", value: "23.50 %" },
              { label: "Cell technology", value: "N-type TOPCon · 132 half-cut (6×22) · 210 × 105 mm cells" },
              { label: "Module dimensions", value: "2384 × 1303 × 33 mm" },
              { label: "Weight", value: "37.5 kg" },
            ],
          },
        ],
      },
      {
        name: "All-black solar modules",
        intro:
          "Two all-black modules — black frame and black ceramic rear grid — for residential roofs where a uniform dark appearance matters.",
        variants: [
          {
            power: "450 W",
            finish: "All-black finish · 440 – 465 W power range",
            imageAlt:
              "All-black bifacial solar module, 440 to 465 watts, with black cells and frame, shown from the front and the rear",
            specs: [
              { label: "Power range", value: "440 – 465 W · 6 power bins" },
              { label: "Max. module efficiency", value: "23.27 %" },
              { label: "Cell technology", value: "N-type TOPCon · 96 half-cut (6×16) · 182 × 105 mm cells" },
              { label: "Module dimensions", value: "1762 × 1134 × 30 mm" },
              { label: "Weight", value: "24.5 kg" },
            ],
          },
          {
            power: "500 W",
            finish: "All-black finish · 490 – 510 W power range",
            imageAlt:
              "All-black bifacial solar module, 490 to 510 watts, with black cells and frame, shown from the front and the rear",
            specs: [
              { label: "Power range", value: "490 – 510 W · 5 power bins" },
              { label: "Max. module efficiency", value: "22.93 %" },
              { label: "Cell technology", value: "N-type TOPCon · 108 half-cut (6×18) · 182 × 105 mm cells" },
              { label: "Module dimensions", value: "1961 × 1134 × 30 mm" },
              { label: "Weight", value: "27 kg" },
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
      "Cuatro tipos de módulo en dos grupos de producto: dos módulos estándar de alta potencia para instalaciones industriales y comerciales, y dos módulos all-black para tejados donde importa un aspecto oscuro uniforme.",
    note: "Certificaciones: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, IEC 62941:2019, IEC 61215:2021 e IEC 61730:2023. Garantía de producto de 12 años y garantía de potencia lineal de 30 años: menos del 1,0 % el primer año y 0,40 % anual o menos a partir del segundo. Datos tomados de las fichas del fabricante y sujetos a cambios: cada tipo se suministra en varios bins de potencia, confirme el bin exacto antes de pedir. La ficha completa —tensión y corriente por bin, datos NMOT, ganancias bifaciales, coeficientes de temperatura y embalaje— está disponible a petición.",
    groups: [
      {
        name: "Módulos solares estándar",
        intro:
          "Dos clases de potencia en plataformas de células distintas, ambas TOPCon tipo N bifaciales con rejilla cerámica blanca y la misma garantía de potencia lineal de 30 años.",
        variants: [
          {
            power: "630 W",
            finish: "Bifacial estándar · rango de potencia 615 – 640 W",
            imageAlt:
              "Módulo solar bifacial estándar, de 615 a 640 vatios, visto por delante y por detrás, con líneas de rejilla blancas y marco plateado",
            specs: [
              { label: "Rango de potencia", value: "615 – 640 W · 6 bins de potencia" },
              { label: "Eficiencia máxima del módulo", value: "23,69 %" },
              { label: "Tecnología de células", value: "TOPCon tipo N · 132 medias células (6×22) · células de 182 × 105 mm" },
              { label: "Dimensiones del módulo", value: "2382 × 1134 × 30 mm" },
              { label: "Peso", value: "32,5 kg" },
            ],
          },
          {
            power: "720 W",
            finish: "Bifacial estándar · rango de potencia 710 – 730 W",
            imageAlt:
              "Módulo solar bifacial estándar, de 710 a 730 vatios, con células grandes de 210 mm, visto por delante y por detrás",
            specs: [
              { label: "Rango de potencia", value: "710 – 730 W · 5 bins de potencia" },
              { label: "Eficiencia máxima del módulo", value: "23,50 %" },
              { label: "Tecnología de células", value: "TOPCon tipo N · 132 medias células (6×22) · células de 210 × 105 mm" },
              { label: "Dimensiones del módulo", value: "2384 × 1303 × 33 mm" },
              { label: "Peso", value: "37,5 kg" },
            ],
          },
        ],
      },
      {
        name: "Módulos solares all-black",
        intro:
          "Dos módulos all-black —marco negro y rejilla cerámica posterior negra— para tejados residenciales donde importa un aspecto oscuro uniforme.",
        variants: [
          {
            power: "450 W",
            finish: "Acabado all-black · rango de potencia 440 – 465 W",
            imageAlt:
              "Módulo solar bifacial all-black, de 440 a 465 vatios, con células y marco negros, visto por delante y por detrás",
            specs: [
              { label: "Rango de potencia", value: "440 – 465 W · 6 bins de potencia" },
              { label: "Eficiencia máxima del módulo", value: "23,27 %" },
              { label: "Tecnología de células", value: "TOPCon tipo N · 96 medias células (6×16) · células de 182 × 105 mm" },
              { label: "Dimensiones del módulo", value: "1762 × 1134 × 30 mm" },
              { label: "Peso", value: "24,5 kg" },
            ],
          },
          {
            power: "500 W",
            finish: "Acabado all-black · rango de potencia 490 – 510 W",
            imageAlt:
              "Módulo solar bifacial all-black, de 490 a 510 vatios, con células y marco negros, visto por delante y por detrás",
            specs: [
              { label: "Rango de potencia", value: "490 – 510 W · 5 bins de potencia" },
              { label: "Eficiencia máxima del módulo", value: "22,93 %" },
              { label: "Tecnología de células", value: "TOPCon tipo N · 108 medias células (6×18) · células de 182 × 105 mm" },
              { label: "Dimensiones del módulo", value: "1961 × 1134 × 30 mm" },
              { label: "Peso", value: "27 kg" },
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
      "Quatre types de modules en deux groupes de produits : deux modules standard de forte puissance pour les installations industrielles et commerciales, et deux modules tout noirs pour les toitures où un aspect sombre uniforme compte.",
    note: "Certifications : ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, IEC 62941:2019, IEC 61215:2021 et IEC 61730:2023. Garantie produit de 12 ans et garantie de puissance linéaire de 30 ans : moins de 1,0 % la première année, puis 0,40 % par an au maximum. Données issues des fiches du fabricant et susceptibles d’évoluer : chaque type est livré en plusieurs bins de puissance, confirmez le bin exact avant commande. La fiche complète — tension et courant par bin, données NMOT, gains bifaciaux, coefficients de température et conditionnement — est disponible sur demande.",
    groups: [
      {
        name: "Modules solaires standard",
        intro:
          "Deux classes de puissance sur des plateformes de cellules différentes, toutes deux TOPCon de type N bifaciales avec une grille céramique blanche et la même garantie de puissance linéaire de 30 ans.",
        variants: [
          {
            power: "630 W",
            finish: "Bifacial standard · plage de puissance 615 – 640 W",
            imageAlt:
              "Module solaire bifacial standard, de 615 à 640 watts, vu de face et de dos, à lignes de grille blanches et cadre argenté",
            specs: [
              { label: "Plage de puissance", value: "615 – 640 W · 6 bins de puissance" },
              { label: "Rendement maximal du module", value: "23,69 %" },
              { label: "Technologie des cellules", value: "TOPCon de type N · 132 demi-cellules (6×22) · cellules 182 × 105 mm" },
              { label: "Dimensions du module", value: "2382 × 1134 × 30 mm" },
              { label: "Poids", value: "32,5 kg" },
            ],
          },
          {
            power: "720 W",
            finish: "Bifacial standard · plage de puissance 710 – 730 W",
            imageAlt:
              "Module solaire bifacial standard, de 710 à 730 watts, à grandes cellules 210 mm, vu de face et de dos",
            specs: [
              { label: "Plage de puissance", value: "710 – 730 W · 5 bins de puissance" },
              { label: "Rendement maximal du module", value: "23,50 %" },
              { label: "Technologie des cellules", value: "TOPCon de type N · 132 demi-cellules (6×22) · cellules 210 × 105 mm" },
              { label: "Dimensions du module", value: "2384 × 1303 × 33 mm" },
              { label: "Poids", value: "37,5 kg" },
            ],
          },
        ],
      },
      {
        name: "Modules solaires entièrement noirs",
        intro:
          "Deux modules entièrement noirs — cadre noir et grille céramique arrière noire — pour les toitures résidentielles où un aspect sombre uniforme compte.",
        variants: [
          {
            power: "450 W",
            finish: "Finition tout noir · plage de puissance 440 – 465 W",
            imageAlt:
              "Module solaire bifacial entièrement noir, de 440 à 465 watts, cellules et cadre noirs, vu de face et de dos",
            specs: [
              { label: "Plage de puissance", value: "440 – 465 W · 6 bins de puissance" },
              { label: "Rendement maximal du module", value: "23,27 %" },
              { label: "Technologie des cellules", value: "TOPCon de type N · 96 demi-cellules (6×16) · cellules 182 × 105 mm" },
              { label: "Dimensions du module", value: "1762 × 1134 × 30 mm" },
              { label: "Poids", value: "24,5 kg" },
            ],
          },
          {
            power: "500 W",
            finish: "Finition tout noir · plage de puissance 490 – 510 W",
            imageAlt:
              "Module solaire bifacial entièrement noir, de 490 à 510 watts, cellules et cadre noirs, vu de face et de dos",
            specs: [
              { label: "Plage de puissance", value: "490 – 510 W · 5 bins de puissance" },
              { label: "Rendement maximal du module", value: "22,93 %" },
              { label: "Technologie des cellules", value: "TOPCon de type N · 108 demi-cellules (6×18) · cellules 182 × 105 mm" },
              { label: "Dimensions du module", value: "1961 × 1134 × 30 mm" },
              { label: "Poids", value: "27 kg" },
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
  | "hybrid6kw"
  | "hybrid7k5to15k"
  | "hybridThreePhase"
  | "homeStorage"
  | "portablePower"
  | "commercialStorage"
  | "largeStorage"
  | "moduleFrames"
  | "pvCables";

export type ProductCard = {
  key: ProductCardKey;
  name: string;
  imageAlt?: string;
  /*
   * The storage cards carry a description and a feature list taken from the
   * datasheet's own introduction and feature blocks, then a short table of key
   * parameters. Cards whose material is not yet confirmed carry name only, and the
   * card renders each of these only when it is present, so no card holds open a
   * heading with nothing under it.
   */
  description?: string;
  features?: string[];
  specs?: ModuleSpecRow[];
  technicalData?: { heading: string; rows: TechDataRow[] };
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
  hybrid6kw: assets.inverter6kw,
  hybrid7k5to15k: assets.inverter7k5to15k,
  hybridThreePhase: assets.inverterThreePhase,
  homeStorage: assets.homeStorage,
  portablePower: assets.portablePower,
  commercialStorage: assets.commercialStorage,
  largeStorage: assets.largeStorage,
};

export const productLines: Record<ProductLineKey, Record<Language, ProductLine>> = {
  inverters: {
    en: {
      eyebrow: "Inverters",
      title: "Hybrid inverters",
      subtitle:
        "Hybrid units manage solar input, battery charging and the grid connection together.",
      note: "Model-level datasheets for the units we supply are available on request.",
      groups: [
        {
          name: "Inverters",
          intro:
            "Three hybrid ranges — two single-phase, at 6.2 kW and from 7.5 to 15 kW, and a three-phase platform for larger installations.",
          cards: [
            {
              key: "hybrid6kw",
              name: "6.2 kW 48 V hybrid inverter",
              imageAlt:
                "6.2 kW hybrid inverter in a white wall-mounted housing, with a round display and buttons on the front",
              /*
               * Five rows, chosen from the datasheet's table. Two of that table's
               * rows are mispaired in the source PDF itself — "Peak Power
               * (off-grid)" carries "0.8 leading to 0.8 lagging" and "Power Factor
               * Adjustment Range" carries "2 times of rated power, 10s" — so
               * neither is quoted here rather than repeating the error or
               * silently swapping them.
               */
              specs: [
                { label: "Rated output power", value: "6200 W" },
                { label: "Battery voltage range", value: "40–60 V" },
                { label: "Max. PV input power", value: "9000 W" },
                { label: "Max. efficiency", value: "97.8%" },
                { label: "Dimensions (W×H×D)", value: "358 × 420 × 123 mm" },
              ],
              /*
               * Three rows of this datasheet's own table are left off the site because the
               * table contradicts itself, and neither copying a defect nor silently
               * repairing it is acceptable on a specification page:
               *   - "Peak Power (off-grid)" carries the power factor range (0.8 leading to
               *     0.8 lagging) while "Power Factor Adjustment Range" carries the peak
               *     power spec (2 times of rated power, 10s), i.e. the two values are one
               *     row out of step.
               *   - "Max. PV Input Voltage" prints its unit as (W) rather than (V).
               * The datasheet itself is available on request, so nothing is hidden.
               */
              technicalData: {
                heading: "Technical data",
                rows: [
                  { label: "Battery input data" },
                  { label: "Battery type", value: "Lead-acid or lithium-ion" },
                  { label: "Battery voltage range", value: "40–60 V" },
                  { label: "Max. charging current", value: "120 A" },
                  { label: "Max. discharging current", value: "130 A" },
                  { label: "Rated battery voltage", value: "48 V" },
                  { label: "PV string input data" },
                  { label: "Max. PV input power", value: "9000 W" },
                  { label: "Start-up voltage", value: "80 V" },
                  { label: "MPPT voltage range", value: "80–450 V" },
                  { label: "Max. operating PV input current", value: "27 A" },
                  { label: "Max. input short-circuit current", value: "35 A" },
                  { label: "AC input (on grid)" },
                  { label: "Max. AC input power", value: "11500 W" },
                  { label: "Max. AC input current", value: "50 A" },
                  { label: "Rated grid voltage", value: "220 / 230 / 240 V" },
                  { label: "Rated grid frequency", value: "50 / 60 Hz" },
                  { label: "Acceptable range", value: "170–280 Vac (UPS mode) / 90–280 Vac (for loads)" },
                  { label: "AC output data (off grid)" },
                  { label: "Rated output power", value: "6200 W" },
                  { label: "Rated output current", value: "28.2 A" },
                  { label: "Rated output voltage", value: "220 / 230 / 240 V" },
                  { label: "Total current harmonic distortion", value: "THDi < 3% (of nominal power)" },
                  { label: "Transfer time", value: "10 ms (UPS) / 20 ms (loads)" },
                  { label: "Efficiency data" },
                  { label: "Max. efficiency", value: "97.8%" },
                  { label: "Euro efficiency", value: "96.5%" },
                  { label: "MPPT efficiency", value: "> 99%" },
                  { label: "Equipment protection" },
                  {
                    label: "Integrated protection",
                    value:
                      "DC polarity reverse connection protection, AC output overcurrent protection, thermal protection, AC output overvoltage protection, AC output short circuit protection, grid monitoring, island protection monitoring",
                  },
                  { label: "Surge protection level", value: "Type II (DC), Type II (AC)" },
                  { label: "Interface" },
                  { label: "Communication interface", value: "RS485" },
                  { label: "Monitor mode", value: "WiFi / Bluetooth / 4G" },
                  { label: "General data" },
                  { label: "Operating temperature range", value: "−40 to +60 °C (derating above 45 °C)" },
                  { label: "Permissible ambient humidity", value: "0–100%" },
                  { label: "Permissible altitude", value: "2000 m" },
                  { label: "Noise", value: "< 30 dB" },
                  { label: "Ingress protection", value: "IP54" },
                  { label: "Inverter topology", value: "Non-isolated" },
                  { label: "Overvoltage category", value: "OVC II (DC), OVC III (AC)" },
                  { label: "Cabinet size (width × height × depth)", value: "358 × 420 × 123 mm" },
                  { label: "Weight", value: "13 kg" },
                  { label: "Type of cooling", value: "Intelligent air cooling" },
                  { label: "Warranty", value: "3 years" },
                  {
                    label: "Safety / EMC standard",
                    value: "IEC/EN 61000-6-1/2/3/4, IEC/EN 62109-1, IEC/EN 62109-2",
                  },
                ],
              },
            },
            {
              key: "hybrid7k5to15k",
              name: "On-grid 7.5–15 kW single-phase hybrid inverter",
              imageAlt:
                "7.5–15 kW on-grid hybrid inverter in a white wall-mounted housing, with a round display and a red isolator switch on the front",
              /*
               * The datasheet gives one column per model (five of them), so the
               * four rows that differ across the range are printed as ranges and
               * the two that do not are single values. Dimensions carry no axis
               * letters: the source labels them (L×W×H) and the site's other rows
               * for the same product family do not agree on a convention.
               */
              specs: [
                { label: "Rated output power", value: "7.5 / 8 / 10 / 12 / 15 kW" },
                { label: "Battery voltage", value: "48 / 51.2 V" },
                { label: "Max. PV input power", value: "12000 – 22500 W" },
                { label: "Max. efficiency", value: "96.5 – 97.6%" },
                { label: "Dimensions", value: "840 × 513 × 283 mm" },
              ],
              technicalData: {
                heading: "Technical data",
                rows: [
                  { label: "Battery type", value: "Lithium battery / Lead-acid battery" },
                  { label: "Voltage range", value: "40–60 V" },
                  { label: "Rated voltage", value: "48 / 51.2 V" },
                  { label: "Max. input voltage", value: "500 V" },
                  { label: "Start-up voltage", value: "100 V" },
                  { label: "Rated input voltage", value: "300 V" },
                  { label: "Max. input current per MPPT", value: "20 A" },
                  { label: "MPPT voltage range", value: "90–450 V" },
                  { label: "Max. short circuit current per MPPT", value: "27 A" },
                  { label: "Rated output voltage", value: "220 / 230 / 240 V" },
                  { label: "Rated output frequency", value: "50 / 60 Hz" },
                  { label: "THDu (@ linear loads)", value: "< 3%" },
                  { label: "Switch time", value: "10 ms" },
                  { label: "Operating temperature", value: "−25 to +60 °C (derating above 45 °C)" },
                  { label: "Relative humidity", value: "0–95% (non-condensing)" },
                  { label: "Altitude", value: "4000 m (derating above 2000 m)" },
                  { label: "Ingress protection", value: "IP65" },
                  { label: "Noise emission", value: "< 60 dB" },
                  { label: "Mechanical parameters" },
                  { label: "Dimensions (length × width × height)", value: "840 × 513 × 283 mm" },
                  { label: "Weight", value: "52 kg" },
                  { label: "Others" },
                  { label: "Generator auto start-up", value: "2-wire start" },
                  { label: "Standby losses", value: "< 30 W" },
                  { label: "Topology", value: "High-frequency isolation (battery)" },
                  { label: "Cooling method", value: "Intelligent air cooling" },
                  { label: "Mounting method", value: "Wall mounted" },
                  { label: "Communication with BMS", value: "RS485 / CAN" },
                  { label: "Communication with meter", value: "RS485" },
                  { label: "Communication with portal", value: "WiFi / Bluetooth (external)" },
                  { label: "Display", value: "LCD and app" },
                  { label: "Warranty", value: "5 years" },
                ],
              },
            },
            {
              key: "hybridThreePhase",
              name: "Three-phase hybrid inverter",
              imageAlt:
                "Three-phase hybrid inverter in a wall-mounted white housing, with a control panel on the front",
            },
          ],
        },
      ],
    },
    es: {
      eyebrow: "Inversores",
      title: "Inversores híbridos",
      subtitle:
        "Los equipos híbridos gestionan a la vez la entrada solar, la carga de baterías y la conexión a red.",
      note: "Las fichas técnicas por modelo de los equipos que suministramos están disponibles a petición.",
      groups: [
        {
          name: "Inversores",
          intro:
            "Tres gamas híbridas —dos monofásicas, de 6,2 kW y de 7,5 a 15 kW, y una trifásica para instalaciones mayores.",
          cards: [
            {
              key: "hybrid6kw",
              name: "Inversor híbrido de 6,2 kW y 48 V",
              imageAlt:
                "Inversor híbrido de 6,2 kW en carcasa blanca de montaje en pared, con pantalla redonda y botones en el frontal",
              specs: [
                { label: "Potencia de salida nominal", value: "6200 W" },
                { label: "Rango de tensión de batería", value: "40–60 V" },
                { label: "Potencia FV máxima de entrada", value: "9000 W" },
                { label: "Rendimiento máximo", value: "97,8 %" },
                { label: "Dimensiones (An×Al×Pr)", value: "358 × 420 × 123 mm" },
              ],
              technicalData: {
                heading: "Datos técnicos",
                rows: [
                  { label: "Datos de entrada de batería" },
                  { label: "Tipo de batería", value: "Plomo-ácido o ion-litio" },
                  { label: "Rango de tensión de batería", value: "40–60 V" },
                  { label: "Corriente máxima de carga", value: "120 A" },
                  { label: "Corriente máxima de descarga", value: "130 A" },
                  { label: "Tensión nominal de batería", value: "48 V" },
                  { label: "Datos de entrada de las cadenas FV" },
                  { label: "Potencia FV máxima de entrada", value: "9000 W" },
                  { label: "Tensión de arranque", value: "80 V" },
                  { label: "Rango de tensión MPPT", value: "80–450 V" },
                  { label: "Corriente FV máxima en funcionamiento", value: "27 A" },
                  { label: "Corriente máxima de cortocircuito de entrada", value: "35 A" },
                  { label: "Entrada de CA (red)" },
                  { label: "Potencia máxima de entrada de CA", value: "11500 W" },
                  { label: "Corriente máxima de entrada de CA", value: "50 A" },
                  { label: "Tensión nominal de red", value: "220 / 230 / 240 V" },
                  { label: "Frecuencia nominal de red", value: "50 / 60 Hz" },
                  { label: "Rango admisible", value: "170–280 Vac (modo UPS) / 90–280 Vac (para cargas)" },
                  { label: "Datos de salida de CA (fuera de red)" },
                  { label: "Potencia de salida nominal", value: "6200 W" },
                  { label: "Corriente de salida nominal", value: "28,2 A" },
                  { label: "Tensión de salida nominal", value: "220 / 230 / 240 V" },
                  { label: "Distorsión armónica total de corriente", value: "THDi < 3 % (de la potencia nominal)" },
                  { label: "Tiempo de transferencia", value: "10 ms (UPS) / 20 ms (cargas)" },
                  { label: "Datos de rendimiento" },
                  { label: "Rendimiento máximo", value: "97,8 %" },
                  { label: "Rendimiento europeo", value: "96,5 %" },
                  { label: "Rendimiento MPPT", value: "> 99 %" },
                  { label: "Protección del equipo" },
                  {
                    label: "Protección integrada",
                    value:
                      "Protección contra polaridad inversa de CC, protección contra sobrecorriente de salida de CA, protección térmica, protección contra sobretensión de salida de CA, protección contra cortocircuito de salida de CA, monitorización de red, monitorización de protección de isla",
                  },
                  { label: "Nivel de protección contra sobretensiones", value: "Tipo II (CC), Tipo II (CA)" },
                  { label: "Interfaz" },
                  { label: "Interfaz de comunicación", value: "RS485" },
                  { label: "Modo de monitorización", value: "WiFi / Bluetooth / 4G" },
                  { label: "Datos generales" },
                  { label: "Rango de temperatura de funcionamiento", value: "−40 a +60 °C (reducción de potencia por encima de 45 °C)" },
                  { label: "Humedad ambiente admisible", value: "0–100 %" },
                  { label: "Altitud admisible", value: "2000 m" },
                  { label: "Ruido", value: "< 30 dB" },
                  { label: "Grado de protección", value: "IP54" },
                  { label: "Topología del inversor", value: "No aislada" },
                  { label: "Categoría de sobretensión", value: "OVC II (CC), OVC III (CA)" },
                  { label: "Tamaño del armario (ancho × alto × profundidad)", value: "358 × 420 × 123 mm" },
                  { label: "Peso", value: "13 kg" },
                  { label: "Tipo de refrigeración", value: "Refrigeración por aire inteligente" },
                  { label: "Garantía", value: "3 años" },
                  {
                    label: "Normativa de seguridad / CEM",
                    value: "IEC/EN 61000-6-1/2/3/4, IEC/EN 62109-1, IEC/EN 62109-2",
                  },
                ],
              },
            },
            {
              key: "hybrid7k5to15k",
              name: "Inversor híbrido monofásico de 7,5–15 kW para conexión a red",
              imageAlt:
                "Inversor híbrido de 7,5–15 kW en carcasa blanca de montaje en pared, con pantalla redonda y interruptor rojo en el frontal",
              specs: [
                { label: "Potencia de salida nominal", value: "7,5 / 8 / 10 / 12 / 15 kW" },
                { label: "Tensión de batería", value: "48 / 51,2 V" },
                { label: "Potencia FV máxima de entrada", value: "12000 – 22500 W" },
                { label: "Rendimiento máximo", value: "96,5 – 97,6 %" },
                { label: "Dimensiones", value: "840 × 513 × 283 mm" },
              ],
              technicalData: {
                heading: "Datos técnicos",
                rows: [
                  { label: "Tipo de batería", value: "Batería de litio / batería de plomo-ácido" },
                  { label: "Rango de tensión", value: "40–60 V" },
                  { label: "Tensión nominal", value: "48 / 51,2 V" },
                  { label: "Tensión máxima de entrada", value: "500 V" },
                  { label: "Tensión de arranque", value: "100 V" },
                  { label: "Tensión nominal de entrada", value: "300 V" },
                  { label: "Corriente máxima de entrada por MPPT", value: "20 A" },
                  { label: "Rango de tensión MPPT", value: "90–450 V" },
                  { label: "Corriente máxima de cortocircuito por MPPT", value: "27 A" },
                  { label: "Tensión nominal de salida", value: "220 / 230 / 240 V" },
                  { label: "Frecuencia nominal de salida", value: "50 / 60 Hz" },
                  { label: "THDu (con cargas lineales)", value: "< 3 %" },
                  { label: "Tiempo de conmutación", value: "10 ms" },
                  { label: "Temperatura de funcionamiento", value: "−25 a +60 °C (reducción de potencia por encima de 45 °C)" },
                  { label: "Humedad relativa", value: "0–95 % (sin condensación)" },
                  { label: "Altitud", value: "4000 m (reducción de potencia por encima de 2000 m)" },
                  { label: "Grado de protección", value: "IP65" },
                  { label: "Emisión de ruido", value: "< 60 dB" },
                  { label: "Parámetros mecánicos" },
                  { label: "Dimensiones (largo × ancho × alto)", value: "840 × 513 × 283 mm" },
                  { label: "Peso", value: "52 kg" },
                  { label: "Otros" },
                  { label: "Arranque automático del generador", value: "Arranque por 2 hilos" },
                  { label: "Pérdidas en reposo", value: "< 30 W" },
                  { label: "Topología", value: "Aislamiento de alta frecuencia (batería)" },
                  { label: "Método de refrigeración", value: "Refrigeración por aire inteligente" },
                  { label: "Tipo de montaje", value: "Montaje en pared" },
                  { label: "Comunicación con el BMS", value: "RS485 / CAN" },
                  { label: "Comunicación con el contador", value: "RS485" },
                  { label: "Comunicación con el portal", value: "WiFi / Bluetooth (externo)" },
                  { label: "Pantalla", value: "LCD y aplicación" },
                  { label: "Garantía", value: "5 años" },
                ],
              },
            },
            {
              key: "hybridThreePhase",
              name: "Inversor híbrido trifásico",
              imageAlt:
                "Inversor híbrido trifásico en carcasa blanca de montaje en pared, con panel de control en el frontal",
            },
          ],
        },
      ],
    },
    fr: {
      eyebrow: "Onduleurs",
      title: "Onduleurs hybrides",
      subtitle:
        "Les appareils hybrides gèrent ensemble l’entrée solaire, la charge des batteries et le raccordement au réseau.",
      note: "Les fiches techniques par modèle des appareils que nous fournissons sont disponibles sur demande.",
      groups: [
        {
          name: "Onduleurs",
          intro:
            "Trois gammes hybrides — deux monophasées, 6,2 kW et 7,5 à 15 kW, et une triphasée pour les installations plus importantes.",
          cards: [
            {
              key: "hybrid6kw",
              name: "Onduleur hybride 6,2 kW 48 V",
              imageAlt:
                "Onduleur hybride 6,2 kW en boîtier blanc mural, avec écran rond et boutons en façade",
              specs: [
                { label: "Puissance de sortie nominale", value: "6200 W" },
                { label: "Plage de tension de batterie", value: "40–60 V" },
                { label: "Puissance PV maximale en entrée", value: "9000 W" },
                { label: "Rendement maximal", value: "97,8 %" },
                { label: "Dimensions (l×H×P)", value: "358 × 420 × 123 mm" },
              ],
              technicalData: {
                heading: "Caractéristiques techniques",
                rows: [
                  { label: "Données d'entrée batterie" },
                  { label: "Type de batterie", value: "Plomb-acide ou lithium-ion" },
                  { label: "Plage de tension batterie", value: "40–60 V" },
                  { label: "Courant de charge maximal", value: "120 A" },
                  { label: "Courant de décharge maximal", value: "130 A" },
                  { label: "Tension nominale de batterie", value: "48 V" },
                  { label: "Données d'entrée des chaînes PV" },
                  { label: "Puissance PV maximale en entrée", value: "9000 W" },
                  { label: "Tension de démarrage", value: "80 V" },
                  { label: "Plage de tension MPPT", value: "80–450 V" },
                  { label: "Courant PV maximal en fonctionnement", value: "27 A" },
                  { label: "Courant de court-circuit maximal en entrée", value: "35 A" },
                  { label: "Entrée AC (réseau)" },
                  { label: "Puissance maximale d'entrée AC", value: "11500 W" },
                  { label: "Courant maximal d'entrée AC", value: "50 A" },
                  { label: "Tension réseau nominale", value: "220 / 230 / 240 V" },
                  { label: "Fréquence réseau nominale", value: "50 / 60 Hz" },
                  { label: "Plage admissible", value: "170–280 Vac (mode UPS) / 90–280 Vac (pour les charges)" },
                  { label: "Données de sortie AC (hors réseau)" },
                  { label: "Puissance de sortie nominale", value: "6200 W" },
                  { label: "Courant de sortie nominal", value: "28,2 A" },
                  { label: "Tension de sortie nominale", value: "220 / 230 / 240 V" },
                  { label: "Distorsion harmonique totale en courant", value: "THDi < 3 % (de la puissance nominale)" },
                  { label: "Temps de transfert", value: "10 ms (UPS) / 20 ms (charges)" },
                  { label: "Données de rendement" },
                  { label: "Rendement maximal", value: "97,8 %" },
                  { label: "Rendement européen", value: "96,5 %" },
                  { label: "Rendement MPPT", value: "> 99 %" },
                  { label: "Protection de l'équipement" },
                  {
                    label: "Protection intégrée",
                    value:
                      "Protection contre l'inversion de polarité DC, protection contre les surintensités de sortie AC, protection thermique, protection contre les surtensions de sortie AC, protection contre les courts-circuits de sortie AC, surveillance du réseau, surveillance de la protection d'îlotage",
                  },
                  { label: "Niveau de protection contre les surtensions", value: "Type II (DC), Type II (AC)" },
                  { label: "Interface" },
                  { label: "Interface de communication", value: "RS485" },
                  { label: "Mode de surveillance", value: "WiFi / Bluetooth / 4G" },
                  { label: "Données générales" },
                  { label: "Plage de température de fonctionnement", value: "−40 à +60 °C (déclassement au-delà de 45 °C)" },
                  { label: "Humidité ambiante admissible", value: "0–100 %" },
                  { label: "Altitude admissible", value: "2000 m" },
                  { label: "Bruit", value: "< 30 dB" },
                  { label: "Indice de protection", value: "IP54" },
                  { label: "Topologie de l'onduleur", value: "Non isolée" },
                  { label: "Catégorie de surtension", value: "OVC II (DC), OVC III (AC)" },
                  { label: "Dimensions de l'armoire (largeur × hauteur × profondeur)", value: "358 × 420 × 123 mm" },
                  { label: "Poids", value: "13 kg" },
                  { label: "Type de refroidissement", value: "Refroidissement par air intelligent" },
                  { label: "Garantie", value: "3 ans" },
                  {
                    label: "Normes de sécurité / CEM",
                    value: "IEC/EN 61000-6-1/2/3/4, IEC/EN 62109-1, IEC/EN 62109-2",
                  },
                ],
              },
            },
            {
              key: "hybrid7k5to15k",
              name: "Onduleur hybride monophasé raccordé au réseau 7,5–15 kW",
              imageAlt:
                "Onduleur hybride 7,5–15 kW en boîtier blanc mural, avec écran rond et interrupteur rouge en façade",
              specs: [
                { label: "Puissance de sortie nominale", value: "7,5 / 8 / 10 / 12 / 15 kW" },
                { label: "Tension de batterie", value: "48 / 51,2 V" },
                { label: "Puissance PV maximale en entrée", value: "12000 – 22500 W" },
                { label: "Rendement maximal", value: "96,5 – 97,6 %" },
                { label: "Dimensions", value: "840 × 513 × 283 mm" },
              ],
              technicalData: {
                heading: "Caractéristiques techniques",
                rows: [
                  { label: "Type de batterie", value: "Batterie lithium / batterie plomb-acide" },
                  { label: "Plage de tension", value: "40–60 V" },
                  { label: "Tension nominale", value: "48 / 51,2 V" },
                  { label: "Tension d'entrée maximale", value: "500 V" },
                  { label: "Tension de démarrage", value: "100 V" },
                  { label: "Tension d'entrée nominale", value: "300 V" },
                  { label: "Courant d'entrée maximal par MPPT", value: "20 A" },
                  { label: "Plage de tension MPPT", value: "90–450 V" },
                  { label: "Courant de court-circuit maximal par MPPT", value: "27 A" },
                  { label: "Tension de sortie nominale", value: "220 / 230 / 240 V" },
                  { label: "Fréquence de sortie nominale", value: "50 / 60 Hz" },
                  { label: "THDu (charges linéaires)", value: "< 3 %" },
                  { label: "Temps de commutation", value: "10 ms" },
                  { label: "Température de fonctionnement", value: "−25 à +60 °C (déclassement au-delà de 45 °C)" },
                  { label: "Humidité relative", value: "0–95 % (sans condensation)" },
                  { label: "Altitude", value: "4000 m (déclassement au-delà de 2000 m)" },
                  { label: "Indice de protection", value: "IP65" },
                  { label: "Émission sonore", value: "< 60 dB" },
                  { label: "Caractéristiques mécaniques" },
                  { label: "Dimensions (longueur × largeur × hauteur)", value: "840 × 513 × 283 mm" },
                  { label: "Poids", value: "52 kg" },
                  { label: "Autres" },
                  { label: "Démarrage automatique du générateur", value: "Démarrage 2 fils" },
                  { label: "Pertes en veille", value: "< 30 W" },
                  { label: "Topologie", value: "Isolation haute fréquence (batterie)" },
                  { label: "Méthode de refroidissement", value: "Refroidissement par air intelligent" },
                  { label: "Mode de montage", value: "Montage mural" },
                  { label: "Communication avec le BMS", value: "RS485 / CAN" },
                  { label: "Communication avec le compteur", value: "RS485" },
                  { label: "Communication avec le portail", value: "WiFi / Bluetooth (externe)" },
                  { label: "Afficheur", value: "LCD et application" },
                  { label: "Garantie", value: "5 ans" },
                ],
              },
            },
            {
              key: "hybridThreePhase",
              name: "Onduleur hybride triphasé",
              imageAlt:
                "Onduleur hybride triphasé en boîtier blanc mural, avec panneau de commande en façade",
            },
          ],
        },
      ],
    },
  },
  ess: {
    en: {
      eyebrow: "BESS",
      title: "Portable, residential, commercial and utility-scale energy storage",
      subtitle:
        "A portable station for work away from the grid, a floor-standing battery for the home, an all-in-one cabinet for commercial and industrial sites, and a containerised skid for utility scale.",
      note: "Datasheets for the units we supply are available on request.",
      groups: [
        {
          name: "Battery Energy Storage System",
          intro:
            "Four ranges, all on lithium iron phosphate cells: a portable station, a home battery that expands to 15 units in parallel, a liquid-cooled cabinet for industrial sites, and a containerised skid for utility scale.",
          cards: [
            {
              key: "portablePower",
              name: "1 kWh portable power station",
              imageAlt:
                "Portable power station with a carry handle, a display and AC outlets on the front",
              description:
                "A 1000 Wh station with 500 W of rated output, built on lithium iron phosphate cells. It runs hand tools, lights or a fridge away from the grid, and doubles as household backup. It charges from a mains socket in about two hours, or from a PV input of up to 300 W in about three hours.",
              features: [
                "LiFePO4 cells for safety, durability and a long cycle life.",
                "Dual charging: mains in about 2 hours, or PV input up to 300 W in about 3 hours.",
                "Compact body with an integrated handle, easy to carry and store.",
                "Temperature-controlled fan: fan speed follows the load, which keeps the unit cool and extends its service life.",
              ],
              specs: [
                { label: "Rated energy", value: "1000 Wh" },
                { label: "Rated output power", value: "500 W" },
                { label: "Battery type", value: "LiFePO4" },
                { label: "Dimensions (L×W×H)", value: "339 × 149 × 273 mm" },
                { label: "Weight", value: "8 kg" },
              ],
            },
            {
              key: "homeStorage",
              name: "16 kWh home battery",
              imageAlt:
                "Floor-standing home battery cabinet with a round display, standing on castors",
              description:
                "One floor-standing cabinet holds 16,076.8 Wh at a nominal 51.2 V and a rated capacity of 314 Ah, with the battery management system built in. It is rated IP65, so it can stand indoors or under outdoor eaves, and up to 15 units can run in parallel for a larger bank.",
              features: [
                "IP65 dust and water protection, thermally stable LiFePO4 cells and fanless natural cooling; an aerosol fire suppression system is available as an option.",
                "RS232, CAN and RS485 ports for mainstream inverters, with optional Bluetooth for app monitoring.",
                "Free-standing on wheels, 867.5 × 500 × 230 mm and about 120 kg; the wheels are optional.",
                "6000 cycles or more at 90% depth of discharge (25 °C, 0.5C), with 100 A recommended and 157 A maximum continuous charge or discharge current.",
              ],
              specs: [
                { label: "Rated energy", value: "16,076.8 Wh" },
                { label: "Nominal voltage", value: "51.2 V" },
                { label: "Rated capacity", value: "314 Ah" },
                { label: "Cycle life", value: "≥ 6000 cycles at 90% DOD" },
                { label: "Protection class", value: "IP65" },
              ],
            },
            {
              key: "commercialStorage",
              name: "261 kWh commercial and industrial cabinet",
              imageAlt:
                "Liquid-cooled commercial storage cabinet with a control panel and a vented door",
              description:
                "An all-in-one cabinet: battery packs, battery management, energy management, power conversion, liquid cooling and fire suppression in one enclosure. It stores 261 kWh and delivers 125 kW of three-phase AC power at 400 V on a footprint of 1.4 m². Several cabinets can be paralleled for a larger site.",
              features: [
                "Three levels of overcurrent protection — pack, cluster and PCS — with arc-fault detection that disconnects within milliseconds and AI cell pre-diagnosis that warns early and suppresses thermal runaway.",
                "Cluster-level management of the AC-DC integrated design, which extends battery life by more than two years.",
                "One cabinet covers 1.4 m², and several can be paralleled under cluster control with the capacity configured to the site.",
                "Remote wireless operation and one-click OTA updates, with four layers of protection across cloud, network, edge and device, and service over the full life of the system.",
              ],
              specs: [
                { label: "Rated energy", value: "261 kWh" },
                { label: "Rated AC power", value: "125 kW" },
                { label: "Dimensions (W×D×H)", value: "1000 × 1400 × 2350 mm" },
                { label: "Weight", value: "Approx. 2200 kg" },
                { label: "Protection rating", value: "IP55 (battery compartment)" },
              ],
            },
            {
              key: "largeStorage",
              name: "5 MWh liquid-cooled storage skid",
              imageAlt:
                "Large liquid-cooled storage skid: a long white cabinet with six door panels and a vented compartment at the right end",
              description:
                "A containerised DC skid for utility-scale and large commercial sites: lithium iron phosphate modules, 1331.2 V nominal and liquid cooling, prefabricated so that it arrives as one platform measuring 6058 × 2438 × 2896 mm. The datasheet covers two configurations — 5015 kWh on 314 Ah cells and 6250 kWh on 587 Ah cells.",
              features: [
                "IP55 protection and C5 anti-corrosion for outdoor installation, with fire protection that combines perfluorohexanone, aerosol or water spray and an AI early-warning system across three levels: module, cluster and compartment.",
                "Cell temperature difference within a module held to 3 °C or less, and full charge and discharge at full capacity.",
                "Response within 30 ms once discharge starts, with round-trip charge and discharge efficiency up to 94%.",
                "Modular, non-walk-in design that saves 35% of floor space, with the electrical and battery compartments kept separate; the prefabricated skid cuts on-site installation and commissioning time.",
              ],
              specs: [
                { label: "Rated energy", value: "5015 kWh / 6250 kWh" },
                { label: "Rated voltage", value: "1331.2 V" },
                { label: "Dimensions (W×D×H)", value: "6058 × 2438 × 2896 mm" },
                { label: "Weight", value: "< 43 t / < 45 t" },
                { label: "Protection rating", value: "IP55, C5 anti-corrosion" },
              ],
            },
          ],
        },
      ],
    },
    es: {
      eyebrow: "BESS",
      title: "Almacenamiento portátil, residencial, comercial y a gran escala",
      subtitle:
        "Una estación portátil para trabajar lejos de la red, una batería de suelo para el hogar, un armario todo en uno para instalaciones comerciales e industriales y una plataforma en contenedor para gran escala.",
      note: "Las fichas técnicas de los equipos que suministramos están disponibles a petición.",
      groups: [
        {
          name: "Sistema de almacenamiento de energía con baterías",
          intro:
            "Cuatro gamas, todas con celdas de litio hierro fosfato: una estación portátil, una batería doméstica que se amplía hasta 15 unidades en paralelo, un armario refrigerado por líquido para instalaciones industriales y una plataforma en contenedor para gran escala.",
          cards: [
            {
              key: "portablePower",
              name: "Estación de energía portátil de 1 kWh",
              imageAlt:
                "Estación de energía portátil con asa de transporte, pantalla y tomas de corriente alterna en el frontal",
              description:
                "Una estación de 1000 Wh con 500 W de potencia nominal, con celdas de litio hierro fosfato. Alimenta herramientas, luces o un frigorífico lejos de la red y sirve además como respaldo doméstico. Se carga desde una toma de red en unas dos horas, o desde una entrada fotovoltaica de hasta 300 W en unas tres horas.",
              features: [
                "Celdas LiFePO4 para seguridad, durabilidad y una larga vida de ciclos.",
                "Doble carga: red eléctrica en unas 2 horas, o entrada FV de hasta 300 W en unas 3 horas.",
                "Cuerpo compacto con asa integrada, fácil de transportar y guardar.",
                "Ventilador con control de temperatura: su velocidad sigue la carga, lo que mantiene el equipo frío y alarga su vida útil.",
              ],
              specs: [
                { label: "Energía nominal", value: "1000 Wh" },
                { label: "Potencia de salida nominal", value: "500 W" },
                { label: "Tipo de batería", value: "LiFePO4" },
                { label: "Dimensiones (L×An×Al)", value: "339 × 149 × 273 mm" },
                { label: "Peso", value: "8 kg" },
              ],
            },
            {
              key: "homeStorage",
              name: "Batería doméstica de 16 kWh",
              imageAlt:
                "Armario de batería doméstica de suelo con pantalla circular, sobre ruedas",
              description:
                "Un solo armario almacena 16.076,8 Wh con 51,2 V nominales y una capacidad nominal de 314 Ah, con el sistema de gestión de batería integrado. Tiene protección IP65, por lo que puede instalarse en interior o bajo alero, y hasta 15 unidades pueden funcionar en paralelo para formar un banco mayor.",
              features: [
                "Protección IP65 contra polvo y agua, celdas LiFePO4 térmicamente estables y refrigeración natural sin ventilador; el sistema de extinción por aerosol es opcional.",
                "Puertos RS232, CAN y RS485 para inversores habituales, con Bluetooth opcional para supervisión desde la aplicación.",
                "Instalación de suelo sobre ruedas, 867,5 × 500 × 230 mm y unos 120 kg; las ruedas son opcionales.",
                "6000 ciclos o más al 90 % de profundidad de descarga (25 °C, 0,5C), con 100 A recomendados y 157 A máximos de carga o descarga continua.",
              ],
              specs: [
                { label: "Energía nominal", value: "16.076,8 Wh" },
                { label: "Tensión nominal", value: "51,2 V" },
                { label: "Capacidad nominal", value: "314 Ah" },
                { label: "Vida de ciclos", value: "≥ 6000 ciclos al 90 % DOD" },
                { label: "Grado de protección", value: "IP65" },
              ],
            },
            {
              key: "commercialStorage",
              name: "Armario comercial e industrial de 261 kWh",
              imageAlt:
                "Armario de almacenamiento comercial refrigerado por líquido, con panel de control y puerta ventilada",
              description:
                "Un armario todo en uno: módulos de batería, gestión de batería, gestión de energía, conversión de potencia, refrigeración líquida y extinción de incendios en una sola envolvente. Almacena 261 kWh y entrega 125 kW de corriente alterna trifásica a 400 V, con una huella de 1,4 m². Varios armarios pueden conectarse en paralelo para instalaciones mayores.",
              features: [
                "Tres niveles de protección contra sobrecorriente —módulo, conjunto y PCS— con detección de arco que desconecta en milisegundos y prediagnóstico por IA de las celdas que avisa a tiempo y frena la fuga térmica.",
                "Gestión a nivel de conjunto del diseño integrado CA-CC, que prolonga la vida de la batería más de dos años.",
                "Un armario ocupa 1,4 m² y varios pueden conectarse en paralelo con control de conjunto, configurando la capacidad según la instalación.",
                "Operación inalámbrica remota y actualizaciones OTA en un clic, con cuatro capas de protección —nube, red, borde y dispositivo— y servicio durante toda la vida del sistema.",
              ],
              specs: [
                { label: "Energía nominal", value: "261 kWh" },
                { label: "Potencia CA nominal", value: "125 kW" },
                { label: "Dimensiones (An×Pr×Al)", value: "1000 × 1400 × 2350 mm" },
                { label: "Peso", value: "Aprox. 2200 kg" },
                { label: "Grado de protección", value: "IP55 (compartimento de baterías)" },
              ],
            },
            {
              key: "largeStorage",
              name: "Plataforma de almacenamiento refrigerada por líquido de 5 MWh",
              imageAlt:
                "Plataforma de almacenamiento refrigerada por líquido: armario blanco alargado con seis puertas y un compartimento ventilado en el extremo derecho",
              description:
                "Una plataforma de corriente continua para instalaciones a gran escala y grandes sitios comerciales: módulos de litio hierro fosfato, 1331,2 V nominales y refrigeración líquida, prefabricada para llegar como una sola plataforma de 6058 × 2438 × 2896 mm. La ficha cubre dos configuraciones: 5015 kWh con celdas de 314 Ah y 6250 kWh con celdas de 587 Ah.",
              features: [
                "Protección IP55 y anticorrosión C5 para instalación exterior, con extinción que combina perfluorohexanona, aerosol o agua pulverizada y un sistema de alerta temprana con IA en tres niveles: módulo, conjunto y compartimento.",
                "Diferencia de temperatura entre celdas dentro de un módulo de 3 °C o menos, y carga y descarga completas a plena capacidad.",
                "Respuesta en 30 ms al iniciar la descarga, con eficiencia de carga y descarga de hasta el 94 %.",
                "Diseño modular no transitable que ahorra un 35 % de superficie, con los compartimentos eléctrico y de baterías separados; la plataforma prefabricada reduce la instalación y la puesta en marcha en obra.",
              ],
              specs: [
                { label: "Energía nominal", value: "5015 kWh / 6250 kWh" },
                { label: "Tensión nominal", value: "1331,2 V" },
                { label: "Dimensiones (An×Pr×Al)", value: "6058 × 2438 × 2896 mm" },
                { label: "Peso", value: "< 43 t / < 45 t" },
                { label: "Grado de protección", value: "IP55, anticorrosión C5" },
              ],
            },
          ],
        },
      ],
    },
    fr: {
      eyebrow: "BESS",
      title: "Stockage portable, résidentiel, commercial et à grande échelle",
      subtitle:
        "Une station portable pour travailler hors réseau, une batterie au sol pour la maison, une armoire tout-en-un pour les sites commerciaux et industriels, et une plateforme conteneurisée pour les sites utilitaires.",
      note: "Les fiches techniques des appareils que nous fournissons sont disponibles sur demande.",
      groups: [
        {
          name: "Système de stockage d’énergie par batteries",
          intro:
            "Quatre gammes, toutes sur cellules lithium fer phosphate : une station portable, une batterie domestique qui s’étend jusqu’à 15 unités en parallèle, une armoire refroidie par liquide pour les sites industriels et une plateforme conteneurisée pour les sites utilitaires.",
          cards: [
            {
              key: "portablePower",
              name: "Station d’énergie portable 1 kWh",
              imageAlt:
                "Station d’énergie portable avec poignée de transport, écran et prises de courant alternatif en façade",
              description:
                "Une station de 1000 Wh et 500 W de puissance nominale, sur cellules lithium fer phosphate. Elle alimente outils, éclairage ou réfrigérateur hors réseau et sert aussi de secours domestique. Elle se recharge sur une prise secteur en deux heures environ, ou depuis une entrée photovoltaïque jusqu’à 300 W en trois heures environ.",
              features: [
                "Cellules LiFePO4 : sécurité, durabilité et longue durée de cycles.",
                "Double charge : secteur en 2 heures environ, ou entrée PV jusqu’à 300 W en 3 heures environ.",
                "Corps compact à poignée intégrée, facile à transporter et à ranger.",
                "Ventilateur à régulation thermique : sa vitesse suit la charge, ce qui évite la surchauffe et prolonge la durée de vie.",
              ],
              specs: [
                { label: "Énergie nominale", value: "1000 Wh" },
                { label: "Puissance de sortie nominale", value: "500 W" },
                { label: "Type de batterie", value: "LiFePO4" },
                { label: "Dimensions (L×l×H)", value: "339 × 149 × 273 mm" },
                { label: "Poids", value: "8 kg" },
              ],
            },
            {
              key: "homeStorage",
              name: "Batterie domestique 16 kWh",
              imageAlt:
                "Armoire de batterie domestique au sol avec écran circulaire, sur roulettes",
              description:
                "Une seule armoire stocke 16 076,8 Wh sous 51,2 V nominaux avec une capacité nominale de 314 Ah, système de gestion de batterie intégré. Classée IP65, elle s’installe à l’intérieur ou sous un auvent ; jusqu’à 15 unités peuvent fonctionner en parallèle pour former un parc plus important.",
              features: [
                "Protection IP65 contre poussière et eau, cellules LiFePO4 thermiquement stables et refroidissement naturel sans ventilateur ; le système d’extinction par aérosol est en option.",
                "Ports RS232, CAN et RS485 pour les onduleurs courants, Bluetooth en option pour le suivi sur application.",
                "Pose au sol sur roulettes, 867,5 × 500 × 230 mm et environ 120 kg ; les roulettes sont en option.",
                "6000 cycles ou plus à 90 % de profondeur de décharge (25 °C, 0,5C), avec 100 A recommandés et 157 A maximum en charge ou décharge continue.",
              ],
              specs: [
                { label: "Énergie nominale", value: "16 076,8 Wh" },
                { label: "Tension nominale", value: "51,2 V" },
                { label: "Capacité nominale", value: "314 Ah" },
                { label: "Durée de cycles", value: "≥ 6000 cycles à 90 % DOD" },
                { label: "Indice de protection", value: "IP65" },
              ],
            },
            {
              key: "commercialStorage",
              name: "Armoire commerciale et industrielle 261 kWh",
              imageAlt:
                "Armoire de stockage commerciale refroidie par liquide, avec panneau de commande et porte ventilée",
              description:
                "Une armoire tout-en-un : modules de batterie, gestion de batterie, gestion d’énergie, conversion de puissance, refroidissement liquide et extinction d’incendie dans une seule enveloppe. Elle stocke 261 kWh et fournit 125 kW en courant alternatif triphasé sous 400 V, sur une emprise de 1,4 m². Plusieurs armoires peuvent être mises en parallèle pour un site plus important.",
              features: [
                "Trois niveaux de protection contre les surintensités — module, grappe et PCS — avec détection d’arc coupant en quelques millisecondes et prédiagnostic des cellules par IA qui alerte tôt et limite l’emballement thermique.",
                "Gestion au niveau de la grappe du design intégré AC-DC, qui prolonge la durée de vie de la batterie de plus de deux ans.",
                "Une armoire occupe 1,4 m² ; plusieurs peuvent être mises en parallèle sous contrôle de grappe, la capacité étant configurée selon le site.",
                "Exploitation sans fil à distance et mises à jour OTA en un clic, avec quatre couches de protection — cloud, réseau, périphérie et appareil — et un service sur toute la durée de vie du système.",
              ],
              specs: [
                { label: "Énergie nominale", value: "261 kWh" },
                { label: "Puissance CA nominale", value: "125 kW" },
                { label: "Dimensions (l×P×H)", value: "1000 × 1400 × 2350 mm" },
                { label: "Poids", value: "Env. 2200 kg" },
                { label: "Indice de protection", value: "IP55 (compartiment batteries)" },
              ],
            },
            {
              key: "largeStorage",
              name: "Plateforme de stockage refroidie par liquide 5 MWh",
              imageAlt:
                "Plateforme de stockage refroidie par liquide : armoire blanche allongée à six portes et compartiment ventilé à droite",
              description:
                "Une plateforme DC pour sites utilitaires et grands sites commerciaux : modules lithium fer phosphate, 1331,2 V nominaux et refroidissement liquide, préfabriquée et livrée en une seule plateforme de 6058 × 2438 × 2896 mm. La fiche couvre deux configurations : 5015 kWh avec cellules de 314 Ah et 6250 kWh avec cellules de 587 Ah.",
              features: [
                "Protection IP55 et anticorrosion C5 pour l’extérieur, avec une extinction combinant perfluorohexanone, aérosol ou brouillard d’eau et un système d’alerte précoce par IA sur trois niveaux : module, grappe et compartiment.",
                "Écart de température entre cellules dans un module limité à 3 °C ou moins, avec charge et décharge complètes à pleine capacité.",
                "Réponse en 30 ms au démarrage de la décharge, avec un rendement de charge et décharge jusqu’à 94 %.",
                "Conception modulaire non visitable qui économise 35 % de surface, compartiments électrique et batteries séparés ; la plateforme préfabriquée réduit l’installation et la mise en service sur site.",
              ],
              specs: [
                { label: "Énergie nominale", value: "5015 kWh / 6250 kWh" },
                { label: "Tension nominale", value: "1331,2 V" },
                { label: "Dimensions (l×P×H)", value: "6058 × 2438 × 2896 mm" },
                { label: "Poids", value: "< 43 t / < 45 t" },
                { label: "Indice de protection", value: "IP55, anticorrosion C5" },
              ],
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
