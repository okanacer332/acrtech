// src/app/layout.tsx
'use client';

import React, { useState, useEffect, createContext, useMemo } from 'react';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider, createTheme, PaletteMode, Box, CssBaseline, IconButton } from '@mui/material';
import { getDesignTokens } from '@/theme/theme';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import CookieConsent from '@/components/common/CookieConsent';
// type { Metadata } from 'next'; // Metadata import'ı burada kullanılmıyor, kaldırılabilir

// Kaldırıldı: 'slick-carousel/slick/slick.css';
// Kaldırıldı: 'slick-carousel/slick/slick-theme.css';

const GTM_ID = 'GTM-57R3ZQVW';

// Tema modu için bağlam oluşturuyoruz
interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('themeMode');
      if (storedMode === 'dark' || storedMode === 'light') {
        setMode(storedMode);
      }
    }
  }, []);

  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', newMode);
        document.documentElement.style.setProperty('--background', newMode === 'light' ? '#ffffff' : '#0a0a0a');
        document.documentElement.style.setProperty('--foreground', newMode === 'light' ? '#171717' : '#ededed');
      }
      return newMode;
    });
  }, []);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <html lang="tr" className={inter.className}>
        <body>
          <GoogleTagManager gtmId={GTM_ID} />
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <ThemeProvider theme={theme}>
              <CssBaseline enableColorScheme />
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1 }}>
                  {children}
                </Box>
                <Footer />
              </Box>
              <CookieConsent />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ColorModeContext.Provider>
  );
}