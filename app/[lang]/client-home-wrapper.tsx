"use client";

import { useState, useEffect } from 'react';
import { useMode } from '@/src/lib/context/ModeContext';
import { Header } from '@/src/components/Header';
import { Hero } from '@/src/components/Hero';
import { Portfolio } from '@/src/components/Portfolio';
import { PricingPlans } from '@/src/components/PricingPlans';
import { Services } from '@/src/components/Services';
import { FocusAreas } from '@/src/components/FocusAreas';
import { CTA } from '@/src/components/CTA';
import { Footer } from '@/src/components/Footer';

// DİKKAT: 'export default' yerine 'export' kullandık ve ismini değiştirdik.
export function ClientHomeWrapper() {
  const { mode, toggleMode } = useMode();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${
      mode === 'design' ? 'bg-slate-950' : 'bg-slate-950'
    }`}>
      <Header mode={mode} onToggle={toggleMode} isScrolled={isScrolled} />
      
      <main>
        <Hero mode={mode} />
        <Portfolio mode={mode} />
        <PricingPlans mode={mode} />
        <Services mode={mode} />
        <FocusAreas mode={mode} />
        <CTA mode={mode} />
      </main>
      
      <Footer mode={mode} />
    </div>
  );
}