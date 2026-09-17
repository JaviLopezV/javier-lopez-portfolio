"use client";

import { useState } from "react";
import { KeyboardArrowDown, Translate } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Link as LocaleLink } from "../../i18n/navigation";

export default function LanguageDropdown({
  about,
  canViewAbout,
}: {
  about: boolean;
  canViewAbout: boolean;
}) {
  const t = useTranslations("Home");
  const locale = useLocale();
  const sectionHref = canViewAbout
    ? about ? "/?about=1" : "/?about=1&view=projects#proyectos"
    : "/";
  const [languageMenu, setLanguageMenu] = useState<null | HTMLElement>(null);
  const languages = [
    { locale: "es", label: "Español", short: "ES" },
    { locale: "ca", label: "Català", short: "CA" },
    { locale: "en", label: "English", short: "EN" },
  ] as const;

  return (
    <>
      <Button
        id="language-button"
        aria-label={t("languageSelector")}
        aria-controls={languageMenu ? "language-menu" : undefined}
        aria-haspopup="menu"
        aria-expanded={Boolean(languageMenu)}
        onClick={(event) => setLanguageMenu(event.currentTarget)}
        startIcon={<Translate sx={{ fontSize: 18 }} />}
        endIcon={<KeyboardArrowDown sx={{ fontSize: 18 }} />}
        sx={{
          minWidth: 0,
          px: 1.5,
          py: 0.9,
          color: "var(--ink)",
          border: "1px solid var(--line)",
          borderRadius: "999px",
          fontSize: 12,
          fontWeight: 800,
          "&:hover": {
            bgcolor: "rgba(25, 26, 22, .06)",
            borderColor: "var(--ink)",
          },
        }}
      >
        {locale.toUpperCase()}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={languageMenu}
        open={Boolean(languageMenu)}
        onClose={() => setLanguageMenu(null)}
        slotProps={{
          list: { "aria-labelledby": "language-button" },
          paper: {
            sx: {
              mt: 1,
              minWidth: 150,
              borderRadius: 2,
              boxShadow: "0 12px 32px rgba(25, 26, 22, .16)",
            },
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.locale}
            component={LocaleLink}
            href={sectionHref}
            locale={language.locale}
            selected={locale === language.locale}
            onClick={() => setLanguageMenu(null)}
            sx={{
              gap: 1.5,
              py: 1.1,
              fontSize: 14,
              "&.Mui-selected": { bgcolor: "rgba(215, 255, 79, .45)" },
            }}
          >
            <Box
              component="span"
              sx={{ width: 25, fontWeight: 800, fontSize: 11 }}
            >
              {language.short}
            </Box>
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
