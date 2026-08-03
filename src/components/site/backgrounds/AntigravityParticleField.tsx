import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Paleta: apenas azuis + violeta discreto ───
const COLORS = {
  darkBlue: "rgba(20, 60, 180, OPACITY)",
  electricBlue: "rgba(50, 120, 255, OPACITY)",
  lightBlue: "rgba(100, 170, 255, OPACITY)",
  violet: "rgba(130, 100, 220, OPACITY)",
};

type ParticleType = "dot_small" | "dot_bright";

class Particle {
  x: number;
  y: number;
  z: number; // profundidade 0.2–1.0
  vx: number;
  vy: number;
  pushVx: number;
  pushVy: number;
  size: number;
  type: ParticleType;
  color: string;
  baseOpacity: number;
  angle: number;
  seed: number;
  canvasW: number;
  canvasH: number;

  constructor(w: number, h: number) {
    this.canvasW = w;
    this.canvasH = h;
    this.pushVx = 0;
    this.pushVy = 0;
    this.seed = Math.random() * 6283;

    // Profundidade
    this.z = Math.random() * 0.8 + 0.2;

    // ─── Tipo e aparência (apenas bolinhas em camadas de profundidade) ───
    const roll = Math.random();
    if (roll < 0.4) {
      // 40% partículas muito distantes (Poeira estelar)
      this.type = "dot_small";
      this.z = Math.random() * 0.2 + 0.1; // 0.1 - 0.3
      this.size = 0.5 + Math.random() * 0.5; // 0.5–1px
      this.baseOpacity = 0.05 + Math.random() * 0.1;
      this.color = COLORS.darkBlue.replace("OPACITY", "1");
    } else if (roll < 0.8) {
      // 40% pontos médios normais
      this.type = "dot_small";
      this.z = Math.random() * 0.4 + 0.3; // 0.3 - 0.7
      this.size = 1.0 + Math.random() * 1.0; // 1–2px
      this.baseOpacity = (0.15 + Math.random() * 0.35) * this.z;
      const colorRoll = Math.random();
      if (colorRoll < 0.5) this.color = COLORS.lightBlue.replace("OPACITY", "1");
      else this.color = COLORS.violet.replace("OPACITY", "1");
    } else {
      // 20% pontos brilhantes próximos
      this.type = "dot_bright";
      this.z = Math.random() * 0.3 + 0.7; // 0.7 - 1.0
      this.size = 1.5 + Math.random() * 1.5; // 1.5–3px
      this.baseOpacity = (0.35 + Math.random() * 0.45) * this.z;
      this.color = COLORS.electricBlue.replace("OPACITY", "1");
    }

    // ─── Distribuição com densidade nas bordas ───
    this.x = this.distributedX(w, h);
    this.y = this.distributedY(w, h);

    // ─── Velocidade base: drift diagonal lento ───
    const speed = (0.08 + Math.random() * 0.18) * this.z;
    this.angle = (-0.3 + Math.random() * 0.6); // levemente diagonal
    this.vx = Math.cos(this.angle) * speed;
    this.vy = Math.sin(this.angle) * speed * 0.4;
  }

  /** Gera X com maior densidade nas bordas e lado direito */
  distributedX(w: number, _h: number): number {
    // Bias para as laterais e especialmente o lado direito
    const r = Math.random();
    if (r < 0.35) {
      // Lado direito (35%)
      return w * 0.65 + Math.random() * w * 0.35;
    } else if (r < 0.55) {
      // Lado esquerdo (20%)
      return Math.random() * w * 0.25;
    } else {
      // Centro-ish (45%) — mas espalha mais
      return Math.random() * w;
    }
  }

  /** Gera Y com maior densidade nas partes inferior e bordas */
  distributedY(_w: number, h: number): number {
    const r = Math.random();
    if (r < 0.35) {
      // Parte inferior
      return h * 0.6 + Math.random() * h * 0.4;
    } else if (r < 0.50) {
      // Topo (poucos)
      return Math.random() * h * 0.15;
    } else {
      return Math.random() * h;
    }
  }

