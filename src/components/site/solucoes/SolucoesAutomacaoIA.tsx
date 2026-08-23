import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
	FaArrowRight,
	FaBrain,
	FaChartColumn,
	FaRobot,
	FaShareNodes,
} from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const SOLUCOES = [
	{
		title: "Atendimento inteligente com IA",
		desc: "Criamos assistentes inteligentes para responder dúvidas frequentes, qualificar contatos, direcionar clientes e tornar o atendimento mais rápido e organizado.",
		items: [
			"Respostas automáticas personalizadas",
			"Qualificação inicial de leads",
			"Direcionamento para atendimento humano",
			"Integração com formulários e sistemas",
			"Fluxos adaptados ao negócio",
		],
		cta: "Conhecer automação",
		icon: FaRobot,
		accent: "#a280ff",
	},
	{
		title: "Automação de processos e mensagens",
		desc: "Conectamos canais de atendimento, formulários e fluxos operacionais para eliminar tarefas manuais e repetitivas, otimizando o tempo da sua equipe.",
		items: [
			"Respostas e triagem automáticas",
			"Fluxos operacionais inteligentes",
			"Encaminhamento ágil de contatos",
			"Redução de tarefas repetitivas",
			"Organização e padronização",
		],
		cta: "Automatizar processos",
		icon: FaShareNodes,
		accent: "#a280ff",
	},
	{
		title: "Integração entre sistemas e dados",
		desc: "Conectamos suas ferramentas, CRMs, WhatsApp, bancos de dados e sistemas internos para que a informação flua sem perdas ou retrabalho manual.",
		items: [
			"Sincronização de dados em tempo real",
			"Conexão entre CRMs e WhatsApp",
			"Integrações personalizadas",
			"Centralização de informações",
			"Fim do retrabalho manual",
		],
		cta: "Integrar sistemas",
		icon: FaBrain,
		accent: "#a280ff",
	},
	{
		title: "Métricas, dashboards e acompanhamento",
		desc: "Organizamos dados importantes em painéis e relatórios para acompanhar atendimentos, conversões, contatos e o desempenho real da operação.",
		items: [
			"Dashboards visuais personalizados",
			"Indicadores de atendimento e conversão",
			"Relatórios claros e objetivos",
			"Centralização de métricas",
			"Acompanhamento de evolução",
		],
		cta: "Acompanhar métricas",
		icon: FaChartColumn,
		accent: "#a280ff",
	},
];

const ITENS_TRAFEGO = [
	"Landing pages",
	"Google Ads",
	"Meta Ads",
	"Pixel e eventos",
	"Relatórios",
	"Otimização inicial",
];

type SolucoesAutomacaoIAProps = {
	showDetails?: boolean;
	bgClass?: string;
	eyebrow?: string;
};

