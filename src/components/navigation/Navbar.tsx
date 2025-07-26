// src/components/navigation/Navbar.tsx
'use client';

import React, { useContext, useState } from 'react'; // useContext ve useState eklendi
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton, // IconButton eklendi
  Menu, // Menu eklendi
  MenuItem, // MenuItem eklendi
  useMediaQuery, // useMediaQuery eklendi
  useTheme, // useTheme eklendi
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger menü ikonu
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Karanlık mod ikonu
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Aydınlık mod ikonu
import { ColorModeContext } from '@/app/layout'; // ColorModeContext import edildi

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navbar = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext); // Context'ten mod ve toggle fonksiyonu alındı
  const theme = useTheme(); // Temaya erişim
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // md breakpoint'inin altında mobil görünüm

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (sectionId: string) => {
    handleCloseNavMenu();
    scrollToSection(sectionId);
  };

  return (
    <AppBar position="sticky" component="nav" sx={{ bgcolor: 'background.default', color: 'text.primary', boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              acrtech
            </Link>
          </Typography>

          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Tema Değiştirme Butonu (Mobil) */}
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              {/* Hamburger Menü */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu} component={Link} href="/blog">
                  <Typography textAlign="center">Blog</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} href="/case-studies">
                  <Typography textAlign="center">Vaka Analizleri</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('iletisim')}>
                  <Typography textAlign="center">İletişim</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button component={Link} href="/blog" sx={{ color: 'text.primary', fontWeight: 500 }}>
                Blog
              </Button>
              <Button component={Link} href="/case-studies" sx={{ color: 'text.primary', fontWeight: 500, ml: 1 }}>
                Vaka Analizleri
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('iletisim')}
                sx={{ ml: 2 }}
              >
                İletişim
              </Button>
              {/* Tema Değiştirme Butonu (Masaüstü) */}
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;