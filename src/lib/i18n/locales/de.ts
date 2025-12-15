import { Dictionary } from '../types';

export const de: Dictionary = {
  header: {
    menu: "Menü",
    portfolio: "Erfolgsgeschichten",
    services: "Unsere Lösungen",
    about: "Über uns",
    contact: "Kontakt",
    readyText: "Bereit, Ihr Projekt zum Leben zu erwecken?",
    getInTouch: "Kostenlose Analyse"
  },
  hero: {
    designTag: "✨ Datengetriebenes Produktdesign & Strategie",
    designTitle: ["Markenstärkende", "Wirksame Design-", "Strategien"],
    designDesc: "Wir gestalten nicht nur ästhetische, sondern geschäftsorientierte Benutzeroberflächen. Wir vereinfachen Produktabläufe und schaffen Erlebnisse, die Nutzerbindung fördern.",
    designBtnPrimary: "Kontaktformular",
    designBtnSecondary: "Projekte ansehen",

    codeTag: "💻 Skalierbare Individuelle/Korporative Architekturen",
    codeTitle: ["Zukunftssichere", "Hochleistungs-", "Software"],
    codeDesc: "Wir entwickeln sichere und modulare ERP- & SaaS-Infrastrukturen, die mit Ihrem Unternehmenswachstum Schritt halten. Einfach, funktional und budgetfreundlich.",
    codeBtnPrimary: "Kontaktformular",
    codeBtnSecondary: "Projekte ansehen"
  },
  portfolio: {
    tag: "Was haben wir erreicht?",
    title: "Ausgewählte Erfolgsgeschichten",
    description: "Projekte, in denen wir Unternehmensziele mit Nutzerbedürfnissen durch Design Thinking vereinen.",
    descriptionCode: "Skalierbare technische Lösungen für komplexe Herausforderungen verschiedener Branchen.",
    viewAll: "Alle Projekte",
    designProjects: [
      {
        title: 'Recycling-Operationspanel',
        category: 'Textil-Recycling-ERP-Software',
        description: 'End-to-End-Plattform zur Steigerung der operativen Effizienz und Business Intelligence.',
        image: '/portfolio/22.png',
        link: '/hub/demos/textil-recycling-international-erp'
      },
      {
        title: 'Online-Lernplattform',
        category: 'B2C Nutzerreise',
        description: 'Gamifiziertes, auf Nutzerbindung ausgerichtetes Servicedesign.',
        image: '/portfolio/17.png',
        link: '/hub/projects/b2c-online-bildung-benutzerreise-gamification'
      },
      {
        title: 'Cloudbasiertes SaaS',
        category: 'Dell Cloud Service',
        description: 'Skalierbares, konsistentes Atomic Design System für schnelle Entwicklung.',
        image: '/portfolio/18.png',
        link: '/hub/projects/dell-cloud-service-atomares-designsystem'
      },
      {
        title: 'Globaler B2C-Marktplatz',
        category: 'Second-Hand-Tickethandel',
        description: 'Reibungslose Buchungserfahrung zur Reduzierung von Kaufabbrüchen.',
        image: '/portfolio/20.png',
        link: '/hub/projects/second-hand-ticket-handel-globale-b2c'
      }
    ],
    codeProjects: [
      {
        title: 'Recycling-Operationspanel',
        category: 'Textil-Recycling-ERP-Software',
        description: 'End-to-End-Plattform zur Steigerung der operativen Effizienz und Business Intelligence.',
        image: '/portfolio/22.png',
        link: '/hub/demos/textil-recycling-international-erp'
      },
      {
        title: 'Online-Lernplattform',
        category: 'B2C Nutzerreise',
        description: 'Gamifiziertes, auf Nutzerbindung ausgerichtetes Servicedesign.',
        image: '/portfolio/17.png',
        link: '/hub/projects/b2c-online-bildung-benutzerreise-gamification'
      },
      {
        title: 'Cloudbasiertes SaaS',
        category: 'Dell Cloud Service',
        description: 'Skalierbares, konsistentes Atomic Design System für schnelle Entwicklung.',
        image: '/portfolio/18.png',
        link: '/hub/projects/dell-cloud-service-atomares-designsystem'
      },
      {
        title: 'Globaler B2C-Marktplatz',
        category: 'Second-Hand-Tickethandel',
        description: 'Reibungslose Buchungserfahrung zur Reduzierung von Kaufabbrüchen.',
        image: '/portfolio/20.png',
        link: '/hub/projects/second-hand-ticket-handel-globale-b2c'
      }
    ]
  },
  pricing: {
    tag: "Kooperationsmodelle",
    title: "Wählen Sie den passenden Plan",
    description: "Transparente, ergebnisorientierte Softwarelösungen, abgestimmt auf Ihre Projektphase und Ziele.",
    descriptionCode: "Flexible Softwarepakete, die mit Ihrem Unternehmen wachsen – von MVP bis Enterprise.",
    learnMore: "Mehr erfahren →",
    customSolution: "Haben Sie eine größere Vision?",
    contactUs: "Individuelles Angebot anfordern",
    forQuote: "unser Team analysiert Ihre Anforderungen.",
    designPlans: [
      {
        name: 'Einsteiger',
        price: '$999',
        period: '/ Einmalig',
        label: 'Schneller Start',
        description: 'Für Start-ups, die ihre Idee validieren und schnell auf den Markt gehen möchten.',
        features: [
          'Strategische UI/UX-Beratung',
          'Conversion-optimierte Landing Page',
          'Responsives Design',
          '1 Jahr kostenloser Support',
        ],
        cta: 'Paket kaufen',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Wachstum',
        price: '$1799',
        period: '+ $18 monatlich',
        label: 'Am beliebtesten',
        description: 'Für Unternehmen, die ihre digitale Präsenz stärken und Prozesse steuern möchten.',
        features: [
          'Mehrseitige Unternehmenswebsite',
          'Individuelles CMS-Admin-Panel',
          '2 Modul-Integrationen (CRM/HR)',
          'Nutzertests & Optimierung',
        ],
        cta: 'Paket kaufen',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Enterprise Partner',
        price: '$3499',
        period: 'Ab',
        label: 'Großbetriebe',
        description: 'Für Unternehmen mit komplexen Geschäftsprozessen und digitaler Transformation.',
        features: [
          'Individuelle Softwarearchitektur & API',
          'Umfassende Markt- & Wettbewerbsanalyse',
          '24/7 Priorisierter SLA-Support',
          '3-Monats-Wachstumsstrategie',
        ],
        cta: 'Kontaktformular',
        link: '#contact',
        highlighted: false
      }
    ],
    codePlans: [
      {
        name: 'Einsteiger',
        price: '$999',
        period: '/ Einmalig',
        label: 'Prototyp & Demo',
        description: 'Ideal, um Ihre Idee vor einer Investition in ein funktionierendes Produkt zu verwandeln.',
        features: [
          'Moderne Frontend-Architektur',
          'Responsives Coding',
          'SEO & Performance-Basics',
          '1 Jahr kostenloser Support',
        ],
        cta: 'Paket kaufen',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Scale-Up',
        price: '$1799',
        period: '+ $18 monatlich',
        label: 'Hohe Leistung',
        description: 'Für Unternehmen mit steigendem Traffic und Automatisierungsbedarf.',
        features: [
          'Individuelle Backend-Entwicklung',
          'Erweitertes Admin-Panel',
          '2 externe Integrationen',
          'Sicherheits- & Backup-Infrastruktur',
        ],
        cta: 'Paket kaufen',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Enterprise Suite',
        price: '$3499',
        period: 'Ab',
        label: 'Vollständige Lösung',
        description: 'Für kritische Geschäftsanwendungen mit hohen Sicherheits- und Leistungsanforderungen.',
        features: [
          'Mikroservice-Architektur',
          'Erweiterte API & Integrationen',
          'Load Balancing & Auto-Scaling',
          'DevOps & CI/CD Setup',
        ],
        cta: 'Technisches Team kontaktieren',
        link: '#contact',
        highlighted: false
      }
    ],
  },
  services: {
    tag: "Unsere Fachgebiete",
    titleDesign: "Strategisches Design",
    titleCode: "Ingenieur-Lösungen",
    descriptionDesign: "Eine Designpraxis, die Nutzerpsychologie und Geschäftsstrategie verbindet und messbare Ergebnisse liefert.",
    descriptionCode: "Moderne Softwareentwicklung auf Basis von Sicherheit, Geschwindigkeit und Nachhaltigkeit.",
    loadMore: "Alle Fähigkeiten anzeigen",
    showLess: "Weniger anzeigen",
    designServices: [
      {
        title: 'Strategische UX-Beratung',
        description: 'Wir analysieren das Nutzerverhalten anhand von Daten und steigern die Erfolgswahrscheinlichkeit Ihres Produkts.'
      },
      {
        title: 'Product Doctoring',
        description: 'Wir identifizieren Engpässe in Ihrem aktuellen Produkt und optimieren es für maximale Conversion.'
      },
      {
        title: 'Digitale Produktentwicklung',
        description: 'Von der Idee bis zum Launch entwickeln wir digitale Produkte mit starkem PMF.'
      },
      {
        title: 'Customer Journey Mapping (CJM)',
        description: 'Wir kartieren jeden Berührungspunkt Ihrer Nutzer und optimieren die gesamte Erfahrung.'
      },
      {
        title: 'Retention & CRM Design',
        description: 'Flows, die Nutzer binden, Loyalität steigern und den LTV erhöhen.'
      }
    ],
    codeServices: [
      {
        title: 'ERP-Systeme für Unternehmen',
        description: 'Zentrale Verwaltung des Datenflusses zwischen Abteilungen für maximale Effizienz.'
      },
      {
        title: 'B2B Handelsplattformen',
        description: 'Plattformen zur Verwaltung von Händler-, Lieferanten- und Kundennetzwerken.'
      },
      {
        title: 'SaaS-Infrastrukturentwicklung',
        description: 'Cloud-Software mit Multi-Tenant-Unterstützung für Abonnementmodelle.'
      },
      {
        title: 'Individuelle Softwarearchitektur',
        description: 'Maßgeschneiderte Lösungen für Geschäftsprozesse, in denen Standardsoftware nicht ausreicht.'
      },
      {
        title: 'API & Systemintegration',
        description: 'Integrationen zwischen verschiedenen Systemen (Buchhaltung, CRM, Marktplatz).'
      }
    ]
  },
  focusAreas: {
    tag: "Unser Ansatz",
    titleDesign: "Designmethodologie",
    titleCode: "Technologie-Stack",
    designFocus: [
      {
        title: 'Customer Experience (CX) Mapping',
        description: 'Wir analysieren alles, was Nutzer fühlen, denken und tun, um eine reibungslose Journey zu gestalten.',
        highlights: ['Persona-Analyse', 'Empathie-Karten', 'Pain Points', 'Lösungsvorschläge']
      },
      {
        title: 'Conversion-orientiertes UI-Design',
        description: 'Wir gestalten Oberflächen, die nicht nur gut aussehen, sondern Nutzer zu Aktionen motivieren.',
        highlights: ['Atomic Design', 'Design System', 'Barrierefreiheit', 'Mikrointeraktionen']
      },
      {
        title: 'Datengetriebene UX-Forschung',
        description: 'Wir treffen Entscheidungen anhand echter Nutzerdaten, nicht auf Basis von Annahmen.',
        highlights: ['A/B Tests', 'Heatmaps', 'Usability Tests', 'Wettbewerbsanalyse']
      }
    ],
    codeFocus: [
      {
        title: 'Erweiterte ERP-Architekturen',
        description: 'Wir bilden das Nervensystem Ihres Unternehmens und maximieren Datenintegrität und Prozessgeschwindigkeit.',
        highlights: ['Business Intelligence', 'Automatisierung', 'Modulare Struktur', 'Rollenbasierte Autorisierung']
      },
      {
        title: 'Hochskalierbare SaaS-Infrastruktur',
        description: 'Backend-Systeme für globale Märkte mit tausenden gleichzeitigen Anfragen.',
        highlights: ['Cloud-Native', 'Serverless', 'Microservices', 'Global CDN']
      },
      {
        title: 'Industrielle Softwarelösungen',
        description: 'Sichere Unternehmenssoftware, konform mit KVKK, GDPR, ISO.',
        highlights: ['Datenverschlüsselung', 'Log-Management', 'Redundanz', 'Cybersicherheit']
      }
    ]
  },
  testimonials: {
    tag: "Bewährter Erfolg",
    title: "Was unsere Partner sagen",
    descriptionDesign: "Digitale Transformationsgeschichten visionärer Marken – von Start-ups bis Konzernen.",
    descriptionCode: "Wachstumszahlen und Erfolge von Unternehmen, die unserer Technologie vertrauen.",
    designTestimonials: [
      {
        name: 'Seçil Seperci',
        role: 'CEO, RetailTech',
        company: 'E-Commerce',
        text: 'Durch die Neugestaltung der Customer Journey wurde nicht nur das Interface besser – unser Geschäftsmodell wurde schneller. Warenkorbabbrüche sanken um 25%.',
        rating: 5
      },
      {
        name: 'Mehmet Can T.',
        role: 'Produktdirektor',
        company: 'FinTech',
        text: 'Sie fanden präzise heraus, wo Nutzer Schwierigkeiten hatten. Die Product-Doctoring-Dienstleistung rettete unsere App.',
        rating: 5
      },
      {
        name: 'Elif Didem Y.',
        role: 'Marketing Managerin',
        company: 'HealthTech',
        text: 'Mit dem neuen Designsystem wurde unser Marketing doppelt so schnell. Entwickler werden nicht mehr für jede Kampagne benötigt.',
        rating: 5
      }
    ],
    codeTestimonials: [
      {
        name: 'Mehmet A.',
        role: 'CTO',
        company: 'Produktion',
        text: 'Unser ERP-System ist endlich frei von Excel-Dateien. Wir sehen alle Daten in Echtzeit und reduzierten unsere Lagerkosten um 30%.',
        rating: 5
      },
      {
        name: 'Furkan T.',
        role: 'VP Engineering',
        company: 'B2B Logistik',
        text: 'Ihre API-Infrastruktur ist so stabil, dass wir selbst an Black Friday keine Millisekunden-Verzögerung hatten.',
        rating: 5
      },
      {
        name: 'Çetin S. D.',
        role: 'Gründer',
        company: 'SaaS Start-up',
        text: 'Vom MVP bis zur Skalierung arbeiteten sie ohne technische Schulden. Unsere Tech-Architektur beeindruckte Investoren.',
        rating: 5
      }
    ]
  },
  cta: {
    titleDesign: "Bringen wir Ihre Idee auf das nächste Level",
    titleCode: "Skalieren wir Ihr Unternehmen digital",
    descDesign: "Wir gestalten nicht nur Pixel, sondern die Zukunft Ihres Unternehmens. Lassen Sie uns über Ihre Ziele sprechen.",
    descCode: "Verabschieden Sie sich von manuellen Prozessen. Steigern Sie Ihre Effizienz mit modernen Technologien.",
    btnPrimary: "Kontaktformular",
    btnSecondary: "Whatsapp",
    statProjects: "Abgeschlossene Projekte",
    statSystems: "Aktive Systeme",
    statSuccess: "Kundenzufriedenheit",
    statSupportDesign: "Design Support",
    statSupportCode: "Technischer Support"
  },
  footer: {
    brandDescDesign: "Benutzerzentriertes, datengestütztes und innovatives digitales Produktdesign.",
    brandDescCode: "Sichere und skalierbare Softwareentwicklung für komplexe Geschäftsanforderungen.",
    colServices: "Dienstleistungen",
    colCompany: "Unternehmen",
    colContact: "Kontakt",
    designServices: ['UX Audit', 'UI/UX Design', 'Produktstrategie', 'Design System', 'Growth Design'],
    codeServices: ['Individuelle ERP Software', 'B2B Portal', 'SaaS Entwicklung', 'Mobile App', 'Systemintegration'],
    companyLinks: ['Über uns', 'Arbeitsmethodik', 'Erfolgsgeschichten', 'Karriere', 'Blog'],
    copyright: "Alle Rechte vorbehalten.",
    legal: {
      copyright: "Urheberrecht",
      terms: "Nutzungsbedingungen",
      privacy: "Datenschutzerklärung",
      kvkk: "Datenschutzaufklärung",
      cookiePolicy: "Cookie-Richtlinie",
      emailLegal: "E-Mail Rechtliche Hinweise",
      cookieSettings: "Cookie-Einstellungen"
    }
  },
  notFound: {
    title: "Ups! Seite nicht gefunden",
    description: "Die gesuchte Seite wurde nicht gefunden. Sie wurde möglicherweise verschoben oder gelöscht.",
    homeBtn: "Startseite",
    hubBtn: "Blog ansehen"
  },
  hub: {
    title: "Entdecken & Lernen",
    subtitle: "Community-Projekte, ausführliche technische Artikel und interaktive Demos.",
    searchPlaceholder: "Artikel, Projekte oder Demos suchen...",
    tabs: {
      all: "Alle",
      projects: "Projekte",
      articles: "Artikel",
      demos: "Demos"
    },
    sidebar: {
      overview: "Übersicht",
      projects: "Projekte",
      articles: "Artikel",
      demos: "Demos",
      popular: "BELIEBT",
      newsletter: {
        title: "Newsletter",
        desc: "Bleiben Sie auf dem Laufenden.",
        btn: "Abonnieren"
      }
    },
    feed: {
      notFound: {
        title: "Keine Ergebnisse gefunden",
        desc: "Wir konnten keinen Inhalt für \"{term}\" finden. Bitte versuchen Sie es mit anderen Schlüsselwörtern."
      },
      examine: "Untersuchen"
    },
    detail: {
      backTo: "Zurück zur Liste",
      share: "Teilen:",
      lastUpdate: "Letzte Aktualisierung:"
    },
    loading: "Inhalte werden geladen..."
  }
};
