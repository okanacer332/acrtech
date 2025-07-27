// src/app/page.tsx
import HeroSection from '@/components/sections/home/HeroSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import ReferencesSection from '@/components/sections/home/ReferencesSection';
import WhyUsSection from '@/components/sections/home/WhyUsSection';
import CtaSection from '@/components/sections/home/CtaSection';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import { Divider } from '@mui/material';

// Yeni oluşturduğumuz FadeInOnScroll bileşenini import ediyoruz
import FadeInOnScroll from '@/components/common/FadeInOnScroll';

// BURADA DEĞİŞİKLİK YAPILDI: Ana sayfa için metadata eklendi
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'acrtech - KOBİler için Teknoloji Çözümleri, ERP, Web Tasarım, SEO',
  description: 'acrtech, KOBİ\'lere özel envanter yönetimi, ERP, web tasarım ve SEO stratejileri sunarak işletmelerin dijital dönüşümüne liderlik eder.',
};


export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Divider variant="middle" sx={{ my: 4 }} />
      {/* ServicesSection'ı FadeInOnScroll ile sarmalıyoruz */}
      <FadeInOnScroll delay={100}> {/* Animasyon 100ms gecikmeli başlar */}
        <ServicesSection />
      </FadeInOnScroll>

      {/* Hizmetler ve Referanslar arasına bir ayırıcı ekliyoruz */}
      <Divider variant="middle" sx={{ my: 4 }} />

      {/* ReferencesSection'ı FadeInOnScroll ile sarmalıyoruz */}
      <FadeInOnScroll delay={200}> {/* Animasyon 200ms gecikmeli başlar */}
        <ReferencesSection />
      </FadeInOnScroll>

      {/* Referanslar ve Müşteri Yorumları arasına bir ayırıcı ekliyoruz */}
      <Divider variant="middle" sx={{ my: 4 }} />

      {/* TestimonialsSection'ı FadeInOnScroll ile sarmalıyoruz */}
      <FadeInOnScroll delay={300}> {/* Animasyon 300ms gecikmeli başlar */}
        <TestimonialsSection />
      </FadeInOnScroll>

      {/* Müşteri Yorumları ve Neden Biz arasına bir ayırıcı ekliyoruz */}
      <Divider variant="middle" sx={{ my: 4 }} />

      {/* WhyUsSection'ı FadeInOnScroll ile sarmalıyoruz */}
      <FadeInOnScroll delay={400}> {/* Animasyon 400ms gecikmeli başlar */}
        <WhyUsSection />
      </FadeInOnScroll>

      {/* CtaSection'ı FadeInOnScroll ile sarmalıyoruz */}
      <FadeInOnScroll delay={500}> {/* Animasyon 500ms gecikmeli başlar */}
        <CtaSection />
      </FadeInOnScroll>
    </>
  );
}
