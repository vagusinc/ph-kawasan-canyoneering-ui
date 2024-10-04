export function getAssetUrl(fileUrl: string) {
  const strapiUrl = process.env.STRAPI_API_URL?.replace("/api", "");
  return `${strapiUrl}${fileUrl}`;
}
