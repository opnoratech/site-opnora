import { createFileRoute } from "@tanstack/react-router";
import { PrecosHero } from "@/components/site/precos/PrecosHero";
import { PrecosServicos } from "@/components/site/precos/PrecosServicos";
import { PrecosPlanos } from "@/components/site/precos/PrecosPlanos";
import { PrecosFAQ } from "@/components/site/precos/PrecosFAQ";
import { CTASection } from "@/components/site/shared/CTASection";

export const Route = createFileRoute("/precos")({
  head: () => ({
    meta: [{ title: "Preços — Opnora" }],
  }),
  component: PrecosPage,
});

function PrecosPage() {
  return (
    <main className="flex-1 bg-[#050507]">
      <PrecosHero />
      <PrecosServicos />
      <PrecosPlanos />
      <PrecosFAQ />
      <CTASection />
    </main>
  );
}
