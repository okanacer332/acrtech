import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export type ContentType = 'projects' | 'articles' | 'demos';

export interface ContentItem {
  slug: string;
  type: ContentType;
  lang: string;
  frontMatter: {
    title: string;
    category: string;
    description: string;
    date: string;
    image: string;
    [key: string]: any;
  };
  content: any;
}

const root = process.cwd();

export async function getAllContent(type: ContentType, lang: string): Promise<ContentItem[]> {
  const contentPath = path.join(root, 'src', 'content', type, lang);

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
          content: null,
        };
      })
  );

  return items.sort((a, b) => (
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  ));
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