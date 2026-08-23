import { shouldReduceMotion } from "./utils";

/**
 * Aplica efeitos interativos com Anime.js nos cards ao passar o mouse (Client Only)
 */
export function setupCardHover(cardEl: HTMLElement | null) {
	if (typeof window === "undefined" || !cardEl || shouldReduceMotion()) return;

	const handleMouseEnter = async () => {
		const anime = (await import("animejs")).default;
		anime.remove(cardEl);
		anime({
			targets: cardEl,
			scale: 1.02,
			translateY: -4,
			boxShadow: "0 20px 40px rgba(162, 128, 255, 0.12)",
			borderColor: "rgba(162, 128, 255, 0.35)",
			duration: 250,
			easing: "easeOutQuad",
		});
	};

	const handleMouseLeave = async () => {
		const anime = (await import("animejs")).default;
		anime.remove(cardEl);
		anime({
			targets: cardEl,
			scale: 1.0,
			translateY: 0,
			boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
			borderColor: "rgba(255, 255, 255, 0.08)",
			duration: 200,
			easing: "easeOutQuad",
		});
	};

	cardEl.addEventListener("mouseenter", handleMouseEnter);
	cardEl.addEventListener("mouseleave", handleMouseLeave);

	return () => {
		cardEl.removeEventListener("mouseenter", handleMouseEnter);
		cardEl.removeEventListener("mouseleave", handleMouseLeave);
	};
}
