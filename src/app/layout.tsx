// src/app/layout.tsx
'use client'; // Bu satır zaten var olmalı, React hooklarını kullanmak için gerekli.

import React, { useState, useEffect, createContext, useMemo } from 'react'; // createContext ve useMemo eklendi
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider, createTheme, PaletteMode, Box, CssBaseline, IconButton } from '@mui/material'; // createTheme, PaletteMode ve IconButton eklendi
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Karanlık mod ikonu
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Aydınlık mod ikonu
import { getDesignTokens } from '@/theme/theme'; // getDesignTokens import edildi
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import CookieConsent from '@/components/common/CookieConsent';
import type { Metadata } from 'next';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GTM_ID = 'GTM-57R3ZQVW';

// Tema modu için bağlam oluşturuyoruz
interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode; // Mevcut modu da bağlamda sağlamak faydalı olacaktır
}
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light', // Varsayılan değer
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light'); // Varsayılan olarak aydınlık mod ile başla

  // Sayfa yüklendiğinde localStorage'dan tema tercihini oku
  useEffect(() => {
    // Sunucu tarafında localStorage'a erişmeye çalışmamak için kontrol ekliyoruz
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('themeMode');
      if (storedMode === 'dark' || storedMode === 'light') {
        setMode(storedMode); // Kaydedilmiş tercih varsa onu kullan
      }
      // İlk ziyaretçi için sistem tercihi yerine varsayılan 'light' modunda kalır
    }
  }, []);

  // Tema modunu değiştirme fonksiyonu
  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      // Tercihi localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', newMode);
        // CSS değişkenlerini de güncelle (globals.css ile uyumlu olması için)
        // Bu kısım, globals.css'inizdeki --background ve --foreground değişkenlerini güncellemek içindir.
        // Eğer bu değişkenleri kullanmıyorsanız veya MUI'nin tema sistemine tam olarak geçiş yaptıysanız,
        // bu satırlar gereksiz olabilir.
        document.documentElement.style.setProperty('--background', newMode === 'light' ? '#ffffff' : '#0a0a0a');
        document.documentElement.style.setProperty('--foreground', newMode === 'light' ? '#171717' : '#ededed');
      }
      return newMode;
    });
  }, []);

  // createTheme fonksiyonunu kullanarak tema oluştur
  // getDesignTokens fonksiyonu PaletteMode'a göre tema seçeneklerini döndürür
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