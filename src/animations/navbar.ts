import gsap from "gsap";
import { initGSAP, shouldReduceMotion } from "./utils";

/**
 * Conecta o header/navbar ao GSAP ScrollTrigger para encolher e escurecer no scroll
 */
export function initNavbarScrollAnimation(headerEl: HTMLElement | null) {
  if (!headerEl || shouldReduceMotion()) return;
  initGSAP();

  const ctx = gsap.context(() => {
    gsap.to(headerEl, {
      scrollTrigger: {
        trigger: "body",
        start: "top -40px",
        end: "top -120px",
        scrub: 0.5,
      },
      paddingTop: "0.6rem",
      paddingBottom: "0.6rem",
      backgroundColor: "rgba(12, 12, 16, 0.88)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
      borderColor: "rgba(255, 255, 255, 0.12)",
    });
  });

  return () => ctx.revert();
}
