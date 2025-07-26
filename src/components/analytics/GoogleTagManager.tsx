// src/components/analytics/GoogleTagManager.tsx
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

const GoogleTagManager = ({ gtmId }: { gtmId: string }) => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Bu bileşen sadece client tarafında çalıştığı için localStorage'a erişebiliriz.
    try {
      const consentDataString = localStorage.getItem('cookie_consent');
      if (consentDataString) {
        const consentData = JSON.parse(consentDataString);
        // Eğer kullanıcı analitik çerezlere izin vermişse state'i güncelle.
        if (consentData.analytics) {
          setHasConsent(true);
        }
      }
    } catch (e) {
      console.error("Could not parse cookie consent JSON", e);
    }
  }, []);

  // Eğer canlı ortamda değilsek, gtmId yoksa veya kullanıcı izin vermemişse,
  // hiçbir script yükleme.
  if (!hasConsent || process.env.NODE_ENV !== 'production' || !gtmId) {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-manager-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
    </>
  );
};

export default GoogleTagManager;
