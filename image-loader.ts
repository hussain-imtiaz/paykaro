// Static-export image URLs. Query params satisfy the loader contract; GitHub Pages ignores them.
export default function pagesImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = src.startsWith("/") ? `${base}${src}` : src;
  return `${path}?w=${width}&q=${quality ?? 75}`;
}
