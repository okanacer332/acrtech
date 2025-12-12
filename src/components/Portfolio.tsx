"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from "@/src/lib/i18n/LanguageContext";
import { TransitionWrapper } from "@/src/components/TransitionWrapper";

interface PortfolioProps {
  mode: 'design' | 'code';
}

export function Portfolio({ mode }: PortfolioProps) {
  const { t } = useLanguage();

  // Aktif modun projelerini seçiyoruz
  const activeProjects = mode === 'design' ? t.portfolio.designProjects : t.portfolio.codeProjects;

  return (
    <section id="portfolio" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Başlık Bölümü - Animasyonlu */}
        <TransitionWrapper modeKey={mode} className="text-center mb-12 sm:mb-16">
          <div className={`inline-block px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm mb-4 ${
            mode === 'design'
              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
              : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
          }`}>
            {t.portfolio.tag}
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 px-4 py-2 leading-tight ${
            mode === 'design'
              ? 'bg-gradient-to-r from-purple-200 to-fuchsia-300 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent'
          }`}>
            {t.portfolio.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            {mode === 'design' ? t.portfolio.description : t.portfolio.descriptionCode}
          </p>
        </TransitionWrapper>

        {/* Projeler Grid - Animasyonlu */}
        <TransitionWrapper modeKey={mode + "-grid"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {activeProjects.map((project, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer h-64 sm:h-72 md:h-96`}
              >
                {/* Project Image Background */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Image Overlay for Readability */}
                  <div className={`absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500 ${
                    mode === 'design' ? 'group-hover:mix-blend-multiply bg-purple-950/20' : 'group-hover:mix-blend-multiply bg-blue-950/20'
                  }`}></div>
                  
                  {/* Gradient Overlay at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 backdrop-blur-md border ${
                      mode === 'design' 
                        ? 'bg-purple-500/20 border-purple-500/30 text-purple-100' 
                        : 'bg-blue-500/20 border-blue-500/30 text-blue-100'
                    }`}>
                      {project.category}
                    </div>
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-200 line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TransitionWrapper>

        {/* CTA - GÜNCELLENEN KISIM */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            href="/hub/projects"
            target="_blank"
            className={`inline-block text-center px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto cursor-pointer ${
            mode === 'design'
              ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
          }`}>
            {t.portfolio.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}