"use client";

import { useEffect, useState } from "react";
import { AboutContent } from "./about-content";
import { Container, Link, Stack, Typography } from "@jlopvil/mui-kit";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link as LocaleLink } from "../../i18n/navigation";
import { HomeContent } from "./home-content";
import SiteFooter from "./site-footer";
import LanguageDropdown from "./language-dropdown";

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
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        bgcolor: "rgba(243, 241, 233, .9)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 5, lg: 8 } }}>
        <Box
          sx={{
            minHeight: { xs: 104, md: 88 },
            py: { xs: 1.5, md: 2 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr auto", md: "1fr auto 1fr" },
            alignItems: "center",
            columnGap: { xs: 1.5, md: 3 },
            rowGap: 1.5,
          }}
        >
          <Link
            component={LocaleLink}
            href="/"
            underline="none"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              width: "fit-content",
              color: "var(--ink)",
              "&:hover .brand-mark": { bgcolor: "#34372b" },
            }}
          >
            <Box
              className="brand-mark"
              sx={{
                display: "grid",
                placeItems: "center",
                width: 42,
                height: 42,
                bgcolor: "var(--ink)",
                color: "var(--acid)",
                borderRadius: "12px",
                fontSize: 17,
                fontWeight: 900,
                letterSpacing: "-.08em",
                transition: "background-color .2s ease",
              }}
            >
              JL.
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                letterSpacing: "-.04em",
                fontSize: { xs: 15, sm: 17 },
              }}
            >
              Javier López
            </Typography>
          </Link>

          <Stack
            component="nav"
            aria-label={t("navigation")}
            direction="row"
            alignItems="center"
            sx={{
              gridColumn: { xs: "1 / -1", md: "2" },
              gridRow: { xs: "2", md: "1" },
              justifySelf: { xs: "stretch", md: "center" },
              p: 0.5,
              gap: 0.5,
              border: "1px solid var(--line)",
              borderRadius: "999px",
              bgcolor: "rgba(255, 255, 255, .35)",
            }}
          >
            <Link
              href="#proyectos"
              underline="none"
              aria-current={!about ? "page" : undefined}
              sx={{
                flex: { xs: 1, md: "none" },
                textAlign: "center",
                px: { xs: 2, md: 2.5 },
                py: 0.9,
                borderRadius: "999px",
                fontSize: 13,
                fontWeight: 700,
                bgcolor: !about ? "var(--ink)" : "transparent",
                color: !about ? "var(--paper)" : "var(--ink)",
                transition: "background-color .2s ease, color .2s ease",
                "&:hover": {
                  bgcolor: !about ? "var(--ink)" : "rgba(25, 26, 22, .08)",
                },
              }}
            >
              {t("navProjects")}
            </Link>
            <Link
              href="#sobre-mi"
              underline="none"
              aria-current={about ? "page" : undefined}
              sx={{
                flex: { xs: 1, md: "none" },
                textAlign: "center",
                px: { xs: 2, md: 2.5 },
                py: 0.9,
                borderRadius: "999px",
                fontSize: 13,
                fontWeight: 700,
                bgcolor: about ? "var(--ink)" : "transparent",
                color: about ? "var(--paper)" : "var(--ink)",
                transition: "background-color .2s ease, color .2s ease",
                "&:hover": {
                  bgcolor: about ? "var(--ink)" : "rgba(25, 26, 22, .08)",
                },
              }}
            >
              {t("navAbout")}
            </Link>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            gap={{ md: 2, lg: 3 }}
            sx={{ gridColumn: { xs: "2", md: "3" }, gridRow: "1" }}
          >
            <Typography
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                gap: 1,
                whiteSpace: "nowrap",
                fontSize: 12,
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#8eaf22",
                }}
              />
              {t("availability")}
            </Typography>
            <LanguageDropdown about={about} />
          </Stack>
        </Box>
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
