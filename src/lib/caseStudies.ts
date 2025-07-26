// src/lib/caseStudies.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const caseStudiesDirectory = path.join(process.cwd(), 'case-studies');

// Tüm vaka analizlerinin başlık, tarih, özet gibi metadatasını getiren fonksiyon
export function getSortedCaseStudiesData() {
  const fileNames = fs.readdirSync(caseStudiesDirectory);
  const allCaseStudiesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(caseStudiesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...(matterResult.data as { title: string; date: string; excerpt: string; client: string; category: string }),
    };
  });

  return allCaseStudiesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Next.js'in dinamik rotalar için ihtiyaç duyduğu tüm vaka analizi slug'larını getiren fonksiyon
export function getAllCaseStudySlugs() {
  const fileNames = fs.readdirSync(caseStudiesDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

// Belirli bir slug'a sahip vaka analizinin tüm verisini ve içeriğini HTML olarak getiren fonksiyon
export async function getCaseStudyData(slug: string) {
  const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
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
    slug,
    contentHtml,
    // ÖNEMLİ DEĞİŞİKLİK: 'excerpt' özelliği eklendi
    ...(matterResult.data as { title: string; date: string; excerpt: string; client: string; category: string }),
  };
}