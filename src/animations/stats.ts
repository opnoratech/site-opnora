import gsap from "gsap";
import { initGSAP, OPNORA_EASINGS, shouldReduceMotion } from "./utils";

/**
 * Anima contadores numéricos de 0 até o valor final usando GSAP
 */
export function animateCounter(
	targetEl: HTMLElement | null,
	endValue: number,
	prefix: string = "",
	suffix: string = "",
) {
	if (!targetEl) return;
	if (shouldReduceMotion()) {
		targetEl.innerText = `${prefix}${endValue}${suffix}`;
		return;
	}
	initGSAP();

	const counterObj = { value: 0 };

	const ctx = gsap.context(() => {
		gsap.to(counterObj, {
			value: endValue,
			duration: 1.8,
			ease: OPNORA_EASINGS.EXPO_OUT,
			scrollTrigger: {
				trigger: targetEl,
				start: "top 85%",
				toggleActions: "play none none none",
			},
			onUpdate: () => {
				targetEl.innerText = `${prefix}${Math.floor(counterObj.value)}${suffix}`;
			},
		});
	});

	return () => ctx.revert();
}
