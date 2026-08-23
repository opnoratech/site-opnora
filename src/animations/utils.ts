import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registra o plugin ScrollTrigger de forma segura para SSR.
 */
let registered = false;

export function initGSAP() {
	if (typeof window === "undefined" || registered) return;
	gsap.registerPlugin(ScrollTrigger);
	registered = true;
}

/**
 * Verifica se o usuário prefere redução de movimento (Acessibilidade)
 */
export function shouldReduceMotion(): boolean {
	if (typeof window === "undefined") return true;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Easings padrão de alta elegância para o tema Opnora
 */
export const OPNORA_EASINGS = {
	SMOOTH_OUT: "power3.out",
	EXPO_OUT: "expo.out",
	ELASTIC_SOFT: "back.out(1.4)",
} as const;