export function SolucoesAutomacaoIA({
	showDetails = true,
	bgClass = "bg-[#0c0c0f]",
	eyebrow = "OPERAÇÃO & CRESCIMENTO DIGITAL",
}: SolucoesAutomacaoIAProps = {}) {
	const [activeCard, setActiveCard] = useState<number | null>(null);
	const [activeNode, setActiveNode] = useState<number | null>(null);

	return (
		<section
			className={`relative w-full ${bgClass} py-20 lg:py-28 border-t border-white/5 overflow-hidden`}
		>
			<div className="relative mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12 z-10">
				{/* Eyebrow + Header (Exibido apenas na página de Soluções) */}
				{showDetails && (
					<div className="max-w-3xl mb-12">
						<ScrollReveal>
							<div className="flex items-center gap-4 mb-6">
								<div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
								<span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
									{eyebrow}
								</span>
							</div>
						</ScrollReveal>

						<ScrollReveal delay={100}>
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
								Sua empresa não precisa{" "}
								<span
									className="text-transparent bg-clip-text inline-block"
									style={{
										backgroundImage:
											"linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
									}}
								>
									fazer tudo manualmente.
								</span>
							</h2>
						</ScrollReveal>

						<ScrollReveal delay={200}>
							<p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
								Criamos automações, assistentes inteligentes e fluxos digitais
								para melhorar o atendimento, captar oportunidades e ajudar sua
								empresa a crescer com mais organização.
							</p>
						</ScrollReveal>
					</div>
				)}

				{/* Soluções Principais (Design Horizontal) */}
				<div className={showDetails ? "mb-14" : ""}>
					<motion.div
						className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.15 }}
						variants={{
							hidden: {},
							visible: { transition: { staggerChildren: 0.08 } },
						}}
					>
						{SOLUCOES.map((sol, idx) => {
							const Icon = sol.icon;
							return (
								<motion.div
									key={sol.title}
									variants={{
										hidden: { opacity: 0, y: 16 },
										visible: { opacity: 1, y: 0 },
									}}
									transition={{ duration: 0.5, ease: [0, 0, 0.15, 1] }}
									onClick={() => setActiveCard(activeCard === idx ? null : idx)}
									data-active={activeCard === idx}
									style={{ WebkitTapHighlightColor: "transparent" }}
									className="group relative rounded-sm bg-[#131318] border border-white/[0.05] p-6 sm:p-7 transition-all duration-700 ease-out hover:bg-[#181820] hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] hover:-translate-y-2 data-[active=true]:bg-[#181820] data-[active=true]:border-[#b3a1ff]/20 data-[active=true]:shadow-[0_8px_30px_rgba(179,161,255,0.08)] data-[active=true]:-translate-y-2 overflow-hidden outline-none cursor-pointer md:cursor-default"
								>
									<div className="flex items-start gap-5 pointer-events-none md:pointer-events-auto">
										<div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-gradient-to-br from-[#a280ff]/15 to-white/[0.02] border border-[#a280ff]/25 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#a280ff]/50 group-data-[active=true]:scale-105 group-data-[active=true]:border-[#a280ff]/50 transition-all duration-300">
											<Icon className="size-5 sm:size-6 text-[#a280ff]" />
										</div>

										<div className="flex-1 min-w-0">
											<h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#c4b3ff] group-data-[active=true]:text-[#c4b3ff] transition-colors">
												{sol.title}
											</h3>
											<p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
												{sol.desc}
											</p>
										</div>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</div>

				{/* Seção Tráfego Pago Específico */}
				{showDetails && (
					<ScrollReveal>
						<div className="relative rounded-2xl bg-gradient-to-br from-[#131318] to-[#0e0e12] border border-white/10 p-6 sm:p-8 overflow-hidden">
							{/* Subtle aurora glow */}
							<div className="absolute top-0 right-0 w-80 h-80 bg-aurora-cyan/5 blur-[80px] rounded-full pointer-events-none" />

							<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
								{/* Coluna da esquerda - Textos e Tags */}
								<div className="lg:col-span-7">
									<div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#a280ff]/10 border border-[#a280ff]/25">
										<span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#b3a1ff] uppercase tracking-wider">
											Serviço complementar de crescimento digital
										</span>
									</div>
									<h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
										Tráfego pago não funciona sozinho.
									</h3>
									<p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
										Campanhas precisam de uma boa estrutura para converter. Por
										isso, a Opnora conecta anúncios com páginas, formulários,
										WhatsApp, métricas e automações para transformar cliques em
										oportunidades acompanháveis.
									</p>

									<div className="flex flex-wrap gap-1.5">
										{ITENS_TRAFEGO.map((item) => (
											<span
												key={item}
												className="text-[10px] sm:text-[11px] font-mono text-slate-300 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded tracking-tight"
											>
												{item}
											</span>
										))}
									</div>
								</div>

								{/* Coluna da direita - Caixa Visual Animada / Fluxo Conectado */}
								<div className="lg:col-span-5">
									<div className="relative rounded-xl bg-[#0a0a0e]/90 border border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden group">
										{/* Glow interno animado */}
										<div className="absolute -top-12 -right-12 w-32 h-32 bg-aurora-violet/10 blur-2xl rounded-full pointer-events-none animate-pulse" />
										<div className="absolute -bottom-12 -left-12 w-32 h-32 bg-aurora-violet/10 blur-2xl rounded-full pointer-events-none animate-pulse" />

										{/* Header do Box */}
										<div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
											<span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
												FLUXO CONECTADO OPNORA
											</span>
											<div className="flex items-center gap-2">
												<span className="relative flex h-2 w-2 -mt-[1px]">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aurora-violet opacity-75"></span>
													<span className="relative inline-flex rounded-full h-2 w-2 bg-aurora-violet"></span>
												</span>
												<span className="font-mono text-[10px] text-aurora-violet uppercase tracking-wider leading-none">
													TEMPO REAL
												</span>
											</div>
										</div>

										{/* Node 1: Anúncios */}
										<div
											onClick={() => setActiveNode(activeNode === 1 ? null : 1)}
											data-active={activeNode === 1}
											style={{ WebkitTapHighlightColor: "transparent" }}
											className="relative flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-lg p-3.5 hover:border-aurora-violet/40 data-[active=true]:border-aurora-violet/40 transition-colors cursor-pointer md:cursor-default"
										>
											<div>
												<div className="text-xs font-bold text-white">
													Anúncios (Google & Meta)
												</div>
												<div className="text-[11px] text-slate-400">
													Atração direcionada
												</div>
											</div>
											<span className="font-mono text-[10px] text-aurora-violet bg-aurora-violet/10 border border-aurora-violet/20 px-2 py-0.5 rounded">
												CTR OTIMIZADO
											</span>
										</div>

										{/* Conector 1 */}
										<div className="flex justify-center my-1">
											<svg
												className="w-5 h-5 text-slate-400 opacity-80"
												viewBox="0 0 24 24"
												fill="none"
											>
												<path
													d="M12 2V22M12 22L6 16M12 22L18 16"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>

										{/* Node 2: Captura & Qualificação */}
										<div
											onClick={() => setActiveNode(activeNode === 2 ? null : 2)}
											data-active={activeNode === 2}
											style={{ WebkitTapHighlightColor: "transparent" }}
											className="relative flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-lg p-3.5 hover:border-aurora-violet/40 data-[active=true]:border-aurora-violet/40 transition-colors cursor-pointer md:cursor-default"
										>
											<div>
												<div className="text-xs font-bold text-white">
													Landing Page & WhatsApp
												</div>
												<div className="text-[11px] text-slate-400">
													Captura com alta conversão
												</div>
											</div>
											<span className="font-mono text-[10px] text-aurora-violet bg-aurora-violet/10 border border-aurora-violet/20 px-2 py-0.5 rounded">
												LEADS TRACKEADOS
											</span>
										</div>

										{/* Conector 2 */}
										<div className="flex justify-center my-1">
											<svg
												className="w-5 h-5 text-slate-400 opacity-80"
												viewBox="0 0 24 24"
												fill="none"
											>
												<path
													d="M12 2V22M12 22L6 16M12 22L18 16"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>

										{/* Node 3: CRM & Métricas */}
										<div
											onClick={() => setActiveNode(activeNode === 3 ? null : 3)}
											data-active={activeNode === 3}
											style={{ WebkitTapHighlightColor: "transparent" }}
											className="relative flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-lg p-3.5 hover:border-aurora-violet/40 data-[active=true]:border-aurora-violet/40 transition-colors cursor-pointer md:cursor-default"
										>
											<div>
												<div className="text-xs font-bold text-white">
													Métricas, CRM & ROAS
												</div>
												<div className="text-[11px] text-slate-400">
													Decisão baseada em dados
												</div>
											</div>
											<span className="font-mono text-[10px] text-aurora-violet bg-aurora-violet/10 border border-aurora-violet/20 px-2 py-0.5 rounded">
												RETORNO REAL
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</ScrollReveal>
				)}
			</div>
		</section>
	);
}
