"use client";

import { useEffect, useState } from "react";
import { AboutContent } from "./about-content";
import { Circle } from "@mui/icons-material";
import { Container, Link, Stack, Typography } from "@jlopvil/mui-kit";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Link as LocaleLink } from "../../i18n/navigation";
import { HomeContent } from "./home-content";
import SiteFooter from "./site-footer";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#191a16" },
    background: { default: "#f3f1e9", paper: "#e9e6dc" },
    text: { primary: "#191a16", secondary: "#696b61" },
  },
  shape: { borderRadius: 0 },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
    button: { textTransform: "none", fontWeight: 700 },
  },
});

function SiteHeader({ about }: { about: boolean }) {
  const t = useTranslations("Home");
  const locale = useLocale();
  return (
    <Box component="header" sx={{ borderBottom: "1px solid var(--line)" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 5, lg: 8 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ minHeight: 78, py: 2, flexWrap: "wrap", gap: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Circle sx={{ fontSize: 12, color: "#a4c92c" }} />
            <Typography sx={{ fontWeight: 800, letterSpacing: "-.03em" }}>
              Javier López
            </Typography>
          </Stack>
          <Stack direction="row" spacing={{ xs: 2, md: 4 }} alignItems="center">
            <Link
              href="#proyectos"
              underline={about ? "none" : "always"}
              aria-current={!about ? "page" : undefined}
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              {t("navProjects")}
            </Link>
            <Link
              href="#sobre-mi"
              underline={about ? "always" : "none"}
              aria-current={about ? "page" : undefined}
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              {t("navAbout")}
            </Link>
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              {t("availability")}
            </Typography>
            <Stack direction="row" spacing={1} aria-label="Language">
              <Link
                component={LocaleLink}
                href={about ? "/#sobre-mi" : "/"}
                locale="es"
                underline={locale === "es" ? "always" : "hover"}
                sx={{ fontSize: 13, fontWeight: 800 }}
              >
                {t("languageSpanish")}
              </Link>
              <Link
                component={LocaleLink}
                href={about ? "/#sobre-mi" : "/"}
                locale="en"
                underline={locale === "en" ? "always" : "hover"}
                sx={{ fontSize: 13, fontWeight: 800 }}
              >
                {t("languageEnglish")}
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Home() {
  const [about, setAbout] = useState(false);
  useEffect(() => {
    const syncSection = () => {
      const isAbout = window.location.hash === "#sobre-mi";
      setAbout(isAbout);
      if (isAbout) window.scrollTo(0, 0);
    };
    syncSection();
    window.addEventListener("hashchange", syncSection);
    return () => window.removeEventListener("hashchange", syncSection);
  }, []);
  useEffect(() => {
    if (!about && window.location.hash === "#proyectos") {
      document.getElementById("proyectos")?.scrollIntoView();
    }
  }, [about]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteHeader about={about} />
      <Box component="main">
        <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 5, lg: 8 } }}>
          {about ? <AboutContent /> : <HomeContent />}
        </Container>
      </Box>
      <SiteFooter />
    </ThemeProvider>
  );
}
