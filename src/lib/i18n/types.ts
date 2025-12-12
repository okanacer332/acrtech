// --- Alt Tipler ---

export type ProjectItem = {
  title: string;
  category: string;
  description: string;
  image: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  label?: string;
  description: string;
  features: string[];
  cta: string;
  link: string;
  highlighted: boolean;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type FocusAreaItem = {
  title: string;
  description: string;
  highlights: string[];
};

export type TestimonialItem = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
};

// --- Ana Sözlük Tipi ---

export type Dictionary = {
  header: {
    menu: string;
    portfolio: string;
    services: string;
    about: string;
    contact: string;
    readyText: string;
    getInTouch: string;
  };
  hero: {
    designTag: string;
    designTitle: string[];
    designDesc: string;
    designBtnPrimary: string;
    designBtnSecondary: string;
    codeTag: string;
    codeTitle: string[];
    codeDesc: string;
    codeBtnPrimary: string;
    codeBtnSecondary: string;
  };
  portfolio: {
    tag: string;
    title: string;
    description: string;
    descriptionCode: string;
    viewAll: string;
    designProjects: ProjectItem[];
    codeProjects: ProjectItem[];
  };
  pricing: {
    tag: string;
    title: string;
    description: string;
    descriptionCode: string;
    learnMore: string;
    customSolution: string;
    contactUs: string;
    forQuote: string;
    designPlans: PricingPlan[];
    codePlans: PricingPlan[];
  };
  services: {
    tag: string;
    titleDesign: string;
    titleCode: string;
    descriptionDesign: string;
    descriptionCode: string;
    loadMore: string;
    showLess: string;
    designServices: ServiceItem[];
    codeServices: ServiceItem[];
  };
  focusAreas: {
    tag: string;
    titleDesign: string;
    titleCode: string;
    designFocus: FocusAreaItem[];
    codeFocus: FocusAreaItem[];
  };
  // YENİ EKLENENLER:
  testimonials: {
    tag: string;
    title: string;
    descriptionDesign: string;
    descriptionCode: string;
    designTestimonials: TestimonialItem[];
    codeTestimonials: TestimonialItem[];
  };
  cta: {
    titleDesign: string;
    titleCode: string;
    descDesign: string;
    descCode: string;
    btnPrimary: string;
    btnSecondary: string;
    statProjects: string;
    statSystems: string;
    statSuccess: string;
    statSupportDesign: string;
    statSupportCode: string;
  };
  footer: {
    brandDescDesign: string;
    brandDescCode: string;
    colServices: string;
    colCompany: string;
    colContact: string;
    designServices: string[];
    codeServices: string[];
    companyLinks: string[];
    copyright: string;
    privacy: string;
    terms: string;
    cookie: string;
  };
  notFound: {
    title: string;
    description: string;
    homeBtn: string;
    hubBtn: string;
  };
};