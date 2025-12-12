import { ClientHomeWrapper } from "./client-home-wrapper"; // Yeni bir dosya oluşturacağız

// Bu sayfa artık Server Component olarak kalabilir!
// Ancak senin mevcut page.tsx dosyan "use client" ile başlıyor ve state içeriyor.
// Bu yüzden şimdilik içeriği Client Component olan bir Wrapper'a alacağız.

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  // params'a ihtiyacımız olursa buradan erişebiliriz
  await params; 

  return <ClientHomeWrapper />;
}