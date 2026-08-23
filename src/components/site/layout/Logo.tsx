type Props = {
	className?: string;
	theme?: "white" | "black";
};

export function Logo({ className = "", theme = "white" }: Props) {
	const src =
		theme === "black"
			? "/images/logo/LogoOpnora_ExtendedBlack.png"
			: "/images/logo/LogoOpnora_ExtendedWhite.png";

	return (
		<img
			src={src}
			alt="Opnora"
			className={`w-auto object-contain select-none pointer-events-none ${className}`}
		/>
	);
}
