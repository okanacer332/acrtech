import { ClientHomeWrapper } from "./client-home-wrapper";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  await params; 

  return <ClientHomeWrapper />;
}
