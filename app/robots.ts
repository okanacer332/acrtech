import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrtech.com.tr';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // API ve Admin yollarını botlara kapatıyoruz
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Sitemap adresini botlara gösteriyoruz
  };
}