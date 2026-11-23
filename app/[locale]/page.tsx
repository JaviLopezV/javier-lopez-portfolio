import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { localizedAlternates, localizedUrl, siteUrl } from "../seo";
import { portfolioOwner } from "../portfolio";
import Home from "./home";

type Props = { params: Promise<{ locale: string }> };

const openGraphLocales = { es: "es_ES", ca: "ca_ES", en: "en_US" } as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates(locale),
    openGraph: {
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      url: localizedUrl(locale),
      locale: openGraphLocales[locale],
      alternateLocale: routing.locales
        .filter((language) => language !== locale)
        .map((language) => openGraphLocales[language]),
      type: "website",
      images: [
        { url: "/og.png", width: 1200, height: 630, alt: t("imageAlt") },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      images: [{ url: "/og.png", alt: t("imageAlt") }],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: localizedUrl(locale),
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": new URL("#javier-lopez-villanueva", siteUrl).href,
      name: portfolioOwner,
      description: t("description"),
      url: localizedUrl(routing.defaultLocale),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profile).replace(/</g, "\\u003c"),
        }}
      />
      <Home />
    </>
  );
}
