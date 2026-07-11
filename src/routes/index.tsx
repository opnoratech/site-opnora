import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HomeHero } from "@/components/site/home/HomeHero";
import { HomeMarquee } from "@/components/site/home/HomeMarquee";
import { HomeAbout } from "@/components/site/home/HomeAbout";
import { SolucoesSection } from "@/components/site/home/SolucoesSection";
import { EcosystemSection } from "@/components/site/home/EcosystemSection";
import { TechnologySection } from "@/components/site/home/TechnologySection";
import { AuroraSection } from "@/components/site/home/AuroraSection";
import { CTASection } from "@/components/site/shared/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Opnora — Software sob medida para empresas em construção digital" },
      {
        name: "description",
        content:
          "A Opnora desenvolve sites, sistemas, plataformas e dashboards para empresas que querem sair do improviso digital e crescer com tecnologia.",
      },
      { property: "og:title", content: "Opnora — Software para sair do improviso digital" },
      {
        property: "og:description",
        content:
          "Sites, sistemas e plataformas sob medida. Iniciativa de desenvolvimento focada em transformar problemas reais em soluções digitais.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeMarquee />
      <HomeAbout />
      <SolucoesSection />
      <EcosystemSection />
      <TechnologySection />
      <AuroraSection />
      <CTASection className="bg-[#0e0e12]" />
    </>
  );
}
