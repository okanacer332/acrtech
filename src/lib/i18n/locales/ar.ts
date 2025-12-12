// src/lib/i18n/locales/tr.ts

import { Dictionary } from '../types';

export const ar: Dictionary = {
  header: {
    menu: "Menü",
    portfolio: "Başarı Hikayeleri",
    services: "Çözümlerimiz",
    about: "Biz Kimiz",
    contact: "Bize Ulaşın",
    readyText: "Projenizi hayata geçirmeye hazır mısınız?",
    getInTouch: "Ücretsiz Analiz Al"
  },
  hero: {
    designTag: "✨ Veri Odaklı Ürün Tasarımı & Strateji",
    designTitle: ["Markanızı Dönüştüren", "Etkili Tasarım", "Stratejileri"],
    designDesc: "Sadece estetik değil, iş sonuçları üreten arayüzler tasarlıyoruz. Ürün akışlarını sadeleştirip, kullanıcı sadakati yaratan deneyimler kurguluyoruz.",
    designBtnPrimary: "İletişim Formu",
    designBtnSecondary: "İşlerimiz",
    
    codeTag: "💻 Ölçeklenebilir Bireysel/Kurumsal Mimariler",
    codeTitle: ["Geleceğe Hazır", "Yüksek Performanslı", "Yazılımlar"],
    codeDesc: "İşletmenizin büyüme hızına ayak uyduran, güvenli ve modüler ERP & SaaS altyapıları inşa ediyoruz. Basit, işlevsel ve aynı zamanda bütçenize de uygun!",
    codeBtnPrimary: "İletişim Formu",
    codeBtnSecondary: "İşlerimiz"
  },
  portfolio: {
    tag: "Neler Başardık?",
    title: "Seçilmiş Başarı Hikayeleri",
    description: "Tasarım odaklı düşünce yapımızla, iş hedeflerini kullanıcı ihtiyaçlarıyla buluşturduğumuz projeler.",
    descriptionCode: "Farklı sektörlerin en karmaşık problemlerine getirdiğimiz, ölçeklenebilir mühendislik çözümleri.",
    viewAll: "Tüm İşleri Gör",
    designProjects: [
      {
        title: 'Geri Dönüşüm Operasyon Paneli',
        category: 'Tekstil Geri Dönüşüm ERP Yazılımı',
        description: 'Operasyonel verimliliği artıran, iş zekasını yükselten, uçtan uca platform kurulumu',
        image: '/portfolio/22.png'
      },
      {
        title: 'Online Eğitim Platformu',
        category: 'B2C Kullanıcı Yolculuğu',
        description: 'Kullanıcı tutundurma (retention) odaklı, oyunlaştırılmış servis tasarımı.',
        image: '/portfolio/17.png'
      },
      {
        title: 'Bulut Tabanlı SaaS',
        category: 'Dell Cloud Service',
        description: 'Hızlı geliştirme sağlayan, ölçeklenebilir ve tutarlı atomik tasarım sistemi.',
        image: '/portfolio/18.png'
      },
      {
        title: 'Global B2C Pazaryeri',
        category: '2. El Bilet Alım Satım',
        description: 'Satın alma hunisindeki terk oranlarını düşüren, akıcı rezervasyon deneyimi.',
        image: '/portfolio/20.png'
      }
    ],
    codeProjects: [
      {
        title: 'Geri Dönüşüm Operasyon Paneli',
        category: 'Tekstil Geri Dönüşüm ERP Yazılımı',
        description: 'Operasyonel verimliliği artıran, iş zekasını yükselten, uçtan uca platform kurulumu',
        image: '/portfolio/22.png'
      },
      {
        title: 'Online Eğitim Platformu',
        category: 'B2C Kullanıcı Yolculuğu',
        description: 'Kullanıcı tutundurma (retention) odaklı, oyunlaştırılmış servis tasarımı.',
        image: '/portfolio/17.png'
      },
      {
        title: 'Bulut Tabanlı SaaS',
        category: 'Dell Cloud Service',
        description: 'Hızlı geliştirme sağlayan, ölçeklenebilir ve tutarlı atomik tasarım sistemi.',
        image: '/portfolio/18.png'
      },
      {
        title: 'Global B2C Pazaryeri',
        category: '2. El Bilet Alım Satım',
        description: 'Satın alma hunisindeki terk oranlarını düşüren, akıcı rezervasyon deneyimi.',
        image: '/portfolio/20.png'
      }
    ]
  },
  pricing: {
    tag: "İş Birliği Modelleri",
    title: "Size Uygun Planı Seçin",
    description: "Projenizin aşamasına ve hedeflerinize özel, şeffaf ve sonuç odaklı yazılım çözümleri",
    descriptionCode: "MVP'den Holding seviyesine kadar, işletmenizle birlikte büyüyen esnek yazılım paketleri.",
    learnMore: "Bu paketin detayları →",
    customSolution: "Daha büyük bir vizyonunuz mu var?",
    contactUs: "Özel Teklif İsteyin",
    forQuote: "ekibimiz ihtiyaçlarınızı analiz etsin.",
    designPlans: [
      {
        name: 'Başlangıç',
        price: '$999',
        period: '/ Tek Seferlik',
        label: 'Hızlı Başlangıç',
        description: 'Fikrini doğrulamak ve pazara hızlı girmek isteyen girişimler için.',
        features: [
          'Stratejik UI/UX Danışmanlığı',
          'Dönüşüm Odaklı Landing Page',
          'Mobil Uyumlu (Responsive) Tasarım',
          'İlk Yıl Servis Bakımı Ücretsiz',
        ],
        cta: 'Paketi Satın Al',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Büyüme (Growth)',
        price: '$1799',
        period: ' + 18$ Aylık',
        label: 'En Çok Tercih Edilen',
        description: 'Dijital varlığını güçlendirmek ve operasyonel süreçleri yönetmek isteyen şirketler için.',
        features: [
          'Çok Sayfalı Kurumsal Web Platformu',
          'Özel Geliştirilmiş Yönetim Paneli (CMS)',
          '2 Adet Modül Entegrasyonu (CRM/İK)',
          'Kullanıcı Testleri & İyileştirme',
        ],
        cta: 'Paketi Satın Al',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Kurumsal Partner',
        price: '$3499',
        period: '/Başlayan Fiyatlarla',
        label: 'Büyük Ölçekli Operasyon',
        description: 'Karmaşık iş süreçlerine sahip, uçtan uca dijital dönüşüm arayan kurumlar için.',
        features: [
          'Özel Yazılım Mimarisi & API',
          'Kapsamlı Pazar & Rakip Analizi',
          '7/24 Öncelikli SLA Desteği',
          '3 Aylık Büyüme Stratejisi',
        ],
        cta: 'İletişim Formu',
        link: '#contact',
        highlighted: false
      }
    ],
    codePlans: [
      {
        name: 'Başlangıç',
        price: '$999',
        period: '/Tek Seferlik',
        label: 'Prototip & Demo',
        description: 'Yatırım öncesi fikrinizi çalışan bir ürüne dönüştürmek için ideal.',
        features: [
          'Modern Frontend Mimarisi',
          'Mobil Uyumlu (Responsive) Kodlama',
          'Temel SEO & Performans Optimizasyonu',
          'İlk Yıl Servis Bakımı Ücretsiz',
        ],
        cta: 'Paketi Satın Al',
        link: '#contact',
        highlighted: false
      },
      {
        name: 'Scale-Up',
        price: '$1799',
        period: '+ 18$ Aylık',
        label: 'Yüksek Performans',
        description: 'Trafiği artan ve süreçlerini otomatize etmek isteyen işletmeler için.',
        features: [
          'Özel Backend Geliştirme',
          'Gelişmiş Yönetim Paneli (Admin)',
          '2 Harici Servis Entegrasyonu',
          'Güvenlik & Yedekleme Altyapısı',
        ],
        cta: 'Paketi Satın Al',
        link: '#contact',
        highlighted: true
      },
      {
        name: 'Enterprise Suite',
        price: '$3499',
        period: '/Başlayan Fiyatlarla',
        label: 'Tam Ölçekli Çözüm',
        description: 'Yüksek güvenlik ve performans gerektiren kritik iş uygulamaları için.',
        features: [
          'Mikro-servis Mimarisi',
          'Gelişmiş API & Entegrasyonlar',
          'Load Balancing & Auto-Scaling',
          'DevOps & CI/CD Kurulumu',
        ],
        cta: 'Teknik Ekiple Görüş',
        link: '#contact',
        highlighted: false
      }
    ],
  },
  services: {
    tag: "Uzmanlık Alanlarımız",
    titleDesign: "Stratejik Tasarım",
    titleCode: "Mühendislik Çözümleri",
    descriptionDesign: "Kullanıcı psikolojisi ve iş stratejisini birleştiren, ölçülebilir sonuçlar üreten tasarım disiplini.",
    descriptionCode: "Güvenlik, hız ve sürdürülebilirlik üzerine kurulu, modern yazılım mühendisliği hizmetleri.",
    loadMore: "Tüm Yetenekleri Gör",
    showLess: "Daha Az Göster",
    designServices: [
      {
        title: 'Stratejik UX Danışmanlığı',
        description: 'Veri analizi ile kullanıcı davranışlarını çözümlüyor, ürününüzün başarı şansını artırıyoruz.'
      },
      {
        title: 'Product Doctoring (İyileştirme)',
        description: 'Mevcut ürününüzün darboğazlarını tespit edip, modern ve yüksek dönüşümlü bir yapıya kavuşturuyoruz.'
      },
      {
        title: 'Dijital Ürün Geliştirme',
        description: 'Fikirden lansmana kadar, pazar uyumu (PMF) yüksek dijital ürünler tasarlıyoruz.'
      },
      {
        title: 'Müşteri Yolculuğu (CJM)',
        description: 'Kullanıcının markanızla temas ettiği her noktayı haritalandırıp, deneyimi optimize ediyoruz.'
      },
      {
        title: 'Retention & CRM Tasarımı',
        description: 'Kullanıcıyı sistemde tutan, sadakati artıran ve LTV (Yaşam Boyu Değer) odaklı akışlar.'
      }
    ],
    codeServices: [
      {
        title: 'Kurumsal ERP Sistemleri',
        description: 'Departmanlar arası veri akışını tek merkezde toplayan, verimlilik odaklı yönetim sistemleri.'
      },
      {
        title: 'B2B Ticaret Platformları',
        description: 'Bayi, tedarikçi ve müşteri ağınızı yönetebileceğiniz, karmaşık iş kurallarına uygun platformlar.'
      },
      {
        title: 'SaaS Altyapı Geliştirme',
        description: 'Abonelik modeline uygun, çoklu kullanıcı (multi-tenant) destekli bulut yazılımları.'
      },
      {
        title: 'Özel Yazılım Mimarisi',
        description: 'Paket programların yetersiz kaldığı noktalarda, işinize %100 uyumlu terzi işi çözümler.'
      },
      {
        title: 'API & Sistem Entegrasyonu',
        description: 'Farklı yazılımların (Muhasebe, CRM, Pazaryeri) birbiriyle konuşmasını sağlayan entegrasyonlar.'
      }
    ]
  },
  focusAreas: {
    tag: "Yaklaşımımız",
    titleDesign: "Tasarım Metodolojimiz",
    titleCode: "Teknoloji Yığınımız",
    designFocus: [
      {
        title: 'Müşteri Deneyimi (CX) Haritalama',
        description: 'Kullanıcının hissettiği, düşündüğü ve yaptığı her şeyi analiz ederek, pürüzsüz bir deneyim yolu çiziyoruz.',
        highlights: ['Persona Analizi', 'Empati Haritaları', 'Acı Noktaları (Pain Points)', 'Çözüm Önerileri']
      },
      {
        title: 'Dönüşüm Odaklı UI Tasarımı',
        description: 'Sadece güzel görünen değil, kullanıcının aksiyon almasını sağlayan (Click-through) arayüzler tasarlıyoruz.',
        highlights: ['Atomik Tasarım', 'Design System', 'Erişilebilirlik', 'Mikro Etkileşimler']
      },
      {
        title: 'Veri Odaklı UX Araştırması',
        description: 'Varsayımlarla değil, gerçek kullanıcı verileri ve testlerle kararlar alıyoruz.',
        highlights: ['A/B Testleri', 'Isı Haritaları', 'Kullanılabilirlik Testi', 'Rakip Analizi']
      }
    ],
    codeFocus: [
      {
        title: 'Gelişmiş ERP Mimarileri',
        description: 'İşletmenizin sinir sistemini oluşturuyor, veri bütünlüğünü ve süreç hızını maksimize ediyoruz.',
        highlights: ['İş Zekası (BI)', 'Otomasyon', 'Modüler Yapı', 'Rol Tabanlı Yetkilendirme']
      },
      {
        title: 'Yüksek Ölçekli SaaS Altyapısı',
        description: 'Global pazarda rekabet edebilecek, binlerce anlık isteği karşılayan sağlam backend yapıları.',
        highlights: ['Cloud-Native', 'Serverless', 'Microservices', 'Global CDN']
      },
      {
        title: 'Endüstriyel Yazılım Çözümleri',
        description: 'Sektör regülasyonlarına (KVKK, GDPR, ISO) tam uyumlu, güvenli kurumsal yazılımlar.',
        highlights: ['Veri Şifreleme', 'Log Yönetimi', 'Yedeklilik', 'Siber Güvenlik']
      }
    ]
  },
  testimonials: {
    tag: "Kanıtlanmış Başarı",
    title: "İş Ortaklarımız Ne Diyor?",
    descriptionDesign: "Start-up'lardan holdinglere, vizyoner markaların dijital dönüşüm hikayeleri.",
    descriptionCode: "Teknolojimize güvenen işletmelerin büyüme rakamları ve başarıları.",
    designTestimonials: [
      {
        name: 'Seçil Seperci',
        role: 'CEO, RetailTech',
        company: 'E-Ticaret',
        text: 'Müşteri yolculuğunu yeniden kurguladıklarında sadece arayüz değişmedi, iş modelimiz hızlandı. Sepet terk oranlarımız %25 düştü.',
        rating: 5
      },
      {
        name: 'Mehmet Can T.',
        role: 'Ürün Direktörü',
        company: 'FinTech',
        text: 'Kullanıcıların nerede takıldığını UX analizleriyle nokta atışı buldular. Ürün doktorluğu hizmeti, uygulamamızı kurtardı.',
        rating: 5
      },
      {
        name: 'Elif Didem Y.',
        role: 'Pazarlama Müdürü',
        company: 'HealthTech',
        text: 'Tasarım sistemini kurduklarında pazarlama ekibi olarak hızımız 2 katına çıktı. Artık her kampanya için yazılımcı beklemek zorunda değiliz.',
        rating: 5
      }
    ],
    codeTestimonials: [
      {
        name: 'Mehmet A.',
        role: 'CTO',
        company: 'Üretim Sanayi',
        text: 'ERP sistemimiz artık Excel dosyalarından kurtuldu. Fabrikadaki her veriyi anlık görebiliyoruz, stok maliyetimiz %30 azaldı.',
        rating: 5
      },
      {
        name: 'Furkan T.',
        role: 'VP Engineering',
        company: 'B2B Lojistik',
        text: 'Geliştirdikleri API altyapısı o kadar sağlam ki, Black Friday döneminde bile milisaniyelik gecikme yaşamadık.',
        rating: 5
      },
      {
        name: 'Çetin S. D.',
        role: 'Kurucu',
        company: 'SaaS Start-up',
        text: 'MVP sürecinden scale-up aşamasına kadar teknik borç yaratmadan ilerlediler. Yatırımcı sunumunda teknoloji altyapımızla öne geçtik.',
        rating: 5
      }
    ]
  },
  cta: {
    titleDesign: "Fikrinizi Bir Sonraki Seviyeye Taşıyalım",
    titleCode: "İşletmenizi Dijital Olarak Ölçekleyelim",
    descDesign: "Sadece pikselleri değil, işinizin geleceğini tasarlıyoruz. Hedeflerinizi konuşmak için tanışalım.",
    descCode: "Manuel süreçleri geride bırakın. Verimliliği artıran teknolojilerle tanışmak için ilk adımı atın.",
    btnPrimary: "İletişim Formu",
    btnSecondary: "Whatsapp",
    statProjects: "Tamamlanan Proje",
    statSystems: "Aktif Sistem",
    statSuccess: "Müşteri Memnuniyeti",
    statSupportDesign: "Tasarım Desteği",
    statSupportCode: "Teknik Destek"
  },
  footer: {
    brandDescDesign: "Kullanıcı deneyimini merkeze alan, veri odaklı ve yenilikçi dijital ürün tasarımı.",
    brandDescCode: "Modern işletmelerin karmaşık problemlerini çözen, güvenli ve ölçeklenebilir yazılım mühendisliği.",
    colServices: "Hizmetler",
    colCompany: "Kurumsal",
    colContact: "İletişim",
    designServices: ['UX Denetimi (Audit)', 'UI/UX Tasarımı', 'Ürün Stratejisi', 'Design System', 'Growth Tasarımı'],
    codeServices: ['Özel ERP Yazılımı', 'B2B Portal', 'SaaS Geliştirme', 'Mobil Uygulama', 'Sistem Entegrasyonu'],
    companyLinks: ['Hakkımızda', 'Çalışma Metodumuz', 'Başarı Hikayeleri', 'Kariyer', 'Blog'],
    copyright: "Tüm hakları saklıdır.",
    privacy: "Gizlilik ve Güvenlik",
    terms: "Kullanım Koşulları",
    cookie: "Çerez Yönetimi"
  },
  notFound: {
    title: "Ooops! Sayfa Bulunamadı",
    description: "Aradığınız sayfayı bulamıyoruz. Taşınmış veya silinmiş olabilir.",
    homeBtn: "Ana Sayfa",
    hubBtn: "Blog'a Göz At"
  },
};