"use client";

import { useState } from "react";
import { ArrowOutward, NorthEast } from "@mui/icons-material";
import { Button, Link, Stack, Typography } from "@jlopvil/mui-kit";
import { Chip } from "@mui/material";
import { useTranslations } from "next-intl";
import ProjectPreview from "./project-preview";

const projects = [
  {
    id: "learn",
    number: "01",
    title: "Arrow Learn Games",
    url: "https://arrow-learn-games.vercel.app/",
    tags: ["Next.js", "TypeScript", "i18n"],
    tone: "#6554c0",
    preview: "learn",
    category: "apps",
  },
  {
    id: "santa",
    number: "02",
    title: "Arrow Secret Santa",
    url: "https://arrow-secret-santa.vercel.app/",
    tags: ["Next.js", "Redis", "Email"],
    tone: "#b84350",
    preview: "santa",
    category: "apps",
  },
  {
    id: "cv",
    category: "apps",
    number: "03",
    title: "Next CV Builder",
    url: "https://arrow-cv-builder.vercel.app/",
    tags: ["Next.js", "i18n", "Local-first"],
    tone: "#702457",
    preview: "cv",
  },
  {
    id: "aj",
    category: "web",
    number: "04",
    title: "Mantenimientos AJ",
    url: "https://mantenimientos-aj.vercel.app/es",
    tags: ["Next.js", "i18n", "SEO"],
    tone: "#d32f2f",
    preview: "aj",
  },
  {
    id: "pilates",
    category: "apps",
    number: "05",
    title: "Personal & Pilates",
    url: "https://personal-and-pilates.vercel.app/",
    tags: ["Next.js", "Prisma", "Bookings"],
    tone: "#8b5f4d",
    preview: "pilates",
  },
  {
    id: "arrow",
    category: "tools",
    number: "06",
    title: "Template Web Arrow",
    url: "https://arrow-template-web.vercel.app/",
    tags: ["Next.js", "i18n", "PWA"],
    tone: "#4f8cff",
    preview: "arrow",
  },
  {
    id: "lv",
    category: "web",
    number: "07",
    title: "Lidia Villanueva Bolivar",
    url: "https://lidia-villanueva-bolivar.vercel.app",
    tags: ["Next.js", "i18n", "PWA"],
    tone: "#c665ff",
    preview: "lv",
  },
  {
    id: "muiKit",
    category: "tools",
    number: "08",
    title: "MUI Component Library",
    url: "https://www.npmjs.com/package/@jlopvil/mui-kit",
    tags: ["React", "TypeScript", "Material UI"],
    tone: "#1565c0",
    preview: "muiKit",
  },
] as const;

function HeroSection() {
  const t = useTranslations("Home");
  return (
    <section className="portfolio-hero">
      <div className="hero-copy">
        <div className="hero-eyebrow">
          <span className="status-dot" />
          {t("location")}
        </div>
        <h1>
          {t("heroTitle")} <span>{t("heroEmphasis")}</span>
        </h1>
        <p className="hero-description">{t("heroDescription")}</p>
        <Button
          href="#proyectos"
          endIcon={<ArrowOutward />}
          sx={{
            bgcolor: "var(--acid)",
            color: "var(--ink)",
            borderRadius: 99,
            px: 3,
            py: 1.75,
            fontSize: 15,
            "&:hover": { bgcolor: "#c9f236", transform: "translateY(-3px)" },
          }}
        >
          {t("viewWork")}
        </Button>
        <div className="hero-meta">
          <span>08 {t("projectCount")}</span>
          <span>React / Next.js / TypeScript</span>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="art-grid" />
        <span className="art-label">IDEA → CODE → LIVE</span>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-symbol">↗</div>
        <div className="floating-label label-top">
          &lt;build /&gt;<span>●</span>
        </div>
        <div className="floating-label label-bottom">
          <span>✦</span> {t("madeForPeople")}
        </div>
        <span className="art-caption">JL. / DIGITAL PLAYGROUND</span>
      </div>
    </section>
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
    <article
      className="project-card"
      style={
        {
          "--project-tone": project.tone,
          animationDelay: `${index * 45}ms`,
        } as React.CSSProperties
      }
    >
      <Link
        underline="none"
        className="project-image"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("openProject", { title: project.title })}
      >
        <ProjectPreview type={project.preview} tone={project.tone} />
        <span className="project-open">
          <NorthEast fontSize="small" />
        </span>
      </Link>
      <div className="project-body">
        <div className="project-eyebrow">
          <span>{t(`projects.${project.id}.eyebrow`)}</span>
          <span>{project.number} / 08</span>
        </div>
        <Typography
          component="h3"
          sx={{
            fontSize: { xs: 29, md: 34 },
            fontWeight: 800,
            letterSpacing: "-.055em",
            lineHeight: 1.08,
          }}
        >
          {project.title}
        </Typography>
        <p>{t(`projects.${project.id}.description`)}</p>
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={0.75}
          sx={{ mt: "auto", mb: 2 }}
        >
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ bgcolor: "#f0f0eb", fontSize: 11, fontWeight: 700 }}
            />
          ))}
        </Stack>
        <Link
          className="project-visit"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
        >
          {t("visitProject")}
          <NorthEast fontSize="small" />
        </Link>
      </div>
    </article>
  );
}

function ProjectsSection() {
  const t = useTranslations("Home");
  const [filter, setFilter] = useState("all");
  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );
  return (
    <section id="proyectos" className="projects-section">
      <div className="section-kicker">
        <span>PORTFOLIO / 2025—2026</span>
        <span>✦</span>
      </div>
      <div className="projects-heading">
        <h2>
          {t("selectedWork")}
          <sup>08</sup>
        </h2>
        <p>{t("workIntro")}</p>
      </div>
      <div
        className="project-filters"
        role="group"
        aria-label={t("filterLabel")}
      >
        {["all", "apps", "web", "tools"].map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {t(`filters.${category}`)}
            <span>
              {category === "all"
                ? projects.length
                : projects.filter((project) => project.category === category)
                    .length}
            </span>
          </button>
        ))}
      </div>
      <span className="sr-only" role="status">
        {t("resultCount", { count: visibleProjects.length })}
      </span>
      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <ProjectArticle key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export function HomeContent() {
  return (
    <>
      <ProjectsSection />
      <HeroSection />
    </>
  );
}
