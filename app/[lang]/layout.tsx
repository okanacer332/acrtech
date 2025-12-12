import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ModeProvider } from "@/src/lib/context/ModeContext";
import { LanguageProvider } from '@/src/lib/i18n/LanguageContext';
import { Toaster } from "@/src/components/ui/sonner";
import { i18n, type Locale } from "@/src/i18n-config";
import { getDictionary } from "@/src/lib/i18n/get-dictionary";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

// Organizasyon Şeması (Schema.org)
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
      areaServed: ['TR', 'US', 'DE', 'GB'],
      availableLanguage: ['Turkish', 'English', 'German']
    }
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://acrtech.com.tr'),
  title: "ACR Tech - Design & Code Agency",
  description: "Modern Design and Code Agency Portfolio",
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
  // 🛠️ DÜZELTME BURADA: 'Locale' yerine 'string' yaptık.
  // Next.js build süreci bunu bekliyor.
  params: Promise<{ lang: string }>; 
}) {
  const { lang } = await params;
  
  // İçeride kullanırken 'as Locale' diyerek kendi tipimize çeviriyoruz.
  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className="scroll-smooth" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <ModeProvider>
          {/* LanguageProvider'a da cast ederek gönderiyoruz */}
          <LanguageProvider initialLanguage={lang.toUpperCase() as any} initialDictionary={dictionary}>
            {children}
            <Toaster position="top-center" richColors />
          </LanguageProvider>
        </ModeProvider>

        <GoogleAnalytics gaId="G-FGVHFN9HHZ" />
      </body>
    </html>
  );
}