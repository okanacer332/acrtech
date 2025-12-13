import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export type ContentType = 'projects' | 'articles' | 'demos' | 'legal';

export interface ContentItem {
  slug: string;
  type: ContentType;
  lang: string;
  frontMatter: {
    title: string;
    category?: string;
    description?: string;
    date?: string; // İsteğe bağlı
    image?: string;
    [key: string]: any;
  };
  content: any;
}

const root = process.cwd();

export async function getAllContent(type: ContentType, lang: string): Promise<ContentItem[]> {
  const contentPath = path.join(root, 'src', 'content', type, lang);

  if (!fs.existsSync(contentPath)) {
    if (type === 'legal') return [];
    console.warn(`Klasör bulunamadı: ${contentPath}`);
    return [];
  }

  const files = fs.readdirSync(contentPath);

  const items = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const source = fs.readFileSync(path.join(contentPath, file), 'utf8');
        const { data } = matter(source);
        const slug = file.replace('.md', '');

        return {
          slug,
          type,
          lang,
          frontMatter: data as ContentItem['frontMatter'],
          content: null,
        };
      })
  );

  // GÜNCELLENEN KISIM: Güvenli Sıralama
  return items.sort((a, b) => {
    // Tarih yoksa 0 kabul et (en sona atar), varsa timestamp'e çevir
    const dateA = a.frontMatter.date ? new Date(a.frontMatter.date).getTime() : 0;
    const dateB = b.frontMatter.date ? new Date(b.frontMatter.date).getTime() : 0;
    return dateB - dateA;
  });
}

export async function getContentBySlug(type: ContentType, lang: string, slug: string): Promise<ContentItem | null> {
  const filePath = path.join(root, 'src', 'content', type, lang, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  
  const mdxSource = await serialize(content);

  return {
    slug,
    type,
    lang,
    frontMatter: data as ContentItem['frontMatter'],
    content: mdxSource,
  };
}