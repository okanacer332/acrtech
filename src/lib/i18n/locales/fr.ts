import { Dictionary } from '../types';

export const fr: Dictionary = {
  header: {
    menu: "Menu",
    portfolio: "Études de cas",
    services: "Nos solutions",
    about: "À propos",
    contact: "Contact",
    readyText: "Prêt à donner vie à votre projet ?",
    getInTouch: "Analyse gratuite"
  },
  hero: {
    designTag: "✨ Design produit & stratégie basés sur les données",
    designTitle: ["Stratégies design", "Efficaces et", "Renforçant la marque"],
    designDesc: "Nous concevons des interfaces orientées business, pas seulement esthétiques. Nous simplifions les parcours produits et créons des expériences qui favorisent la fidélité.",
    designBtnPrimary: "Formulaire de contact",
    designBtnSecondary: "Voir les projets",

    codeTag: "💻 Architectures évolutives pour entreprises",
    codeTitle: ["Logiciels performants", "Fiables et", "Durables"],
    codeDesc: "Nous développons des infrastructures ERP & SaaS sécurisées et modulaires, capables de grandir avec votre entreprise. Simples, efficaces et rentables.",
    codeBtnPrimary: "Formulaire de contact",
    codeBtnSecondary: "Voir les projets"
  },
  portfolio: {
    tag: "Ce que nous avons accompli",
    title: "Études de cas sélectionnées",
    description: "Des projets où nous alignons objectifs business et besoins utilisateurs grâce au design thinking.",
    descriptionCode: "Des solutions techniques évolutives pour des défis complexes et multisectoriels.",
    viewAll: "Tous les projets",
    designProjects: [
      {
        title: 'Panneau de gestion du recyclage',
        category: 'ERP de recyclage textile',
        description: 'Plateforme end-to-end améliorant l’efficacité opérationnelle et la Business Intelligence.',
        image: '/portfolio/22.png',
        link: '/hub/demos/recyclage-textile-erp-international'
      },
      {
        title: 'Plateforme d’apprentissage en ligne',
        category: 'Parcours utilisateur B2C',
        description: 'Service gamifié conçu pour maximiser l’engagement.',
        image: '/portfolio/17.png',
        link: '/hub/projects/achat-vente-billets-seconde-main-b2c-mondial'
      },
      {
        title: 'SaaS basé sur le cloud',
        category: 'Dell Cloud Service',
        description: 'Design system atomique et évolutif pour accélérer le développement.',
        image: '/portfolio/18.png',
        link: '/hub/projects/dell-cloud-service-systeme-de-conception-atomique'
      },
      {
        title: 'Marketplace B2C mondiale',
        category: 'Revente de billets',
        description: 'Expérience de réservation fluide réduisant les abandons.',
        image: '/portfolio/20.png',
        link: '/hub/projects/education-en-ligne-b2c-parcours-utilisateur-gamification'
      }
    ],
    codeProjects: [
      {
        title: 'Panneau de gestion du recyclage',
        category: 'ERP de recyclage textile',
        description: 'Plateforme end-to-end améliorant l’efficacité opérationnelle et la Business Intelligence.',
        image: '/portfolio/22.png',
        link: '/hub/demos/recyclage-textile-erp-international'
      },
      {
        title: 'Plateforme d’apprentissage en ligne',
        category: 'Parcours utilisateur B2C',
        description: 'Service gamifié conçu pour maximiser l’engagement.',
        image: '/portfolio/17.png',
        link: '/hub/projects/achat-vente-billets-seconde-main-b2c-mondial'
      },
      {
        title: 'SaaS basé sur le cloud',
        category: 'Dell Cloud Service',
        description: 'Design system atomique et évolutif pour accélérer le développement.',
        image: '/portfolio/18.png',
        link: '/hub/projects/dell-cloud-service-systeme-de-conception-atomique'
      },
      {
        title: 'Marketplace B2C mondiale',
        category: 'Revente de billets',
        description: 'Expérience de réservation fluide réduisant les abandons.',
        image: '/portfolio/20.png',
        link: '/hub/projects/education-en-ligne-b2c-parcours-utilisateur-gamification'
      }
    ]
  },
  pricing: {
    tag: "Modèles de collaboration",
    title: "Choisissez le plan adapté",
    description: "Des solutions logicielles transparentes et orientées résultats, adaptées à votre phase de projet.",
    descriptionCode: "Des forfaits de développement flexibles qui évoluent avec votre entreprise – du MVP à l’Enterprise.",
    learnMore: "En savoir plus →",
    customSolution: "Un projet plus ambitieux ?",
    contactUs: "Demander une offre personnalisée",
    forQuote: "notre équipe analysera vos besoins.",
    designPlans: [
      {
        name: 'Starter',
        price: '$999',
        period: '/ Unique',
        label: 'Démarrage rapide',
        description: 'Pour les start-ups souhaitant valider leur idée et lancer rapidement.',
        features: [
          'Consultation stratégique UI/UX',
          'Landing page optimisée conversion',
          'Design responsive',
          '1 an de support gratuit',
        ],
        cta: 'Acheter le plan',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Croissance',
        price: '$1799',
        period: '+ $18 / mois',
        label: 'Le plus populaire',
        description: 'Pour les entreprises développant leur présence digitale et leurs opérations.',
        features: [
          'Site corporate multipage',
          'Panneau CMS personnalisé',
          '2 intégrations modules (CRM/HR)',
          'Tests utilisateurs & optimisation',
        ],
        cta: 'Acheter le plan',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Partenaire Enterprise',
        price: '$3499',
        period: 'À partir de',
        label: 'Grandes entreprises',
        description: 'Pour les organisations avec besoins complexes et transformation digitale.',
        features: [
          'Architecture & API personnalisées',
          'Analyse marché & concurrence',
          'Support SLA prioritaire 24/7',
          'Stratégie croissance sur 3 mois',
        ],
        cta: 'Formulaire de contact',
        link: '#contact',
        highlighted: false
      }
    ],
    codePlans: [
      {
        name: 'Starter',
        price: '$999',
        period: '/ Unique',
        label: 'Prototype & Démo',
        description: 'Idéal pour transformer votre idée en prototype avant l’investissement.',
        features: [
          'Architecture frontend moderne',
          'Développement responsive',
          'SEO & performance basiques',
          '1 an de support gratuit',
        ],
        cta: 'Acheter le plan',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Scale-Up',
        price: '$1799',
        period: '+ $18 / mois',
        label: 'Haute performance',
        description: 'Pour les entreprises avec trafic croissant et besoins d’automatisation.',
        features: [
          'Développement backend personnalisé',
          'Panneau admin avancé',
          '2 intégrations externes',
          'Infrastructure sécurité & backup',
        ],
        cta: 'Acheter le plan',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Suite Enterprise',
        price: '$3499',
        period: 'À partir de',
        label: 'Solution complète',
        description: 'Pour les applications critiques nécessitant sécurité et performance élevées.',
        features: [
          'Architecture microservices',
          'API étendues & intégrations',
          'Load balancing & auto-scaling',
          'DevOps & CI/CD',
        ],
        cta: 'Contacter l’équipe technique',
        link: '#contact',
        highlighted: false
      }
    ],
  },
  services: {
    tag: "Nos expertises",
    titleDesign: "Design stratégique",
    titleCode: "Solutions d’ingénierie",
    descriptionDesign: "Une discipline reliant psychologie utilisateur et stratégie business pour des résultats mesurables.",
    descriptionCode: "Développement moderne axé sur la sécurité, la rapidité et la durabilité.",
    loadMore: "Voir toutes les compétences",
    showLess: "Voir moins",
    designServices: [
      {
        title: 'Conseil UX stratégique',
        description: 'Nous analysons le comportement utilisateur sur base de données pour augmenter la réussite produit.'
      },
      {
        title: 'Product Doctoring',
        description: 'Nous identifions les points faibles du produit et optimisons sa conversion.'
      },
      {
        title: 'Développement de produits digitaux',
        description: 'De l’idée au lancement – des produits avec un Product-Market Fit solide.'
      },
      {
        title: 'Customer Journey Mapping (CJM)',
        description: 'Nous analysons chaque point de contact entre vos utilisateurs et votre service.'
      },
      {
        title: 'Design de fidélisation & CRM',
        description: 'Parcours qui améliorent la rétention et augmentent le LTV.'
      }
    ],
    codeServices: [
      {
        title: 'Systèmes ERP pour entreprises',
        description: 'Centralisation du flux de données entre départements pour maximiser l’efficacité.'
      },
      {
        title: 'Plates-formes B2B',
        description: 'Solutions pour gérer réseaux de revendeurs, fournisseurs et clients.'
      },
      {
        title: 'Développement d’infrastructures SaaS',
        description: 'Solutions cloud avec support multi-tenant.'
      },
      {
        title: 'Architecture logicielle sur mesure',
        description: 'Solutions dédiées pour processus métiers complexes.'
      },
      {
        title: 'API & intégration de systèmes',
        description: 'Intégrations entre systèmes (comptabilité, CRM, marketplace).'
      }
    ]
  },
  focusAreas: {
    tag: "Notre approche",
    titleDesign: "Méthodologie de design",
    titleCode: "Stack technologique",
    designFocus: [
      {
        title: 'Customer Experience (CX)',
        description: 'Nous analysons ce que les utilisateurs ressentent, pensent et font pour concevoir un parcours parfait.',
        highlights: ['Personas', 'Cartes d’empathie', 'Pain points', 'Solutions']
      },
      {
        title: 'UI orientée conversion',
        description: 'Des interfaces esthétiques mais surtout efficaces et motivantes.',
        highlights: ['Atomic Design', 'Design System', 'Accessibilité', 'Micro-interactions']
      },
      {
        title: 'Recherche UX basée données',
        description: 'Nos décisions s’appuient sur des données réelles, pas des suppositions.',
        highlights: ['Tests A/B', 'Heatmaps', 'Tests utilisateur', 'Analyse concurrence']
      }
    ],
    codeFocus: [
      {
        title: 'Architectures ERP avancées',
        description: 'Nous construisons le système nerveux de votre entreprise pour maximiser intégrité et vitesse.',
        highlights: ['Business Intelligence', 'Automatisation', 'Modules', 'Autorisations basées rôles']
      },
      {
        title: 'Infrastructure SaaS scalable',
        description: 'Systèmes backend capables de gérer des milliers de requêtes simultanées.',
        highlights: ['Cloud-Native', 'Serverless', 'Microservices', 'CDN global']
      },
      {
        title: 'Solutions logicielles industrielles',
        description: 'Systèmes sécurisés conformes à KVKK, RGPD, ISO.',
        highlights: ['Chiffrement', 'Gestion logs', 'Redondance', 'Cybersécurité']
      }
    ]
  },
  testimonials: {
    tag: "Succès avéré",
    title: "Ce que disent nos partenaires",
    descriptionDesign: "Histoires de transformation digitale – des start-ups aux grandes entreprises.",
    descriptionCode: "Données de croissance des entreprises utilisant nos solutions.",
    designTestimonials: [
      {
        name: 'Seçil Seperci',
        role: 'CEO, RetailTech',
        company: 'E-Commerce',
        text: 'La refonte du parcours client a accéléré non seulement l’interface, mais aussi notre modèle économique. Abandons panier réduits de 25%.',
        rating: 5
      },
      {
        name: 'Mehmet Can T.',
        role: 'Directeur Produit',
        company: 'FinTech',
        text: 'Ils ont identifié précisément où les utilisateurs rencontraient des obstacles. Leur “Product Doctoring” a sauvé notre application.',
        rating: 5
      },
      {
        name: 'Elif Didem Y.',
        role: 'Responsable Marketing',
        company: 'HealthTech',
        text: 'Avec le nouveau Design System, nos opérations marketing sont deux fois plus rapides. Les développeurs ne sont plus requis pour chaque campagne.',
        rating: 5
      }
    ],
    codeTestimonials: [
      {
        name: 'Mehmet A.',
        role: 'CTO',
        company: 'Manufacture',
        text: 'Nous sommes enfin libérés des fichiers Excel. Données en temps réel et 30% de réduction sur les coûts de stockage.',
        rating: 5
      },
      {
        name: 'Furkan T.',
        role: 'VP Engineering',
        company: 'Logistique B2B',
        text: 'Notre infrastructure API est si stable qu’aucun ralentissement n’a été enregistré même lors du Black Friday.',
        rating: 5
      },
      {
        name: 'Çetin S. D.',
        role: 'Fondateur',
        company: 'SaaS Startup',
        text: 'Du MVP au scale-up, aucune dette technique. Notre architecture a impressionné les investisseurs.',
        rating: 5
      }
    ]
  },
  cta: {
    titleDesign: "Faisons passer votre idée au niveau supérieur",
    titleCode: "Faisons évoluer votre entreprise",
    descDesign: "Nous ne créons pas seulement des pixels — nous construisons l’avenir de votre entreprise.",
    descCode: "Éliminez les processus manuels. Améliorez votre efficacité avec des technologies modernes.",
    btnPrimary: "Formulaire de contact",
    btnSecondary: "Whatsapp",
    statProjects: "Projets réalisés",
    statSystems: "Systèmes actifs",
    statSuccess: "Satisfaction client",
    statSupportDesign: "Support design",
    statSupportCode: "Support technique"
  },
  footer: {
    brandDescDesign: "Design produit innovant et centré utilisateur.",
    brandDescCode: "Développement logiciel sécurisé et évolutif pour besoins complexes.",
    colServices: "Services",
    colCompany: "Entreprise",
    colContact: "Contact",
    designServices: ['Audit UX', 'UI/UX Design', 'Stratégie Produit', 'Design System', 'Growth Design'],
    codeServices: ['ERP sur mesure', 'Portail B2B', 'Développement SaaS', 'Application mobile', 'Intégration systèmes'],
    companyLinks: ['À propos', 'Méthodologie', 'Études de cas', 'Carrière', 'Blog'],
    copyright: "Tous droits réservés.",
    legal: {
      copyright: "Droits d'auteur",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      kvkk: "Notice de protection des données",
      cookiePolicy: "Politique relative aux cookies",
      emailLegal: "Mentions légales e-mail",
      cookieSettings: "Paramètres des cookies"
    }
  },
  notFound: {
    title: "Oups ! Page introuvable",
    description: "La page que vous recherchez est introuvable. Elle a peut-être été déplacée ou supprimée.",
    homeBtn: "Page d’accueil",
    hubBtn: "Voir le blog"
  },
  hub: {
    title: "Découvrir & Apprendre",
    subtitle: "Projets communautaires, articles techniques approfondis et démos interactives.",
    searchPlaceholder: "Rechercher des articles, projets ou démos...",
    tabs: {
      all: "Tout",
      projects: "Projets",
      articles: "Articles",
      demos: "Démos"
    },
    sidebar: {
      overview: "Aperçu",
      projects: "Projets",
      articles: "Articles",
      demos: "Démos",
      popular: "POPULAIRE",
      newsletter: {
        title: "Newsletter",
        desc: "Restez informé des dernières mises à jour.",
        btn: "S'abonner"
      }
    },
    feed: {
      notFound: {
        title: "Aucun résultat trouvé",
        desc: "Nous n'avons trouvé aucun contenu pour \"{term}\". Veuillez essayer d'autres mots-clés."
      },
      examine: "Examiner"
    },
    detail: {
      backTo: "Retour à la liste",
      share: "Partager :",
      lastUpdate: "Dernière mise à jour :"
    },
    loading: "Chargement du contenu..."
  }
};
