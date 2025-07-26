// src/components/navigation/Footer.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Grid, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

// Bu fonksiyonu, halihazırda ana sayfadaysak kullanmaya devam edebiliriz,
// ancak farklı bir sayfadan ana sayfadaki bölümlere yönlendirme için artık Next.js Link kullanacağız.
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
              acrtech
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '300px' }}>
              KOBİ&apos;ler için verimliliği artıran modern teknoloji çözümleri.
            </Typography>
            <Stack direction="row" spacing={1}>
              <MuiLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" color="text.secondary">
                <LinkedInIcon />
              </MuiLink>
              <MuiLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" color="text.secondary">
                <TwitterIcon />
              </MuiLink>
              <MuiLink href="https://github.com" target="_blank" rel="noopener noreferrer" color="text.secondary">
                <GitHubIcon />
              </MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Çözümlerimiz
            </Typography>
            <Stack spacing={1}>
              {/* ÖNEMLİ DEĞİŞİKLİK BURADA: Next.js Link kullanıyoruz ve ana sayfaya hash ile yönlendiriyoruz */}
              <MuiLink component={Link} href="/#hizmetler" passHref variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>Envanter Yönetimi & ERP</MuiLink>
              <MuiLink component={Link} href="/#hizmetler" passHref variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>Web Tasarım & Geliştirme</MuiLink>
              <MuiLink component={Link} href="/#hizmetler" passHref variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>SEO Stratejileri</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Şirket
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/blog" variant="body2" color="text.secondary">Blog</MuiLink>
              {/* ÖNEMLİ DEĞİŞİKLİK BURADA: Next.js Link kullanıyoruz ve ana sayfaya hash ile yönlendiriyoruz */}
              <MuiLink component={Link} href="/#iletisim" passHref variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>İletişim</MuiLink>
              <MuiLink href="/cerez-politikasi" variant="body2" color="text.secondary">Çerez Politikası</MuiLink>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} acrtech. Tüm Hakları Saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;