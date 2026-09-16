"use client";

import { Container, Link, Stack, Typography } from "@jlopvil/mui-kit";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link as LocaleLink } from "../../i18n/navigation";

export default function SiteFooter() {
  const t = useTranslations("Home");
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "var(--ink)",
        color: "var(--paper)",
        py: { xs: 7, md: 10 },
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 5, lg: 8 } }}>
        <Typography
          sx={{
            fontSize: { xs: 44, md: 84 },
            fontWeight: 800,
            letterSpacing: "-.06em",
            lineHeight: 0.95,
            maxWidth: 900,
            mb: 3,
          }}
        >
          {t("footerTitle")}
        </Typography>
        <Link
          href="mailto:jlopvil@gmail.com"
          color="inherit"
          underline="always"
          sx={{ display: "inline-block", fontSize: { xs: 20, md: 28 }, mb: 7 }}
        >
          jlopvil@gmail.com
        </Link>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          gap={2}
          sx={{ pt: 3, borderTop: "1px solid #494a44" }}
        >
          <Typography sx={{ color: "#a9aaa1" }}>
            {t("footerCopyright")}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            <Link
              component={LocaleLink}
              href="/legal/legal"
              color="inherit"
              underline="hover"
            >
              {t("legalNotice")}
            </Link>
            <Link
              component={LocaleLink}
              href="/legal/privacy"
              color="inherit"
              underline="hover"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              component={LocaleLink}
              href="/legal/cookies"
              color="inherit"
              underline="hover"
            >
              {t("cookiePolicy")}
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