  /** Máscara de densidade: reduz opacidade perto do centro */
  densityMask(w: number, h: number): number {
    const cx = w / 2;
    const cy = h * 0.42; // centro visual (um pouco acima da metade)
    const dx = (this.x - cx) / (w * 0.35);
    const dy = (this.y - cy) / (h * 0.3);
    const dist = Math.sqrt(dx * dx + dy * dy);
    // De 0 (centro) a 1 (borda), clamped
    return Math.min(1, dist);
  }

  update(
    mouseX: number,
    mouseY: number,
    mouseActive: boolean,
    mouseSpeedMultiplier: number,
    time: number,
    reducedMotion: boolean
  ) {
    if (!reducedMotion) {
      // ─── Ondulação orgânica ───
      const t = time * 0.0004 + this.seed;
      const waveX = Math.sin(t) * 0.06 * this.z;
      const waveY = Math.cos(t * 0.7 + 1.5) * 0.04 * this.z;

      // ─── Interação com mouse (muito sutil) ───
      if (mouseActive && mouseX > 0 && mouseSpeedMultiplier > 0.01) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 250; // Raio maior
        if (dist < radius && dist > 0) {
          const strength = Math.pow(1 - dist / radius, 2) * this.z * mouseSpeedMultiplier;
          // Somando a força para afastar (empurrar) a partícula
          this.pushVx += (dx / dist) * strength * 0.1;
          this.pushVy += (dy / dist) * strength * 0.1;
        }
      }

      // Amortecimento um pouco menor para o empurrão durar mais
      this.pushVx *= 0.96;
      this.pushVy *= 0.96;

      // ─── Efeito de Vento Direcional ───
      let windVx = 0;
      if (mouseActive && mouseX > 0 && mouseSpeedMultiplier > 0.01) {
        const cx = this.canvasW / 2;
        if (mouseX > cx && this.x < cx) {
           // Mouse na direita, empurra quem está na esquerda mais pra direita
           const factor = (mouseX - cx) / cx;
           windVx = factor * 0.4 * this.z * mouseSpeedMultiplier;
        } else if (mouseX < cx && this.x > cx) {
           // Mouse na esquerda, empurra quem está na direita mais pra esquerda
           const factor = (cx - mouseX) / cx;
           windVx = -factor * 0.4 * this.z * mouseSpeedMultiplier;
        }
      }

      this.x += this.vx + waveX + this.pushVx + windVx;
      this.y += this.vy + waveY + this.pushVy;
    } else {
      // Quase estático
      this.x += this.vx * 0.03;
      this.y += this.vy * 0.03;
    }

