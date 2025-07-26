// src/components/sections/home/ReferencesSection.tsx
'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { referencesData } from '@/data/referencesData';
import Link from 'next/link';
import Image from 'next/image';

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
              // Image bileşenini bir Box içine sarmalıyoruz ve boyutlandırma ile hover stillerini Box'a uyguluyoruz
              <Box
                sx={{
                  maxWidth: '180px', // Box'ın maksimum genişliğini koruyoruz
                  height: '120px', // **Yüksekliği 120px olarak artırdık**
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  filter: 'grayscale(100%)',
                  opacity: 0.6,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                    opacity: 1,
                    transform: 'scale(1.1)',
                  },
                  margin: 'auto',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={reference.logoUrl}
                  alt={`${reference.name} logo`}
                  width={180} // **Genişliği 180px olarak koruyoruz**
                  height={120} // **Image'ın yüksekliğini de 120px olarak güncelledik**
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            );

            return (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index} sx={{ textAlign: 'center' }}>
                {reference.linkUrl ? (
                  reference.linkUrl.startsWith('http') || reference.linkUrl.startsWith('https') ? (
                    <MuiLink href={reference.linkUrl} target="_blank" rel="noopener noreferrer">
                      {LogoImage}
                    </MuiLink>
                  ) : (
                    <MuiLink component={Link} href={reference.linkUrl} passHref>
                      {LogoImage}
                    </MuiLink>
                  )
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