import React from "react";

export function AuroraNebulaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#050507]">
      {/* 
        Camada base: Grid sutil preservando a estética de grid atual, 
        se houver a classe no CSS (neste caso mantemos simples com ruído).
      */}
      
      {/* 
        Filtro SVG para criar a poeira cósmica / ruído sutil.
        Opacidade super baixa para não poluir.
      */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
        </filter>
      </svg>
      <div 
        className="absolute inset-0 z-10 opacity-[0.04] mix-blend-overlay animate-aurora-fade"
        style={{ filter: "url(#noiseFilter)" }}
      />

      {/* Camada 1: Lado esquerdo - Névoa azul/violeta mais fraca */}
      <div 
        className="absolute -left-[10%] top-[10%] h-[70%] w-[50%] animate-aurora-drift-1 rounded-full mix-blend-screen blur-[120px]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.6), rgba(162, 128, 255, 0.2), transparent 70%)"
        }}
      />

      {/* Camada 2: Canto inferior direito - Aurora mais intensa */}
      <div 
        className="absolute -right-[15%] bottom-[-20%] h-[90%] w-[60%] animate-aurora-drift-2 rounded-[100%] mix-blend-screen blur-[130px]"
        style={{
          background: "radial-gradient(circle at center, rgba(162, 128, 255, 0.7), rgba(0, 85, 255, 0.5), rgba(255, 0, 255, 0.2), transparent 65%)"
        }}
      />

      {/* Camada 3: Brilho/Glow no rodapé subindo levemente */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[40%] mix-blend-screen blur-[80px]"
        style={{
          background: "linear-gradient(to top, rgba(56, 189, 248, 0.3), transparent)"
        }}
      />

      {/* Camada 4: Centro - Glow fraquíssimo atrás do conteúdo */}
      <div 
        className="absolute left-[50%] top-[50%] h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 animate-nebula-pulse rounded-full mix-blend-screen blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.2), transparent 60%)"
        }}
      />

      {/* Vinheta nas bordas para focar a atenção no centro */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none" 
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, #050507 100%)" }}
      />
    </div>
  );
}
