import { createFileRoute } from "@tanstack/react-router";
import { SobreHeroSection } from "@/components/site/sobre/SobreHeroSection";
import { SobreQuemSomos } from "@/components/site/sobre/SobreQuemSomos";
import { SobreOperacao } from "@/components/site/sobre/SobreOperacao";
import { SobreFoco } from "@/components/site/sobre/SobreFoco";
import { SobreHistoria } from "@/components/site/sobre/SobreHistoria";
import { SobreEquipe } from "@/components/site/sobre/SobreEquipe";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre | Opnora" },
      {
        name: "description",
        content:
          "A Opnora desenvolve software sob medida com inteligência artificial, automação e dados para transformar problemas reais em soluções digitais.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <>
      <SobreHeroSection />
      <SobreQuemSomos />
      <SobreOperacao />
      <SobreFoco />
      <SobreHistoria />
      <SobreEquipe />
    </>
  );
}
