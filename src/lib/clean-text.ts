export function cleanMarkdown(markdown: string): string {
  if (!markdown) return "";

  let text = markdown
    // Başlık işaretlerini (#) kaldır
    .replace(/^#+\s+/gm, "")
    // Kalın ve İtalik (**text**, *text*) sembollerini kaldır
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // Linkleri ([text](url)) sadece text kalacak şekilde düzelt
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    // Kod bloklarını temizle
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    // Resimleri kaldır
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "")
    // HTML etiketlerini kaldır
    .replace(/<[^>]*>/g, "")
    // Gereksiz boşlukları tek boşluğa indir
    .replace(/\s+/g, " ");

  return text.trim();
}