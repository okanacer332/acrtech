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
  useEffect(() => {
    const savedMode = localStorage.getItem('acr-mode') as Mode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
  
    const timer1 = setTimeout(() => {
      setMode('code');
    }, 1000);

    const timer2 = setTimeout(() => {
      setMode('design');
      
      localStorage.setItem('acr-mode', 'design');
    }, 3000); // 1000ms (başlangıç) + 2000ms (bekleme) = 3000ms

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