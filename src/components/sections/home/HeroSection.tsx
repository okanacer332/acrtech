// src/components/sections/home/HeroSection.tsx
'use client';

import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button, Container, GlobalStyles, Grid, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { heroSlidesData } from '@/data/heroSlidesData';

import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <Box
    className="slick-arrow"
    sx={{
      position: 'absolute',
      top: '50%',
      right: { xs: 8, md: 32 },
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <ArrowForwardIos sx={{ color: 'text.primary', fontSize: { xs: 24, md: 30 }, '&:hover': { opacity: 0.7 } }} />
  </Box>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <Box
    className="slick-arrow"
    sx={{
      position: 'absolute',
      top: '50%',
      left: { xs: 8, md: 32 },
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <ArrowBackIosNew sx={{ color: 'text.primary', fontSize: { xs: 24, md: 30 }, '&:hover': { opacity: 0.7 } }} />
  </Box>
);

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    fade: true,
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
          <Box key={slide.id}>
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
              <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" direction={isMobile ? 'column-reverse' : 'row'}>
                {/* Sol Taraf: Metin ve Buton */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
                </Grid>

                {/* Sağ Taraf: Görsel - objectFit: 'cover' olarak güncellendi */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: { xs: 200, sm: 300, md: 450 },
                      width: '100%',
                      borderRadius: '16px',
                      boxShadow: 6,
                      mt: { xs: 4, md: 0 },
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      style={{ objectFit: 'cover' }} // Değişiklik burada: 'contain' yerine 'cover'
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </Box>
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