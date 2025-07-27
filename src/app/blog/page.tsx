// src/app/blog/page.tsx
import { getSortedPostsData } from '@/lib/posts';
import { Container, Typography, Box, Card, CardContent, Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import type { Metadata } from 'next';

// Sayfanın SEO bilgileri
export const metadata: Metadata = {
  title: 'Blog',
  description: 'acrtech - Teknoloji, ERP, Envanter Yönetimi ve SEO üzerine makaleler ve güncel bilgiler.',
};

export default function BlogPage() {
  // Tüm blog yazılarını tarihe göre sıralı bir şekilde al
  const allPostsData = getSortedPostsData();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
        Blog
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {allPostsData.map(({ id, date, title, excerpt, author }) => (
          <Card key={id} sx={{ boxShadow: 3, borderRadius: '16px', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
            <CardContent sx={{ p: {xs: 2, sm: 4} }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                {/* Başlık linki için aria-label eklendi */}
                <MuiLink component={Link} href={`/blog/${id}`} underline="hover" color="inherit" aria-label={`${title} başlıklı yazıyı oku`}>
                  {title}
                </MuiLink>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {new Date(date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })} - {author}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {excerpt}
              </Typography>
              {/* Devamını Oku butonu için aria-label eklendi */}
              <Button component={Link} href={`/blog/${id}`} variant="contained" aria-label={`${title} yazısının devamını oku`}>
                Devamını Oku
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}