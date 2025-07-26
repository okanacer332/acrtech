// src/components/sections/home/HeroSection.tsx
'use client';

import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button, Container, GlobalStyles, Grid } from '@mui/material';
import Link from 'next/link';
import { heroSlidesData } from '@/data/heroSlidesData';

// İkonları import ediyoruz
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';

// Gerekli CSS dosyaları
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// TypeScript için props tiplerini tanımlıyoruz
interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// Özel "İleri" oku bileşeni
const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <Box
    className="slick-arrow"
    sx={{
      position: 'absolute',
      top: '50%',
      right: { xs: 16, md: 32 },
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <ArrowForwardIos sx={{ color: 'text.primary', fontSize: 30, '&:hover': { opacity: 0.7 } }} />
  </Box>
);

// Özel "Geri" oku bileşeni
const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <Box
    className="slick-arrow"
    sx={{
      position: 'absolute',
      top: '50%',
      left: { xs: 16, md: 32 },
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <ArrowBackIosNew sx={{ color: 'text.primary', fontSize: 30, '&:hover': { opacity: 0.7 } }} />
  </Box>
);

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    fade: true, // Yumuşak geçiş için fade efekti
  };

  return (
    <Box sx={{ width: '100%', position: 'relative', bgcolor: 'background.paper', overflow: 'hidden' }}>
      <GlobalStyles
        styles={(theme) => ({
          '.slick-dots': {
            bottom: '20px',
          },
          '.slick-dots li button:before': {
            fontSize: '12px',
            color: theme.palette.text.secondary,
            opacity: 0.4,
          },
          '.slick-dots li.slick-active button:before': {
            opacity: 1,
            color: theme.palette.primary.main,
          },
        })}
      />
      <Slider {...settings}>
        {heroSlidesData.map((slide) => (
          // Her bir slayt artık kendi içinde bir Grid yapısı barındırıyor
          <Box key={slide.id}>
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
              <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
                {/* Sol Taraf: Metin ve Buton */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                      variant="h2"
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
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
                        color: 'text.secondary',
                      }}
                    >
                      {slide.subtitle}
                    </Typography>
                    <Button
                      component={Link}
                      href={slide.buttonLink}
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ py: 1.5, px: 5, fontSize: '1.1rem' }}
                    >
                      {slide.buttonText}
                    </Button>
                  </Box>
                </Grid>

                {/* Sağ Taraf: Görsel */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      height: { xs: 300, sm: 400, md: 450 },
                      width: '100%',
                      borderRadius: '16px',
                      boxShadow: 6,
                      backgroundImage: `url(${slide.imageUrl})`,
                      // --- DEĞİŞİKLİK BURADA ---
                      backgroundSize: 'contain', // 'cover' yerine 'contain' kullanıldı
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat', // Resmin tekrarlanmasını engelle
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSection;
