// src/theme/theme.ts
'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google'; // Fontu burada da import edebiliriz, ama layout'tan alması daha doğru.
                                         // Doğrudan string olarak da yazabiliriz.

// Fontun ismini string olarak tanımlamak en temiz yöntemlerden biri
const FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#FFC107',
    },
  },
  typography: {
    fontFamily: FONT_FAMILY, // Tüm MUI bileşenlerinin bu font ailesini kullanmasını sağlıyoruz.
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    button: { // Buton text'lerinin büyük harfe dönüşmesini engelleyebiliriz
        textTransform: 'none',
        fontWeight: 600,
    }
  },
});

export default theme;