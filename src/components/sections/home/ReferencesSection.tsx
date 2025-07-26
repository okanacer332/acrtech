// src/components/sections/home/ReferencesSection.tsx
'use client'; // Bu satır zaten var olmalı

import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { referencesData } from '@/data/referencesData';
import Link from 'next/link'; // Next.js Link importu eklendi

const ReferencesSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            color: 'text.secondary',
            mb: 6,
          }}
        >
          Marka & Referanslarımız
        </Typography>
        <Grid container spacing={{ xs: 4, sm: 6 }} justifyContent="center" alignItems="center">
          {referencesData.map((reference, index) => {
            const LogoImage = (
              <Box
                component="img"
                src={reference.logoUrl}
                alt={`${reference.name} logo`}
                sx={{
                  maxWidth: '120px',
                  filter: 'grayscale(100%)',
                  opacity: 0.6,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                    opacity: 1,
                    transform: 'scale(1.1)',
                  },
                  display: 'block',
                  mx: 'auto',
                }}
              />
            );

            return (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index} sx={{ textAlign: 'center' }}>
                {reference.linkUrl ? (
                  // ÖNEMLİ DEĞİŞİKLİK BURADA: MuiLink'i Next.js Link ile sarıyoruz
                  <MuiLink component={Link} href={reference.linkUrl} passHref>
                    {LogoImage}
                  </MuiLink>
                ) : (
                  LogoImage
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default ReferencesSection;