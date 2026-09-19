"use client";
import { LanguageSelector } from "@jlopvil/mui-kit";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "../../i18n/navigation";
const languages = [
  { value: "es", label: "Español" },
  { value: "ca", label: "Català" },
  { value: "en", label: "English" },
] as const;
export default function LanguageDropdown({
  about,
  canViewAbout,
}: {
  about: boolean;
  canViewAbout: boolean;
}) {
  const t = useTranslations("Home");
  const locale = useLocale() as (typeof languages)[number]["value"];
  const router = useRouter();
  const sectionHref = canViewAbout
    ? about
      ? "/?about=1"
      : "/?about=1&view=projects#proyectos"
    : "/";
  return (
    <LanguageSelector
      value={locale}
      label={t("languageSelector")}
      options={languages}
      onChange={(nextLocale) =>
        router.push(sectionHref, { locale: nextLocale })
      }
      sx={{ color: "var(--ink)", borderColor: "var(--line)" }}
    />
  );
}
