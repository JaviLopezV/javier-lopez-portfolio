import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "ca", "en"],
  defaultLocale: "es",
  localeCookie: false,
  alternateLinks: false, // Canonical language URLs are generated with page metadata.
});
