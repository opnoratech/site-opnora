import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Globe,
  LayoutDashboard,
  Database,
  Workflow,
  Repeat,
  Boxes,
  Search,
  Map,
  Hammer,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  FileSpreadsheet,
  Users,
  Plug,
  Rocket,
} from "lucide-react";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { TerminalPanel } from "@/components/site/TerminalPanel";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FeatureCard } from "@/components/site/FeatureCard";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Opnora — Software sob medida para empresas em construção digital" },
      {
        name: "description",
        content:
          "A Opnora desenvolve sites, sistemas, plataformas e dashboards para empresas que querem sair do improviso digital e crescer com tecnologia.",
      },
      { property: "og:title", content: "Opnora — Software para sair do improviso digital" },
      {
        property: "og:description",
        content:
          "Sites, sistemas e plataformas sob medida. Iniciativa de desenvolvimento focada em transformar problemas reais em soluções digitais.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const SOLUCOES = [
  { icon: Globe, title: "Sites profissionais", description: "Sites institucionais, landing pages, portfólios e páginas de venda com identidade própria e foco em conversão." },
  { icon: LayoutDashboard, title: "Sistemas personalizados", description: "Sistemas internos, painéis administrativos e controle de clientes, pedidos, produtos e processos." },
  { icon: Boxes, title: "Plataformas web", description: "Portais, e-commerces, catálogos digitais, áreas de membros e soluções sob medida." },
  { icon: Database, title: "Dashboards e dados", description: "Painéis para acompanhar métricas, processos, clientes e oportunidades em tempo real." },
  { icon: Workflow, title: "Automação e integrações", description: "WhatsApp, formulários, bots, captação de leads e automações de tarefas repetitivas." },
  { icon: Repeat, title: "Evolução contínua", description: "Manutenção, melhorias, suporte e evolução da solução após a entrega." },
];

const DORES = [
  { icon: Workflow, title: "Processos espalhados", description: "Cada parte do negócio em uma ferramenta diferente, sem ligação entre si." },
  { icon: MessageCircle, title: "Atendimento manual", description: "Tudo passa por mensagens individuais e respostas repetidas no WhatsApp." },
  { icon: FileSpreadsheet, title: "Informações perdidas", description: "Planilhas duplicadas, anotações soltas e dados que ninguém encontra depois." },
  { icon: Users, title: "Pouca visão sobre clientes", description: "Sem histórico claro, fica difícil entender quem comprou, quem voltou ou quem desistiu." },
  { icon: Plug, title: "Sistemas que não conversam", description: "Ferramentas isoladas que obrigam alguém a copiar e colar informação entre elas." },
  { icon: Rocket, title: "Dificuldade para escalar", description: "Quando o volume cresce, o improviso digital começa a travar o negócio." },
];

const PROCESSO = [
  { step: "01", icon: Search, title: "Entendemos", description: "Analisamos o contexto, os processos e a dor real da empresa antes de propor qualquer solução." },
  { step: "02", icon: Map, title: "Planejamos", description: "Definimos prioridades, funcionalidades e o melhor caminho técnico para o problema." },
  { step: "03", icon: Hammer, title: "Desenvolvemos", description: "Construímos uma solução funcional, moderna e adaptada ao negócio." },
  { step: "04", icon: TrendingUp, title: "Evoluímos", description: "Acompanhamos o uso e criamos melhorias, integrações e automações quando necessário." },
];

