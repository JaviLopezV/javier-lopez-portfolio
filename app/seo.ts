import { routing } from "../i18n/routing";

type Locale = (typeof routing.locales)[number];

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

export function localizedUrl(locale: Locale, path = "") {
  return new URL(`/${locale}${path}`, siteUrl).href;
}

export function localizedAlternates(locale: Locale, path = "") {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((language) => [
          language,
          localizedUrl(language, path),
        ]),
      ),
      "x-default": localizedUrl(routing.defaultLocale, path),
    },
  };
}
