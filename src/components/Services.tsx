// src/components/Services.tsx

"use client";

import { useState } from 'react';
import { Palette, Users, TrendingUp, Map, Code, Database, Globe, Layers, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/src/lib/i18n/LanguageContext';
import { TransitionWrapper } from '@/src/components/TransitionWrapper';

interface ServicesProps {
  mode: 'design' | 'code';
}

export function Services({ mode }: ServicesProps) {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // İkonları burada tanımlıyoruz (Sırası locale dosyasındaki ile AYNI olmalı)
  const designIcons = [Palette, Layers, TrendingUp, Map, Users];
  const codeIcons = [Database, Globe, Code, Layers, TrendingUp];

  // Aktif verileri hazırlıyoruz
  const servicesList = mode === 'design' ? t.services.designServices : t.services.codeServices;
  const iconsList = mode === 'design' ? designIcons : codeIcons;

  // Görüntülenecek servisleri filtrele
  const displayedServices = showAll ? servicesList : servicesList.slice(0, 4);

  // Kart Render Fonksiyonu (Kod tekrarını önlemek için)
  const renderServiceCard = (service: any, index: number) => {
    const Icon = iconsList[index];
    const isExpanded = expandedIndex === index;

    return (
      <div
        key={index}
        className={`group rounded-lg sm:rounded-xl backdrop-blur-sm border transition-all duration-300 overflow-hidden ${
          isExpanded
            ? mode === 'design'
              ? 'bg-purple-500/10 border-purple-500/40 shadow-lg shadow-purple-500/20'
              : 'bg-blue-500/10 border-blue-500/40 shadow-lg shadow-blue-500/20'
            : mode === 'design'
              ? 'bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30'
              : 'bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-500/30'
        }`}
      >
        {/* Accordion Header */}
        <button
          onClick={() => setExpandedIndex(isExpanded ? null : index)}
          className="w-full p-3 sm:p-4 lg:p-5 flex items-center gap-3 sm:gap-4 text-left"
        >
          <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            mode === 'design'
              ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 group-hover:shadow-lg group-hover:shadow-purple-500/50'
              : 'bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:shadow-lg group-hover:shadow-blue-500/50'
          }`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-base sm:text-lg lg:text-xl mb-1 transition-colors duration-300 ${
              mode === 'design' ? 'text-purple-200' : 'text-blue-200'
            }`}>
              {service.title}
            </h3>
            {!isExpanded && (
              <p className="text-xs sm:text-sm text-gray-500 truncate pr-2">
                {service.description}
              </p>
            )}
          </div>
          
          <ChevronDown 
            className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
              isExpanded ? 'rotate-180' : ''
            } ${mode === 'design' ? 'group-hover:text-purple-300' : 'group-hover:text-blue-300'}`}
          />
        </button>
        
        {/* Accordion Content */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 pl-11 sm:pl-14 lg:pl-16">
            <p className="text-xs sm:text-sm lg:text-base text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${
        mode === 'design' 
          ? 'bg-gradient-to-b from-purple-500/20 to-transparent' 
          : 'bg-gradient-to-b from-blue-500/20 to-transparent'
      }`}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header - Animasyonlu */}
        <TransitionWrapper modeKey={mode} className="text-center mb-12 sm:mb-16">
          <div className={`inline-block px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm mb-4 transition-colors duration-500 ${
            mode === 'design'
              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
              : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
          }`}>
            {t.services.tag}
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 px-4 py-2 leading-tight transition-colors duration-500 ${
            mode === 'design'
              ? 'bg-gradient-to-r from-purple-200 to-fuchsia-300 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent'
          }`}>
            {mode === 'design' ? t.services.titleDesign : t.services.titleCode}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            {mode === 'design' ? t.services.descriptionDesign : t.services.descriptionCode}
          </p>
        </TransitionWrapper>

        {/* Services Accordion Grid - Animasyonlu */}
        <TransitionWrapper modeKey={mode + "-services"}>
          
          {/* MOBİL GÖRÜNÜM (Tek Sütun) */}
          <div className="flex flex-col gap-3 md:hidden">
            {displayedServices.map((service, index) => renderServiceCard(service, index))}
          </div>

          {/* MASAÜSTÜ GÖRÜNÜM (İki Bağımsız Sütun - Masonry Etkisi) */}
          {/* items-start: Sütunların içeriğe göre uzamasını sağlar, birbirini etkilemez */}
          <div className="hidden md:grid grid-cols-2 gap-4 items-start max-w-6xl mx-auto">
            
            {/* Sol Sütun (Çift Sayılar: 0, 2, 4...) */}
            <div className="flex flex-col gap-4">
              {displayedServices.map((service, index) => {
                if (index % 2 !== 0) return null; // Sadece çiftleri al
                return renderServiceCard(service, index);
              })}
            </div>

            {/* Sağ Sütun (Tek Sayılar: 1, 3, 5...) */}
            <div className="flex flex-col gap-4">
              {displayedServices.map((service, index) => {
                if (index % 2 === 0) return null; // Sadece tekleri al
                return renderServiceCard(service, index);
              })}
            </div>

          </div>

        </TransitionWrapper>

        {/* Load More Button */}
        {servicesList.length > 4 && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 border text-sm sm:text-base ${
                mode === 'design'
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/50'
              }`}
            >
              {showAll ? t.services.showLess : `${t.services.loadMore} (${servicesList.length - 4})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}