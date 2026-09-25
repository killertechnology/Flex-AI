const baseUrl = import.meta.env.BASE_URL;

export function assetUrl(path: string) {
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${cleanBase}${path.replace(/^\//, '')}`;
}
