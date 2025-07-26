// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import GoogleTagManager from '@/components/analytics/GoogleTagManager'; // GTM bileşenini import ediyoruz
import { Box, CssBaseline } from '@mui/material';
import type { Metadata } from 'next';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Google Tag Manager Kapsayıcı Kimliği
const GTM_ID = 'GTM-57R3ZQVW'; // KİMLİK GÜNCELLENDİ

export const metadata: Metadata = {
  title: {
    template: '%s | acrtech',
    default: 'acrtech - KOBİ\'ler için Teknoloji ve Verimlilik Çözümleri',
  },
  description: 'KOBİ\'lere özel envanter yönetimi, ERP, web tasarım ve SEO hizmetleri ile işletmenizin dijital dönüşümüne liderlik ediyoruz.',
  creator: 'acrtech',
  publisher: 'acrtech',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%231976D2"/><text x="50" y="50" font-family="Inter" font-size="60" dy=".3em" font-weight="bold" fill="white" text-anchor="middle">A</text></svg>',
  },
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.className}>
      <body>
        {/* GTM Body kodunu body'nin hemen başına ekliyoruz */}
        <GoogleTagManager gtmId={GTM_ID} />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
