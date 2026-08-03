import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PrecosHero } from "@/components/site/precos/PrecosHero";
import { PrecosPlanos } from "@/components/site/precos/PrecosPlanos";

import { PrecosAdicionais } from "@/components/site/precos/PrecosAdicionais";

export const Route = createFileRoute("/precos")({
  head: () => ({
    meta: [{ title: "Preços | Opnora" }],
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
