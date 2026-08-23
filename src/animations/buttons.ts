import { shouldReduceMotion } from "./utils";

/**
 * Aplica feedback tátil e animação fluida de botão usando Anime.js (Client Only)
 */
export function setupButtonInteraction(buttonEl: HTMLElement | null) {
	if (typeof window === "undefined" || !buttonEl || shouldReduceMotion())
		return;

	const iconEl = buttonEl.querySelector("svg, .btn-icon");

	const handleMouseEnter = async () => {
		const anime = (await import("animejs")).default;
		anime.remove([buttonEl, iconEl]);
		anime({
			targets: buttonEl,
			scale: 1.02,
			boxShadow: "0 0 25px rgba(162, 128, 255, 0.35)",
			duration: 200,
			easing: "easeOutCubic",
		});

		if (iconEl) {
			anime({
				targets: iconEl,
				translateX: 4,
				duration: 200,
				easing: "easeOutCubic",
			});
		}
	};

	const handleMouseLeave = async () => {
		const anime = (await import("animejs")).default;
		anime.remove([buttonEl, iconEl]);
		anime({
			targets: buttonEl,
			scale: 1.0,
			boxShadow: "0 0 0px rgba(162, 128, 255, 0)",
			duration: 180,
			easing: "easeOutCubic",
		});

		if (iconEl) {
			anime({
				targets: iconEl,
				translateX: 0,
				duration: 180,
				easing: "easeOutCubic",
			});
		}
	};

	const handleMouseDown = async () => {
		const anime = (await import("animejs")).default;
		anime({
			targets: buttonEl,
			scale: 0.98,
			duration: 100,
			easing: "easeOutQuad",
		});
	};

	buttonEl.addEventListener("mouseenter", handleMouseEnter);
	buttonEl.addEventListener("mouseleave", handleMouseLeave);
	buttonEl.addEventListener("mousedown", handleMouseDown);

	return () => {
		buttonEl.removeEventListener("mouseenter", handleMouseEnter);
		buttonEl.removeEventListener("mouseleave", handleMouseLeave);
		buttonEl.removeEventListener("mousedown", handleMouseDown);
	};
}
