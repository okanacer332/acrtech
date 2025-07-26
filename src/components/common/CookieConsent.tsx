// src/components/common/CookieConsent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Link as MuiLink } from '@mui/material';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde, kullanıcının daha önce bir seçim yapıp yapmadığını kontrol et
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Eğer daha önce seçim yapılmamışsa, banner'ı göster
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: { xs: 2, sm: 3 },
        zIndex: 1500, // Diğer tüm elemanların üzerinde olmasını sağlar
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          maxWidth: 'lg',
          mx: 'auto',
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          Site kullanımınızı iyileştirmek, kişiselleştirmek, reklamları ilgi alanlarınıza göre düzenlemek için çerezler kullanıyoruz. Çerez kullanımına dair detaylı bilgiye{' '}
          <MuiLink href="/cerez-politikasi" underline="always">Çerez Politikası</MuiLink>'ndan ulaşabilirsiniz.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Button variant="contained" onClick={handleAccept}>
            Kabul Et
          </Button>
          <Button variant="outlined" onClick={handleDecline}>
            Reddet
          </Button>
          {/* Kişiselleştir butonu şimdilik bir placeholder */}
          <Button variant="outlined" disabled>
            Kişiselleştir
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CookieConsent;