    // ─── Wrap suave ───
    const margin = 100; // Margem aumentada para cobrir o shift do parallax
    if (this.x > this.canvasW + margin) this.x = -margin;
    if (this.x < -margin) this.x = this.canvasW + margin;
    if (this.y > this.canvasH + margin) {
      this.y = -margin;
      this.x = this.distributedX(this.canvasW, this.canvasH);
    }
    if (this.y < -margin) {
      this.y = this.canvasH + margin;
      this.x = this.distributedX(this.canvasW, this.canvasH);
    }
  }

  draw(ctx: CanvasRenderingContext2D, fadeAlpha: number, parallaxX: number, parallaxY: number) {
    const mask = this.densityMask(this.canvasW, this.canvasH);
    const alpha = this.baseOpacity * fadeAlpha * (0.3 + mask * 0.7);
    if (alpha < 0.01) return;

    ctx.save();
    ctx.globalAlpha = alpha;

    ctx.fillStyle = this.color;

    if (this.type === "dot_bright") {
      ctx.shadowBlur = 4;
      ctx.shadowColor = this.color;
    }

    ctx.beginPath();
    
    // Calcula posição de renderização final com o parallax global + profundidade
    const renderX = this.x - parallaxX * this.z;
    const renderY = this.y - parallaxY * this.z;
    
    ctx.arc(renderX, renderY, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// ═══════════════════════════════════════════════════
// Componente React
// ═══════════════════════════════════════════════════

export function AntigravityParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const particles = useRef<Particle[]>([]);
  // Usamos um ponteiro global para rastrear mesmo durante o scroll
  const globalMouse = useRef({ clientX: -1000, clientY: -1000, isPresent: false, lastMoveTime: 0 });
  const mouse = useRef({ x: -1000, y: -1000, active: false });
  const parallax = useRef({ x: 0, y: 0 }); // Track global parallax
  const fadeProgress = useRef(0);
  const lastTime = useRef(0);
  const reducedMotion = useRef(false);
  const rafId = useRef<number | null>(null);

  // ─── Setup: resize, DPR, partículas ───
  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const isMobile = window.innerWidth < 768;
    // Quantidade bastante aumentada para um oceano de poeira cósmica
    const min = isMobile ? 80 : 500;
    const max = isMobile ? 120 : 800;
    const count = Math.floor(min + Math.random() * (max - min));

    particles.current = [];
    for (let i = 0; i < count; i++) {
      particles.current.push(new Particle(rect.width, rect.height));
    }
  }, []);

  // ─── Lifecycle: resize + reduced motion ───
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const onMqChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener("change", onMqChange);

    setup();
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
      mq.removeEventListener("change", onMqChange);
    };
  }, [setup]);

  // ─── IntersectionObserver ───
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

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ─── Render loop ───
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !isVisible) return;

    const render = (time: number) => {
      const dt = time - lastTime.current;
      lastTime.current = time;

      // Fade in suave (~1.5s)
      if (fadeProgress.current < 1) {
        fadeProgress.current += dt / 1500;
        if (fadeProgress.current > 1) fadeProgress.current = 1;
      }

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fadeAlpha = Math.sin((fadeProgress.current * Math.PI) / 2);

      // ─── Atualização Dinâmica do Mouse (para reagir ao Scroll) ───
      if (globalMouse.current.isPresent) {
        const mx = globalMouse.current.clientX - rect.left;
        const my = globalMouse.current.clientY - rect.top;
        if (mx >= 0 && mx <= rect.width && my >= 0 && my <= rect.height) {
          mouse.current.x = mx;
          mouse.current.y = my;
          mouse.current.active = true;
        } else {
          mouse.current.active = false;
        }
      } else {
        mouse.current.active = false;
      }

      const timeSinceMove = performance.now() - globalMouse.current.lastMoveTime;
      const isMoving = timeSinceMove < 150;
      const mouseSpeedMultiplier = isMoving ? 1 : Math.max(0, 1 - (timeSinceMove - 150) / 400);

      // ─── Atualização do Parallax ───
      let targetParallaxX = 0;
      let targetParallaxY = 0;
      if (mouse.current.active && rect && !reducedMotion.current) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetParallaxX = (mouse.current.x - centerX) * 0.1; // Intensidade do movimento
        targetParallaxY = (mouse.current.y - centerY) * 0.1;
      }
      
      // Interpolacao suave (lerp)
      parallax.current.x += (targetParallaxX - parallax.current.x) * 0.05;
      parallax.current.y += (targetParallaxY - parallax.current.y) * 0.05;

      particles.current.forEach((p) => {
        p.update(
          mouse.current.x,
          mouse.current.y,
          mouse.current.active,
          mouseSpeedMultiplier,
          time,
          reducedMotion.current
        );
        p.draw(ctx, fadeAlpha, parallax.current.x, parallax.current.y);
      });

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // ─── Mouse tracking via useRef (sem setState) ───
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      globalMouse.current.clientX = e.clientX;
      globalMouse.current.clientY = e.clientY;
      globalMouse.current.isPresent = true;
      globalMouse.current.lastMoveTime = performance.now();
    };

    const onLeave = () => {
      globalMouse.current.isPresent = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
