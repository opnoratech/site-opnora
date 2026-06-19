import { createFileRoute } from "@tanstack/react-router";
import {
  Globe,
  LayoutDashboard,
  Boxes,
  Database,
  Workflow,
  Repeat,
} from "lucide-react";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — Opnora" },
      {
        name: "description",
        content:
          "Sites, sistemas, plataformas, dashboards, automações e evolução contínua. Conheça as soluções digitais da Opnora.",
      },
      { property: "og:title", content: "Soluções digitais da Opnora" },
      { property: "og:description", content: "Software sob medida para empresas que querem sair do improviso digital." },
      { property: "og:url", content: "/solucoes" },
    ],
    links: [{ rel: "canonical", href: "/solucoes" }],
  }),
  component: SolucoesPage,
});

const SOLUCOES = [
  {
    icon: Globe,
    title: "Sites profissionais",
    paraQuem: "Empresas, profissionais e marcas que precisam de presença digital com identidade.",
    problema: "Site ausente, desatualizado ou que não passa credibilidade.",
    inclui: ["Site institucional ou landing page", "Identidade visual aplicada", "SEO técnico básico", "Formulários e integração com WhatsApp"],
    resultado: "Presença digital sólida, que atrai e converte sem depender só de redes sociais.",
  },
  {
    icon: LayoutDashboard,
    title: "Sistemas personalizados",
    paraQuem: "Operações que dependem de planilhas, mensagens e processos manuais.",
    problema: "Informação espalhada, controle manual e falta de visão do dia a dia.",
    inclui: ["Cadastro de clientes, pedidos e produtos", "Permissões por usuário", "Painéis e relatórios", "Histórico de operações"],
    resultado: "Operação centralizada em um sistema feito para a forma como a empresa trabalha.",
  },
  {
    icon: Boxes,
    title: "Plataformas web",
    paraQuem: "Negócios que oferecem produtos, conteúdo ou serviços em escala.",
    problema: "Soluções prontas que não cabem no modelo do negócio.",
    inclui: ["Portais", "E-commerces", "Catálogos digitais", "Áreas de membros e assinaturas"],
    resultado: "Uma plataforma própria, adaptada ao modelo do negócio e pronta para crescer.",
  },
  {
    icon: Database,
    title: "Dashboards e dados",
    paraQuem: "Quem toma decisões e precisa enxergar o negócio com clareza.",
    problema: "Dados existem, mas estão soltos em planilhas, abas e sistemas diferentes.",
    inclui: ["Painéis de métricas", "Visualizações de processo", "Indicadores de clientes e oportunidades", "Exportações"],
    resultado: "Visão única do negócio para decisões baseadas em dados, não em achismo.",
  },
  {
    icon: Workflow,
    title: "Automação e integrações",
    paraQuem: "Equipes que repetem as mesmas tarefas todos os dias.",
    problema: "Tempo perdido em tarefas manuais que poderiam ser automatizadas.",
    inclui: ["Integração com WhatsApp", "Bots de atendimento básicos", "Captação e qualificação de leads", "Automação de tarefas internas"],
    resultado: "Menos trabalho manual, menos erro humano e mais tempo para o que importa.",
  },
  {
    icon: Repeat,
    title: "Evolução contínua",
    paraQuem: "Soluções já no ar que precisam crescer junto com o negócio.",
    problema: "Software entregue e abandonado, sem manutenção ou evolução.",
    inclui: ["Manutenção preventiva", "Novas funcionalidades", "Melhorias de performance", "Suporte técnico contínuo"],
    resultado: "Uma solução que não envelhece — evolui no ritmo da empresa.",
  },
];

function SolucoesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-10 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-aurora-cyan/70" />
            soluções
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Software <span className="text-aurora">sob medida</span> para problemas reais.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cada solução abaixo parte de um problema concreto. Nada genérico, nada empacotado. Conheça o que a Opnora pode construir junto com a sua empresa.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {SOLUCOES.map((s) => (
            <article key={s.title} className="card-aurora rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-aurora-cyan/30 bg-aurora-cyan/5 text-aurora-cyan">
                  <s.icon size={22} aria-hidden />
                </span>
                <h2 className="font-display text-xl font-semibold">{s.title}</h2>
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-aurora-cyan">para quem é</dt>
                  <dd className="mt-1 text-foreground/85">{s.paraQuem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-aurora-cyan">problema que resolve</dt>
                  <dd className="mt-1 text-foreground/85">{s.problema}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-aurora-cyan">o que pode incluir</dt>
                  <dd className="mt-2">
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {s.inclui.map((i) => (
                        <li key={i} className="flex gap-2 text-foreground/85">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-aurora-cyan" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-aurora-cyan">resultado buscado</dt>
                  <dd className="mt-1 text-foreground/85">{s.resultado}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
