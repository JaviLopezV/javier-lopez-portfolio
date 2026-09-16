import SiteLoader from "../site-loader";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { es: "/es", ca: "/ca", en: "/en" },
    },
    openGraph: {
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      locale: locale === "es" ? "es_ES" : locale === "ca" ? "ca_ES" : "en_US",
      type: "website",
      images: [
        { url: "/og.png", width: 1200, height: 630, alt: t("imageAlt") },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      images: ["/og.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <SiteLoader />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
