// src/app/case-studies/page.tsx
import { getSortedCaseStudiesData } from '@/lib/caseStudies';
import { Container, Typography, Box, Card, CardContent, Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import type { Metadata } from 'next';

// Sayfanın SEO bilgileri
export const metadata: Metadata = {
  title: 'Vaka Analizleri',
  description: 'acrtech projelerinin detaylı vaka analizleri ve başarı hikayeleri.',
};

export default function CaseStudiesPage() {
  // Tüm vaka analizlerini tarihe göre sıralı bir şekilde al
  const allCaseStudiesData = getSortedCaseStudiesData();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
        Vaka Analizleri
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {allCaseStudiesData.map(({ slug, date, title, excerpt, client, category }) => (
          <Card key={slug} sx={{ boxShadow: 3, borderRadius: '16px', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
            <CardContent sx={{ p: {xs: 2, sm: 4} }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                {/* Başlık linki için aria-label eklendi */}
                <MuiLink component={Link} href={`/case-studies/${slug}`} underline="hover" color="inherit" aria-label={`${title} başlıklı vaka analizini incele`}>
                  {title}
                </MuiLink>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Müşteri: {client} | Kategori: {category} | Yayınlanma Tarihi: {new Date(date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {excerpt}
              </Typography>
              {/* Detayı İncele butonu için aria-label eklendi */}
              <Button component={Link} href={`/case-studies/${slug}`} variant="contained" aria-label={`${title} vaka analizinin detayını incele`}>
                Detayı İncele
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}