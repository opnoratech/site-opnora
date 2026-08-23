import gsap from "gsap";
import { initGSAP, OPNORA_EASINGS, shouldReduceMotion } from "./utils";

export interface HeroAnimationConfig {
	containerRef: React.RefObject<HTMLElement | null>;
	badgeRef?: React.RefObject<HTMLElement | null>;
	titleRef?: React.RefObject<HTMLElement | null>;
	subtitleRef?: React.RefObject<HTMLElement | null>;
	ctaRef?: React.RefObject<HTMLElement | null>;
	showcaseRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Anima a abertura da seção Hero com timeline suave do GSAP
 */
export function animateHero({
	containerRef,
	badgeRef,
	titleRef,
	subtitleRef,
	ctaRef,
	showcaseRef,
}: HeroAnimationConfig) {
	if (typeof window === "undefined" || shouldReduceMotion()) return;
	initGSAP();

	const container = containerRef.current;
	if (!container) return;

	const ctx = gsap.context(() => {
		const elementsToAnimate = [
			badgeRef?.current,
			titleRef?.current,
			subtitleRef?.current,
			ctaRef?.current,
		].filter(Boolean);

		if (elementsToAnimate.length > 0) {
			gsap.fromTo(
				elementsToAnimate,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.15,
					duration: 1.0,
					ease: OPNORA_EASINGS.SMOOTH_OUT,
				},
			);
		}

		if (showcaseRef?.current) {
			gsap.fromTo(
				showcaseRef.current,
				{ opacity: 0, scale: 0.94, y: 20 },
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 1.2,
					delay: 0.3,
					ease: OPNORA_EASINGS.EXPO_OUT,
				},
			);
		}
	}, container);

	return () => ctx.revert();
}
