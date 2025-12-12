"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/src/lib/i18n/LanguageContext";

interface LanguageSelectorProps {
  mode: 'design' | 'code';
}

// --- ÖZEL SVG BAYRAK İKONLARI (Minimalist & Yuvarlak) ---
const FlagTR = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <circle cx="16" cy="16" r="16" fill="#E30A17" />
    <path fill="white" d="M13.5 8.5a7.5 7.5 0 1 0 0 15 8.5 8.5 0 0 1 0-15z" />
    <path fill="white" d="M18.8 13.8l.9 2.8h2.9l-2.4 1.7.9 2.8-2.3-1.7-2.3 1.7.9-2.8-2.4-1.7h2.9z" transform="translate(1 0) scale(0.8)" />
  </svg>
);

const FlagEN = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <circle cx="16" cy="16" r="16" fill="#012169" />
    <path fill="none" stroke="white" strokeWidth="4" d="M0,0 L32,32 M32,0 L0,32" />
    <path fill="none" stroke="#C8102E" strokeWidth="2" d="M0,0 L32,32 M32,0 L0,32" />
    <path fill="none" stroke="white" strokeWidth="6" d="M16,0 V32 M0,16 H32" />
    <path fill="none" stroke="#C8102E" strokeWidth="4" d="M16,0 V32 M0,16 H32" />
  </svg>
);

const FlagDE = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <mask id="mask-de">
      <circle cx="16" cy="16" r="16" fill="white" />
    </mask>
    <g mask="url(#mask-de)">
      <path fill="#FFCE00" d="M0 0h32v32H0z" />
      <path fill="#000000" d="M0 0h32v10.6H0z" />
      <path fill="#DD0000" d="M0 10.6h32v10.6H0z" />
    </g>
  </svg>
);

const FlagES = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <mask id="mask-es">
      <circle cx="16" cy="16" r="16" fill="white" />
    </mask>
    <g mask="url(#mask-es)">
      <path fill="#AA151B" d="M0 0h32v32H0z" />
      <path fill="#F1BF00" d="M0 8h32v16H0z" />
    </g>
  </svg>
);

const FlagRU = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <mask id="mask-ru">
      <circle cx="16" cy="16" r="16" fill="white" />
    </mask>
    <g mask="url(#mask-ru)">
      <path fill="#D52B1E" d="M0 0h32v32H0z" />
      <path fill="#0039A6" d="M0 0h32v21.3H0z" />
      <path fill="#FFFFFF" d="M0 0h32v10.6H0z" />
    </g>
  </svg>
);

const FlagFR = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <mask id="mask-fr">
      <circle cx="16" cy="16" r="16" fill="white" />
    </mask>
    <g mask="url(#mask-fr)">
      <path fill="#ED2939" d="M0 0h32v32H0z" />
      <path fill="#FFFFFF" d="M0 0h21.3v32H0z" />
      <path fill="#002395" d="M0 0h10.6v32H0z" />
    </g>
  </svg>
);

const FlagAR = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <circle cx="16" cy="16" r="16" fill="#006C35" />
    <path fill="#FFFFFF" d="M10,8 h12 v4 h-12 z" transform="translate(0, 4)" /> 
    <path fill="#FFFFFF" d="M10,12 h2 v8 h-2 z" transform="translate(0, 4)" />
    <path fill="#FFFFFF" d="M8,22 h16 v2 h-16 z" />
  </svg>
);

// --- KONFIGÜRASYON ---
const FlagMap: Record<string, React.ElementType> = {
  TR: FlagTR,
  EN: FlagEN,
  DE: FlagDE,
  ES: FlagES,
  RU: FlagRU,
  FR: FlagFR,
  AR: FlagAR,
};

const LanguageNames: Record<string, string> = {
  TR: "Türkçe",
  EN: "English",
  DE: "Deutsch",
  ES: "Español",
  RU: "Русский",
  FR: "Français",
  AR: "العربية",
};

// --- BİLEŞEN ---
export function LanguageSelector({ mode }: LanguageSelectorProps) {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklandığında menüyü kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tasarım moduna göre renkler
  const activeColorClass = mode === 'design' 
    ? 'hover:text-purple-300 focus:text-purple-300' 
    : 'hover:text-blue-300 focus:text-blue-300';

  const dropdownBorderClass = mode === 'design'
    ? 'border-purple-500/20'
    : 'border-blue-500/20';

  const activeItemBg = mode === 'design'
    ? 'bg-purple-500/10 text-purple-300'
    : 'bg-blue-500/10 text-blue-300';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* TRIGGER BUTONU */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-sm font-medium text-white/90 transition-colors outline-none group ${activeColorClass}`}
      >
        <span className="tracking-wide">{language}</span>
        <ChevronDown className={`w-3 h-3 opacity-50 group-hover:opacity-100 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* DROPDOWN MENU - ABSOLUTE POZİSYON */}
      {/* "absolute right-0 top-full mt-2" sayesinde header'ı itmez, üstte açılır */}
      {isOpen && (
        <div 
          className={`absolute right-0 top-full mt-2 z-50 origin-top-right
            bg-slate-900/95 backdrop-blur-xl border ${dropdownBorderClass} 
            text-white min-w-[150px] p-1.5 rounded-xl shadow-xl 
            max-h-[400px] overflow-y-auto scrollbar-hide
            animate-in fade-in zoom-in-95 duration-200`}
        >
          {availableLanguages.map((langCode) => {
            const FlagComponent = FlagMap[langCode] || FlagEN;
            const langName = LanguageNames[langCode] || langCode;
            const isActive = language === langCode;

            return (
              <button
                key={langCode}
                onClick={() => {
                  setLanguage(langCode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left cursor-pointer text-sm font-medium transition-all focus:bg-white/5 focus:text-white 
                  ${isActive ? activeItemBg : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <FlagComponent className="w-5 h-5 shadow-sm rounded-full flex-shrink-0" />
                <span>{langName}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}