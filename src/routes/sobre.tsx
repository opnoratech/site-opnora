import { createFileRoute } from "@tanstack/react-router";
import { SobreEquipe } from "@/components/site/sobre/SobreEquipe";
import { SobreFoco } from "@/components/site/sobre/SobreFoco";
import { SobreHeroSection } from "@/components/site/sobre/SobreHeroSection";
import { SobreHistoria } from "@/components/site/sobre/SobreHistoria";
import { SobreOperacao } from "@/components/site/sobre/SobreOperacao";
import { SobreQuemSomos } from "@/components/site/sobre/SobreQuemSomos";

export const Route = createFileRoute("/sobre")({
	head: () => ({
		meta: [
			{ title: "Sobre | Opnora" },
			{
				name: "description",
				content:
					"A Opnora desenvolve software sob medida com inteligência artificial, automação e dados para transformar problemas reais em soluções digitais.",
			},
		],
	}),
	component: SobrePage,
});

function SobrePage() {
	return (
		<>
			<SobreHeroSection />
			<SobreQuemSomos />
			<SobreOperacao />
			<SobreFoco />
			<SobreHistoria />
			<SobreEquipe />
		</>
	);
}
