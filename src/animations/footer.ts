import gsap from "gsap";
import { initGSAP, OPNORA_EASINGS, shouldReduceMotion } from "./utils";

/**
 * Anima a entrada escalonada dos elementos do Footer
 */
export function animateFooter(footerEl: HTMLElement | null) {
	if (typeof window === "undefined" || !footerEl || shouldReduceMotion())
		return;
	initGSAP();

	const columns = footerEl.querySelectorAll(".footer-col");
	if (columns.length === 0) return;

	const ctx = gsap.context(() => {
		gsap.fromTo(
			columns,
			{ opacity: 0, y: 30, willChange: "transform, opacity" },
			{
				opacity: 1,
				y: 0,
				stagger: 0.12,
				duration: 0.9,
				ease: OPNORA_EASINGS.SMOOTH_OUT,
				clearProps: "willChange",
				scrollTrigger: {
					trigger: footerEl,
					start: "top 88%",
					toggleActions: "play none none none",
				},
			},
		);
	});

	// Efeito magnético nos ícones sociais (Client Only)
	const socialIcons = footerEl.querySelectorAll(".social-icon");
	socialIcons.forEach((icon) => {
		const el = icon as HTMLElement;
		el.addEventListener("mouseenter", async () => {
			const anime = (await import("animejs")).default;
			anime({
				targets: el,
				scale: 1.15,
				rotate: "6deg",
				color: "#a280ff",
				duration: 200,
				easing: "easeOutCubic",
			});
		});
		el.addEventListener("mouseleave", async () => {
			const anime = (await import("animejs")).default;
			anime({
				targets: el,
				scale: 1.0,
				rotate: "0deg",
				color: "#94a3b8",
				duration: 200,
				easing: "easeOutCubic",
			});
		});
	});

	return () => ctx.revert();
}
