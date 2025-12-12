import { notFound } from "next/navigation";

export default function CatchAllPage() {
  // Bu sayfa, tanımlı olmayan tüm URL'ler için çalışır
  // ve direkt olarak 'not-found.tsx' dosyasını tetikler.
  notFound();
}