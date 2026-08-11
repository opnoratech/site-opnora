import gsap from "gsap";
import { initGSAP, shouldReduceMotion, OPNORA_EASINGS } from "./utils";

export type ScrollAnimationType =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "clip-reveal";

export interface ScrollRevealOptions {
  type?: ScrollAnimationType;
  delay?: number;
  duration?: number;
  threshold?: string; // Ex: "top 80%" (20% visível)
  stagger?: number;
}

/**
 * Anima a entrada de um elemento ou lista de elementos ao rolar até ~20% da tela
 */
export function animateOnScroll(
  target: HTMLElement | HTMLElement[] | string,
  options: ScrollRevealOptions = {},
) {
  if (shouldReduceMotion()) return;
  initGSAP();

  const {
    type = "fade-up",
    delay = 0,
    duration = 0.85,
    threshold = "top 82%",
    stagger = 0.1,
  } = options;

  const ctx = gsap.context(() => {
    let fromProps: gsap.TweenVars = {
      opacity: 0,
      willChange: "transform, opacity",
    };

    switch (type) {
      case "fade-left":
        fromProps = { ...fromProps, x: -40, y: 0 };
        break;
      case "fade-right":
        fromProps = { ...fromProps, x: 40, y: 0 };
        break;
      case "scale-up":
        fromProps = { ...fromProps, scale: 0.93, y: 15 };
        break;
      case "clip-reveal":
        fromProps = {
          ...fromProps,
          clipPath: "inset(0 100% 0 0)",
          willChange: "clip-path, opacity",
        };
        break;
      case "fade-up":
      default:
        fromProps = { ...fromProps, y: 35 };
        break;
    }

    gsap.fromTo(target, fromProps, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: "inset(0 0% 0 0)",
      duration,
      delay,
      stagger,
      ease: OPNORA_EASINGS.SMOOTH_OUT,
      clearProps: "willChange,clipPath",
      scrollTrigger: {
        trigger: target as gsap.DOMTarget,
        start: threshold,
        toggleActions: "play none none none",
      },
    });
  });

  return () => ctx.revert();
}
