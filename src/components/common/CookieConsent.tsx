// src/components/common/CookieConsent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, Paper, Link as MuiLink,
  Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, FormControlLabel, Switch
} from '@mui/material';

// Kullanıcının çerez tercihlerini saklayacak arayüz
interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handlePreferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };

  const savePreferences = (prefs: ConsentPreferences) => {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs));
    setVisible(false);
    setSettingsOpen(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const handleDeclineAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };
  
  const handleSaveSettings = () => {
    savePreferences(preferences);
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 2, sm: 3 },
          zIndex: 1500,
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
            Site kullanımınızı iyileştirmek, kişiselleştirmek ve analiz etmek için çerezler kullanıyoruz. Detaylı bilgiye{' '}
            <MuiLink href="/cerez-politikasi" underline="always">Çerez Politikası</MuiLink>&apos;ndan ulaşabilirsiniz.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            <Button variant="contained" onClick={handleAcceptAll}>
              Tümünü Kabul Et
            </Button>
            <Button variant="outlined" onClick={() => setSettingsOpen(true)}>
              Kişiselleştir
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Kişiselleştirme Ayarları Penceresi (Dialog) */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <DialogTitle>Çerez Ayarları</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Sitemizdeki deneyiminizi kişiselleştirmek için çerez tercihlerinizi yönetebilirsiniz.
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked disabled />}
              label="Zorunlu Çerezler"
            />
            <Typography variant="caption" color="text.secondary" sx={{ pl: 4, mb:1 }}>
              Bu çerezler sitenin çalışması için gereklidir ve kapatılamaz.
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.analytics}
                  onChange={handlePreferenceChange}
                  name="analytics"
                />
              }
              label="Analitik Çerezler"
            />
            <Typography variant="caption" color="text.secondary" sx={{ pl: 4, mb:1 }}>
              Site trafiğini analiz etmemize ve performansı ölçmemize olanak tanır.
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.marketing}
                  onChange={handlePreferenceChange}
                  name="marketing"
                />
              }
              label="Pazarlama Çerezleri"
            />
             <Typography variant="caption" color="text.secondary" sx={{ pl: 4 }}>
              İlgi alanlarınıza yönelik reklamlar göstermek için kullanılır.
            </Typography>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeclineAll}>Tümünü Reddet</Button>
          <Button onClick={handleSaveSettings} variant="contained">
            Tercihlerimi Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CookieConsent;
