// src/app/blog/[id]/page.tsx
import { getPostData, getAllPostIds } from '@/lib/posts';
import { Container, Typography, Box, Divider } from '@mui/material';
import type { Metadata, ResolvingMetadata } from 'next'; // 'ResolvingMetadata' tipi eklendi

// Prop tiplerini Next.js 15 breaking change'ine göre güncelliyoruz.
// 'params' ve 'searchParams' artık Promise tipinde.
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Dinamik SEO bilgileri için generateMetadata fonksiyonu
export async function generateMetadata(
  { params, searchParams }: Props, // Destructuring yaparken Promise'leri yakalıyoruz
  parent: ResolvingMetadata // Üst segmentlerden gelen metadata için 'parent' parametresi
): Promise<Metadata> {
  const resolvedParams = await params; // params Promise olduğu için 'await' ediyoruz
  const postData = await getPostData(resolvedParams.id);

  // İsteğe bağlı olarak üst metadata'ya erişebilir ve genişletebiliriz (dökümantasyon örneğinden alınmıştır)
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: postData.title,
    description: postData.contentHtml.substring(0, 160), // İçeriğin ilk 160 karakterini açıklama yap
    openGraph: { // Dökümantasyon örneğinden bir openGraph alanı eklendi
      images: ['/default-blog-image.jpg', ...previousImages],
    },
  };
}

// Tüm olası blog sayfalarını Next.js'e bildiren fonksiyon (Bu fonksiyon senkron kalabilir)
export function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function PostPage({ params, searchParams }: Props) {
  const resolvedParams = await params; // Sayfa bileşeninde de params Promise olduğu için 'await' ediyoruz
  // searchParams'ı doğrudan kullanmıyorsanız await etmenize gerek yok, ancak tip tutarlılığı için yapabilirsiniz:
  // const resolvedSearchParams = await searchParams;

  const postData = await getPostData(resolvedParams.id);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box component="article">
        {/* Yazı Başlığı */}
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          {postData.title}
        </Typography>

        {/* Yazar ve Tarih Bilgisi */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Yazar: {postData.author} | Yayınlanma Tarihi: {new Date(postData.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Yazı İçeriği (HTML olarak) */}
        <Box
          sx={{
            '& h2': { mt: 4, mb: 2, fontSize: '2rem', fontWeight: 600 },
            '& p': { mb: 2, lineHeight: 1.7 },
            '& a': { color: 'primary.main', textDecoration: 'underline' },
          }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </Box>
    </Container>
  );
}