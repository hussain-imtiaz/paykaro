/** Project-site prefix, empty in local dev. Inlined at build time. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative URL for GitHub Pages. Leaves local paths unchanged. */
export function withBase(path: string) {
  if (!basePath || !path.startsWith("/")) return path;
  const hashAt = path.indexOf("#");
  const hash = hashAt >= 0 ? path.slice(hashAt) : "";
  const bare = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const prefixed = bare === "/" ? `${basePath}/` : `${basePath}${bare}`;
  const slashed = prefixed.endsWith("/") || /\.[a-z0-9]+$/i.test(prefixed) ? prefixed : `${prefixed}/`;
  return slashed + hash;
}
