import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { PrecosAdicionais } from "@/components/site/precos/PrecosAdicionais";
import { PrecosHero } from "@/components/site/precos/PrecosHero";
import { PrecosPlanos } from "@/components/site/precos/PrecosPlanos";

export const Route = createFileRoute("/precos")({
  head: () => ({
    meta: [{ title: "Preços | Opnora" }],
    links: [{ rel: "preload", as: "image", href: "/images/pricing_hero_real.webp" }],
  }),
  component: PrecosPage,
});

function PrecosPage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  }, []);

  return (
    <main className="flex-1 bg-[#0c0c0f]">
      <PrecosHero />
      <PrecosPlanos />

      <PrecosAdicionais />
    </main>
  );
}
