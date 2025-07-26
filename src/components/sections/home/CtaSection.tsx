// src/components/sections/home/CtaSection.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const CtaSection = () => {
  return (
    // Navbar'dan ve diğer linklerden gelen yönlendirmenin burayı bulabilmesi için ID ekliyoruz
    <Box id="iletisim" sx={{ bgcolor: 'primary.main', color: 'white' }}>
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 2, maxWidth: '600px' }}
        >
          Projenizi Hayata Geçirmeye Hazır Mısınız?
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 4, maxWidth: '700px', opacity: 0.9 }}
        >
          Fikrinizi bizimle paylaşın, size özel çözümlerle işinizi nasıl bir üst seviyeye taşıyabileceğimizi konuşalım.
        </Typography>
        <Button
          component="a" // E-posta linki için 'a' etiketi kullanıyoruz
          href="mailto:info@acrtech.com.tr,acer.okanumut@gmail.com" // Her iki e-posta adresi de eklendi
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            py: 1.5,
            px: 6,
            fontSize: '1.2rem',
            color: 'primary.main',
            fontWeight: 700,
            '&:hover': {
                bgcolor: 'secondary.dark'
            }
          }}
        >
          Bize Ulaşın
        </Button>
      </Container>
    </Box>
  );
};

export default CtaSection;
