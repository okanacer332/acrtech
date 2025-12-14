import { Dictionary } from '../types';

export const es: Dictionary = {
  header: {
    menu: "Menú",
    portfolio: "Casos de Éxito",
    services: "Nuestras Soluciones",
    about: "Quiénes Somos",
    contact: "Contacto",
    readyText: "¿Listo para dar vida a tu proyecto?",
    getInTouch: "Análisis Gratis"
  },
  hero: {
    designTag: "✨ Diseño y Estrategia de Producto Basados en Datos",
    designTitle: ["Estrategias de Diseño", "Impactantes que Transforman", "Tu Marca"],
    designDesc: "Diseñamos interfaces que generan resultados reales, no solo estética. Simplificamos flujos y creamos experiencias que fomentan la lealtad del usuario.",
    designBtnPrimary: "Formulario de Contacto",
    designBtnSecondary: "Nuestros Trabajos",

    codeTag: "💻 Arquitecturas Escalables para Empresas",
    codeTitle: ["Software", "De Alto Rendimiento", "Listo para el Futuro"],
    codeDesc: "Creamos infraestructuras ERP y SaaS modulares y seguras que crecen con tu negocio. Simple, funcional y accesible.",
    codeBtnPrimary: "Formulario de Contacto",
    codeBtnSecondary: "Nuestros Trabajos"
  },
  portfolio: {
    tag: "¿Qué Hemos Logrado?",
    title: "Casos de Éxito Seleccionados",
    description: "Proyectos donde conectamos objetivos empresariales con necesidades de usuarios mediante pensamiento de diseño.",
    descriptionCode: "Soluciones de ingeniería escalables para retos complejos en múltiples sectores.",
    viewAll: "Ver Todos",
    designProjects: [
      {
        title: 'Panel de Operaciones de Reciclaje',
        category: 'ERP de Reciclaje Textil',
        description: 'Plataforma integral que mejora la eficiencia operativa y el business intelligence.',
        image: '/portfolio/22.png'
      },
      {
        title: 'Plataforma de Educación Online',
        category: 'Viaje del Usuario B2C',
        description: 'Servicio gamificado centrado en la retención.',
        image: '/portfolio/17.png'
      },
      {
        title: 'SaaS Basado en la Nube',
        category: 'Dell Cloud Service',
        description: 'Sistema de diseño atómico escalable que acelera el desarrollo.',
        image: '/portfolio/18.png'
      },
      {
        title: 'Marketplace B2C Global',
        category: 'Venta de Entradas',
        description: 'Experiencia de reserva fluida que reduce abandonos.',
        image: '/portfolio/20.png'
      }
    ],
    codeProjects: [
      {
        title: 'Panel de Operaciones de Reciclaje',
        category: 'ERP de Reciclaje Textil',
        description: 'Plataforma integral que mejora la eficiencia operativa y el business intelligence.',
        image: '/portfolio/22.png'
      },
      {
        title: 'Plataforma de Educación Online',
        category: 'Viaje del Usuario B2C',
        description: 'Servicio gamificado centrado en la retención.',
        image: '/portfolio/17.png'
      },
      {
        title: 'SaaS Basado en la Nube',
        category: 'Dell Cloud Service',
        description: 'Sistema de diseño atómico escalable que acelera el desarrollo.',
        image: '/portfolio/18.png'
      },
      {
        title: 'Marketplace B2C Global',
        category: 'Venta de Entradas',
        description: 'Experiencia de reserva fluida que reduce abandonos.',
        image: '/portfolio/20.png'
      }
    ]
  },
  pricing: {
    tag: "Modelos de Colaboración",
    title: "Elige el Plan Adecuado",
    description: "Soluciones de software transparentes y orientadas a resultados según los objetivos y etapa de tu proyecto.",
    descriptionCode: "Paquetes de software flexibles que crecen con tu empresa, desde MVP hasta nivel corporativo.",
    learnMore: "Más información →",
    customSolution: "¿Tienes una visión más grande?",
    contactUs: "Solicitar Oferta Personalizada",
    forQuote: "nuestro equipo analizará tus necesidades.",
    designPlans: [
      {
        name: 'Inicial',
        price: '$999',
        period: '/ Único Pago',
        label: 'Inicio Rápido',
        description: 'Para startups que buscan validar su idea y entrar rápido al mercado.',
        features: [
          'Consultoría Estratégica UI/UX',
          'Landing Page orientada a Conversión',
          'Diseño Responsive',
          '1 Año de Mantenimiento Gratis',
        ],
        cta: 'Comprar Plan',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Crecimiento',
        price: '$1799',
        period: '+ $18 Mensuales',
        label: 'Más Popular',
        description: 'Para empresas que desean fortalecer su presencia digital y gestionar procesos.',
        features: [
          'Sitio Web Corporativo Multi-Página',
          'Panel de Administración Personalizado (CMS)',
          '2 Integraciones (CRM/RRHH)',
          'Pruebas de Usuario & Optimización',
        ],
        cta: 'Comprar Plan',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Partner Corporativo',
        price: '$3499',
        period: 'Desde',
        label: 'Operación a Gran Escala',
        description: 'Para empresas que buscan transformación digital completa.',
        features: [
          'Arquitectura y API Personalizada',
          'Análisis de Mercado & Competencia',
          'Soporte 24/7 con SLA Prioritario',
          'Estrategia de Crecimiento 3 Meses',
        ],
        cta: 'Formulario de Contacto',
        link: '#contact',
        highlighted: false
      }
    ],
    codePlans: [
      {
        name: 'Inicial',
        price: '$999',
        period: '/ Único Pago',
        label: 'Prototipo & Demo',
        description: 'Ideal para convertir tu idea en un producto funcional antes de buscar inversión.',
        features: [
          'Arquitectura Frontend Moderna',
          'Desarrollo Responsive',
          'Optimización SEO y Rendimiento Básico',
          '1 Año de Mantenimiento Gratis',
        ],
        cta: 'Comprar Plan',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Scale-Up',
        price: '$1799',
        period: '+ $18 Mensuales',
        label: 'Alto Rendimiento',
        description: 'Para empresas con tráfico creciente y necesidad de automatización.',
        features: [
          'Desarrollo Backend Personalizado',
          'Panel Administrativo Avanzado',
          '2 Integraciones Externas',
          'Seguridad & Infraestructura de Backups',
        ],
        cta: 'Comprar Plan',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Enterprise Suite',
        price: '$3499',
        period: 'Desde',
        label: 'Solución Completa',
        description: 'Para aplicaciones críticas con alta demanda de seguridad y rendimiento.',
        features: [
          'Arquitectura de Microservicios',
          'API & Integraciones Avanzadas',
          'Load Balancing & Auto-Scaling',
          'Implementación DevOps & CI/CD',
        ],
        cta: 'Hablar con Equipo Técnico',
        link: '#contact',
        highlighted: false
      }
    ],
  },
  services: {
    tag: "Áreas de Especialización",
    titleDesign: "Diseño Estratégico",
    titleCode: "Soluciones de Ingeniería",
    descriptionDesign: "Disciplina que combina psicología del usuario y estrategia empresarial para generar resultados medibles.",
    descriptionCode: "Servicios de ingeniería moderna basados en seguridad, velocidad y escalabilidad.",
    loadMore: "Ver Todas las Habilidades",
    showLess: "Ver Menos",
    designServices: [
      {
        title: 'Consultoría UX Estratégica',
        description: 'Analizamos el comportamiento del usuario mediante datos para aumentar el éxito del producto.'
      },
      {
        title: 'Product Doctoring',
        description: 'Detectamos los puntos débiles de tu producto y lo transformamos en una solución de alto rendimiento.'
      },
      {
        title: 'Desarrollo de Productos Digitales',
        description: 'Desde la idea hasta el lanzamiento, productos con alto encaje PMF.'
      },
      {
        title: 'Customer Journey Mapping (CJM)',
        description: 'Mapeamos todos los puntos de contacto para optimizar la experiencia.'
      },
      {
        title: 'Diseño de Retención & CRM',
        description: 'Flujos centrados en retención, lealtad y aumento del LTV.'
      }
    ],
    codeServices: [
      {
        title: 'Sistemas ERP Corporativos',
        description: 'Centralizamos el flujo de datos entre departamentos para máxima eficiencia.'
      },
      {
        title: 'Plataformas de Comercio B2B',
        description: 'Gestión de redes de distribuidores, proveedores y clientes.'
      },
      {
        title: 'Desarrollo de Infraestructura SaaS',
        description: 'Software en la nube con soporte multi-tenant.'
      },
      {
        title: 'Arquitectura de Software a Medida',
        description: 'Soluciones personalizadas cuando el software estándar no es suficiente.'
      },
      {
        title: 'API & Integración de Sistemas',
        description: 'Integraciones entre sistemas como contabilidad, CRM o marketplaces.'
      }
    ]
  },
  focusAreas: {
    tag: "Nuestro Enfoque",
    titleDesign: "Metodología de Diseño",
    titleCode: "Stack Tecnológico",
    designFocus: [
      {
        title: 'Customer Experience (CX)',
        description: 'Analizamos todo lo que el usuario siente, piensa y hace para diseñar una experiencia sin fricciones.',
        highlights: ['Análisis de Personas', 'Mapas de Empatía', 'Puntos de Dolor', 'Soluciones']
      },
      {
        title: 'UI Orientado a Conversión',
        description: 'Creamos interfaces que motivan a la acción.',
        highlights: ['Atomic Design', 'Design System', 'Accesibilidad', 'Micro-interacciones']
      },
      {
        title: 'Investigación UX Basada en Datos',
        description: 'Tomamos decisiones basadas en datos reales, no en suposiciones.',
        highlights: ['A/B Tests', 'Heatmaps', 'Pruebas de Usabilidad', 'Análisis Competitivo']
      }
    ],
    codeFocus: [
      {
        title: 'Arquitecturas ERP Avanzadas',
        description: 'Construimos el “sistema nervioso” de tu empresa para máxima eficiencia.',
        highlights: ['BI', 'Automatización', 'Estructura Modular', 'Permisos por Rol']
      },
      {
        title: 'Infraestructura SaaS Escalable',
        description: 'Backend preparado para miles de solicitudes simultáneas.',
        highlights: ['Cloud-Native', 'Serverless', 'Microservicios', 'Global CDN']
      },
      {
        title: 'Software Industrial',
        description: 'Cumplimiento total con normativas KVKK, GDPR, ISO.',
        highlights: ['Encriptación', 'Gestión de Logs', 'Redundancia', 'Ciberseguridad']
      }
    ]
  },
  testimonials: {
    tag: "Éxito Comprobado",
    title: "Lo que Dicen Nuestros Socios",
    descriptionDesign: "Historias de transformación digital, desde startups hasta grandes corporaciones.",
    descriptionCode: "Resultados y métricas de empresas que confían en nuestra tecnología.",
    designTestimonials: [
      {
        name: 'Seçil Seperci',
        role: 'CEO, RetailTech',
        company: 'E-Commerce',
        text: 'Después de rediseñar el journey del cliente, no solo cambió la interfaz: nuestro modelo de negocio se aceleró. Abandonos del carrito bajaron 25%.',
        rating: 5
      },
      {
        name: 'Mehmet Can T.',
        role: 'Director de Producto',
        company: 'FinTech',
        text: 'Encontraron exactamente dónde los usuarios tenían dificultades. El Product Doctoring salvó nuestra app.',
        rating: 5
      },
      {
        name: 'Elif Didem Y.',
        role: 'Marketing Manager',
        company: 'HealthTech',
        text: 'Con el nuevo design system, nuestro equipo de marketing duplicó su velocidad. Ya no dependemos de desarrolladores.',
        rating: 5
      }
    ],
    codeTestimonials: [
      {
        name: 'Mehmet A.',
        role: 'CTO',
        company: 'Manufactura',
        text: 'Nuestro ERP dejó atrás Excel. Ahora vemos todo en tiempo real y redujimos costos de inventario en 30%.',
        rating: 5
      },
      {
        name: 'Furkan T.',
        role: 'VP Engineering',
        company: 'B2B Logística',
        text: 'La infraestructura API es tan sólida que ni siquiera en Black Friday tuvimos retrasos.',
        rating: 5
      },
      {
        name: 'Çetin S. D.',
        role: 'Fundador',
        company: 'SaaS Start-up',
        text: 'Crecimos desde MVP hasta scale-up sin deuda técnica. Impresionamos a los inversores.',
        rating: 5
      }
    ]
  },
  cta: {
    titleDesign: "Llevemos tu idea al siguiente nivel",
    titleCode: "Escalemos tu negocio digitalmente",
    descDesign: "Diseñamos no solo píxeles, sino el futuro de tu negocio.",
    descCode: "Olvídate de los procesos manuales. Empieza a adoptar tecnologías para la eficiencia.",
    btnPrimary: "Formulario de Contacto",
    btnSecondary: "Whatsapp",
    statProjects: "Proyectos Completados",
    statSystems: "Sistemas Activos",
    statSuccess: "Satisfacción del Cliente",
    statSupportDesign: "Soporte de Diseño",
    statSupportCode: "Soporte Técnico"
  },
  footer: {
    brandDescDesign: "Diseño digital innovador, centrado en el usuario y basado en datos.",
    brandDescCode: "Soluciones de ingeniería seguras y escalables para empresas modernas.",
    colServices: "Servicios",
    colCompany: "Empresa",
    colContact: "Contacto",
    designServices: ['UX Audit', 'UI/UX Diseño', 'Estrategia de Producto', 'Design System', 'Growth Design'],
    codeServices: ['ERP Personalizado', 'Portal B2B', 'Desarrollo SaaS', 'App Móvil', 'Integración de Sistemas'],
    companyLinks: ['Quiénes Somos', 'Nuestra Metodología', 'Casos de Éxito', 'Carrera', 'Blog'],
    copyright: "Todos los derechos reservados.",
    legal: {
      copyright: "Derechos de Autor",
      terms: "Términos de Uso",
      privacy: "Política de Privacidad",
      kvkk: "Aviso de Protección de Datos",
      cookiePolicy: "Política de Cookies",
      emailLegal: "Aviso Legal por Correo",
      cookieSettings: "Configuración de Cookies"
    }
  },
  notFound: {
    title: "Oops! Página no encontrada",
    description: "La página que buscas no existe o fue eliminada.",
    homeBtn: "Inicio",
    hubBtn: "Ver Blog"
  },
  hub: {
    title: "Descubrir y Aprender",
    subtitle: "Proyectos de la comunidad, artículos técnicos detallados y demostraciones interactivas.",
    searchPlaceholder: "Buscar artículos, proyectos o demostraciones...",
    tabs: {
      all: "Todo",
      projects: "Proyectos",
      articles: "Artículos",
      demos: "Demos"
    },
    sidebar: {
      overview: "Resumen",
      projects: "Proyectos",
      articles: "Artículos",
      demos: "Demos",
      popular: "POPULAR",
      newsletter: {
        title: "Boletín",
        desc: "Mantente actualizado con las últimas novedades.",
        btn: "Suscribirse"
      }
    },
    feed: {
      notFound: {
        title: "No se encontraron resultados",
        desc: "No pudimos encontrar contenido para \"{term}\". Por favor, prueba con otras palabras clave."
      },
      examine: "Examinar"
    },
    detail: {
      backTo: "Volver a la lista",
      share: "Compartir:",
      lastUpdate: "Última actualización:"
    },
    loading: "Cargando contenido..."
  }
};
