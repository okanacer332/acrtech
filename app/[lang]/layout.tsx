import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ModeProvider } from "@/src/lib/context/ModeContext";
import { LanguageProvider } from '@/src/lib/i18n/LanguageContext';
import { Toaster } from "@/src/components/ui/sonner";
import { i18n, type Locale } from "@/src/i18n-config";
import { getDictionary } from "@/src/lib/i18n/get-dictionary";
import { ServiceWorkerRegistration } from "@/src/components/ServiceWorkerRegistration";
import { LazyAnalytics } from "@/src/components/LazyAnalytics";

const inter = Inter({
  subsets: ["latin"],  // Removed latin-ext to save ~20KB
  display: 'optional', // Reduces CLS compared to 'swap'
  preload: false,      // Let browser decide when to load
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-inter',
});

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ACR Tech',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://acrtech.com.tr',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://acrtech.com.tr'}/acrtech.png`,
    sameAs: [
      'https://twitter.com/acrtech',
      'https://linkedin.com/company/acrtech',
      'https://instagram.com/acrtech'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-536-248-7703',
      contactType: 'customer service',
      areaServed: ['TR', 'US', 'DE', 'GB', 'RU', 'ES', 'FR', 'AE'], 
      availableLanguage: ['Turkish', 'English', 'German', 'Russian', 'Spanish', 'French', 'Arabic'] 
    }
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://acrtech.com.tr'),
  title: "ACRTECH | İşinizi Büyüten Size Özel Yazılım Çözümleri & B2B Uygulamalar",
  description: "Sektörünüze özel web yazılımları ve yönetim panelleri ile dijital dönüşümü başlatın. Yeni müşteriler kazandıran, stratejik B2B ve web çözümlerimizle tanışın. Teklif alın.",
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: './',
  },
  verification: {
    google: 'IxREBYtgPsVQmQv0Wb07COriBiWkXIaLWrLLo8LQHIs',
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
   
  const validatedLang = i18n.locales.includes(lang as any)
    ? (lang as Locale)
    : i18n.defaultLocale;

  const dictionary = await getDictionary(validatedLang);

  return (
    <html lang={lang} className="scroll-smooth" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <ModeProvider>
          <LanguageProvider initialLanguage={lang.toUpperCase() as any} initialDictionary={dictionary}>
            {children}
            <Toaster position="top-center" richColors />
          </LanguageProvider>
        </ModeProvider>

        <LazyAnalytics gaId="G-FGVHFN9HHZ" />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}