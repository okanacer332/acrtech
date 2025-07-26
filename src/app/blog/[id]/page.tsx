// src/app/blog/[id]/page.tsx
import { getPostData, getAllPostIds } from '@/lib/posts';
import { Container, Typography, Box, Divider } from '@mui/material';
import type { Metadata } from 'next';

// Dinamik SEO bilgileri için metadata fonksiyonu
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const postData = await getPostData(params.id);
  return {
    title: postData.title,
    description: postData.contentHtml.substring(0, 160), // İçeriğin ilk 160 karakterini açıklama yap
  };
}

// Tüm olası blog sayfalarını Next.js'e bildiren fonksiyon
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// Hatanın düzeltildiği kısım burası
export default async function PostPage({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

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