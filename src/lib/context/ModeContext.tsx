"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Mode = 'design' | 'code';

interface ModeContextType {
  mode: Mode;
  toggleMode: (selectedMode: Mode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('design');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage only once
  useEffect(() => {
    const savedMode = localStorage.getItem('acr-mode') as Mode;
    if (savedMode && (savedMode === 'design' || savedMode === 'code')) {
      setMode(savedMode);
    }
    setIsInitialized(true);
  }, []);

  // Auto-switch animation only on first visit (no saved mode)
  useEffect(() => {
    if (!isInitialized) return;
    
    const savedMode = localStorage.getItem('acr-mode');
    if (savedMode) return; // Skip animation if user has a preference

    // Faster animation sequence
    const timer1 = setTimeout(() => {
      setMode('code');
    }, 800);

    const timer2 = setTimeout(() => {
      setMode('design');
      localStorage.setItem('acr-mode', 'design');
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isInitialized]);

  const toggleMode = useCallback((selectedMode: Mode) => {
    setMode(selectedMode);
    localStorage.setItem('acr-mode', selectedMode);
  }, []);

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
