// src/components/navigation/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

// Sayfa içinde belirli bir bölüme pürüzsüz kaydırma (smooth scroll) fonksiyonu
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navbar = () => {
  return (
    <AppBar position="sticky" component="nav" sx={{ bgcolor: 'background.default', color: 'text.primary', boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              acrtech
            </Link>
          </Typography>

          <Box>
            {/* Blog Linki */}
            <Button component={Link} href="/blog" sx={{ color: 'text.primary', fontWeight: 500 }}>
              Blog
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => scrollToSection('iletisim')}
              sx={{ ml: 2 }}
            >
              İletişim
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
