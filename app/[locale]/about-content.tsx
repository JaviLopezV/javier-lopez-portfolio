"use client";

import Image from "next/image";
import { ArrowOutward } from "@mui/icons-material";
import { Link, Stack, Typography } from "@jlopvil/mui-kit";
import { Box, Button, Chip } from "@mui/material";
import { useTranslations } from "next-intl";

type Job = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export function AboutContent() {
  const t = useTranslations("Home");
  const jobs = t.raw("about.jobs") as Job[];
  const education = t.raw("about.educationItems") as string[];
  return (
    <Box id="sobre-mi" sx={{ py: { xs: 7, md: 10 } }}>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          mb: 3,
        }}
      >
        {t("about.eyebrow")}
      </Typography>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: 48, md: 88 },
          fontWeight: 900,
          letterSpacing: "-.065em",
          lineHeight: 1,
          maxWidth: 1000,
          whiteSpace: "pre-line",
          mb: 5,
        }}
      >
        {t("about.title")}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
          gap: { xs: 6, md: 10 },
          alignItems: "start",
        }}
      >
        <Stack spacing={6}>
          <Typography sx={{ fontSize: { xs: 19, md: 23 }, lineHeight: 1.6 }}>
            {t("about.intro")}
          </Typography>
          <Box component="section">
            <Typography
              component="h2"
              sx={{ fontSize: 30, fontWeight: 800, mb: 3 }}
            >
              {t("about.experience")}
            </Typography>
            {jobs.map((job) => (
              <Box
                key={job.company}
                sx={{ borderTop: "1px solid var(--line)", py: 3 }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {job.period}
                </Typography>
                <Typography
                  component="h3"
                  sx={{ fontSize: 24, fontWeight: 800 }}
                >
                  {job.company}
                </Typography>
                <Typography sx={{ fontWeight: 700, mt: 0.5, mb: 1.5 }}>
                  {job.role}
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                  {job.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
        <Stack spacing={5}>
          <Box>
            <Link
              href="/javier-lopez-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("viewResume")}
              sx={{
                display: "block",
                border: "1px solid var(--ink)",
                bgcolor: "#fff",
                mb: 2,
              }}
            >
              <Image
                src="/javier-lopez-cv-preview.png"
                alt={t("resumePreviewAlt")}
                width={848}
                height={1200}
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </Link>
            <Button
              href="/javier-lopez-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowOutward />}
              sx={{
                bgcolor: "var(--acid)",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                px: 3,
                py: 1.5,
              }}
            >
              {t("viewResume")}
            </Button>
          </Box>
          <Box component="section">
            <Typography
              component="h2"
              sx={{ fontSize: 26, fontWeight: 800, mb: 2 }}
            >
              {t("about.skills")}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Material UI",
                "Redux",
                "Zustand",
                "Node.js",
                "Ruby on Rails",
                "Prisma",
                "SQL",
                "Jest",
                "Testing Library",
                "Docker",
                "CI/CD",
              ].map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  variant="outlined"
                  sx={{ borderRadius: 10 }}
                />
              ))}
            </Stack>
          </Box>
          <Box component="section">
            <Typography
              component="h2"
              sx={{ fontSize: 26, fontWeight: 800, mb: 2 }}
            >
              {t("about.education")}
            </Typography>
            {education.map((item) => (
              <Typography
                key={item}
                sx={{ mb: 2, lineHeight: 1.6, color: "text.secondary" }}
              >
                {item}
              </Typography>
            ))}
          </Box>
          <Box component="section">
            <Typography
              component="h2"
              sx={{ fontSize: 26, fontWeight: 800, mb: 2 }}
            >
              {t("about.languages")}
            </Typography>
            <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
              {t("about.languageDetail")}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
