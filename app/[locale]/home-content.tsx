"use client";

import { ArrowOutward, NorthEast } from "@mui/icons-material";
import { Button, Link, Stack, Typography } from "@jlopvil/mui-kit";
import { Box, Chip } from "@mui/material";
import { useTranslations } from "next-intl";
import ProjectPreview from "./project-preview";

const projects = [
  {
    id: "cv",
    number: "01",
    title: "Next CV Builder",
    url: "https://my-cv-zeta-one.vercel.app/",
    tags: ["Next.js", "i18n", "Local-first"],
    tone: "#702457",
    preview: "cv",
  },
  {
    id: "aj",
    number: "02",
    title: "Mantenimientos AJ",
    url: "https://mantenimientos-aj.vercel.app/es",
    tags: ["Next.js", "i18n", "SEO"],
    tone: "#d32f2f",
    preview: "aj",
  },
  {
    id: "pilates",
    number: "03",
    title: "Personal & Pilates",
    url: "https://personal-and-pilates.vercel.app/",
    tags: ["Next.js", "Prisma", "Bookings"],
    tone: "#8b5f4d",
    preview: "pilates",
  },
  {
    id: "muiKit",
    number: "04",
    title: "MUI Component Library",
    url: "https://www.npmjs.com/package/@jlopvil/mui-kit",
    tags: ["React", "TypeScript", "Material UI"],
    tone: "#1565c0",
    preview: "muiKit",
  },
  {
    id: "arrow",
    number: "05",
    title: "Template Web Arrow",
    url: "https://arrow-template-web.vercel.app/",
    tags: ["Next.js", "i18n", "PWA"],
    tone: "#4f8cff",
    preview: "arrow",
  },
] as const;

function HeroSection() {
  const t = useTranslations("Home");
  return (
    <Box
      sx={{
        minHeight: { xs: 620, md: 690 },
        display: "grid",
        alignContent: "center",
        py: 8,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          mb: 3,
        }}
      >
        {t("location")}
      </Typography>
      <Typography
        component="h1"
        sx={{
          maxWidth: 1150,
          fontSize: { xs: "16vw", sm: 76, md: 112, lg: 136 },
          fontWeight: 900,
          letterSpacing: "-.075em",
          lineHeight: 0.83,
          mb: 5,
          animation: "rise .7s ease both",
        }}
      >
        {t("heroTitle")}{" "}
        <Box component="span" sx={{ color: "text.secondary", fontWeight: 400 }}>
          {t("heroEmphasis")}
        </Box>
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "flex-end" }}
        gap={4}
      >
        <Typography
          sx={{ maxWidth: 530, fontSize: { xs: 19, md: 24 }, lineHeight: 1.45 }}
        >
          {t("heroDescription")}
        </Typography>
        <Button
          href="#proyectos"
          endIcon={<ArrowOutward />}
          sx={{
            bgcolor: "var(--acid)",
            color: "var(--ink)",
            px: 3,
            py: 1.5,
            border: "1px solid var(--ink)",
            boxShadow: "5px 5px 0 var(--ink)",
            "&:hover": {
              bgcolor: "#c9f236",
              transform: "translate(2px, 2px)",
              boxShadow: "3px 3px 0 var(--ink)",
            },
          }}
        >
          {t("viewWork")}
        </Button>
      </Stack>
    </Box>
  );
}

function ProjectArticle({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const t = useTranslations("Home");
  return (
    <Box
      component="article"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: index % 2 ? "1.05fr .95fr" : ".95fr 1.05fr",
        },
        gap: { xs: 3, md: 6 },
        alignItems: "center",
      }}
    >
      <Box sx={{ order: { xs: 1, md: index % 2 ? 2 : 1 } }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 5 }}>
          <Typography sx={{ fontFamily: "monospace", color: "text.secondary" }}>
            {project.number}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: ".13em",
              fontWeight: 700,
            }}
          >
            {t(`projects.${project.id}.eyebrow`)}
          </Typography>
        </Stack>
        <Typography
          component="h3"
          sx={{
            fontSize: { xs: 42, md: 64 },
            fontWeight: 850,
            letterSpacing: "-.06em",
            lineHeight: 0.95,
            mb: 3,
          }}
        >
          {project.title}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 17, md: 19 },
            lineHeight: 1.55,
            maxWidth: 560,
            mb: 4,
          }}
        >
          {t(`projects.${project.id}.description`)}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 10, fontWeight: 700 }}
            />
          ))}
        </Stack>
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 800,
            borderBottom: "2px solid",
            pb: 0.5,
          }}
        >
          {t("visitProject")} <NorthEast fontSize="small" />
        </Link>
      </Box>
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("openProject", { title: project.title })}
        sx={{
          display: "block",
          order: { xs: 2, md: index % 2 ? 1 : 2 },
          border: "1px solid var(--ink)",
          p: 1.25,
          bgcolor: "var(--ink)",
          transition: "transform .25s ease",
          "&:hover": { transform: "rotate(-1deg) scale(1.01)" },
        }}
      >
        <ProjectPreview type={project.preview} tone={project.tone} />
      </Link>
    </Box>
  );
}

function ProjectsSection() {
  const t = useTranslations("Home");
  return (
    <Box id="proyectos" sx={{ pt: 8, pb: 14 }}>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        sx={{ borderTop: "1px solid var(--ink)", pt: 2, mb: 7 }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 30, md: 46 },
            fontWeight: 800,
            letterSpacing: "-.045em",
          }}
        >
          {t("selectedWork")}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>2025—2026</Typography>
      </Stack>
      <Stack spacing={{ xs: 9, md: 13 }}>
        {projects.map((project, index) => (
          <ProjectArticle key={project.title} project={project} index={index} />
        ))}
      </Stack>
    </Box>
  );
}

export function HomeContent() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
    </>
  );
}
