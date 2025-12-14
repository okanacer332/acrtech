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
    const legals = await getAllContent('legal', lang);

    const hubItems = [...projects, ...articles, ...demos].map((item) => ({
      url: `${baseUrl}/${lang}/hub/${item.type}/${item.slug}`,
      lastModified: new Date(item.frontMatter.date || new Date().toISOString()),
      changeFrequency: 'daily' as const,
      priority: 1.0, 
    }));

    const legalItems = legals.map((item) => ({
      url: `${baseUrl}/${lang}/legal/${item.slug}`,
      lastModified: new Date(item.frontMatter.date || new Date().toISOString()),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    }));

    dynamicMap = [...dynamicMap, ...hubItems, ...legalItems];
  }

  return [...staticMap, ...dynamicMap];
}