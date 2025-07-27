// src/components/common/CustomCarousel.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery, Button } from '@mui/material'; // Button importu eklendi
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

interface CustomCarouselProps {
  slides: SlideData[];
  autoplayInterval?: number; // Otomatik geçiş süresi (ms)
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ slides, autoplayInterval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Otomatik oynatma efekti
  useEffect(() => {
    const interval = setInterval(nextSlide, autoplayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoplayInterval]);

  const slide = slides[currentSlide];

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        height: { xs: 'auto', md: '550px' }, // Responsive yükseklik, md'de sabit
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
      }}
    >
      {/* Slayt İçeriği */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 4, md: 8 },
          maxWidth: 'lg', // Container maxWidth'i ile aynı
          width: '100%',
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 3, md: 4 }, // Padding ekleyelim
          transition: 'opacity 0.8s ease-in-out', // Fade efekti
          opacity: 1, // Her zaman görünür olsun (geçişi CSS'de yöneteceğiz)
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {/* Sol Taraf: Metin ve Buton */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              lineHeight: { xs: 1.2, md: 'normal' },
              mb: 2,
              color: 'text.primary',
            }}
          >
            {slide.title}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              color: 'text.secondary',
            }}
          >
            {slide.subtitle}
          </Typography>
          {/* legacyBehavior kaldırıldı, Link doğrudan Button bileşenine component prop'u ile geçirildi */}
          <Button
            component={Link}
            href={slide.buttonLink}
            variant="contained"
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            sx={{ py: { xs: 1, md: 1.5 }, px: { xs: 3, md: 5 }, fontSize: { xs: '0.9rem', md: '1.1rem' } }}
          >
            {slide.buttonText}
          </Button>
        </Box>

        {/* Sağ Taraf: Görsel */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 200, sm: 300, md: 450 },
            width: { xs: '100%', md: '50%' }, // Responsive genişlik
            borderRadius: '16px',
            boxShadow: 6,
            mt: { xs: 4, md: 0 },
            overflow: 'hidden',
            flexShrink: 0, // Görselin küçülmesini engeller
          }}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // İlk slayt görseli için priority ekliyoruz
          />
        </Box>
      </Box>

      {/* Navigasyon Okları */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 32 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: 'text.primary',
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
          // isMobile kontrolü kaldırıldı, oklar artık her zaman görünür
          display: 'flex',
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 24, md: 30 } }} />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 32 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: 'text.primary',
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
          // isMobile kontrolü kaldırıldı, oklar artık her zaman görünür
          display: 'flex',
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: 24, md: 30 } }} />
      </IconButton>

      {/* Noktalar (Dots) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: index === currentSlide ? 'primary.main' : 'text.secondary',
              opacity: index === currentSlide ? 1 : 0.4,
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CustomCarousel;