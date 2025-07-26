// src/app/page.tsx
import HeroSection from '@/components/sections/home/HeroSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import ReferencesSection from '@/components/sections/home/ReferencesSection';
import WhyUsSection from '@/components/sections/home/WhyUsSection';
import CtaSection from '@/components/sections/home/CtaSection';
import { Divider } from '@mui/material'; // Bölücü çizgiyi import ediyoruz

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Divider variant="middle" sx={{ my: 4 }} /> 
      <ServicesSection />

      {/* Hizmetler ve Referanslar arasına bir ayırıcı ekliyoruz */}
      <Divider variant="middle" sx={{ my: 4 }} /> 

      <ReferencesSection />

      {/* Referanslar ve Neden Biz arasına bir ayırıcı ekliyoruz */}
      <Divider variant="middle" sx={{ my: 4 }} />

      <WhyUsSection />
      <CtaSection />
    </>
  );
}
