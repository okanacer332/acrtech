import { MetadataRoute } from 'next';
import { i18n } from '@/src/i18n-config';
import { getAllContent } from '@/src/lib/mdx';

// Site adresini production ortamında env'den alır, yoksa localhost döner
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrtech.com.tr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Statik Sayfalar (Ana sayfa, Hub vb.)
  const staticRoutes = ['', 'hub', 'hub/projects', 'hub/articles', 'hub/demos'];
  
  // Tüm diller ve statik rotalar için URL'leri oluştur
  const staticMap = i18n.locales.flatMap((lang) => {
    return staticRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8, // Ana sayfa önceliği 1, diğerleri 0.8
    }));
  });

  // 2. Dinamik İçerikler (Blog Yazıları, Projeler)
  // Tüm dillerdeki içerikleri çekip sitemap'e ekleyeceğiz
  let dynamicMap: MetadataRoute.Sitemap = [];

  for (const lang of i18n.locales) {
    // Projeler, Makaleler ve Demoları çek
    const projects = await getAllContent('projects', lang);
    const articles = await getAllContent('articles', lang);
    const demos = await getAllContent('demos', lang);

    const allItems = [...projects, ...articles, ...demos];

    const itemsMap = allItems.map((item) => ({
      url: `${baseUrl}/${lang}/hub/${item.type}/${item.slug}`,
      lastModified: new Date(item.frontMatter.date), // İçeriğin güncellenme tarihi
      changeFrequency: 'weekly' as const,
      priority: 0.7, // Detay sayfaları 0.7
    }));

    dynamicMap = [...dynamicMap, ...itemsMap];
  }

  // Hepsini birleştir ve döndür
  return [...staticMap, ...dynamicMap];
}