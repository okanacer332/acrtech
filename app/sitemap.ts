import { MetadataRoute } from 'next';
import { i18n } from '@/src/i18n-config';
import { getAllContent } from '@/src/lib/mdx';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrtech.com.tr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', 'hub', 'hub/projects', 'hub/articles', 'hub/demos'];
  
  const staticMap = i18n.locales.flatMap((lang) => {
    return staticRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8, 
    }));
  });

  let dynamicMap: MetadataRoute.Sitemap = [];

  for (const lang of i18n.locales) {
    const projects = await getAllContent('projects', lang);
    const articles = await getAllContent('articles', lang);
    const demos = await getAllContent('demos', lang);

    const allItems = [...projects, ...articles, ...demos];

    const itemsMap = allItems.map((item) => ({
      url: `${baseUrl}/${lang}/hub/${item.type}/${item.slug}`,
      lastModified: new Date(item.frontMatter.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    dynamicMap = [...dynamicMap, ...itemsMap];
  }

  return [...staticMap, ...dynamicMap];
}