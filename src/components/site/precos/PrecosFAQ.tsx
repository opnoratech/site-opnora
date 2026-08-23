import { FaCircleQuestion } from "react-icons/fa6";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const FAQS = [
	{
		question: "O valor pode mudar?",
		answer:
			"Sim. Os valores são iniciais e podem variar conforme escopo, quantidade de páginas, funcionalidades, integrações e prazo.",
	},
	{
		question: "A verba de tráfego pago está inclusa?",
		answer:
			"Não. A verba dos anúncios é separada do valor do serviço da Opnora.",
	},
	{
		question: "Vocês fazem sistemas personalizados?",
		answer:
			"Sim. Projetos como sistemas, plataformas, dashboards e automações são avaliados sob medida.",
	},
	{
		question: "Posso começar pequeno e evoluir depois?",
		answer:
			"Sim. A ideia é permitir que o projeto comece com uma estrutura viável e evolua conforme a necessidade do negócio.",
	},
	{
		question: "Tem manutenção mensal?",
		answer:
			"Sim. A manutenção pode ser contratada separadamente de acordo com o tipo de projeto.",
	},
];

export function PrecosFAQ() {
	return (
		<section className="relative py-24 border-t border-white/5 bg-[#07070a]">
			<div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#a280ff]/5 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />

			<div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 z-10">
				<ScrollReveal className="text-center mb-16">
					<div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
						<FaCircleQuestion className="w-5 h-5 text-[#a280ff] shrink-0 mt-0.5" />
					</div>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
						Perguntas frequentes
					</h2>
					<p className="text-slate-400">
						Tudo o que você precisa saber antes de iniciar seu projeto com a
						Opnora.
					</p>
				</ScrollReveal>

				<ScrollReveal delay={200}>
					<Accordion type="single" collapsible className="w-full">
						{FAQS.map((faq, idx) => (
							<AccordionItem
								key={idx}
								value={`item-${idx}`}
								className="border-white/10"
							>
								<AccordionTrigger className="text-left text-white hover:text-[#a280ff] hover:no-underline font-medium py-6 px-2">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-slate-400 leading-relaxed px-2 pb-6">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</ScrollReveal>
			</div>
		</section>
	);
}
