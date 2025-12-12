"use client";

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/src/lib/i18n/LanguageContext';
import { TransitionWrapper } from '@/src/components/TransitionWrapper';
import { ContactModal } from '@/src/components/ContactModal';

interface CTAProps {
  mode: 'design' | 'code';
}

export function CTA({ mode }: CTAProps) {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-900 relative overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        mode === 'design'
          ? 'bg-gradient-to-br from-purple-900/20 via-fuchsia-900/20 to-slate-900'
          : 'bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-slate-900'
      }`}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <TransitionWrapper modeKey={mode}>
          <div className={`p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl backdrop-blur-sm border transition-colors duration-500 ${
            mode === 'design'
              ? 'bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border-purple-500/30'
              : 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30'
          }`}>
            <div className="text-center">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 px-4 py-2 leading-tight transition-colors duration-500 ${
                mode === 'design'
                  ? 'bg-gradient-to-r from-purple-200 to-fuchsia-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent'
              }`}>
                {mode === 'design' ? t.cta.titleDesign : t.cta.titleCode}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
                {mode === 'design' ? t.cta.descDesign : t.cta.descCode}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* 1. BUTON: Contact Modal Tetikleyici */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`group px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto font-medium ${
                    mode === 'design'
                      ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                  }`}
                >
                  {t.cta.btnPrimary}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* 2. BUTON: WhatsApp SVG Icon Link */}
                <a 
                  href="https://wa.me/905362487703" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 bg-[#25D366] text-white rounded-full hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-[#25D366]/30 hover:scale-110 flex items-center justify-center aspect-square w-[52px] h-[52px] sm:w-[60px] sm:h-[60px]"
                  aria-label="WhatsApp"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-white/10">
                <div>
                  <p className={`text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transition-colors duration-500 ${
                    mode === 'design' ? 'text-purple-300' : 'text-blue-300'
                  }`}>
                    500+
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400">
                    {mode === 'design' ? t.cta.statProjects : t.cta.statSystems}
                  </p>
                </div>
                <div>
                  <p className={`text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transition-colors duration-500 ${
                    mode === 'design' ? 'text-purple-300' : 'text-blue-300'
                  }`}>
                    100%
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400">{t.cta.statSuccess}</p>
                </div>
                <div>
                  <p className={`text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transition-colors duration-500 ${
                    mode === 'design' ? 'text-purple-300' : 'text-blue-300'
                  }`}>
                    24/7
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400">
                    {mode === 'design' ? t.cta.statSupportDesign : t.cta.statSupportCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TransitionWrapper>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${
        mode === 'design' ? 'bg-purple-500/10' : 'bg-blue-500/10'
      }`}></div>
      <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${
        mode === 'design' ? 'bg-fuchsia-500/10' : 'bg-cyan-500/10'
      }`}></div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        initialPlan="Genel İletişim (CTA)"
        mode={mode}
      />
    </section>
  );
}