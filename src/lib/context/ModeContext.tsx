"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Mode = 'design' | 'code';

interface ModeContextType {
  mode: Mode;
  toggleMode: (selectedMode: Mode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('design');

  // 1. Kullanıcının daha önceki mod tercihini hatırla (Sayfa yenilendiğinde)
  useEffect(() => {
    const savedMode = localStorage.getItem('acr-mode') as Mode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // 2. GÜNCELLENEN ÖZELLİK: Intro animasyonu (Her ziyarette çalışacak şekilde)
  useEffect(() => {
    // "Daha önce gördü mü?" kontrolünü kaldırdık. Artık her girişte çalışacak.
      
    // Adım 1: Site açıldıktan 1 saniye sonra CODE moduna geçiş
    const timer1 = setTimeout(() => {
      setMode('code');
    }, 1000);

    // Adım 2: Code modunda 2 saniye durduktan sonra DESIGN moduna dönüş
    const timer2 = setTimeout(() => {
      setMode('design');
      
      // Son durumu 'design' olarak kaydedelim ki tutarlılık sağlansın
      localStorage.setItem('acr-mode', 'design');
    }, 3000); // 1000ms (başlangıç) + 2000ms (bekleme) = 3000ms

    // Temizlik (Component unmount olursa timerları iptal et)
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const toggleMode = (selectedMode: Mode) => {
    setMode(selectedMode);
    localStorage.setItem('acr-mode', selectedMode);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}