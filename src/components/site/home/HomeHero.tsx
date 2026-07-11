import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function HomeHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      className="hero-bg group relative flex min-h-dvh pt-[84px] flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={
        {
          "--mouse-x": `${mousePos.x}px`,
          "--mouse-y": `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* Efeito interativo de luz do mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.03), transparent 40%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col items-center px-4 pt-8 pb-16 text-center sm:px-6 md:pt-4 md:pb-12">
        {/* Monumental Title */}
        <ScrollReveal
          as="h1"
          delay={0}
          className="flex flex-col items-center uppercase leading-[0.85] w-full select-none font-display font-[900] tracking-[-0.04em]"
        >
          {/* Linha 1: OPNORA */}
          <span
            className="text-white"
            style={{
              fontSize: "clamp(3rem, 10vw, 9rem)",
            }}
          >
            OPNORA
          </span>

          {/* Linha 2: TECNOLOGIAS */}
          <span
            className="mt-2 sm:mt-1 max-w-full aurora-holographic-text"
            style={{
              fontSize: "clamp(3rem, 11vw, 9rem)",
              lineHeight: "0.9",
            }}
          >
            TECNOLOGIAS
          </span>
        </ScrollReveal>

        {/* H2 Title */}
        <ScrollReveal
          as="h2"
          delay={150}
          className="mx-auto mt-8 text-base sm:text-lg md:text-xl font-display font-medium text-white tracking-wide"
        >
          Engenharia do Futuro da Tecnologia
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal
          as="p"
          delay={250}
          className="mx-auto mt-4 max-w-[680px] text-sm font-light leading-relaxed text-slate-400 sm:text-base"
        >
          A Opnora cria software, automação e inteligência artificial para transformar desafios reais em soluções digitais inteligentes.
        </ScrollReveal>

        {/* Buttons */}
        <ScrollReveal
          delay={400}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full px-4 sm:px-0"
        >
          <Link
            to="/solucoes"
            className="inline-flex h-10 md:h-11 w-full sm:w-60 items-center justify-center rounded-sm px-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(255,255,255,0.15)] whitespace-nowrap"
            style={{ backgroundColor: "#ffffff" }}
          >
            CONHECER SOLUÇÕES
          </Link>
          <Link
            to="/sobre"
            className="inline-flex h-10 md:h-11 w-full sm:w-60 items-center justify-center rounded-sm border border-white/20 bg-transparent px-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:border-white/50 hover:shadow-[0_4px_14px_rgba(255,255,255,0.05)] whitespace-nowrap"
          >
            SOBRE A OPNORA
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
