// src/theme/theme.ts
'use client';
import { createTheme } from '@mui/material/styles';

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
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    }
  },
  typography: {
    fontFamily: FONT_FAMILY,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
});

export default theme;
