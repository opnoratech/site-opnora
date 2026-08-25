import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { AuroraSection } from "@/components/site/home/AuroraSection";
import { EcosystemSection } from "@/components/site/home/EcosystemSection";
import { HomeAbout } from "@/components/site/home/HomeAbout";
import { HomeHero } from "@/components/site/home/HomeHero";
import { HomeMarquee } from "@/components/site/home/HomeMarquee";
import { HomePricingSummary } from "@/components/site/home/HomePricingSummary";
import { SolucoesSection } from "@/components/site/home/SolucoesSection";
import { SolucoesProjetos } from "@/components/site/solucoes/SolucoesProjetos";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Opnora | Software sob medida para empresas em construção digital",
      },
      {
        name: "description",
        content:
          "Desenvolvimento de software sob medida para empresas que buscam modernização, arquitetura escalável e sistemas de alto desempenho.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { settings } = useSiteSettings();

  return (
    <>
      {/* 1. Hero & Marquee */}
      <HomeHero />
      <HomeMarquee />
      {/* 2. Sobre */}
      <HomeAbout eyebrow="QUEM SOMOS" />
      {/* 3. Frentes (Serviços) */}
      {settings.enable_services && <EcosystemSection eyebrow="O ECOSSISTEMA" />}
      {/* 4. Como Construímos */}
      <SolucoesSection bgClass="bg-[#0e0e12]" eyebrow="METODOLOGIA" />
      {/* 5. NOSSO PORTFÓLIO (Em destaque na Início) */}
      {settings.enable_portfolio && <SolucoesProjetos bgClass="bg-[#0c0c0f]" />}

      {/* 7. Preços */}
      <HomePricingSummary bgClass="bg-[#0e0e12]" eyebrow="INVESTIMENTO" />
      {/* 9. CTA Final */}
      <AuroraSection />
    </>
  );
}
