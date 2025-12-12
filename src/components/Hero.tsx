"use client";

import { useState } from 'react';
import { TransitionWrapper } from '@/src/components/TransitionWrapper';
import { useLanguage } from '@/src/lib/i18n/LanguageContext';
import { ContactModal } from '@/src/components/ContactModal';

interface HeroProps {
  mode: 'design' | 'code';
}

export function Hero({ mode }: HeroProps) {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Açma Fonksiyonu
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Portfolyo Bölümüne Kaydırma
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ORTAK STİL SINIFLARI (Tutarlılık için)
  const commonClasses = {
    containerSpacing: "space-y-6 sm:space-y-8",
    headerSpacing: "space-y-3 sm:space-y-4",
    tagBase: "inline-block px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm backdrop-blur-md border",
    // Başlık boyutları Design moduyla birebir aynı yapıldı:
    headingBase: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl bg-clip-text text-transparent leading-tight font-medium tracking-tight",
    descBase: "text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed",
    buttonContainer: "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4",
    btnPrimaryBase: "cursor-pointer px-8 py-4 rounded-full transition-all font-medium shadow-lg w-full sm:w-auto",
    btnSecondaryBase: "cursor-pointer px-8 py-4 bg-transparent text-white rounded-full transition-colors border border-white/10 w-full sm:w-auto hover:bg-white/5"
  };

  return (
    <section className={`relative min-h-screen flex flex-col overflow-hidden transition-colors duration-1000 ease-in-out ${
      mode === 'design' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900' 
        : 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900'
    }`}>
      {/* Spacer for sticky header */}
      <div className="h-24"></div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 md:py-16 relative z-10">
        <div className="max-w-7xl w-full">
          
          <TransitionWrapper modeKey={mode}>
            {mode === 'design' ? (
              // --- DESIGN MODE CONTENT ---
              <div className={commonClasses.containerSpacing}>
                <div className={commonClasses.headerSpacing}>
                  <div className={`${commonClasses.tagBase} bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-purple-500/30 text-purple-200`}>
                    {t.hero.designTag}
                  </div>
                  <h1 className={`${commonClasses.headingBase} bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-400`}>
                    {t.hero.designTitle[0]}
                    <br />
                    {t.hero.designTitle[1]}
                    <br />
                    {t.hero.designTitle[2]}
                  </h1>
                </div>
                <p className={`${commonClasses.descBase} text-purple-200/80`}>
                  {t.hero.designDesc}
                </p>
                <div className={commonClasses.buttonContainer}>
                  <button 
                    onClick={handleOpenModal}
                    className={`${commonClasses.btnPrimaryBase} bg-white text-purple-950 hover:bg-purple-50 hover:shadow-purple-500/20 shadow-purple-500/10`}
                  >
                    {t.hero.designBtnPrimary}
                  </button>
                  <button 
                    onClick={scrollToPortfolio}
                    className={commonClasses.btnSecondaryBase}
                  >
                    {t.hero.designBtnSecondary}
                  </button>
                </div>
              </div>
            ) : (
              // --- CODE MODE CONTENT (Boyutlar Eşitlendi) ---
              <div className={commonClasses.containerSpacing}>
                <div className={commonClasses.headerSpacing}>
                  <div className={`${commonClasses.tagBase} bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-200`}>
                    {t.hero.codeTag}
                  </div>
                  {/* Başlık boyutları Design ile eşitlendi */}
                  <h1 className={`${commonClasses.headingBase} bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-400`}>
                    {t.hero.codeTitle[0]}
                    <br />
                    {t.hero.codeTitle[1]}
                    <br />
                    {t.hero.codeTitle[2]}
                  </h1>
                </div>
                {/* Açıklama boyutu Design ile eşitlendi */}
                <p className={`${commonClasses.descBase} text-blue-200/80`}>
                  {t.hero.codeDesc}
                </p>
                {/* Buton yapısı Design ile eşitlendi */}
                <div className={commonClasses.buttonContainer}>
                  <button 
                    onClick={handleOpenModal}
                    className={`${commonClasses.btnPrimaryBase} bg-white text-blue-950 hover:bg-blue-50 hover:shadow-blue-500/20 shadow-blue-500/10`}
                  >
                    {t.hero.codeBtnPrimary}
                  </button>
                  <button 
                    onClick={scrollToPortfolio}
                    className={commonClasses.btnSecondaryBase}
                  >
                    {t.hero.codeBtnSecondary}
                  </button>
                </div>
              </div>
            )}
          </TransitionWrapper>

        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] transition-colors duration-1000 ${
          mode === 'design' ? 'bg-purple-600/20' : 'bg-blue-600/20'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] transition-colors duration-1000 ${
          mode === 'design' ? 'bg-fuchsia-600/20' : 'bg-cyan-600/20'
        }`}></div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        initialPlan="Genel Başvuru (Hero)"
        mode={mode}
      />
    </section>
  );
}