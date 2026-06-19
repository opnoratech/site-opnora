import { createFileRoute } from "@tanstack/react-router";
import { Search, Map, Hammer, TrendingUp } from "lucide-react";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/processo")({
  head: () => ({
    meta: [
      { title: "Processo — Opnora" },
      {
        name: "description",
        content:
          "Como a Opnora trabalha: entender, planejar, desenvolver e evoluir. Quatro etapas claras do problema à solução.",
      },
      { property: "og:title", content: "Processo da Opnora" },
      { property: "og:description", content: "Do problema à solução, em quatro etapas conectadas." },
      { property: "og:url", content: "/processo" },
    ],
    links: [{ rel: "canonical", href: "/processo" }],
  }),
  component: ProcessoPage,
});

const ETAPAS = [
  {
    step: "01",
    icon: Search,
    title: "Entendemos",
    description: "Analisamos o contexto, os processos e a dor real da empresa antes de propor qualquer solução.",
    bullets: [
      "Conversa inicial sem compromisso",
      "Mapeamento do processo atual",
      "Identificação do problema central",
      "Conversa com quem usa no dia a dia",
    ],
  },
  {
    step: "02",
    icon: Map,
    title: "Planejamos",
    description: "Definimos prioridades, funcionalidades e o melhor caminho técnico para resolver o problema.",
    bullets: [
      "Escopo claro do que entra no projeto",
      "Definição de prioridades por valor",
      "Escolhas técnicas adequadas ao porte",
      "Estimativa honesta de tempo e custo",
    ],
  },
  {
    step: "03",
    icon: Hammer,
    title: "Desenvolvemos",
    description: "Construímos uma solução funcional, moderna e adaptada à realidade do negócio.",
    bullets: [
      "Entregas em ciclos curtos",
      "Validação contínua com você",
      "Código limpo e documentado",
      "Foco em usabilidade real",
    ],
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Evoluímos",
    description: "Acompanhamos o uso e criamos melhorias, integrações e automações quando faz sentido.",
    bullets: [
      "Manutenção e correções",
      "Novas funcionalidades sob demanda",
      "Integrações conforme o negócio cresce",
      "Automação como consequência, não objetivo",
    ],
  },
];

function ProcessoPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-10 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-aurora-cyan/70" />
            processo
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Do <span className="text-aurora">problema</span> à <span className="text-aurora">solução</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Quatro etapas conectadas. Cada uma com objetivo claro, entregas previsíveis e espaço pra você acompanhar de perto.
          </p>
        </div>
      </section>

      <Section>
        <ol className="relative space-y-6">
          {ETAPAS.map((e, idx) => (
            <li key={e.step} className="card-aurora relative overflow-hidden rounded-2xl p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
                <div className="flex items-start gap-4">
                  <span className="font-display text-5xl font-bold tracking-tight text-aurora">{e.step}</span>
                  <span className="mt-2 inline-flex size-11 items-center justify-center rounded-xl border border-aurora-cyan/30 bg-aurora-cyan/5 text-aurora-cyan">
                    <e.icon size={22} aria-hidden />
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold">{e.title}</h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">{e.description}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-foreground/85">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-aurora-cyan" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {idx < ETAPAS.length - 1 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-3 left-10 hidden h-6 w-px bg-gradient-to-b from-aurora-cyan/60 to-transparent md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </Section>

      <CTASection />
    </>
  );
}
