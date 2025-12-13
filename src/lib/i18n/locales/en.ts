import { Dictionary } from '../types';

export const en: Dictionary = {
  header: {
    menu: "Menu",
    portfolio: "Case Studies",
    services: "Our Solutions",
    about: "About Us",
    contact: "Contact",
    readyText: "Ready to bring your project to life?",
    getInTouch: "Get Free Analysis"
  },
  hero: {
    designTag: "✨ Data-Driven Product Design & Strategy",
    designTitle: ["Transforming Your Brand with", "Impactful Design", "Strategies"],
    designDesc: "We design interfaces that generate business results, not just aesthetics. We simplify product flows and create experiences that drive user loyalty.",
    designBtnPrimary: "Contact Form",
    designBtnSecondary: "Our Work",

    codeTag: "💻 Scalable Individual/Corporate Architectures",
    codeTitle: ["Future-Proof", "High-Performance", "Software"],
    codeDesc: "We build secure and modular ERP & SaaS infrastructures that keep up with your company’s growth. Simple, functional, and budget-friendly.",
    codeBtnPrimary: "Contact Form",
    codeBtnSecondary: "Our Work"
  },
  portfolio: {
    tag: "What Have We Achieved?",
    title: "Selected Case Studies",
    description: "Projects where we combine business goals with user needs through design thinking.",
    descriptionCode: "Scalable engineering solutions we delivered for complex problems in various industries.",
    viewAll: "View All Work",
    designProjects: [
      {
        title: 'Recycling Operations Panel',
        category: 'Textile Recycling ERP Software',
        description: 'End-to-end platform setup improving operational efficiency and business intelligence.',
        image: '/portfolio/22.png'
      },
      {
        title: 'Online Education Platform',
        category: 'B2C User Journey',
        description: 'Gamified, retention-focused service design.',
        image: '/portfolio/17.png'
      },
      {
        title: 'Cloud-Based SaaS',
        category: 'Dell Cloud Service',
        description: 'Scalable and consistent atomic design system enabling rapid development.',
        image: '/portfolio/18.png'
      },
      {
        title: 'Global B2C Marketplace',
        category: 'Second-Hand Ticket Sales',
        description: 'Seamless reservation experience reducing checkout abandonment rates.',
        image: '/portfolio/20.png'
      }
    ],
    codeProjects: [
      {
        title: 'Recycling Operations Panel',
        category: 'Textile Recycling ERP Software',
        description: 'End-to-end platform setup improving operational efficiency and business intelligence.',
        image: '/portfolio/22.png'
      },
      {
        title: 'Online Education Platform',
        category: 'B2C User Journey',
        description: 'Gamified, retention-focused service design.',
        image: '/portfolio/17.png'
      },
      {
        title: 'Cloud-Based SaaS',
        category: 'Dell Cloud Service',
        description: 'Scalable and consistent atomic design system enabling rapid development.',
        image: '/portfolio/18.png'
      },
      {
        title: 'Global B2C Marketplace',
        category: 'Second-Hand Ticket Sales',
        description: 'Seamless reservation experience reducing checkout abandonment rates.',
        image: '/portfolio/20.png'
      }
    ]
  },
  pricing: {
    tag: "Collaboration Models",
    title: "Choose the Right Plan",
    description: "Transparent and result-oriented software solutions tailored to your project's stage and goals.",
    descriptionCode: "Flexible software packages that scale with your business, from MVP to enterprise level.",
    learnMore: "Learn More →",
    customSolution: "Do you have a bigger vision?",
    contactUs: "Request a Custom Offer",
    forQuote: "our team will analyze your needs.",
    designPlans: [
      {
        name: 'Starter',
        price: '$999',
        period: '/ One-Time',
        label: 'Quick Start',
        description: 'For startups looking to validate their idea and enter the market quickly.',
        features: [
          'Strategic UI/UX Consulting',
          'Conversion-Focused Landing Page',
          'Responsive Design',
          '1 Year Free Service Maintenance',
        ],
        cta: 'Purchase Package',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Growth',
        price: '$1799',
        period: '+ $18 Monthly',
        label: 'Most Popular',
        description: 'For businesses looking to strengthen their digital presence and manage operations.',
        features: [
          'Multi-Page Corporate Website',
          'Custom CMS Admin Panel',
          '2 Module Integrations (CRM/HR)',
          'User Testing & Optimization',
        ],
        cta: 'Purchase Package',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Corporate Partner',
        price: '$3499',
        period: 'Starting From',
        label: 'Large-Scale Operations',
        description: 'For enterprises seeking end-to-end digital transformation.',
        features: [
          'Custom Software Architecture & API',
          'Comprehensive Market & Competitor Analysis',
          '24/7 Priority SLA Support',
          '3-Month Growth Strategy',
        ],
        cta: 'Contact Form',
        link: '#contact',
        highlighted: false
      }
    ],
    codePlans: [
      {
        name: 'Starter',
        price: '$999',
        period: '/ One-Time',
        label: 'Prototype & Demo',
        description: 'Ideal for transforming your idea into a functional product before investment.',
        features: [
          'Modern Frontend Architecture',
          'Responsive Coding',
          'Basic SEO & Performance Optimization',
          '1 Year Free Service Maintenance',
        ],
        cta: 'Purchase Package',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Scale-Up',
        price: '$1799',
        period: '+ $18 Monthly',
        label: 'High Performance',
        description: 'For businesses handling increasing traffic and seeking automation.',
        features: [
          'Custom Backend Development',
          'Advanced Admin Panel',
          '2 Third-Party Integrations',
          'Security & Backup Infrastructure',
        ],
        cta: 'Purchase Package',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Enterprise Suite',
        price: '$3499',
        period: 'Starting From',
        label: 'Full-Scale Solution',
        description: 'For mission-critical applications requiring high security and performance.',
        features: [
          'Microservices Architecture',
          'Advanced API & Integrations',
          'Load Balancing & Auto-Scaling',
          'DevOps & CI/CD Setup',
        ],
        cta: 'Meet Technical Team',
        link: '#contact',
        highlighted: false
      }
    ],
  },
  services: {
    tag: "Our Expertise",
    titleDesign: "Strategic Design",
    titleCode: "Engineering Solutions",
    descriptionDesign: "A design discipline that blends user psychology and business strategy to produce measurable outcomes.",
    descriptionCode: "Modern software engineering services built on security, speed, and sustainability.",
    loadMore: "View All Skills",
    showLess: "Show Less",
    designServices: [
      {
        title: 'Strategic UX Consulting',
        description: 'We analyze user behavior through data, increasing your product’s success rate.'
      },
      {
        title: 'Product Doctoring',
        description: 'We diagnose bottlenecks in your existing product and transform it into a high-conversion system.'
      },
      {
        title: 'Digital Product Development',
        description: 'We design high–PMF digital products from idea to launch.'
      },
      {
        title: 'Customer Journey Mapping (CJM)',
        description: 'We map every touchpoint of your users and optimize the experience.'
      },
      {
        title: 'Retention & CRM Design',
        description: 'Flows that retain users, increase loyalty, and improve LTV.'
      }
    ],
    codeServices: [
      {
        title: 'Corporate ERP Systems',
        description: 'Centralized data flow across departments with efficiency-driven management systems.'
      },
      {
        title: 'B2B Commerce Platforms',
        description: 'Platforms that manage dealer, supplier, and customer networks with complex business rules.'
      },
      {
        title: 'SaaS Infrastructure Development',
        description: 'Cloud software supporting multi-tenant subscription models.'
      },
      {
        title: 'Custom Software Architecture',
        description: 'Tailor-made solutions aligned 100% with your business when packaged software falls short.'
      },
      {
        title: 'API & System Integration',
        description: 'Integrations enabling communication between different systems (Accounting, CRM, Marketplace).'
      }
    ]
  },
  focusAreas: {
    tag: "Our Approach",
    titleDesign: "Design Methodology",
    titleCode: "Technology Stack",
    designFocus: [
      {
        title: 'Customer Experience (CX) Mapping',
        description: 'We analyze everything users feel, think, and do to design a frictionless journey.',
        highlights: ['Persona Analysis', 'Empathy Maps', 'Pain Points', 'Solution Proposals']
      },
      {
        title: 'Conversion-Focused UI Design',
        description: 'We design interfaces that not only look good but encourage user action.',
        highlights: ['Atomic Design', 'Design System', 'Accessibility', 'Micro Interactions']
      },
      {
        title: 'Data-Driven UX Research',
        description: 'We make decisions based on real user data and testing—not assumptions.',
        highlights: ['A/B Tests', 'Heatmaps', 'Usability Testing', 'Competitor Analysis']
      }
    ],
    codeFocus: [
      {
        title: 'Advanced ERP Architectures',
        description: 'We build the nervous system of your business, maximizing data integrity and process speed.',
        highlights: ['Business Intelligence', 'Automation', 'Modular Structure', 'Role-Based Authorization']
      },
      {
        title: 'High-Scale SaaS Infrastructure',
        description: 'Backend systems capable of handling thousands of concurrent requests in global markets.',
        highlights: ['Cloud-Native', 'Serverless', 'Microservices', 'Global CDN']
      },
      {
        title: 'Industrial Software Solutions',
        description: 'Secure enterprise software fully compliant with industry regulations (KVKK, GDPR, ISO).',
        highlights: ['Data Encryption', 'Log Management', 'Redundancy', 'Cybersecurity']
      }
    ]
  },
  testimonials: {
    tag: "Proven Success",
    title: "What Our Partners Say",
    descriptionDesign: "Digital transformation stories from visionary brands—from startups to enterprises.",
    descriptionCode: "Growth metrics and success stories from companies that trust our technology.",
    designTestimonials: [
      {
        name: 'Seçil Seperci',
        role: 'CEO, RetailTech',
        company: 'E-Commerce',
        text: 'They redesigned our customer journey, and not only the interface changed—our business model accelerated. Cart abandonment dropped by 25%.',
        rating: 5
      },
      {
        name: 'Mehmet Can T.',
        role: 'Product Director',
        company: 'FinTech',
        text: 'They pinpointed exactly where users were struggling using UX analytics. The product doctoring service saved our application.',
        rating: 5
      },
      {
        name: 'Elif Didem Y.',
        role: 'Marketing Manager',
        company: 'HealthTech',
        text: 'After they built our design system, our marketing team doubled its speed. We no longer wait for developers for every campaign.',
        rating: 5
      }
    ],
    codeTestimonials: [
      {
        name: 'Mehmet A.',
        role: 'CTO',
        company: 'Manufacturing',
        text: 'Our ERP system is finally free from Excel sheets. We can now see every metric in real time and reduced stock cost by 30%.',
        rating: 5
      },
      {
        name: 'Furkan T.',
        role: 'VP Engineering',
        company: 'B2B Logistics',
        text: 'Their API infrastructure is so robust that we did not experience even millisecond delays during Black Friday.',
        rating: 5
      },
      {
        name: 'Çetin S. D.',
        role: 'Founder',
        company: 'SaaS Start-up',
        text: 'From MVP to scale-up, they progressed without creating technical debt. Our tech stack impressed investors.',
        rating: 5
      }
    ]
  },
  cta: {
    titleDesign: "Let’s Take Your Idea to the Next Level",
    titleCode: "Let’s Scale Your Business Digitally",
    descDesign: "We design not only pixels but the future of your business. Let's talk about your goals.",
    descCode: "Leave manual processes behind. Take the first step toward technologies that improve efficiency.",
    btnPrimary: "Contact Form",
    btnSecondary: "Whatsapp",
    statProjects: "Completed Projects",
    statSystems: "Active Systems",
    statSuccess: "Customer Satisfaction",
    statSupportDesign: "Design Support",
    statSupportCode: "Technical Support"
  },
  footer: {
    brandDescDesign: "User-centered, data-driven, and innovative digital product design.",
    brandDescCode: "Secure and scalable engineering solutions for modern business challenges.",
    colServices: "Services",
    colCompany: "Company",
    colContact: "Contact",
    designServices: ['UX Audit', 'UI/UX Design', 'Product Strategy', 'Design System', 'Growth Design'],
    codeServices: ['Custom ERP Software', 'B2B Portal', 'SaaS Development', 'Mobile App', 'System Integration'],
    companyLinks: ['About Us', 'Our Methodology', 'Case Studies', 'Career', 'Blog'],
    copyright: "All rights reserved.",
    legal: {
      copyright: "Copyright",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      kvkk: "Personal Data Protection Notice",
      cookiePolicy: "Cookie Policy",
      emailLegal: "Email Legal Disclaimer",
      cookieSettings: "Cookie Settings"
    }
  },
  notFound: {
    title: "Oops! Page Not Found",
    description: "The page you’re looking for cannot be found. It may have been moved or deleted.",
    homeBtn: "Home",
    hubBtn: "Visit Blog"
  },
};
