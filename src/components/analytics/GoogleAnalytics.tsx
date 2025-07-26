// src/components/analytics/GoogleAnalytics.tsx
'use client';

import Script from 'next/script';

const GoogleAnalytics = ({ gaId }: { gaId: string }) => {
  // Canlı ortamda değilsek veya gaId yoksa, hiçbir şey render etme.
  if (process.env.NODE_ENV !== 'production' || !gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
