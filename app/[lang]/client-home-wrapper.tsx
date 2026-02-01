"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useMode } from '@/src/lib/context/ModeContext';
import { Header } from '@/src/components/Header';
import { Hero } from '@/src/components/Hero';

// Lazy load below-the-fold components
const Portfolio = dynamic(() => import('@/src/components/Portfolio').then(mod => ({ default: mod.Portfolio })), {
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
  ssr: false,
});

const PricingPlans = dynamic(() => import('@/src/components/PricingPlans').then(mod => ({ default: mod.PricingPlans })), {
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
  ssr: false,
});

const Services = dynamic(() => import('@/src/components/Services').then(mod => ({ default: mod.Services })), {
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
  ssr: false,
});

const FocusAreas = dynamic(() => import('@/src/components/FocusAreas').then(mod => ({ default: mod.FocusAreas })), {
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
  ssr: false,
});

const CTA = dynamic(() => import('@/src/components/CTA').then(mod => ({ default: mod.CTA })), {
  loading: () => <div className="h-64 bg-slate-900 animate-pulse" />,
  ssr: false,
});

const Footer = dynamic(() => import('@/src/components/Footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-32 bg-slate-950 animate-pulse" />,
  ssr: false,
});

export function ClientHomeWrapper() {
  const { mode, toggleMode } = useMode();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
