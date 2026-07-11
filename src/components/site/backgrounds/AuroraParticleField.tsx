import React, { useEffect, useRef, useState } from "react";

const PALETTE = [
  "#38bdf8", // Cyan
  "#0055ff", // Electric Blue
  "#a280ff", // Violet
  "#ff00ff", // Magenta (subtle)
];

class Particle {
  radius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  baseOpacity: number;
  opacity: number;
  z: number;

  constructor(canvasWidth: number, canvasHeight: number, index: number, total: number) {
    // Distribuir em espirais/anéis orgânicos
    const rings = Math.floor(Math.sqrt(total));
    const ringIndex = index % rings;
    const ringProgress = ringIndex / rings;
    
    // Raio baseia-se no anel, com pequena variação
    this.radius = (ringProgress * canvasWidth * 0.6) + (Math.random() * 20 - 10);
    this.angle = (index / total) * Math.PI * 20 + Math.random() * 0.2; // Espiral
    
    // Z index para simular profundidade (parallax e tamanho)
    this.z = Math.random() * 2 - 1; // -1 a 1

    this.speed = (0.001 + Math.random() * 0.002) * (Math.random() > 0.5 ? 1 : -1); // Um pouco mais rápido
    
    this.size = Math.random() * 2 + 1.5; // 1.5px to 3.5px (mais espessos)
    this.baseOpacity = Math.random() * 0.6 + 0.4; // 0.4 a 1.0 (muito mais brilhante)
    this.opacity = this.baseOpacity;

    const isMagenta = Math.random() > 0.95;
    this.color = isMagenta ? PALETTE[3] : PALETTE[Math.floor(Math.random() * 3)];
  }

  update(mouse: { x: number; y: number }, isReducedMotion: boolean, time: number, center: { x: number; y: number }) {
    if (!isReducedMotion) {
      this.angle += this.speed;
      // Ondulação orgânica
      this.radius += Math.sin(time * 0.001 + this.angle) * 0.2;
    }

    // Interação com o mouse: distorção suave adicional
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    
    if (mouse.x > 0 && mouse.y > 0 && !isReducedMotion) {
      const currentX = center.x + Math.cos(this.angle) * this.radius;
      const currentY = center.y + Math.sin(this.angle) * this.radius * 0.5; // Efeito 3D esmagado no Y
      
      const dx = mouse.x - currentX;
      const dy = mouse.y - currentY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Raio de interação super amplo, mas força bem suave
      if (dist < 500) {
        const force = (500 - dist) / 500;
        // O empurrão agora é muito mais gentil (fator de 60 em vez de 150)
        mouseOffsetX = -(dx / dist) * (force * force) * 60 * (this.z + 1.5);
        mouseOffsetY = -(dy / dist) * (force * force) * 60 * (this.z + 1.5);
      }
    }

    return { mouseOffsetX, mouseOffsetY };
  }

  draw(ctx: CanvasRenderingContext2D, globalAlpha: number, mouseOffset: { mouseOffsetX: number, mouseOffsetY: number }, center: { x: number; y: number }) {
    ctx.save();
    
    const currentOpacity = this.opacity * globalAlpha;
    
    ctx.globalAlpha = currentOpacity;
    ctx.strokeStyle = this.color;
    // Opcional: Adicionar um leve glow
    ctx.shadowBlur = this.size * 2;
    ctx.shadowColor = this.color;
    ctx.lineWidth = this.size * (this.z + 1.5) * 0.5; // Variar espessura com Z
    ctx.lineCap = "round";

    // Posição calculada baseada no centro dinâmico (que segue o mouse)
    const x = center.x + Math.cos(this.angle) * this.radius + mouseOffset.mouseOffsetX;
    const y = center.y + Math.sin(this.angle) * this.radius * 0.5 + mouseOffset.mouseOffsetY;
    
    // O rastro (linha) aponta para a direção do movimento tangente à curva
    const tangentAngle = this.angle + Math.PI / 2;
    const trailLength = this.size * 3 * (this.speed > 0 ? 1 : -1);

    const endX = x + Math.cos(tangentAngle) * trailLength;
    const endY = y + Math.sin(tangentAngle) * trailLength * 0.5;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Se o raio de interação com o mouse estiver próximo, desenhar uma linha de conexão extra? (opcional)
    // Para manter limpo, apenas os traços.

    ctx.restore();
  }
}

export function AuroraParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const fadeProgress = useRef(0);
  const lastTime = useRef(0);
  
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const vortexCenter = useRef({ x: 0, y: 0 });
  const isReducedMotion = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  // Initialize and handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener("change", handler);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Inicializa o centro do vórtice no meio da tela na primeira vez
      if (vortexCenter.current.x === 0 && vortexCenter.current.y === 0) {
        vortexCenter.current = { x: rect.width / 2, y: rect.height / 2 };
      }

      // Recalculate particles amount for vortex density
      const isMobile = window.innerWidth < 768;
      const targetCount = isMobile ? 300 : 800; // Quantidade massiva para criar a "teia" rica
      
      particles.current = [];
      for (let i = 0; i < targetCount; i++) {
        particles.current.push(new Particle(rect.width, rect.height, i, targetCount));
      }
    };

    window.addEventListener("resize", resize);
    resize(); // Initial sizing

    return () => {
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  // Intersection Observer for performance and fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            // Reset fade progress when entering screen
            fadeProgress.current = 0;
            lastTime.current = performance.now();
          }
        });
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !isVisible) return;

    const render = (time: number) => {
      const deltaTime = time - lastTime.current;
      lastTime.current = time;

      // Handle gradual fade-in (1.5 seconds)
      if (fadeProgress.current < 1) {
        fadeProgress.current += deltaTime / 1500; // 1500ms
        if (fadeProgress.current > 1) fadeProgress.current = 1;
      }

      // Clear canvas (with subtle trail effect if desired, but here we just clear)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = canvas.getBoundingClientRect();

      // Suavizar movimento do centro do vórtice em direção ao mouse
      // Se o mouse estiver ativo, o centro segue o mouse. Se não, volta pro meio.
      const targetCenter = mouse.current.x > 0 
        ? { x: mouse.current.x, y: mouse.current.y }
        : { x: rect.width / 2, y: rect.height / 2 };

      // Lerp muito suave (0.01 em vez de 0.03) para dar peso e fluidez arrastada
      vortexCenter.current.x += (targetCenter.x - vortexCenter.current.x) * 0.01;
      vortexCenter.current.y += (targetCenter.y - vortexCenter.current.y) * 0.01;

      particles.current.forEach((p) => {
        const offset = p.update(mouse.current, isReducedMotion.current, time, vortexCenter.current);
        
        // Easing the global alpha for smooth entry
        const easeAlpha = Math.sin((fadeProgress.current * Math.PI) / 2);
        p.draw(ctx, easeAlpha, offset, vortexCenter.current);
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !isVisible) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Vinheta escura sutil nas bordas */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, #050507 90%)"
        }}
      />
    </div>
  );
}
