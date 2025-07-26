// src/components/sections/home/WhyUsSection.tsx
'use client';

import React from 'react'; //
import { Box, Container, Grid, Typography } from '@mui/material'; //
import { whyUsData } from '@/data/whyUsData'; //

const WhyUsSection = () => { //
  return ( //
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}> {/* */}
      <Container maxWidth="lg"> {/* */}
        {/* Bölüm Başlığı */}
        <Box sx={{ mb: 8, textAlign: 'center' }}> {/* */}
          <Typography //
            variant="h3" //
            component="h2" //
            sx={{ fontWeight: 700, mb: 1 }} //
          >
            Neden acrtech?
          </Typography>
          <Typography variant="h6" color="text.secondary"> {/* */}
            İşinizi büyütürken güvenilir teknoloji partneriniz.
          </Typography>
        </Box>

        {/* Özellikler */}
        <Grid container spacing={5}> {/* */}
          {whyUsData.map((feature, index) => ( //
            <Grid size={{ xs: 12, sm: 6 }} key={index}> {/* */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}> {/* */}
                {/* İkonu saran Box bileşenine animasyon ekliyoruz */}
                <Box
                  sx={{
                    color: 'primary.main', //
                    mt: 0.5, //
                    transition: 'transform 0.3s ease-in-out', // Animasyon geçişi ekle
                    '&:hover': {
                      transform: 'rotate(5deg) scale(1.05)', // Üzerine gelince 5 derece dön ve %5 büyüt
                    },
                  }}
                >
                  <feature.icon sx={{ fontSize: 40 }} /> {/* */}
                </Box>
                <Box> {/* */}
                  <Typography //
                    variant="h6" //
                    component="h3" //
                    sx={{ fontWeight: 600, mb: 1 }} //
                  >
                    {feature.title} {/* */}
                  </Typography>
                  <Typography variant="body1" color="text.secondary"> {/* */}
                    {feature.description} {/* */}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyUsSection; //