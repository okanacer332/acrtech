// src/components/PricingPlans.tsx

"use client";

import { useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/src/lib/i18n/LanguageContext';
import { TransitionWrapper } from '@/src/components/TransitionWrapper';
import { ContactModal } from '@/src/components/ContactModal';

interface PricingPlansProps {
  mode: 'design' | 'code';
}

export function PricingPlans({ mode }: PricingPlansProps) {
  const { t } = useLanguage();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("");

  const plans = mode === 'design' ? t.pricing.designPlans : t.pricing.codePlans;

  const handlePlanClick = (planName: string) => {
    setSelectedPlanName(planName);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-900 relative overflow-hidden">
      <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${
        mode === 'design' 
          ? 'bg-gradient-to-b from-purple-500/20 to-transparent' 
          : 'bg-gradient-to-b from-blue-500/20 to-transparent'
      }`}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <TransitionWrapper modeKey={mode} className="text-center mb-12 sm:mb-16">
          <div className={`inline-block px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm mb-4 transition-colors duration-500 ${
            mode === 'design'
              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
              : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
          }`}>
            {t.pricing.tag}
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 px-4 py-2 leading-tight transition-colors duration-500 ${
            mode === 'design'
              ? 'bg-gradient-to-r from-purple-200 to-fuchsia-300 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent'
          }`}>
            {t.pricing.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            {mode === 'design' ? t.pricing.description : t.pricing.descriptionCode}
          </p>
        </TransitionWrapper>

        <TransitionWrapper modeKey={mode + "-plans"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`group relative rounded-xl sm:rounded-2xl lg:rounded-3xl backdrop-blur-sm border transition-all duration-500 overflow-visible ${
                  plan.highlighted
                    ? mode === 'design'
                      ? 'bg-gradient-to-b from-purple-500/20 to-purple-500/5 border-purple-500/50 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50'
                      : 'bg-gradient-to-b from-blue-500/20 to-blue-500/5 border-blue-500/50 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50'
                    : mode === 'design'
                      ? 'bg-slate-800/50 border-purple-500/20 shadow-xl shadow-black/50 hover:shadow-2xl hover:shadow-purple-500/30'
                      : 'bg-slate-800/50 border-blue-500/20 shadow-xl shadow-black/50 hover:shadow-2xl hover:shadow-blue-500/30'
                }`}
              >
                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  mode === 'design'
                    ? 'animated-border-purple'
                    : 'animated-border-blue'
                }`}
                  style={{
                    background: mode === 'design'
                      ? 'linear-gradient(90deg, transparent, transparent, rgba(168, 85, 247, 0.4), transparent, transparent)'
                      : 'linear-gradient(90deg, transparent, transparent, rgba(59, 130, 246, 0.4), transparent, transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'borderDraw 3s linear infinite',
                    WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '2px'
                  }}
                ></div>
                
                {plan.label && (
                  <div className={`absolute -top-3 left-4 sm:left-6 z-10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs shadow-lg whitespace-nowrap transition-colors duration-500 ${
                    mode === 'design'
                      ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {plan.label}
                  </div>
                )}

                <div className="p-4 sm:p-6 lg:p-8">
                  <h3 className={`text-xl sm:text-2xl lg:text-3xl mb-2 mt-2 transition-colors duration-500 ${
                    mode === 'design' ? 'text-purple-200' : 'text-blue-200'
                  }`}>
                    {plan.name}
                  </h3>

                  <div className="mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-4xl lg:text-5xl text-white">{plan.price}</span>
                    <span className="text-gray-400 text-base sm:text-lg">{plan.period}</span>
                  </div>

                  <p className="text-xs sm:text-sm lg:text-base text-gray-400 mb-4 sm:mb-6 min-h-[2.5rem] sm:min-h-[3rem]">
                    {plan.description}
                  </p>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <button
                      onClick={() => handlePlanClick(plan.name)}
                      className={`block w-full px-4 py-2.5 sm:px-6 sm:py-3 lg:py-3.5 rounded-full text-center transition-all duration-300 text-sm sm:text-base cursor-pointer ${
                        mode === 'design'
                          ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>

                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <Check className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                          mode === 'design' ? 'text-purple-400' : 'text-blue-400'
                        }`} />
                        <span className="text-xs sm:text-sm lg:text-base text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Link (Learn More) Kısmı Kaldırıldı */}
                  
                </div>
              </div>
            ))}
          </div>
        </TransitionWrapper>

        <div className="text-center mt-12 sm:mt-16">
          <p className="text-gray-400 mb-4">
            {t.pricing.customSolution} 
            <button 
              onClick={() => handlePlanClick("Kurumsal")} 
              className={`hover:underline transition-colors duration-500 bg-transparent border-none cursor-pointer ml-1 mr-1 ${
                mode === 'design' ? 'text-purple-300' : 'text-blue-300'
              }`}
            >
              {t.pricing.contactUs}
            </button> 
            {t.pricing.forQuote}
          </p>
        </div>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        initialPlan={selectedPlanName}
        mode={mode} 
      />
    </section>
  );
}