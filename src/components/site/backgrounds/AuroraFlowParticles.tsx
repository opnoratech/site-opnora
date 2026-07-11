import React, { useEffect, useRef, useState } from "react";

const PALETTE = [
  "#38bdf8", // Cyan
  "#0055ff", // Electric Blue
  "#a280ff", // Violet
  "#ff00ff", // Magenta (subtle)
];

class FlowParticle {
  x: number;
  y: number;
  z: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: "dot" | "line";
  length: number;
  baseOpacity: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;
  seed: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    
    // Z de 0.1 (fundo) a 1.0 (frente)
    this.z = Math.random() * 0.9 + 0.1;

    // Drift principal (horizontal/diagonal da esquerda pra direita, cima pra baixo)
    this.baseVx = (Math.random() * 0.2 + 0.1) * this.z;
    this.baseVy = (Math.random() * 0.1 - 0.05) * this.z;
    this.vx = 0;
    this.vy = 0;
    
    // Tipos de partículas
    this.type = Math.random() > 0.6 ? "line" : "dot";
    
    // Tamanhos dependem do Z (profundidade)
    this.size = (Math.random() * 1.5 + 1) * this.z; // 1 a 2.5
    this.length = (Math.random() * 6 + 3) * this.z; // 3 a 9
    
    this.baseOpacity = (Math.random() * 0.5 + 0.2) * this.z; // Partículas de fundo são mais transparentes
    this.opacity = this.baseOpacity;

    const isMagenta = Math.random() > 0.95;
    this.color = isMagenta ? PALETTE[3] : PALETTE[Math.floor(Math.random() * 3)];
    
    this.seed = Math.random() * 1000;
  }

  update(mouse: { x: number; y: number }, isReducedMotion: boolean, time: number) {
    if (!isReducedMotion) {
      // Interação com o mouse
      if (mouse.x > 0 && mouse.y > 0) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 150;
        if (dist < interactionRadius) {
          // Força proporcional com atenuação quadrática e considerando Z (parallax)
          const strength = Math.pow(1 - dist / interactionRadius, 2) * this.z;
          this.vx += (dx / dist) * strength * 0.08;
          this.vy += (dy / dist) * strength * 0.08;
        }
      }

      // Amortecimento
      this.vx *= 0.96;
      this.vy *= 0.96;

      // Movimento fluido combinando drift + onda senoidal + repulsão
      const timeOffset = time * 0.0005 + this.seed;
      const waveX = Math.sin(timeOffset) * 0.1;
      const waveY = Math.cos(timeOffset * 0.8) * 0.1;

      this.x += this.baseVx + waveX + this.vx;
      this.y += this.baseVy + waveY + this.vy;
    } else {
      // Movimento quase parado para acessibilidade
      this.x += this.baseVx * 0.05;
      this.y += this.baseVy * 0.05;
    }

    // Wrap around screen suave
    if (this.x > this.canvasWidth + 20) this.x = -20;
    if (this.x < -20) this.x = this.canvasWidth + 20;
    if (this.y > this.canvasHeight + 20) this.y = -20;
    if (this.y < -20) this.y = this.canvasHeight + 20;
  }

  draw(ctx: CanvasRenderingContext2D, globalAlpha: number) {
    ctx.save();
    
    const currentOpacity = this.opacity * globalAlpha;
    ctx.globalAlpha = currentOpacity;
    
    // Glow suave, mais forte nas partículas mais próximas
    ctx.shadowBlur = this.size * 2;
    ctx.shadowColor = this.color;
    
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size * 0.8;
    ctx.lineCap = "round";

    if (this.type === "dot") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // O ângulo responde ativamente às forças do mouse (velocidade adicional)
      const currentAngle = Math.atan2(this.baseVy + this.vy, this.baseVx + this.vx);
      const endX = this.x + Math.cos(currentAngle) * this.length;
      const endY = this.y + Math.sin(currentAngle) * this.length;

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    ctx.restore();
  }
}

export function AuroraFlowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const fadeProgress = useRef(0);
  const lastTime = useRef(0);
  
  const particles = useRef<FlowParticle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000, isActive: false, alpha: 0 });
  const isReducedMotion = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

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

      const isMobile = window.innerWidth < 768;
      // Aumentei um pouco a quantidade para ficar mais rico
      const minCount = isMobile ? 60 : 180;
      const maxCount = isMobile ? 100 : 300;
      const targetCount = Math.floor(Math.random() * (maxCount - minCount + 1) + minCount);
      
      particles.current = [];
      for (let i = 0; i < targetCount; i++) {
        particles.current.push(new FlowParticle(rect.width, rect.height));
      }
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !isVisible) return;

    const render = (time: number) => {
      const deltaTime = time - lastTime.current;
      lastTime.current = time;

      // 1.5s fade in
      if (fadeProgress.current < 1) {
        fadeProgress.current += deltaTime / 1500;
        if (fadeProgress.current > 1) fadeProgress.current = 1;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atualiza alpha do mouse track
      if (mouse.current.isActive && mouse.current.x > 0) {
        mouse.current.alpha += (1 - mouse.current.alpha) * 0.05;
      } else {
        mouse.current.alpha += (0 - mouse.current.alpha) * 0.05;
      }

      // Glow Removido: Mantemos apenas a física de interação magnética limpa e sutil

      particles.current.forEach((p) => {
        p.update(mouse.current, isReducedMotion.current, time);
        const easeAlpha = Math.sin((fadeProgress.current * Math.PI) / 2);
        p.draw(ctx, easeAlpha);
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !isVisible) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
        alpha: mouse.current.alpha
      };
    };

    const handleMouseLeave = () => {
      mouse.current.isActive = false;
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
      
      {/* Centro Limpo e Vinheta Escura nas bordas */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, #050507 95%)"
        }}
      />
    </div>
  );
}
