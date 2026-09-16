import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
const locales = ["es", "ca", "en"] as const;
const paths = ["", "/legal/legal", "/legal/privacy", "/legal/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: path ? ("yearly" as const) : ("monthly" as const),
      priority: path ? 0.3 : 1,
      alternates: {
        languages: {
          es: `${siteUrl}/es${path}`,
          ca: `${siteUrl}/ca${path}`,
          en: `${siteUrl}/en${path}`,
        },
      },
    })),
  );
}
