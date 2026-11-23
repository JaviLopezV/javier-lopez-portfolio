import SiteLoader from "../site-loader";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { siteUrl } from "../seo";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: siteUrl,
  verification: {
    google: "-FEE06keQQoGEpHbLrFyZ6-RhChFiHAt5bYBvnJdOvc",
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();
  const { Home, InterviewAccess } = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <SiteLoader />
        <NextIntlClientProvider messages={{ Home, InterviewAccess }}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
