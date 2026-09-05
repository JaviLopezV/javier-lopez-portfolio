import { ArrowBack } from "@mui/icons-material";
import { Container, Stack, Typography } from "@jlopvil/mui-kit";
import { Box } from "@mui/material";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link as LocaleLink } from "../../../../i18n/navigation";

const documents = ["legal", "privacy", "cookies"] as const;
type Document = (typeof documents)[number];
type Props = {
  params: Promise<{ locale: string; document: string }>;
};
type Section = { title: string; paragraphs: string[] };

function isDocument(value: string): value is Document {
  return documents.includes(value as Document);
}

export function generateStaticParams() {
  return documents.map((document) => ({ document }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { document, locale } = await params;
  if (!isDocument(document)) return {};

  const t = await getTranslations({ locale, namespace: "Legal" });
  return {
    title: `${t(`documents.${document}.title`)} — Javier López`,
    description: t(`documents.${document}.description`),
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({ params }: Props) {
  const { document } = await params;
  if (!isDocument(document)) notFound();

  const t = await getTranslations("Legal");
  const sections = t.raw(`documents.${document}.sections`) as Section[];

  return (
    <Box
      component="main"
      sx={{ bgcolor: "var(--paper)", minHeight: "100vh", py: { xs: 5, md: 9 } }}
    >
      <Container maxWidth="md">
        <LocaleLink
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 48,
            fontWeight: 700,
          }}
        >
          <ArrowBack fontSize="small" /> {t("backHome")}
        </LocaleLink>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 42, md: 68 },
            fontWeight: 900,
            letterSpacing: "-.055em",
            lineHeight: 1,
            mb: 2,
          }}
        >
          {t(`documents.${document}.title`)}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 7 }}>
          {t("lastUpdated")}
        </Typography>
        <Stack spacing={5}>
          {sections.map((section) => (
            <Box component="section" key={section.title}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, mb: 2 }}
              >
                {section.title}
              </Typography>
              <Stack spacing={2}>
                {section.paragraphs.map((paragraph) => (
                  <Typography
                    key={paragraph}
                    sx={{
                      fontSize: 17,
                      lineHeight: 1.75,
                      color: "text.secondary",
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
