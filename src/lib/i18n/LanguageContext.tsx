"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LanguageCode, dictionaries } from './locales'; // 'dictionaries' import edildi
import { Dictionary } from './types';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Dictionary;
  isRTL: boolean;
  availableLanguages: LanguageCode[]; // EKLENDİ: Arayüz tanımına eklendi
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage: LanguageCode;
  initialDictionary: Dictionary;
}

export function LanguageProvider({ 
  children, 
  initialLanguage, 
  initialDictionary 
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);
  
  const t = initialDictionary;
  const isRTL = language === 'AR';

  const availableLanguages = Object.keys(dictionaries) as LanguageCode[];

  const setLanguage = (newLang: LanguageCode) => {
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    if (segments.length > 1) {
        segments[1] = newLang.toLowerCase();
        const newPath = segments.join('/');
        window.location.href = newPath;
    } else {
        window.location.href = `/${newLang.toLowerCase()}`;
    }
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language.toLowerCase();
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}