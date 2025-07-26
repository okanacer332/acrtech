// src/components/navigation/Footer.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, IconButton, Link as MuiLink } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    // 1. Bu Box, footer'ın arka plan rengini tam genişlikte uygular.
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      {/* 2. Bu Container ise içeriği (yazı ve ikonları) ortalar ve sınırlar. */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2 // Elemanlar arasında boşluk eklemek için
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}{' '}
            <MuiLink color="inherit" href="/" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' }}}>
              acrtech
            </MuiLink>
            . Tüm Hakları Saklıdır.
          </Typography>
          <Box>
            <IconButton component="a" href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
            <IconButton component="a" href="https://twitter.com" target="_blank" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com" target="_blank" aria-label="GitHub">
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;