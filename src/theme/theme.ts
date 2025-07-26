// src/theme/theme.ts
'use client';
import { createTheme, PaletteMode } from '@mui/material';

// Fontun ismini string olarak tanımlamak en temiz yöntemlerden biri
const FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Palette values for light mode
          primary: {
            main: '#1976D2',
          },
          secondary: {
            main: '#FFC107',
          },
          background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
          },
          text: {
            primary: '#212121',
            secondary: '#757575',
          },
        }
      : {
          // Palette values for dark mode
          primary: {
            main: '#90CAF9', // Softer blue for dark mode
          },
          secondary: {
            main: '#FFECB3', // Softer amber for dark mode
          },
          background: {
            default: '#121212',
            paper: '#1E1E1E',
          },
          text: {
            primary: '#E0E0E0',
            secondary: '#A0A0A0',
          },
        }),
  },
  typography: {
    fontFamily: FONT_FAMILY,
    button: {
      textTransform: 'none' as const, // Hata düzeltme: 'none' değişmez tür olarak belirtildi
      fontWeight: 600,
    },
  },
});

// Artık varsayılan bir `theme` dışa aktarmıyoruz. Tema, layout.tsx'te dinamik olarak oluşturulacak.