import { createFileRoute } from "@tanstack/react-router";
import { Compass, Hammer, LineChart, Lightbulb, Cog } from "lucide-react";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FeatureCard } from "@/components/site/FeatureCard";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Opnora" },
      {
        name: "description",
        content:
          "A Opnora é uma iniciativa de desenvolvimento de software focada em resolver problemas reais com sites, sistemas e plataformas sob medida.",
      },
      { property: "og:title", content: "Sobre a Opnora" },
      {
        property: "og:description",
        content: "Uma iniciativa em construção, focada em desenvolver software que faz sentido.",
      },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

const PRINCIPIOS = [
  { icon: Compass, title: "Entender antes de desenvolver", description: "Toda solução começa com investigação. Sem entender o problema, não dá pra resolver de verdade." },
  { icon: Hammer, title: "Construir com propósito", description: "Cada tela, cada fluxo e cada integração precisa servir a um objetivo real do negócio." },
  { icon: LineChart, title: "Evoluir com dados", description: "Decisões guiadas por uso e métricas, não por achismo." },
  { icon: Lightbulb, title: "Soluções que façam sentido", description: "Tecnologia adequada ao tamanho e à fase do projeto — nem além, nem aquém." },
  { icon: Cog, title: "Tecnologia como meio, não como fim", description: "Software é ferramenta. O resultado é o que importa." },
];

function SobrePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-aurora-cyan/70" />
            sobre a opnora
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Criamos <span className="text-aurora">caminhos</span> entre problemas reais e tecnologia.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A Opnora é uma iniciativa de desenvolvimento de software focada em resolver problemas reais de empresas, projetos e instituições. Estamos em fase inicial — construindo soluções, aprendendo com cada projeto e priorizando parcerias de longo prazo.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="quem somos"
              title={<>Uma iniciativa <span className="text-aurora">em construção</span>.</>}
              description="Não somos uma agência consolidada nem uma empresa grande. Somos uma iniciativa pequena, focada e honesta sobre o estágio em que estamos."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
              <p>Acreditamos que muita empresa não precisa de mais ferramentas — precisa de software bem feito, pensado para o problema certo.</p>
              <p>Por isso preferimos trabalhar por projeto, conhecer o contexto antes de prometer qualquer coisa, e construir junto. Cada projeto é uma oportunidade de aprender mais sobre como software pode destravar negócios reais.</p>
              <p>Não inventamos cases, números ou clientes que não existem. Quando entregarmos resultados, eles vão estar aqui.</p>
            </div>
          </div>

          <aside className="card-aurora rounded-2xl p-6 sm:p-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">o que somos hoje</h3>
            <ul className="mt-5 space-y-3 text-sm text-foreground/85">
              {[
                "Iniciativa em construção",
                "Foco em aprendizado real",
                "Desenvolvimento de software sob medida",
                "Parceria com empresas que querem evoluir",
                "Visão de longo prazo",
                "Crescimento por projetos reais",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-aurora-cyan" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section className="bg-surface/40">
        <SectionHeading
          eyebrow="princípios"
          title={<>O que <span className="text-aurora">guia</span> nosso trabalho.</>}
          description="Cinco princípios simples, aplicados a cada decisão e a cada linha de código."
          align="center"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPIOS.map((p) => (
            <FeatureCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
