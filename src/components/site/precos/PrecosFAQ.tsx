import { FaCircleQuestion } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Como funciona o ciclo de pagamento?",
    answer:
      "Trabalhamos com ciclos mensais ou contratos anuais com desconto de 20%. O faturamento ocorre sempre no dia 1º de cada mês, com emissão de nota fiscal para a sua empresa.",
  },
  {
    question: "Posso mudar de plano durante o projeto?",
    answer:
      "Sim! A Opnora é super flexível. Se o seu projeto escalar e você precisar migrar do Start para o Pro, ajustamos o escopo e a diferença de valor no próximo ciclo.",
  },
  {
    question: "Vocês cobram alguma taxa de setup inicial?",
    answer:
      "Depende da complexidade da infraestrutura. Para o plano Start, o setup geralmente está incluso. Para os planos Pro e Enterprise, faremos um mapeamento na nossa reunião de discovery.",
  },
  {
    question: "O código fonte desenvolvido é meu?",
    answer:
      "Absolutamente! Após a quitação do projeto, a propriedade intelectual do código fonte e dos designs pertence 100% à sua empresa.",
  },
];

export function PrecosFAQ() {
  return (
    <section className="relative py-24 border-t border-white/5">
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
            Tudo o que você precisa saber antes de contratar a Opnora.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-white/10">
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
