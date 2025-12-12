import { ClientHomeWrapper } from "./client-home-wrapper"; // Yeni bir dosya oluşturacağız

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  await params; 

  return <ClientHomeWrapper />;
}