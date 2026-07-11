import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const PROJETOS = [
  {
    categoria: "E-commerce",
    title: "TFBrand",
    resumo:
      "Plataforma de e-commerce para moda feminina, desenvolvida com catálogo dinâmico, painel administrativo completo, busca inteligente, checkout via WhatsApp, otimização de imagens com Cloudinary e backend estruturado no Supabase com foco em segurança, performance e escalabilidade.",
    recursos: [
      "React",
      "Supabase",
      "Cloudinary",
      "Admin Dashboard",
      "Checkout WhatsApp",
      "Analytics",
    ],
    status: "Concluído",
    url: "https://tfbrand.vercel.app/",
  },
];

export function SolucoesProjetos() {
  return (
    <section className="relative w-full bg-[#0e0e12] py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                EM ANDAMENTO
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
              Projetos e soluções em{" "}
              <span
                className="text-transparent bg-clip-text inline-block"
                style={{
                  backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                }}
              >
                construção.
              </span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="max-w-3xl text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              A Opnora está em fase inicial. Em vez de listar clientes ou inventar cases, mostramos o
              que está sendo construído agora — com honestidade sobre o status de cada projeto.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {PROJETOS.map((p, i) => (
            <ScrollReveal
              key={p.title}
              delay={300 + i * 100}
              className="h-full"
            >
              <article
                className="group relative flex h-full flex-col bg-[#131318] border border-white/5 rounded-sm p-8 sm:p-10 hover:-translate-y-2 hover:bg-[#181820] hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] transition-all duration-700 ease-out"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#a280ff]">
                    {p.categoria}
                  </span>
                  <span className={`inline-flex items-center rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider ${p.status === 'Concluído' ? 'text-[#58e5a6] bg-[#58e5a6]/10' : 'text-slate-400 bg-white/5'}`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-xl font-bold text-white">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#a280ff] transition-colors inline-flex items-center gap-2 group/link">
                        {p.title}
                        <FaArrowUpRightFromSquare className="text-slate-500 group-hover/link:text-[#a280ff] transition-colors" />
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 font-light">{p.resumo}</p>
                <div className="mt-auto pt-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-3">
                    tecnologias e recursos
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.recursos.map((r) => (
                      <li
                        key={r}
                        className="inline-flex items-center rounded-sm border border-white/5 bg-white/[0.01] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-400 transition-colors group-hover:border-white/10 group-hover:text-slate-300 md:text-[10px]"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
