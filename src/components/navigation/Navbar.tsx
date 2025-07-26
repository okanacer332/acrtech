// src/components/navigation/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky" component="nav" sx={{ bgcolor: 'background.default', color: 'text.primary', boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              acrtech
            </Link>
          </Typography>

          {/* İletişim Butonu (Artık mobil ve masaüstünde görünür) */}
          <Box>
            <Button
              component={Link}
              href="/#iletisim" // Sayfa içi "iletisim" ID'li bölüme yönlendirir
              variant="contained"
              color="primary"
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
