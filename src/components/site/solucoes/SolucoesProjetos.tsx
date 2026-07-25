import React, { useState, useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

type Projeto = {
  categoria: string;
  title: string;
  resumo: string;
  recursos: string[];
  status: string;
  url?: string;
  accentColor?: string;
};

const PROJETOS: Projeto[] = [
  {
    categoria: "E-commerce",
    title: "TFBrand",
    resumo:
      "Plataforma de e-commerce de alta performance para moda feminina. Oferece uma experiência de compra moderna e fluida, com catálogo dinâmico de busca, carrinho de compras inteligente com finalização de pedido direto no WhatsApp, e um painel de controle administrativo completo para gestão simplificada de estoque e vendas.",
    recursos: ["React", "Supabase", "Cloudinary", "Admin Dashboard", "Checkout WhatsApp"],
    status: "Concluído",
    url: "https://tfbrand.vercel.app/",
    accentColor: "var(--aurora-violet)",
  },
];

function ProjectCardItem({ p, idx }: { p: Projeto; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translateX(0px) translateY(0px)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = ((x - centerX) / centerX) * 3;
    const moveY = ((y - centerY) / centerY) * 3;

    setTransform(`translateX(${moveX}px) translateY(calc(-6px + ${moveY}px))`);
  };

  const handleMouseLeave = () => {
    setTransform("translateX(0px) translateY(0px)");
  };

  return (
    <ScrollReveal key={p.title} delay={300 + idx * 100} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transition: "transform 0.3s ease-out, background-color 0.5s ease",
        }}
        className="group relative flex flex-col justify-between h-full bg-[#131318] p-8 sm:p-9 rounded-sm border border-white/5 transition-all duration-500 hover:border-white/15 hover:bg-[#15151c] overflow-hidden will-change-transform z-10"
      >
        {/* Glow Effect on Hover */}
        <div className="absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-aurora-violet/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none z-10" />

        {/* Top line accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[4px] opacity-65 transition-all duration-500 group-hover:opacity-100 group-hover:h-[4px]"
          style={{
            background: p.accentColor || "var(--aurora-violet)",
          }}
        />

        <div className="relative z-10">
          {/* Header Row: Category Badge + Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="font-mono text-xs font-bold text-[#a280ff] uppercase tracking-wider">
              {p.categoria}
            </span>
            <span
              className={`inline-flex items-center rounded-full border border-white/10 px-3 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider ${
                p.status === "Concluído"
                  ? "text-[#58e5a6] bg-[#58e5a6]/10"
                  : "text-slate-400 bg-white/5"
              }`}
            >
              {p.status}
            </span>
          </div>

          {/* Title with link */}
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 tracking-tight">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-aurora-violet transition-colors inline-flex items-center gap-2 group/link"
              >
                {p.title}
                <FaArrowUpRightFromSquare className="text-slate-500 group-hover/link:text-aurora-violet transition-colors size-4" />
              </a>
            ) : (
              p.title
            )}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-8">
            {p.resumo}
          </p>
        </div>

        {/* Tech Stack Pills Footer */}
        <div className="relative z-10 pt-6 border-t border-white/5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-3">
            tecnologias e recursos
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {p.recursos.map((r) => (
              <span
                key={r}
                className="px-2.5 py-1 text-xs font-mono font-medium rounded-sm bg-white/[0.03] text-slate-300 border border-white/5 transition-colors duration-300 group-hover:border-aurora-violet/20 group-hover:text-white"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

type SolucoesProjetosProps = {
  bgClass?: string;
};

export function SolucoesProjetos({ bgClass = "bg-[#0c0c0f]" }: SolucoesProjetosProps = {}) {
  return (
    <section className={`relative w-full ${bgClass} py-24 lg:py-32 border-t border-white/5`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
        <div className="mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
              <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                Nosso Portfólio
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
              Projetos reais, desenhados para gerar{" "}
              <span
                className="text-transparent bg-clip-text inline-block"
                style={{
                  backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                }}
              >
                impacto.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="max-w-3xl text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Conheça algumas das plataformas, sistemas e e-commerces que desenvolvemos. Cada
              projeto é construído com foco em escalabilidade, performance e excelência técnica,
              resolvendo desafios reais com soluções eficientes.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {PROJETOS.map((p, i) => (
            <ProjectCardItem key={p.title} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
