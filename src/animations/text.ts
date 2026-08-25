import gsap from "gsap";
import { initGSAP, OPNORA_EASINGS, shouldReduceMotion } from "./utils";

/**
 * Anima a entrada de títulos importantes palavra por palavra (stagger) usando GSAP
 */
export function animateTextStagger(
  textEl: HTMLElement | null,
  options: { delay?: number; duration?: number; threshold?: string } = {},
) {
  if (!textEl || shouldReduceMotion()) return;
  initGSAP();

  const { delay = 0, duration = 0.8, threshold = "top 85%" } = options;

  const words = textEl.innerText.split(" ");
  textEl.innerHTML = words
    .map(
      (w) =>
        `<span className="inline-block opacity-0 translate-y-4 will-change-transform">${w}</span>`,
    )
    .join(" ");

  const wordSpans = textEl.querySelectorAll("span");

  const ctx = gsap.context(() => {
    gsap.to(wordSpans, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger: 0.05,
      ease: OPNORA_EASINGS.SMOOTH_OUT,
      clearProps: "willChange",
      scrollTrigger: {
        trigger: textEl,
        start: threshold,
        toggleActions: "play none none none",
      },
    });
  });

  return () => ctx.revert();
}
