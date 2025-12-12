import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

// İçerik tiplerimiz
export type ContentType = 'projects' | 'articles' | 'demos';

// Bir içeriğin veri yapısı
export interface ContentItem {
  slug: string;
  type: ContentType; // 'projects' yerine 'project' kullanmak isterseniz burada mapping yapabiliriz
  lang: string;
  frontMatter: {
    title: string;
    category: string;
    description: string;
    date: string;
    image: string;
    [key: string]: any;
  };
  content: any; // Serialized MDX content
}

const root = process.cwd();

// Belirli bir tip ve dildeki tüm içerikleri listele
export async function getAllContent(type: ContentType, lang: string): Promise<ContentItem[]> {
  // Klasör yolu: src/content/[type]/[lang]
  const contentPath = path.join(root, 'src', 'content', type, lang);

  // Eğer klasör yoksa boş dön (Hata vermesin)
  if (!fs.existsSync(contentPath)) {
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
          content: null, // Listeleme yaparken içeriğe gerek yok, performans için boş geçiyoruz
        };
      })
  );

  // Tarihe göre yeniden eskiye sırala
  return items.sort((a, b) => (
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  ));
}

// Tek bir içeriği (slug ile) getir
export async function getContentBySlug(type: ContentType, lang: string, slug: string): Promise<ContentItem | null> {
  const filePath = path.join(root, 'src', 'content', type, lang, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  
  // İçeriği HTML'e çevir (Serialize)
  const mdxSource = await serialize(content);

  return {
    slug,
    type,
    lang,
    frontMatter: data as ContentItem['frontMatter'],
    content: mdxSource,
  };
}