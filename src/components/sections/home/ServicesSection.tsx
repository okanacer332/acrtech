// src/components/sections/home/ServicesSection.tsx
'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Avatar } from '@mui/material';
import { servicesData } from '@/data/servicesData';

const ServicesSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Bölüm Başlığı */}
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: 8, // Başlık ile kartlar arasına boşluk
          }}
        >
          Sunduğumuz Çözümler
        </Typography>

        {/* Hizmet Kartları */}
        <Grid container spacing={4}>
          {servicesData.map((service, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.main',
                      color: 'white',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <service.icon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