const PROJETOS = [
  { categoria: "Pequenos negócios", title: "Estrutura digital para pequenos negócios", resumo: "Site institucional + área de captação de contato para empresas locais que ainda não têm presença digital estruturada.", recursos: ["Next.js", "Formulários", "Integração WhatsApp"], status: "Em desenvolvimento" },
  { categoria: "Serviços", title: "Plataforma de gestão para serviços", resumo: "Sistema web para profissionais e equipes organizarem clientes, agendamentos e histórico de atendimentos.", recursos: ["TypeScript", "Banco relacional", "Auth"], status: "Protótipo" },
  { categoria: "Administrativo", title: "Sistema administrativo personalizado", resumo: "Painel interno sob medida para controlar pedidos, produtos, status e relatórios operacionais.", recursos: ["Dashboards", "Permissões", "Exportações"], status: "Estudo de caso" },
  { categoria: "Conteúdo", title: "Portal e conteúdo digital", resumo: "Portal para publicação de conteúdo institucional, com áreas internas e estrutura editorial.", recursos: ["CMS", "SEO", "Performance"], status: "Em desenvolvimento" },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pt-28 lg:pb-28">
          <div className="fade-up max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
              <span className="mr-2 inline-block h-px w-6 align-middle bg-aurora-cyan/70" />
              iniciativa em construção
            </p>
            <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.75rem]">
              Desenvolvemos <span className="text-aurora">software</span> para transformar problemas em <span className="text-aurora">soluções</span> <span className="text-aurora">digitais</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Criamos sites, sistemas, plataformas e ferramentas personalizadas para empresas que querem organizar processos, melhorar o atendimento e crescer com tecnologia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/solucoes"
                className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm btn-aurora"
              >
                Conhecer soluções
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contato"
                className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm btn-ghost-aurora"
              >
                Falar com a Opnora
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-6 text-left">
              {[
                { k: "Foco", v: "Software sob medida" },
                { k: "Modelo", v: "Projetos e parcerias" },
                { k: "Fase", v: "Em construção" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.k}</dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground sm:text-base">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="fade-up lg:pt-6">
            <TerminalPanel />
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <Section>
        <SectionHeading
          eyebrow="o problema"
          title={
            <>
              Sua empresa ainda funciona no <span className="text-aurora">improviso digital</span>?
            </>
          }
          description="Muitas empresas dependem de WhatsApp, Instagram, planilhas e processos manuais para atender clientes, organizar pedidos e tomar decisões. Isso pode funcionar no começo, mas limita o crescimento e gera perda de tempo."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DORES.map((d) => (
            <FeatureCard key={d.title} {...d} />
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-aurora-magenta/30 bg-aurora-magenta/5 p-4 sm:p-5">
          <AlertTriangle className="mt-0.5 shrink-0 text-aurora-magenta" size={20} aria-hidden />
          <p className="text-sm text-foreground/85">
            Quando os processos não conversam entre si, o time gasta tempo resolvendo o mesmo problema várias vezes. Software bem feito devolve esse tempo.
          </p>
        </div>
      </Section>

      {/* SOLUÇÕES */}
      <Section className="bg-surface/40">
        <SectionHeading
          eyebrow="soluções"
          title={
            <>
              Soluções <span className="text-aurora">digitais</span> para problemas reais.
            </>
          }
          description="Não é uma lista de serviços genéricos. Cada solução parte de um problema concreto da sua empresa."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUCOES.map((s, i) => (
            <FeatureCard key={s.title} {...s} meta={`0${i + 1}`} />
          ))}
        </div>
      </Section>

      {/* PROCESSO */}
      <Section>
        <SectionHeading
          eyebrow="processo"
          title={
            <>
              Do <span className="text-aurora">problema</span> à <span className="text-aurora">solução</span>.
            </>
          }
          description="Quatro etapas simples, sempre conectadas. Sem caixa-preta, sem promessas vagas."
        />

        <ol className="relative mt-12 grid gap-4 md:grid-cols-4">
          {PROCESSO.map((p) => (
            <li key={p.step} className="card-aurora relative flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.18em] text-aurora-cyan">
                  {p.step}
                </span>
                <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-aurora-cyan">
                  <p.icon size={18} aria-hidden />
                </span>
              </div>
              <h3 className="font-display mt-6 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* AUTOMAÇÃO COMO EVOLUÇÃO */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="evolução"
              title={
                <>
                  Quando o software evolui, a <span className="text-aurora">automação</span> acontece naturalmente.
                </>
              }
              description="Nem todo negócio precisa começar com um bot ou uma automação. Primeiro entendemos o processo. Depois, quando faz sentido, conectamos ferramentas, dados e atendimento para reduzir trabalho manual e melhorar a experiência do cliente."
            />
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-3xl opacity-40 blur-2xl"
              style={{ background: "var(--gradient-portal)" }}
            />
            <div className="card-aurora rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "site", icon: Globe },
                  { label: "sistema", icon: LayoutDashboard },
                  { label: "WhatsApp", icon: MessageCircle },
                  { label: "painel", icon: Database },
                  { label: "dados", icon: TrendingUp },
                  { label: "automação", icon: Workflow },
                ].map((n) => (
                  <div
                    key={n.label}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface px-2 py-4 text-center"
                  >
                    <n.icon size={20} className="text-aurora-cyan" aria-hidden />
                    <span className="text-xs text-foreground/80">{n.label}</span>
                  </div>
                ))}
              </div>
              <svg
                viewBox="0 0 400 60"
                className="mt-6 w-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id="line-flow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="oklch(0.82 0.16 180)" stopOpacity="0" />
                    <stop offset="50%" stopColor="oklch(0.78 0.16 200)" />
                    <stop offset="100%" stopColor="oklch(0.68 0.22 295)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 30 C 100 0, 300 60, 400 30" stroke="url(#line-flow)" strokeWidth="1.5" fill="none" />
                <path d="M0 30 C 100 60, 300 0, 400 30" stroke="url(#line-flow)" strokeWidth="1" fill="none" opacity="0.6" />
              </svg>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                fluxo conectado, sob medida
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJETOS */}
      <Section className="bg-surface/40">
        <SectionHeading
          eyebrow="projetos"
          title={
            <>
              Projetos e soluções em <span className="text-aurora">construção</span>.
            </>
          }
          description="A Opnora está em fase inicial. Em vez de inventar cases, mostramos honestamente o que está sendo construído."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PROJETOS.map((p) => (
            <article key={p.title} className="card-aurora flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-aurora-cyan">
                  {p.categoria}
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground/80">
                  {p.status}
                </span>
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.resumo}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.recursos.map((r) => (
                  <li
                    key={r}
                    className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-foreground/80"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
