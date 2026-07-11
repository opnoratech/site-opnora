import { createFileRoute } from "@tanstack/react-router";
import { SolucoesHero } from "@/components/site/solucoes/SolucoesHero";
import { SolucoesGrid } from "@/components/site/solucoes/SolucoesGrid";
import { SolucoesProcesso } from "@/components/site/solucoes/SolucoesProcesso";
import { SolucoesProjetos } from "@/components/site/solucoes/SolucoesProjetos";
import { SolucoesDna } from "@/components/site/solucoes/SolucoesDna";
export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — Opnora Core" },
      {
        name: "description",
        content:
          "O coração da operação. Sistemas web, plataformas, automações e tudo que conecta o digital ao mundo real.",
      },
      { property: "og:title", content: "Soluções digitais — Opnora Core" },
      {
        property: "og:description",
        content: "Software sob medida para empresas que querem sair do improviso.",
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
      <SolucoesGrid />
      <SolucoesProjetos />
      <SolucoesDna />
      <SolucoesProcesso />
    </div>
  );
}
