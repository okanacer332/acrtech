// src/components/sections/home/ReferencesSection.tsx
'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { referencesData } from '@/data/referencesData';

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
            // Logo görselini bir değişkene atıyoruz
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
                {/* Eğer referansın bir linki varsa, görseli link ile sarmalıyoruz */}
                {reference.linkUrl ? (
                  <MuiLink href={reference.linkUrl} target="_blank" rel="noopener noreferrer">
                    {LogoImage}
                  </MuiLink>
                ) : (
                  // Link yoksa sadece görseli gösteriyoruz
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
