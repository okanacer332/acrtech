// src/app/case-studies/[slug]/page.tsx
import { getCaseStudyData, getAllCaseStudySlugs } from '@/lib/caseStudies'; // caseStudies helper'ı import ediyoruz
import { Container, Typography, Box, Divider } from '@mui/material';
import type { Metadata, ResolvingMetadata } from 'next';

// Prop tiplerini Next.js 15 breaking change'ine göre güncelliyoruz.
type Props = {
  params: Promise<{ slug: string }>; // 'id' yerine 'slug' kullanıyoruz
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Dinamik SEO bilgileri için metadata fonksiyonu
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const caseStudyData = await getCaseStudyData(resolvedParams.slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: caseStudyData.title,
    description: caseStudyData.excerpt || caseStudyData.contentHtml.substring(0, 160), // excerpt yoksa içerikten al
    openGraph: {
      images: ['/default-case-study-image.jpg', ...previousImages], // Vaka analizi için varsayılan görsel
    },
  };
}

// Tüm olası vaka analizi sayfalarını Next.js'e bildiren fonksiyon
export function generateStaticParams() {
  const paths = getAllCaseStudySlugs();
  return paths.map((p) => ({ slug: p.slug })); // return formatını slug olarak düzenliyoruz
}

export default async function CaseStudyPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const caseStudyData = await getCaseStudyData(resolvedParams.slug);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box component="article">
        {/* Vaka Analizi Başlığı */}
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          {caseStudyData.title}
        </Typography>

        {/* Müşteri ve Tarih Bilgisi */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Müşteri: {caseStudyData.client} | Kategori: {caseStudyData.category} | Yayınlanma Tarihi: {new Date(caseStudyData.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Vaka Analizi İçeriği (HTML olarak) */}
        <Box
          sx={{
            '& h2': { mt: 4, mb: 2, fontSize: '2rem', fontWeight: 600 },
            '& h3': { mt: 3, mb: 1.5, fontSize: '1.75rem', fontWeight: 600 },
            '& p': { mb: 2, lineHeight: 1.7 },
            '& ul': { mb: 2, pl: 3, listStyleType: 'disc' },
            '& li': { mb: 1 },
            '& a': { color: 'primary.main', textDecoration: 'underline' },
          }}
          dangerouslySetInnerHTML={{ __html: caseStudyData.contentHtml }}
        />
      </Box>
    </Container>
  );
}