// src/theme/theme.ts
'use client';
// 'Theme' tipini '@mui/material'dan import ediyoruz
import { createTheme, PaletteMode, Theme } from '@mui/material';

// Fontun ismini string olarak tanımlamak en temiz yöntemlerden biri
const FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Aydınlık mod için palet değerleri
          primary: {
            main: '#1976D2',
            light: '#42a5f5',
            dark: '#1565c0',
          },
          secondary: {
            main: '#FFC107',
            light: '#ffe082',
            dark: '#ffb300',
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
          // Karanlık mod için palet değerleri
          primary: {
            main: '#90CAF9',
            light: '#e3f2fd',
            dark: '#64b5f6',
          },
          secondary: {
            main: '#FFECB3',
            light: '#fff8e1',
            dark: '#ffdd70',
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
      textTransform: 'none' as const,
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // 'theme' parametresini 'Theme' olarak açıkça belirtiyoruz
        containedPrimary: ({ theme }: { theme: Theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          },
        }),
        // 'theme' parametresini 'Theme' olarak açıkça belirtiyoruz
        containedSecondary: ({ theme }: { theme: Theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          },
        }),
      },
    },
  },
});

// Artık varsayılan bir `theme` dışa aktarmıyoruz. Tema, layout.tsx'te dinamik olarak oluşturulacak.