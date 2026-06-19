import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Opnora" },
      {
        name: "description",
        content:
          "Projetos e soluções em construção na Opnora. Estamos em fase inicial e mostramos honestamente o que está sendo feito.",
      },
      { property: "og:title", content: "Projetos em construção — Opnora" },
      { property: "og:description", content: "O que estamos construindo hoje, sem inventar cases nem clientes." },
      { property: "og:url", content: "/projetos" },
    ],
    links: [{ rel: "canonical", href: "/projetos" }],
  }),
  component: ProjetosPage,
});

const PROJETOS = [
  {
    categoria: "Pequenos negócios",
    title: "Estrutura digital para pequenos negócios",
    resumo:
      "Site institucional somado a uma área de captação de contato para empresas locais que ainda não têm presença digital estruturada.",
    recursos: ["Next.js", "Formulários", "Integração com WhatsApp", "SEO técnico"],
    status: "Em desenvolvimento",
  },
  {
    categoria: "Serviços",
    title: "Plataforma de gestão para serviços",
    resumo:
      "Sistema web para profissionais e equipes organizarem clientes, agendamentos e histórico de atendimentos em um só lugar.",
    recursos: ["TypeScript", "Banco relacional", "Autenticação", "Permissões"],
    status: "Protótipo",
  },
  {
    categoria: "Administrativo",
    title: "Sistema administrativo personalizado",
    resumo:
      "Painel interno sob medida para controlar pedidos, produtos, status operacionais e relatórios essenciais do negócio.",
    recursos: ["Dashboards", "Relatórios", "Exportações", "Multi-usuário"],
    status: "Estudo de caso",
  },
  {
    categoria: "Conteúdo",
    title: "Portal e conteúdo digital",
    resumo:
      "Portal para publicação de conteúdo institucional com áreas internas, estrutura editorial e foco em performance.",
    recursos: ["CMS", "SEO", "Performance", "Acessibilidade"],
    status: "Em desenvolvimento",
  },
];

function ProjetosPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-10 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-cyan">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-aurora-cyan/70" />
            projetos
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Projetos e soluções em <span className="text-aurora">construção</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A Opnora está em fase inicial. Em vez de listar clientes ou inventar cases, mostramos o que está sendo construído agora — com honestidade sobre o status de cada projeto.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJETOS.map((p) => (
            <article key={p.title} className="card-aurora flex h-full flex-col rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-aurora-cyan">
                  {p.categoria}
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground/80">
                  {p.status}
                </span>
              </div>
              <h2 className="font-display mt-4 text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.resumo}</p>
              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">tecnologias e recursos</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {p.recursos.map((r) => (
                    <li
                      key={r}
                      className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-foreground/80"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
