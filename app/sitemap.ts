import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";
import { legalDocuments } from "./legal-documents";
import { localizedAlternates } from "./seo";

const paths = ["", ...legalDocuments.map((document) => `/legal/${document}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map((path) => {
      const { canonical, languages } = localizedAlternates(locale, path);
      return { url: canonical, alternates: { languages } };
    }),
  );
}
