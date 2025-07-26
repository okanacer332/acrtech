// src/components/sections/home/TestimonialsSection.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, Avatar, Paper, Grid } from '@mui/material';
import { testimonialsData } from '@/data/testimonialsData';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarUrl?: string;
  companyLogoUrl?: string;
}

const TestimonialsSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Bölüm Başlığı */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Müşterilerimiz Ne Söyledi?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Başarımızın ardındaki gerçek hikayeler.
          </Typography>
        </Box>

        {/* Yorum Kartları */}
        <Grid container spacing={4} justifyContent="center">
          {testimonialsData.map((testimonial: Testimonial, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: '16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                  },
                }}
              >
                {/* Avatar için ismin ilk harfi gösteriliyor */}
                <Avatar
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    fontSize: '2rem',
                  }}
                >
                  {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : null}
                </Avatar>

                {/* Yorum Metni */}
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
                  {`"${testimonial.quote}"`} {/* DEĞİŞİKLİK BURADA */}
                </Typography>

                {/* Müşteri Bilgisi */}
                <Typography variant="h6" component="p" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {testimonial.name}
                </Typography>
                {testimonial.title && testimonial.company && (
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.title}, {testimonial.company}
                  </Typography>
                )}
                {testimonial.companyLogoUrl && (
                  <Box
                    component="img"
                    src={testimonial.companyLogoUrl}
                    alt={`${testimonial.company} logo`}
                    sx={{
                      maxWidth: '80px',
                      mt: 2,
                      filter: 'grayscale(100%)',
                      opacity: 0.7,
                    }}
                  />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;