import { createFileRoute } from "@tanstack/react-router";
import { SolucoesHero } from "@/components/site/solucoes/SolucoesHero";
import { SolucoesGrid } from "@/components/site/solucoes/SolucoesGrid";
import { SolucoesAutomacaoIA } from "@/components/site/solucoes/SolucoesAutomacaoIA";
import { TechnologySection } from "@/components/site/home/TechnologySection";
import { SolucoesProcesso } from "@/components/site/solucoes/SolucoesProcesso";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções & Engenharia | Opnora" },
      {
        name: "description",
        content:
          "O coração da operation. Sistemas web, plataformas, stack tecnológica moderna e jornada transparente de entrega.",
      },
      { property: "og:title", content: "Soluções & Engenharia | Opnora" },
      {
        property: "og:description",
        content: "Software sob medida, arquitetura escalável e formas de entrega para a sua empresa.",
      },
      { property: "og:url", content: "/solucoes" },
    ],
    links: [{ rel: "canonical", href: "/solucoes" }],
  }),
  component: SolucoesPage,
});

function SolucoesPage() {
  return (
    <div className="bg-[#0e0e12] min-h-dvh font-sans selection:bg-aurora-cyan/30">
      <SolucoesHero />
      <div id="frentes">
        <SolucoesGrid />
      </div>
      <SolucoesAutomacaoIA bgClass="bg-[#0c0c0f]" />
      <TechnologySection bgClass="bg-[#0e0e12]" eyebrow="ENGENHARIA & STACK" />
      <div id="processo">
        <SolucoesProcesso />
      </div>
    </div>
  );
}
