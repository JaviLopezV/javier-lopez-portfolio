import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { hasInterviewAccess } from "../../interview-access";
import { portfolioOwner } from "../../portfolio";
import { AboutContent } from "../about-content";
import { HeroSection } from "../home-content";
import { PortfolioShell } from "../home";
import AccessDialog from "./access-dialog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home");
  return {
    title: `${t("navAbout")} | ${portfolioOwner}`,
    robots: { index: false, follow: true },
  };
}

export default async function InterviewPage() {
  const hasAccess = await hasInterviewAccess();

  return (
    <PortfolioShell about>
      {hasAccess ? (
        <AboutContent />
      ) : (
        <>
          <HeroSection />
          <AccessDialog />
        </>
      )}
    </PortfolioShell>
  );
}
