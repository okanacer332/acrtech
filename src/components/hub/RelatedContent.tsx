import Link from 'next/link';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function RelatedContent({ currentSlug, items, lang }: { currentSlug: string, items: any[], lang: string }) {
  // Kendisi hariç, aynı kategoriden rastgele 2 içerik seç
  const related = items
    .filter(item => item.slug !== currentSlug)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <h3 className="text-2xl font-bold text-white mb-6">Bunlar da İlginizi Çekebilir 👇</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.map((item) => (
          <Link key={item.slug} href={`/${lang}/hub/${item.type}/${item.slug}`} className="group">
            <Card className="bg-slate-900/50 border-white/5 p-4 hover:border-blue-500/30 transition-all">
              <h4 className="text-lg font-semibold text-gray-200 group-hover:text-blue-400">
                {item.frontMatter.title}
              </h4>
              <Badge variant="outline" className="mt-2 bg-white/5 text-gray-400">
                {item.frontMatter.category}
              </Badge>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}