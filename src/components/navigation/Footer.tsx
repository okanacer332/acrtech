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
              {/* LinkedIn Linki için aria-label eklendi */}
              <MuiLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" color="text.secondary" aria-label="LinkedIn profilimizi ziyaret edin">
                <LinkedInIcon />
              </MuiLink>
              {/* Twitter Linki için aria-label eklendi */}
              <MuiLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" color="text.secondary" aria-label="Twitter profilimizi ziyaret edin">
                <TwitterIcon />
              </MuiLink>
              {/* GitHub Linki için aria-label eklendi */}
              <MuiLink href="https://github.com" target="_blank" rel="noopener noreferrer" color="text.secondary" aria-label="GitHub sayfamızı ziyaret edin">
                <GitHubIcon />
              </MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Çözümlerimiz
            </Typography>
            <Stack spacing={1}>
              {/* Çözümler linkleri için aria-label eklendi (kontext eklemek için) */}
              <MuiLink component={Link} href="/#hizmetler" passHref variant="body2" color="text.secondary" sx={{ textAlign: 'left' }} aria-label="Hizmetler sayfasındaki Envanter Yönetimi ve ERP çözümlerine git">Envanter Yönetimi & ERP</MuiLink>
              <MuiLink component={Link} href="/#hizmetler" passHref variant="body2" color="text.secondary" sx={{ textAlign: 'left' }} aria-label="Hizmetler sayfasındaki Web Tasarım ve Geliştirme çözümlerine git">Web Tasarım & Geliştirme</MuiLink>
              <MuiLink component={Link} href="/#hizmetler" passHref variant="body2" color="text.secondary" sx={{ textAlign: 'left' }} aria-label="Hizmetler sayfasındaki SEO Stratejileri çözümlerine git">SEO Stratejileri</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Şirket
            </Typography>
            <Stack spacing={1}>
              {/* Şirket linkleri için aria-label eklendi (kontext eklemek için) */}
              <MuiLink component={Link} href="/blog" variant="body2" color="text.secondary" aria-label="Blog sayfamızı ziyaret edin">Blog</MuiLink>
              <MuiLink component={Link} href="/#iletisim" passHref variant="body2" color="text.secondary" sx={{ textAlign: 'left' }} aria-label="İletişim bölümüne git">İletişim</MuiLink>
              <MuiLink href="/cerez-politikasi" variant="body2" color="text.secondary" aria-label="Çerez Politikası sayfamızı inceleyin">Çerez Politikası</MuiLink>
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