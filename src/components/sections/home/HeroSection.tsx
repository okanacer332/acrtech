// src/components/sections/home/HeroSection.tsx
'use client'; // Bu bileşen client tarafında çalışır

import React from 'react';
import { Box } from '@mui/material'; // Sadece Box kaldı
import { heroSlidesData } from '@/data/heroSlidesData';
import CustomCarousel from '@/components/common/CustomCarousel'; // Yeni karusel bileşenimizi import ettik

const HeroSection = () => {
  return (
    <Box sx={{ width: '100%', position: 'relative', bgcolor: 'background.paper', overflow: 'hidden' }}>
      {/* Slick Carousel'e ait GlobalStyles ve ayarlar kaldırıldı */}
      <CustomCarousel slides={heroSlidesData} /> {/* Kendi CustomCarousel bileşenimizi kullanıyoruz */}
    </Box>
  );
};

export default HeroSection;