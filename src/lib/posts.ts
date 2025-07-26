// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as { title: string; date: string; excerpt: string; author: string }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Next.js'in dinamik rotalar için ihtiyaç duyduğu tüm post ID'lerini getiren fonksiyon
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ''),
    };
  });
}

// Belirli bir ID'ye sahip yazının tüm verisini ve içeriğini HTML olarak getiren fonksiyon
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Metadatayı ayrıştır
  const matterResult = matter(fileContents);

  // Markdown içeriğini HTML'e dönüştür
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Veriyi ve HTML içeriğini birleştir
  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; author: string }),
  };
}
