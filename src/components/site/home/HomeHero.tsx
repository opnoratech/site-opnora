import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { animateHero } from "@/animations";

export function HomeHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = animateHero({
      containerRef,
      titleRef,
      subtitleRef: descRef,
      ctaRef,
    });
    return () => {
      cleanup?.();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
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
        <h1
          ref={titleRef}
          className="flex flex-col items-center uppercase leading-[0.95] py-2 w-full select-none font-display font-[900] tracking-[-0.04em]"
        >
          {/* Linha 1: OPNORA */}
          <span
            className="text-white"
            style={{
              fontSize: "clamp(2rem, 10vw, 9rem)",
            }}
          >
            OPNORA
          </span>

          {/* Linha 2: TECNOLOGIAS */}
          <span
            className="mt-1 max-w-full aurora-holographic-text"
            style={{
              fontSize: "clamp(1.75rem, 11vw, 9rem)",
            }}
          >
            TECNOLOGIAS
          </span>
        </h1>

        {/* H2 Title */}
        <h2
          ref={subtitleRef}
          className="mx-auto mt-8 text-base sm:text-lg md:text-xl font-display font-medium text-white tracking-wide"
        >
          Desenvolvimento & Engenharia de Software
        </h2>

        {/* Subtitle */}
        <p
          ref={descRef}
          className="mx-auto mt-4 max-w-[680px] text-sm font-light leading-relaxed text-slate-400 sm:text-base"
        >
          Desenvolvemos software sob medida, automações e soluções com IA para empresas que querem
          organizar processos e evoluir com tecnologia.
        </p>

        {/* Buttons */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full px-4 sm:px-0"
        >
          <Link
            to="/contato"
            hash="formulario-contato"
            className="inline-flex h-10 md:h-11 w-full sm:w-60 items-center justify-center rounded-sm px-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(255,255,255,0.15)] whitespace-nowrap"
            style={{ backgroundColor: "#ffffff" }}
          >
            INICIAR UM PROJETO
          </Link>
          <Link
            to="/solucoes"
            className="inline-flex h-10 md:h-11 w-full sm:w-60 items-center justify-center rounded-sm border border-white/20 bg-transparent px-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:border-white/50 hover:shadow-[0_4px_14px_rgba(255,255,255,0.05)] whitespace-nowrap"
          >
            VER SOLUÇÕES
          </Link>
        </div>
      </div>
    </section>
  );
}
