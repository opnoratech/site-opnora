import type React from "react";
import { useState } from "react";
import {
	FaArrowLeft,
	FaArrowTrendUp,
	FaBuilding,
	FaBullseye,
	FaCalendarDays,
	FaCheck,
	FaChevronDown,
	FaChevronUp,
	FaCircleInfo,
	FaCode,
	FaCompass,
	FaCreditCard,
	FaEnvelope,
	FaFileLines,
	FaGaugeHigh,
	FaLocationDot,
	FaPhone,
	FaSliders,
	FaUser,
	FaWhatsapp,
	FaXmark,
} from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
	ADDITIONAL_PRICES,
	COMO_CONHECEU_OPTIONS,
	FEATURE_CATEGORIES,
	getAvailableLevels,
	getIncludedFeatures,
	INVESTMENT_OPTIONS,
	isFeatureIncludedInPlan,
	OBJECTIVE_OPTIONS,
	SOLUTION_OPTIONS,
} from "@/data/pricing";
import { useContatoSimulador } from "@/hooks/useContatoSimulador";

export function ContatoSimulador({
	defaultPlano,
	defaultNivel,
}: {
	defaultPlano?: string;
	defaultNivel?: string;
}) {
	const {
		currentStep,
		setCurrentStep,
		maxStepReached,
		selectedObjectives,
		selectedSolutions,
		selectedFeatures,
		featureLevels,
		openCategories,
		basePlano,
		isPlanLocked,
		formData,
		setFormData,
		validationErrors,
		mobileResumoOpen,
		setMobileResumoOpen,
		activeTooltip,
		setActiveTooltip,
		isInvestimentoOpen,
		setIsInvestimentoOpen,
		isComoConheceuOpen,
		setIsComoConheceuOpen,
		submitted,
		handleBasePlanoChange,
		toggleObjective,
		toggleSolution,
		toggleFeature,
		handlePagesChange,
		handleIntegrationsChange,
		handleSupportMonthsChange,
		toggleCategory,
		handleChange,
		classification,
		getEstimatedPrice,
		generateWhatsappUrl,
		handleNextStep,
		handlePrevStep,
		handleFormSubmit,
		removedFeatures,
		changeFeatureLevel,
		resetSimulador,
	} = useContatoSimulador(defaultPlano, defaultNivel);

	const [activeFeature, setActiveFeature] = useState<number | null>(null);

	/* ================================================================
     FUNÇÃO AUXILIAR DE PREÇO DINÂMICO
     ================================================================ */

	const getDynamicPriceText = (item: string, level: string) => {
		if (item === "Tráfego pago e campanhas") {
			return level === "Gestão de tráfego + Escala"
				? "+ R$ 700/mês"
				: "+ R$ 350/mês";
		}
		if (item === "Automação com IA (Chatbots/N8N)") {
			return level === "Automação avançada com IA"
				? "+ R$ 600/mês"
				: "+ R$ 300/mês";
		}
		if (item === "Dashboard e Métricas Inteligentes") {
			return level === "Dashboard avançado" ? "+ R$ 400/mês" : "+ R$ 200/mês";
		}
		if (item === "Plano mensal de evolução/suporte") {
			const match = level ? level.match(/\d+/) : null;
			const months = match ? parseInt(match[0], 10) : 1;
			return `+ R$ ${150 * months}/mês`;
		}
		return ADDITIONAL_PRICES[item];
	};

	/* ================================================================
     FUNÇÃO AUXILIAR DE RENDERIZAÇÃO DO RESUMO
     ================================================================ */

	const renderResumoContent = () => {
		const hasObjectives = selectedObjectives.length > 0;
		const hasSolutions = selectedSolutions.length > 0;
		const hasFeatures = selectedFeatures.length > 0;

		const removedFeatures =
			isPlanLocked && basePlano
				? getIncludedFeatures(basePlano).filter(
						(f: string) => !selectedFeatures.includes(f),
					)
				: [];

		const pricingEstimate = getEstimatedPrice();

		return (
			<div className="space-y-5 text-left text-xs">
				{/* Banner de Ajuda / Simplificação Geral no Topo do Resumo */}
				<div className="p-4 rounded-xl border border-aurora-violet/20 bg-aurora-violet/[0.04] text-left space-y-2">
					<div className="flex items-center gap-2 text-aurora-violet font-semibold text-xs uppercase tracking-wider font-mono">
						<FaCircleInfo className="size-3.5 shrink-0" />
						Achou o simulador muito técnico ou complexo?
					</div>
					<p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-light">
						Não se preocupe! A Opnora constrói soluções 100% sob medida. Se você
						não souber quais opções escolher, pode simplesmente clicar em{" "}
						<strong>Continuar</strong> para avançar sem marcar nada, ou se
						preferir,{" "}
						<button
							type="button"
							onClick={() => {
								const el = document.getElementById("formulario-contato");
								if (el) {
									el.scrollIntoView({ behavior: "smooth", block: "start" });
								} else {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}
							}}
							className="text-aurora-violet hover:underline font-semibold inline-flex items-center gap-0.5 cursor-pointer"
						>
							clique aqui para ir ao formulário de contato simplificado
						</button>{" "}
						no topo desta página ou fale diretamente conosco pelo{" "}
						<a
							href="https://wa.me/5585999973965"
							target="_blank"
							rel="noopener noreferrer"
							className="text-emerald-400 hover:underline font-semibold inline-flex items-center gap-0.5"
						>
							WhatsApp
						</a>
						.
					</p>
				</div>

				{/* Classificação Não Financeira */}
				<div className="space-y-2">
					<span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
						<FaGaugeHigh className="size-3 text-slate-500" />
						Porte do projeto
					</span>
					<div
						className={`px-3 py-2.5 rounded-xl border text-center font-bold text-xs shadow-sm transition-all duration-300 ${classification.color}`}
					>
						{classification.label}
					</div>
					<p className="text-[10px] text-slate-400 font-light leading-relaxed">
						{classification.desc}
					</p>
				</div>

				{/* Objetivos */}
				<div className="space-y-2">
					<span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
						<FaBullseye className="size-3 text-slate-500" />
						Objetivos da empresa
					</span>
					{hasObjectives ? (
						<div className="flex flex-wrap gap-1.5">
							{selectedObjectives.map((id) => {
								const label =
									OBJECTIVE_OPTIONS.find((o) => o.id === id)?.label || id;
								return (
									<button
										key={id}
										type="button"
										onClick={() => toggleObjective(id)}
										title="Clique para remover"
										className="cursor-pointer px-2.5 py-1 rounded-md bg-aurora-violet/[0.06] border border-aurora-violet/30 text-slate-200 hover:bg-red-950/30 hover:border-red-500/40 hover:text-red-400 transition-all flex items-center gap-1.5 text-[11px]"
									>
										<span>{label}</span>
										<span className="text-slate-500 font-bold hover:text-red-400 text-xs">
											×
										</span>
									</button>
								);
							})}
						</div>
					) : (
						<div className="px-3 py-2 rounded-lg border border-dashed border-white/5 bg-white/[0.01] text-slate-500 italic text-[11px] font-light text-center">
							Nenhum objetivo selecionado
						</div>
					)}
				</div>

				{/* Tipo de Solução */}
				<div className="space-y-2">
					<span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
						<FaCode className="size-3 text-slate-500" />
						Tipo de solução
					</span>
					{hasSolutions ? (
						<div className="flex flex-wrap gap-1.5">
							{selectedSolutions.map((sol) => (
								<button
									key={sol}
									type="button"
									onClick={() => toggleSolution(sol)}
									title="Clique para remover"
									className="cursor-pointer px-2.5 py-1 rounded-md bg-aurora-violet/[0.06] border border-aurora-violet/30 text-slate-200 hover:bg-red-950/30 hover:border-red-500/40 hover:text-red-400 transition-all flex items-center gap-1.5 text-[11px]"
								>
									<span>{sol}</span>
									<span className="text-slate-500 font-bold hover:text-red-400 text-xs">
										×
									</span>
								</button>
							))}
						</div>
					) : (
						<div className="px-3 py-2 rounded-lg border border-dashed border-white/5 bg-white/[0.01] text-slate-500 italic text-[11px] font-light text-center">
							Nenhuma solução definida
						</div>
					)}
				</div>

				{/* Funcionalidades */}
				<div className="space-y-2">
					<span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
						<FaSliders className="size-3 text-slate-500" />
						Recursos selecionados
					</span>
					{hasFeatures ? (
						<div className="max-h-[200px] overflow-y-auto pr-1.5 flex flex-wrap gap-1.5 custom-scrollbar">
							{selectedFeatures.map((feat) => {
								const currentLevel = featureLevels[feat];
								const isInc = isFeatureIncludedInPlan(
									basePlano,
									feat,
									currentLevel || "",
								);
								const levelLabel =
									currentLevel && !currentLevel.startsWith("Adicional")
										? currentLevel
										: "Adicional";

								return (
									<button
										key={feat}
										type="button"
										onClick={() => toggleFeature(feat)}
										title={`Remover ${feat} (${levelLabel})`}
										className={`cursor-pointer px-2.5 py-1 rounded border transition-all duration-300 flex items-center gap-1.5 text-[11px] leading-snug ${
											isInc
												? "bg-aurora-violet/[0.04] border-aurora-violet/20 text-purple-300/90 hover:bg-red-950/30 hover:border-red-500/40 hover:text-red-400 hover:shadow-none"
												: "bg-amber-500/[0.04] border-amber-500/20 text-amber-300/90 hover:bg-red-950/30 hover:border-red-500/40 hover:text-red-400 hover:shadow-none"
										}`}
									>
										<span>
											{feat}{" "}
											<span className="opacity-65 text-[9px] font-mono">
												({levelLabel})
											</span>
										</span>
										<span className="opacity-50 hover:opacity-100 text-xs">
											×
										</span>
									</button>
								);
							})}
						</div>
					) : (
						<div className="px-3 py-2 rounded-lg border border-dashed border-white/5 bg-white/[0.01] text-slate-500 italic text-[11px] font-light text-center">
							Nenhum recurso selecionado
						</div>
					)}
				</div>

				{/* Recursos Removidos do Plano Base */}
				{removedFeatures.length > 0 && (
					<div className="space-y-2 border-t border-white/5 pt-3">
						<span className="text-[10px] font-mono text-red-400/80 uppercase tracking-wider flex items-center gap-1.5 font-bold">
							<FaXmark className="size-3 text-red-400/80" />
							Removidos do plano base
						</span>
						<div className="flex flex-wrap gap-1.5">
							{removedFeatures.map((feat: string) => (
								<button
									key={feat}
									type="button"
									onClick={() => toggleFeature(feat)}
									title={`Readicionar ${feat} ao plano`}
									className="cursor-pointer px-2 py-0.5 rounded border border-red-500/20 bg-red-500/[0.03] text-slate-400 hover:bg-emerald-950/20 hover:border-emerald-500/30 hover:text-emerald-400 transition-all flex items-center gap-1 text-[11px] line-through decoration-red-500/40"
								>
									<span>{feat}</span>
									<span className="text-red-400/60 font-bold text-xs hover:text-emerald-400">
										＋
									</span>
								</button>
							))}
						</div>
						<p className="text-[9px] text-slate-450 font-light leading-relaxed">
							* A exclusão de recursos padrão do plano será analisada para
							aplicação de um desconto personalizado na sua proposta comercial.
						</p>
					</div>
				)}

				{/* Prazo e Orçamento */}
				<div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
					<div className="space-y-1">
						<span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1 font-bold">
							<FaCalendarDays className="size-3 text-slate-500" />
							Prazo
						</span>
						<span className="text-slate-200 font-medium text-xs block truncate">
							{formData.prazo || "A definir"}
						</span>
					</div>
					<div className="space-y-1">
						<span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1 font-bold">
							<FaCreditCard className="size-3 text-slate-500" />
							Investimento
						</span>
						<span className="text-slate-200 font-medium text-xs block truncate">
							{formData.investimento}
						</span>
					</div>
				</div>

				{/* Rodapé de Investimento Comercial */}
				<div className="border-t border-white/5 pt-4 space-y-2">
					<span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
						<FaFileLines className="size-3 text-slate-500" />
						Estimativa de Investimento
					</span>
					{pricingEstimate.basePrice > 0 || pricingEstimate.extraMonthly > 0 ? (
						<div className="space-y-2">
							<div className="bg-aurora-violet/[0.07] border border-aurora-violet/20 rounded-xl p-3 shadow-[0_0_12px_rgba(162,128,255,0.06)]">
								<div className="flex justify-between items-center text-xs text-slate-300">
									<span>Plano Base ({pricingEstimate.baseName}):</span>
									<span className="font-mono text-white font-bold">
										R$ {pricingEstimate.basePrice}
									</span>
								</div>
								{pricingEstimate.extraMonthly > 0 && (
									<div className="flex justify-between items-center text-xs text-slate-300 mt-2 pt-2 border-t border-white/5">
										<span>Serviços adicionais:</span>
										<span className="font-mono text-[#40c4ff] font-bold">
											+ R$ {pricingEstimate.extraMonthly}/mês
										</span>
									</div>
								)}
							</div>

							{removedFeatures.length > 0 && (
								<div className="text-[10px] text-amber-400/80 bg-amber-400/[0.02] border border-amber-400/10 rounded-lg p-2 leading-normal">
									* Você excluiu recursos do plano base. Avaliaremos um desconto
									proporcional na proposta.
								</div>
							)}

							<p className="text-[9px] text-slate-500 leading-normal">
								* O valor final do desenvolvimento e setup será validado pela
								nossa equipe na proposta comercial.
							</p>
						</div>
					) : (
						<div className="text-xs font-semibold text-white bg-aurora-violet/[0.07] border border-aurora-violet/20 rounded-xl px-3 py-3 text-center shadow-[0_0_12px_rgba(162,128,255,0.06)] leading-relaxed">
							{removedFeatures.length > 0
								? "Redução de escopo padrão: avaliaremos um desconto proporcional na sua proposta final."
								: "O valor final será definido após a análise do escopo."}
						</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<section
			id="personalize"
			className="relative w-full bg-[#0c0c0f] py-24 border-b border-white/5"
		>
			<div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12">
				{/* Header da Seção */}
				<div className="max-w-3xl mb-14">
					<ScrollReveal>
						<div className="flex items-center gap-4 mb-4">
							<div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
							<span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
								SOB MEDIDA & CONSULTORIA
							</span>
						</div>
					</ScrollReveal>

					<ScrollReveal delay={100}>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
							Seu projeto, construído para a sua realidade.
						</h2>
					</ScrollReveal>

					<ScrollReveal delay={200}>
						<p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
							Selecione seus objetivos, funcionalidades e prioridades. A Opnora
							analisa as escolhas, orienta o que realmente faz sentido e prepara
							uma proposta personalizada, sem que sua empresa precise contratar
							recursos desnecessários.
						</p>
					</ScrollReveal>
				</div>

				{/* Layout Dividido Desktop */}
				<div
					id="personalize-form-box"
					className={
						submitted || currentStep === 4
							? "w-full animate-fade-in"
							: "grid grid-cols-1 lg:grid-cols-[1.7fr_1.1fr] gap-8 items-start"
					}
				>
					{/* Lado Esquerdo: Formulário em Etapas */}
					<ScrollReveal delay={300} className="w-full">
						<div className="rounded-lg bg-[#121218] border border-white/10 p-6 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
							<div className="absolute -top-32 -right-32 w-80 h-80 bg-aurora-violet/5 blur-[100px] rounded-full pointer-events-none" />

							{submitted ? (
								/* Sucesso Real do Envio (LARGURA TOTAL E DETALHADO) */
								<div className="space-y-8 relative z-10">
									{/* Cabeçalho de Sucesso */}
									<div className="text-center max-w-2xl mx-auto space-y-4">
										<div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
											<FaCheck className="size-5" />
										</div>
										<h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
											Solicitação Recebida com Sucesso!
										</h3>
										<p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
											Nossa equipe já está analisando as informações técnicas e
											preparará uma proposta sob medida para sua empresa.
										</p>
									</div>

									{/* Grid Unificado de Resumo Completo */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5 text-left">
										{/* Coluna 1: Dados do Projeto */}
										<div className="space-y-6 bg-white/[0.01] border border-white/5 rounded-xl p-6">
											<div>
												<span className="text-[10px] font-mono text-aurora-violet font-bold uppercase tracking-widest block mb-1">
													PROJETO SOLICITADO
												</span>
												<h4 className="text-base font-display font-bold text-white uppercase tracking-wider">
													Plano Base:{" "}
													{basePlano === "landing"
														? "Landing Page de Alta Conversão"
														: basePlano === "essencial"
															? "Site Institucional Essencial"
															: basePlano === "profissional"
																? "Site Profissional + Estrutura de Vendas"
																: "Escopo Sob Medida"}
												</h4>
											</div>

											{/* Objetivos */}
											{selectedObjectives.length > 0 && (
												<div className="space-y-2">
													<span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block">
														OBJETIVOS DA EMPRESA
													</span>
													<div className="flex flex-wrap gap-2">
														{selectedObjectives.map((id) => {
															const opt = OBJECTIVE_OPTIONS.find(
																(o) => o.id === id,
															);
															return (
																<span
																	key={id}
																	className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300"
																>
																	<FaCheck className="size-2 text-aurora-violet" />
																	{opt?.label}
																</span>
															);
														})}
													</div>
												</div>
											)}

											{/* Recursos Selecionados */}
											{selectedFeatures.length > 0 && (
												<div className="space-y-2">
													<span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block">
														RECURSOS E ESPECIFICAÇÕES
													</span>
													<div className="max-h-[140px] overflow-y-auto pr-2 space-y-1.5 scrollbar-thin custom-scrollbar">
														<style
															dangerouslySetInnerHTML={{
																__html: `
                              .custom-scrollbar::-webkit-scrollbar {
                                width: 4px;
                              }
                              .custom-scrollbar::-webkit-scrollbar-track {
                                background: rgba(255, 255, 255, 0.01);
                                border-radius: 99px;
                              }
                              .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: rgba(162, 128, 255, 0.35);
                                border-radius: 99px;
                              }
                              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: rgba(162, 128, 255, 0.55);
                              }
                            `,
															}}
														/>
														{selectedFeatures.map((feat) => (
															<div
																key={feat}
																className="flex justify-between items-center text-xs border-b border-white/5 py-1"
															>
																<span className="text-slate-300">{feat}</span>
																<span className="text-slate-500 font-mono text-[10px] uppercase">
																	{featureLevels[feat] || "Padrão"}
																</span>
															</div>
														))}
													</div>
												</div>
											)}

											{/* Estimativa de Investimento */}
											{(() => {
												const pricingEstimate = getEstimatedPrice();
												return (
													<div className="pt-4 border-t border-white/5">
														<span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block">
															INVESTIMENTO ESTIMADO
														</span>
														<span className="text-xl font-display font-black text-emerald-400 block mt-1">
															{pricingEstimate.basePrice > 0 ||
															pricingEstimate.extraMonthly > 0 ? (
																<>
																	R$ {pricingEstimate.basePrice}
																	{pricingEstimate.extraMonthly > 0 && (
																		<span className="text-slate-400 text-xs font-light">
																			{" "}
																			+ R$ {pricingEstimate.extraMonthly}/mês
																		</span>
																	)}
																</>
															) : (
																"Sob consulta técnica"
															)}
														</span>
														<p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
															Esta é uma estimativa preliminar baseada no escopo
															fornecido. O valor final será confirmado após
															validação técnica da equipe da Opnora.
														</p>
													</div>
												);
											})()}
										</div>

										{/* Coluna 2: Dados de Contato e Contexto */}
										<div className="space-y-6 bg-white/[0.01] border border-white/5 rounded-xl p-6">
											<div>
												<span className="text-[10px] font-mono text-aurora-violet font-bold uppercase tracking-widest block mb-3">
													DADOS DE CONTATO
												</span>
												<table className="w-full text-xs text-slate-300 space-y-3">
													<tbody>
														<tr className="border-b border-white/5">
															<td className="py-2.5 font-semibold text-slate-500 w-32">
																Nome completo:
															</td>
															<td className="py-2.5 text-white">
																{formData.nome}
															</td>
														</tr>
														{formData.empresa && (
															<tr className="border-b border-white/5">
																<td className="py-2.5 font-semibold text-slate-500">
																	Empresa / Projeto:
																</td>
																<td className="py-2.5 text-white">
																	{formData.empresa}
																</td>
															</tr>
														)}
														<tr className="border-b border-white/5">
															<td className="py-2.5 font-semibold text-slate-500">
																E-mail:
															</td>
															<td className="py-2.5 text-aurora-violet hover:underline">
																<a href={`mailto:${formData.email}`}>
																	{formData.email}
																</a>
															</td>
														</tr>
														{formData.whatsapp && (
															<tr className="border-b border-white/5">
																<td className="py-2.5 font-semibold text-slate-500">
																	WhatsApp:
																</td>
																<td className="py-2.5 text-emerald-400 hover:underline">
																	<a
																		href={`https://wa.me/${formData.whatsapp.replace(/\D/g, "")}`}
																	>
																		{formData.whatsapp}
																	</a>
																</td>
															</tr>
														)}
														{formData.cidade && (
															<tr className="border-b border-white/5">
																<td className="py-2.5 font-semibold text-slate-500">
																	Cidade / Região:
																</td>
																<td className="py-2.5 text-white">
																	{formData.cidade}
																</td>
															</tr>
														)}
														{formData.prazo && (
															<tr className="border-b border-white/5">
																<td className="py-2.5 font-semibold text-slate-500">
																	Prazo comercial:
																</td>
																<td className="py-2.5 text-white">
																	{formData.prazo}
																</td>
															</tr>
														)}
													</tbody>
												</table>
											</div>

											{/* Descrição do problema */}
											{formData.descricao && (
												<div className="space-y-2">
													<span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block">
														DESCRIÇÃO DO PROJETO / DESAFIOS
													</span>
													<p className="text-xs text-slate-300 leading-relaxed bg-black/35 rounded-lg p-3.5 border border-white/5 max-h-[120px] overflow-y-auto whitespace-pre-wrap">
														{formData.descricao}
													</p>
												</div>
											)}
										</div>
									</div>

									{/* Botões de Conversão Centralizados */}
									<div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-white/5">
										<a
											href={generateWhatsappUrl()}
											target="_blank"
											rel="noopener noreferrer"
											className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-display font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-300"
										>
											<FaWhatsapp className="size-5 shrink-0" />
											Enviar dados estruturados via WhatsApp
										</a>
										<button
											type="button"
											onClick={() => resetSimulador()}
											className="w-full sm:w-auto cursor-pointer px-6 py-4 rounded-2xl border border-white/10 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-all duration-300"
										>
											Criar novo escopo
										</button>
									</div>
								</div>
							) : (
								<div className="space-y-8 relative z-10">
									{/* Indicador de Progresso com Cards Segmentados Interno */}
									<div className="grid grid-cols-4 gap-2 sm:gap-4 pb-6 border-b border-white/5">
										{[
											{ step: 1, label: "Objetivo" },
											{ step: 2, label: "Solução" },
											{ step: 3, label: "Recursos" },
											{ step: 4, label: "Contato" },
										].map((item) => {
											const active = currentStep === item.step;
											const done = currentStep > item.step;
											const isReachable = item.step <= maxStepReached;
											return (
												<button
													key={item.step}
													type="button"
													disabled={!isReachable}
													onClick={() => {
														if (isReachable) {
															setCurrentStep(item.step);
														}
													}}
													className={`relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ${
														isReachable
															? "cursor-pointer"
															: "cursor-not-allowed"
													} ${
														active
															? "bg-[#121218] border-aurora-violet shadow-[0_0_20px_rgba(162,128,255,0.15)]"
															: isReachable
																? "bg-[#121218]/60 border-white/10 hover:border-aurora-violet/40 opacity-80"
																: "bg-[#121218]/30 border-white/5 opacity-40"
													}`}
												>
													{/* Circle Indicator */}
													<div
														className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold shrink-0 transition-all duration-300 ${
															active
																? "bg-aurora-violet text-white shadow-[0_0_12px_rgba(162,128,255,0.5)]"
																: isReachable && done
																	? "bg-aurora-violet/10 text-aurora-violet border border-aurora-violet/20"
																	: "bg-white/5 text-slate-500 border border-white/10"
														}`}
													>
														{done ? (
															<FaCheck className="size-2.5" />
														) : (
															item.step
														)}
													</div>
													{/* Label */}
													<span
														className={`text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 text-center md:text-left ${
															active
																? "text-white"
																: isReachable
																	? "text-slate-300"
																	: "text-slate-600"
														}`}
													>
														{item.label}
													</span>
												</button>
											);
										})}
									</div>

									{/* ETAPA 1: OBJETIVOS */}
									{currentStep === 1 && (
										<div className="space-y-6">
											{/* Seletor de Modelo de Partida / Plano Base */}
											<div className="mb-6 pb-6 border-b border-white/5">
												<label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
													Escolha o Modelo de Partida para o seu Projeto:
												</label>
												<div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
													{[
														{
															id: "landing",
															label: "Landing Page",
															price: "R$ 550",
														},
														{
															id: "essencial",
															label: "Essencial",
															price: "R$ 1.100",
														},
														{
															id: "profissional",
															label: "Profissional",
															price: "R$ 2.000",
														},
														{
															id: "sobmedida",
															label: "Sob medida",
															price: "Personalizado",
														},
													].map((p) => {
														const active = basePlano === p.id;
														return (
															<button
																key={p.id}
																type="button"
																onClick={() => handleBasePlanoChange(p.id)}
																className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
																	active
																		? "bg-aurora-violet/[0.07] border-aurora-violet shadow-[0_0_12px_rgba(162,128,255,0.15)] text-white"
																		: "bg-[#0c0c10] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
																}`}
															>
																<span className="text-xs font-bold font-display">
																	{p.label}
																</span>
																<span className="text-[10px] opacity-70 mt-1 font-mono">
																	{p.price}
																</span>
															</button>
														);
													})}
												</div>
											</div>

											<div>
												<h3 className="text-lg sm:text-xl font-display font-bold text-white">
													O que sua empresa precisa resolver?
												</h3>
												<p className="text-xs text-slate-400 mt-1">
													Selecione um ou mais objetivos.
												</p>
											</div>

											<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
												{OBJECTIVE_OPTIONS.map((opt) => {
													const active = selectedObjectives.includes(opt.id);
													return (
														<div key={opt.id} className="relative">
															<button
																type="button"
																aria-pressed={active}
																onClick={() => toggleObjective(opt.id)}
																className={`cursor-pointer flex items-center justify-start w-full h-14 sm:h-[68px] rounded-xl border px-5 py-2 transition-all duration-300 text-left text-xs sm:text-sm font-medium ${
																	active
																		? "bg-aurora-violet/[0.07] border-aurora-violet shadow-[0_0_15px_rgba(162,128,255,0.1)] text-white"
																		: "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-slate-400 hover:text-white"
																}`}
															>
																<span className="leading-snug">
																	{opt.label}
																</span>
															</button>
														</div>
													);
												})}
											</div>
										</div>
									)}

									{/* ETAPA 2: TIPO DE SOLUÇÃO */}
									{currentStep === 2 && (
										<div className="space-y-6">
											<div>
												<h3 className="text-lg sm:text-xl font-display font-bold text-white">
													Que tipo de solução você imagina?
												</h3>
												<p className="text-xs text-slate-400 mt-1">
													Você não precisa definir tudo sozinho. Essas escolhas
													servem apenas como ponto de partida para a análise.
												</p>
											</div>

											<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
												{SOLUTION_OPTIONS.map((sol) => {
													const active = selectedSolutions.includes(sol);
													return (
														<button
															key={sol}
															type="button"
															aria-pressed={active}
															onClick={() => toggleSolution(sol)}
															className={`cursor-pointer flex items-center justify-center w-full h-14 sm:h-[68px] rounded-xl border px-5 py-2 transition-all duration-300 text-center text-xs sm:text-sm font-medium ${
																active
																	? "bg-aurora-violet/[0.07] border-aurora-violet shadow-[0_0_15px_rgba(162,128,255,0.1)] text-white"
																	: "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-slate-400 hover:text-white"
															}`}
														>
															<span className="leading-snug">{sol}</span>
														</button>
													);
												})}
											</div>
										</div>
									)}

									{/* ETAPA 3: FUNCIONALIDADES */}
									{currentStep === 3 && (
										<div className="space-y-6">
											<div>
												<h3 className="text-lg sm:text-xl font-display font-bold text-white">
													Quais recursos você considera importantes?
												</h3>
												<p className="text-xs text-slate-400 mt-1">
													Organizados em categorias. Abra cada acordeão para
													escolher suas especificidades.
												</p>
											</div>

											<div className="space-y-3">
												{FEATURE_CATEGORIES.map((cat) => {
													const isOpen = openCategories.has(cat.name);
													const activeItemsCount = cat.items.filter((item) =>
														selectedFeatures.includes(item),
													).length;

													return (
														<div
															key={cat.name}
															className="rounded-xl bg-white/[0.01] border border-white/5 overflow-hidden transition-all duration-300"
														>
															<button
																type="button"
																onClick={() => toggleCategory(cat.name)}
																className="cursor-pointer w-full flex items-center justify-between px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
															>
																<div className="flex items-center gap-3">
																	<span className="font-mono text-xs text-slate-300 uppercase tracking-wider">
																		{cat.name}
																	</span>
																	{activeItemsCount > 0 && (
																		<span className="text-[10px] bg-aurora-violet/15 text-aurora-violet border border-aurora-violet/30 px-2 py-0.5 rounded-full font-bold">
																			{activeItemsCount}
																		</span>
																	)}
																</div>
																{isOpen ? (
																	<FaChevronUp className="size-3.5 text-slate-400" />
																) : (
																	<FaChevronDown className="size-3.5 text-slate-400" />
																)}
															</button>

															{isOpen && (
																<div className="p-4 sm:p-5 border-t border-white/5 bg-transparent grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 gap-3.5 animate-fade-in">
																	{cat.items.map((item) => {
																		const active =
																			selectedFeatures.includes(item);
																		const currentLevel = featureLevels[item];
																		const isPages =
																			item === "Quantidade de páginas";
																		const isIntegrations =
																			item === "Integração externa";
																		const isSupport =
																			item ===
																			"Plano mensal de evolução/suporte";

																		const isIncluded = isFeatureIncludedInPlan(
																			basePlano,
																			item,
																			currentLevel || "",
																		);
																		const isAdicional = !isIncluded;
																		const isHelp =
																			item ===
																			"Outro recurso (Descrever no final)";
																		const availLevels =
																			getAvailableLevels(item);
																		const canCycle = availLevels.length > 1;
																		const isRemovedFromBase =
																			!active &&
																			isPlanLocked &&
																			!!basePlano &&
																			getIncludedFeatures(basePlano).includes(
																				item,
																			);

																		if (
																			(isPages ||
																				isIntegrations ||
																				isSupport) &&
																			active
																		) {
																			const defaultValue = isPages
																				? "1 página"
																				: isIntegrations
																					? "1 integração"
																					: "1 mês";
																			const isIncludedCount =
																				isFeatureIncludedInPlan(
																					basePlano,
																					item,
																					currentLevel || defaultValue,
																				);

																			const handleChangeVal = (
																				amount: number,
																				e: React.MouseEvent,
																			) => {
																				if (isPages) {
																					handlePagesChange(amount, e);
																				} else if (isIntegrations) {
																					handleIntegrationsChange(amount, e);
																				} else {
																					handleSupportMonthsChange(amount, e);
																				}
																			};

																			return (
																				<div
																					key={item}
																					className={`flex flex-col items-center justify-center w-full min-h-[3.5rem] rounded-lg border px-4 py-2 transition-all duration-300 text-center text-xs font-medium gap-1.5 ${
																						isIncludedCount
																							? "bg-aurora-violet/[0.07] border-aurora-violet shadow-[0_0_12px_rgba(162,128,255,0.1)] text-white"
																							: "bg-amber-500/[0.07] border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.1)] text-white"
																					}`}
																				>
																					<span
																						className="leading-snug cursor-pointer hover:underline"
																						onClick={() => toggleFeature(item)}
																					>
																						{item}
																					</span>
																					{getDynamicPriceText(
																						item,
																						currentLevel || "",
																					) && (
																						<span className="text-[10px] text-amber-400/90 font-mono font-medium">
																							{getDynamicPriceText(
																								item,
																								currentLevel || "",
																							)}
																						</span>
																					)}
																					<div className="flex items-center gap-3">
																						<button
																							type="button"
																							onClick={(e) =>
																								handleChangeVal(-1, e)
																							}
																							className="cursor-pointer size-5 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs transition-all"
																						>
																							-
																						</button>
																						<span
																							className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
																								isIncludedCount
																									? "text-emerald-400"
																									: "text-amber-400"
																							}`}
																						>
																							{currentLevel || defaultValue}
																						</span>
																						<button
																							type="button"
																							onClick={(e) =>
																								handleChangeVal(1, e)
																							}
																							className="cursor-pointer size-5 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs transition-all"
																						>
																							+
																						</button>
																					</div>
																				</div>
																			);
																		}

																		if (canCycle && active) {
																			return (
																				<div
																					key={item}
																					className={`flex flex-col items-center justify-center w-full min-h-[4rem] rounded-lg border px-3 py-2 transition-all duration-300 text-center text-xs font-medium gap-2 ${
																						isIncluded
																							? "bg-aurora-violet/[0.07] border-aurora-violet shadow-[0_0_12px_rgba(162,128,255,0.1)] text-white"
																							: "bg-amber-500/[0.07] border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.1)] text-white"
																					}`}
																				>
																					<span
																						className="leading-snug cursor-pointer hover:underline"
																						onClick={() => toggleFeature(item)}
																						title="Clique para desmarcar este recurso"
																					>
																						{item}
																					</span>
																					{getDynamicPriceText(
																						item,
																						currentLevel || "",
																					) && (
																						<span className="text-[10px] text-amber-400/90 font-mono font-medium">
																							{getDynamicPriceText(
																								item,
																								currentLevel || "",
																							)}
																						</span>
																					)}
																					<span className="hidden"></span>
																					<div className="flex flex-wrap justify-center gap-1 bg-black/45 p-0.5 rounded-md border border-white/5 w-full">
																						{availLevels.map((lvl) => {
																							const isLvlIncluded =
																								isFeatureIncludedInPlan(
																									basePlano,
																									item,
																									lvl,
																								);
																							const isLvlActive =
																								currentLevel === lvl;
																							return (
																								<button
																									key={lvl}
																									type="button"
																									onClick={(e) => {
																										e.stopPropagation();
																										changeFeatureLevel(
																											item,
																											lvl,
																										);
																									}}
																									className={`cursor-pointer px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono transition-all uppercase tracking-wider font-semibold border ${
																										isLvlActive
																											? isLvlIncluded
																												? "bg-aurora-violet/30 border-aurora-violet/40 text-white"
																												: "bg-amber-500/30 border-amber-500/40 text-white"
																											: "bg-transparent border-transparent text-slate-400 hover:text-white"
																									}`}
																								>
																									{lvl}
																								</button>
																							);
																						})}
																					</div>
																				</div>
																			);
																		}

																		return (
																			<button
																				key={item}
																				type="button"
																				aria-pressed={active}
																				onClick={() => toggleFeature(item)}
																				className={`cursor-pointer flex flex-col items-center justify-center w-full min-h-[3.5rem] rounded-lg border px-4 py-2 transition-all duration-300 text-center text-xs font-medium gap-1 ${
																					active && isIncluded
																						? "bg-aurora-violet/[0.07] border-aurora-violet shadow-[0_0_12px_rgba(162,128,255,0.1)] text-white"
																						: active && !isIncluded
																							? "bg-amber-500/[0.07] border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.1)] text-white"
																							: isRemovedFromBase
																								? "bg-red-500/[0.01] border-red-500/10 hover:border-red-500/25 text-slate-500 hover:text-slate-400"
																								: "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-slate-400 hover:text-white"
																				}`}
																			>
																				<span
																					className={`leading-snug ${isRemovedFromBase ? "line-through opacity-70" : ""}`}
																				>
																					{item}
																				</span>
																				{ADDITIONAL_PRICES[item] && (
																					<span className="text-[10px] text-slate-500 font-mono">
																						{ADDITIONAL_PRICES[item]}
																					</span>
																				)}
																				{!isHelp &&
																					(currentLevel ||
																						isRemovedFromBase) && (
																						<span
																							className={`text-[9px] font-mono uppercase tracking-wider ${
																								isRemovedFromBase
																									? "text-red-400/55 line-through"
																									: isIncluded
																										? "text-emerald-400/80"
																										: "text-amber-400/70"
																							}`}
																						>
																							{isRemovedFromBase
																								? "Excluído do plano"
																								: isAdicional
																									? "＋ Adicional"
																									: currentLevel}
																						</span>
																					)}
																			</button>
																		);
																	})}
																</div>
															)}
														</div>
													);
												})}
											</div>
										</div>
									)}

									{/* ETAPA 4: CONTEXTO E CONTATO */}
									{currentStep === 4 && (
										<div className="space-y-6">
											{/* Resumo compacto do projeto no topo da etapa de contato */}
											{(() => {
												const pricingEstimate = getEstimatedPrice();
												const isLanding = basePlano === "landing";
												const isEssencial = basePlano === "essencial";
												const isProfissional = basePlano === "profissional";
												const planLabel = isLanding
													? "Landing Page de Alta Conversão"
													: isEssencial
														? "Site Institucional Essencial"
														: isProfissional
															? "Site Profissional + Estrutura de Vendas"
															: "Escopo Sob Medida";
												return (
													<div className="bg-aurora-violet/[0.04] border border-aurora-violet/15 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in mb-4">
														<div className="space-y-1">
															<span className="text-[10px] font-mono text-aurora-violet font-bold uppercase tracking-widest block">
																Resumo do Escopo Selecionado
															</span>
															<h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
																Plano Base: {planLabel}
															</h4>
															{(selectedObjectives.length > 0 ||
																selectedFeatures.length > 0) && (
																<p className="text-xs text-slate-400 font-light truncate max-w-xl mt-0.5">
																	{selectedFeatures.length > 0
																		? `Incluso: ${selectedFeatures.slice(0, 3).join(" • ")}${selectedFeatures.length > 3 ? ` e +${selectedFeatures.length - 3} recursos` : ""}`
																		: "Pacote pré-configurado com recursos de mercado."}
																</p>
															)}
															{isPlanLocked && (
																<div className="flex flex-wrap items-center gap-2 pt-2.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">
																	<span className="text-aurora-violet/90 font-bold bg-aurora-violet/10 border border-aurora-violet/20 px-2 py-0.5 rounded-md">
																		Plano pré-selecionado
																	</span>
																	<button
																		type="button"
																		onClick={() => setCurrentStep(3)}
																		className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white px-2.5 py-1 rounded-md transition-all duration-300 flex items-center gap-1 active:scale-95"
																	>
																		Adicionar mais recursos
																	</button>
																	<button
																		type="button"
																		onClick={() => resetSimulador()}
																		className="cursor-pointer bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 text-red-400/80 hover:text-red-400 px-2.5 py-1 rounded-md transition-all duration-300 flex items-center gap-1 active:scale-95"
																	>
																		Montar do zero
																	</button>
																</div>
															)}
														</div>
														<div className="shrink-0 text-left md:text-right border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-6 flex flex-col justify-center">
															<span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block">
																Investimento Estimado
															</span>
															<span className="text-base font-display font-black text-emerald-400 block mt-0.5">
																{pricingEstimate.basePrice > 0 ||
																pricingEstimate.extraMonthly > 0 ? (
																	<>
																		R$ {pricingEstimate.basePrice}
																		{pricingEstimate.extraMonthly > 0 && (
																			<span className="text-slate-400 text-xs font-light">
																				{" "}
																				+ R$ {pricingEstimate.extraMonthly}/mês
																			</span>
																		)}
																	</>
																) : (
																	"Sob consulta técnica"
																)}
															</span>
														</div>
													</div>
												);
											})()}

											<div>
												<h3 className="text-lg sm:text-xl font-display font-bold text-white">
													Fale um pouco sobre o projeto
												</h3>
												<p className="text-xs text-slate-400 mt-1">
													Esses dados servem para nossa equipe analisar o escopo
													técnico e preparar um escopo customizado.
												</p>
											</div>

											{/* Campos do Formulário */}
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div>
													<label
														htmlFor="simulador-nome"
														className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
													>
														Seu Nome *
													</label>
													<div className="relative">
														<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
															<FaUser className="size-3.5" />
														</span>
														<input
															required
															id="simulador-nome"
															type="text"
															name="nome"
															value={formData.nome}
															onChange={handleChange}
															placeholder="Nome completo"
															className={`w-full bg-[#0c0c10] border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
																validationErrors.nome
																	? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
																	: "border-white/10 focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)]"
															}`}
														/>
													</div>
													{validationErrors.nome && (
														<span className="text-[10px] text-red-400 mt-1 block">
															{validationErrors.nome}
														</span>
													)}
												</div>

												<div>
													<label
														htmlFor="simulador-empresa"
														className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
													>
														Empresa ou Projeto
													</label>
													<div className="relative">
														<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
															<FaBuilding className="size-3.5" />
														</span>
														<input
															id="simulador-empresa"
															type="text"
															name="empresa"
															value={formData.empresa}
															onChange={handleChange}
															placeholder="Nome da empresa"
															className="w-full bg-[#0c0c10] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)] transition-all duration-300"
														/>
													</div>
												</div>

												<div>
													<label
														htmlFor="simulador-email"
														className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
													>
														E-mail Corporativo *
													</label>
													<div className="relative">
														<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
															<FaEnvelope className="size-3.5" />
														</span>
														<input
															required
															id="simulador-email"
															type="email"
															name="email"
															value={formData.email}
															onChange={handleChange}
															placeholder="exemplo@empresa.com"
															className={`w-full bg-[#0c0c10] border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
																validationErrors.email
																	? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
																	: "border-white/10 focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)]"
															}`}
														/>
													</div>
													{validationErrors.email && (
														<span className="text-[10px] text-red-400 mt-1 block">
															{validationErrors.email}
														</span>
													)}
												</div>

												<div>
													<label
														htmlFor="simulador-whatsapp"
														className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
													>
														WhatsApp
													</label>
													<div className="relative">
														<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
															<FaPhone className="size-3.5" />
														</span>
														<input
															id="simulador-whatsapp"
															type="text"
															name="whatsapp"
															value={formData.whatsapp}
															onChange={handleChange}
															placeholder="(00) 90000-0000"
															className={`w-full bg-[#0c0c10] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
																validationErrors.whatsapp
																	? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
																	: "border-white/10 focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)]"
															}`}
														/>
													</div>
													{validationErrors.whatsapp && (
														<span className="text-[10px] text-red-400 mt-1 block">
															{validationErrors.whatsapp}
														</span>
													)}
												</div>

												<div>
													<label
														htmlFor="simulador-cidade"
														className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
													>
														Cidade / Região
													</label>
													<div className="relative">
														<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
															<FaLocationDot className="size-3.5" />
														</span>
														<input
															id="simulador-cidade"
															type="text"
															name="cidade"
															value={formData.cidade}
															onChange={handleChange}
															placeholder="Ex: São Paulo - SP"
															className="w-full bg-[#0c0c10] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)] transition-all duration-300"
														/>
													</div>
												</div>

												<div>
													<label
														htmlFor="simulador-comoConheceu"
														className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
													>
														Como conheceu a Opnora? *
													</label>
													<div className="relative">
														<button
															id="simulador-comoConheceu"
															type="button"
															aria-haspopup="listbox"
															aria-expanded={isComoConheceuOpen}
															onClick={() =>
																setIsComoConheceuOpen(!isComoConheceuOpen)
															}
															onKeyDown={(e) => {
																if (e.key === "Escape") {
																	setIsComoConheceuOpen(false);
																}
															}}
															className={`cursor-pointer w-full bg-[#0c0c10] border rounded-xl pl-4 pr-10 py-3 text-sm text-white text-left focus:outline-none transition-all duration-300 flex items-center justify-between ${
																validationErrors.comoConheceu
																	? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
																	: "border-white/10 focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)]"
															}`}
														>
															<span
																className={
																	formData.comoConheceu
																		? "text-white"
																		: "text-slate-500"
																}
															>
																{formData.comoConheceu || "Selecione uma opção"}
															</span>
															<FaChevronDown
																className={`size-3.5 text-slate-500 transition-transform duration-300 ${isComoConheceuOpen ? "rotate-180" : ""}`}
															/>
														</button>

														{isComoConheceuOpen && (
															<>
																<div
																	className="fixed inset-0 z-40"
																	onClick={() => setIsComoConheceuOpen(false)}
																/>
																<div className="absolute z-50 left-0 w-full mt-2 bg-[#0c0c10] border border-white/10 rounded-xl py-1 shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in">
																	{COMO_CONHECEU_OPTIONS.map((opt) => {
																		const selected =
																			formData.comoConheceu === opt;
																		return (
																			<button
																				key={opt}
																				type="button"
																				onClick={() => {
																					setFormData((prev) => ({
																						...prev,
																						comoConheceu: opt,
																					}));
																					setIsComoConheceuOpen(false);
																				}}
																				className={`cursor-pointer w-full text-left px-4 py-2.5 text-sm transition-colors ${
																					selected
																						? "text-aurora-violet bg-aurora-violet/[0.04] font-medium"
																						: "text-slate-300 hover:text-white hover:bg-white/[0.04]"
																				}`}
																			>
																				{opt}
																			</button>
																		);
																	})}
																</div>
															</>
														)}
													</div>
													{validationErrors.comoConheceu && (
														<span className="text-[10px] text-red-400 mt-1 block">
															{validationErrors.comoConheceu}
														</span>
													)}
												</div>

												<div>
													<label
														htmlFor="simulador-prazo"
														className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
													>
														Prazo Desejado
													</label>
													<input
														id="simulador-prazo"
														type="text"
														name="prazo"
														value={formData.prazo}
														onChange={handleChange}
														placeholder="Ex: 30 dias, 3 meses, imediato..."
														className="w-full bg-[#0c0c10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)] transition-all duration-300"
													/>
												</div>

												<div>
													<label
														htmlFor="simulador-investimento"
														className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
													>
														Faixa aproximada de investimento
													</label>
													<div className="relative">
														<button
															id="simulador-investimento"
															type="button"
															aria-haspopup="listbox"
															aria-expanded={isInvestimentoOpen}
															onClick={() =>
																setIsInvestimentoOpen(!isInvestimentoOpen)
															}
															onKeyDown={(e) => {
																if (e.key === "Escape") {
																	setIsInvestimentoOpen(false);
																}
															}}
															className="cursor-pointer w-full bg-[#0c0c10] border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white text-left focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)] transition-all duration-300 flex items-center justify-between"
														>
															<span>
																{formData.investimento || "Ainda não sei"}
															</span>
															<FaChevronDown
																className={`size-3.5 text-slate-500 transition-transform duration-300 ${isInvestimentoOpen ? "rotate-180" : ""}`}
															/>
														</button>

														{isInvestimentoOpen && (
															<>
																<div
																	className="fixed inset-0 z-40"
																	onClick={() => setIsInvestimentoOpen(false)}
																	onTouchStart={() =>
																		setIsInvestimentoOpen(false)
																	}
																/>
																<div className="absolute z-50 left-0 w-full mt-2 bg-[#0c0c10] border border-white/10 rounded-xl py-1 shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in">
																	{INVESTMENT_OPTIONS.map((opt) => {
																		const selected =
																			formData.investimento === opt;
																		return (
																			<button
																				key={opt}
																				type="button"
																				onClick={() => {
																					setFormData((prev) => ({
																						...prev,
																						investimento: opt,
																					}));
																					setIsInvestimentoOpen(false);
																				}}
																				className={`cursor-pointer w-full text-left px-4 py-2.5 text-sm transition-colors touch-manipulation active:bg-white/[0.08] ${
																					selected
																						? "text-aurora-violet bg-aurora-violet/[0.04] font-medium"
																						: "text-slate-300 md:hover:text-white md:hover:bg-white/[0.04]"
																				}`}
																			>
																				{opt}
																			</button>
																		);
																	})}
																</div>
															</>
														)}
													</div>
												</div>
											</div>

											{/* Campo Descrição livre */}
											<div>
												<label
													htmlFor="simulador-descricao"
													className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
												>
													DESCRIÇÃO DO PROBLEMA OU IDEIA
												</label>
												<textarea
													id="simulador-descricao"
													rows={4}
													name="descricao"
													value={formData.descricao}
													onChange={handleChange}
													placeholder="Fale brevemente sobre os desafios da sua empresa ou descreva a ideia..."
													className="w-full bg-[#0c0c10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-aurora-violet focus:shadow-[0_0_15px_rgba(162,128,255,0.1)] transition-all duration-300 min-h-[120px] resize-y"
												/>
											</div>
										</div>
									)}

									{/* Resumo compacto mobile (sempre visível abaixo das etapas, exceto na etapa 4 ou sucesso) */}
									{currentStep < 4 && (
										<div className="lg:hidden rounded-lg bg-[#0c0c10] border border-white/10 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
											<h3 className="text-xs font-mono tracking-widest text-slate-400 font-bold uppercase pb-3 border-b border-white/5 mb-4">
												RESUMO DO SEU PROJETO
											</h3>
											{renderResumoContent()}
										</div>
									)}

									{/* Estilo local para corrigir o preenchimento automático (Autofill) do Google Chrome */}
									<style>{`
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus,
                    textarea:-webkit-autofill,
                    textarea:-webkit-autofill:hover,
                    textarea:-webkit-autofill:focus {
                      -webkit-text-fill-color: #ffffff !important;
                      -webkit-box-shadow: 0 0 0px 1000px #0c0c10 inset !important;
                      box-shadow: 0 0 0px 1000px #0c0c10 inset !important;
                      transition: background-color 5000s ease-in-out 0s;
                    }
                  `}</style>

									{/* Botões de Ação da Jornada */}
									<div className="pt-6 flex items-center justify-between gap-4 border-t border-white/5">
										{currentStep > 1 ? (
											<button
												type="button"
												onClick={handlePrevStep}
												className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3.5 rounded-sm border border-white/10 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider hover:bg-white/5 transition-all"
											>
												<FaArrowLeft className="size-3" />
												Voltar
											</button>
										) : (
											<div />
										)}

										{currentStep < 4 ? (
											<button
												type="button"
												onClick={handleNextStep}
												className="group/btn cursor-pointer inline-flex items-center gap-2.5 px-6 py-3.5 rounded-sm bg-white hover:bg-slate-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
											>
												Continuar
												<span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
													→
												</span>
											</button>
										) : (
											<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
												<button
													type="button"
													onClick={handleFormSubmit}
													className="group/btn cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-white hover:bg-slate-200 text-black font-display font-bold text-xs uppercase tracking-[0.15em] transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
												>
													SOLICITAR AVALIAÇÃO DE ESCOPO
													<span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
														→
													</span>
												</button>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</ScrollReveal>

					{/* Lado Direito: Resumo Dinâmico Estático (Desktop - Oculto na Etapa 4 ou se enviado) */}
					{!submitted && currentStep < 4 && (
						<ScrollReveal delay={400} className="hidden lg:block w-full">
							<div className="rounded-lg bg-[#121218] border border-white/10 p-7 shadow-[0_15px_50px_rgba(0,0,0,0.6)] space-y-6">
								<h3 className="text-xs font-mono tracking-widest text-slate-400 font-bold uppercase pb-4 border-b border-white/5">
									RESUMO DO SEU PROJETO
								</h3>

								{renderResumoContent()}
							</div>
						</ScrollReveal>
					)}
				</div>

				{/* Faixa Comercial de Confiança e Liberdade */}
				<div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{[
						{
							title: "Você escolhe as prioridades",
							desc: "Adicione ou remova funcionalidades conforme o momento da sua empresa.",
							icon: FaSliders,
						},
						{
							title: "A Opnora orienta o escopo",
							desc: "Avaliamos o que é essencial agora e o que pode ficar para uma próxima etapa.",
							icon: FaCompass,
						},
						{
							title: "Você recebe uma proposta clara",
							desc: "Escopo, prazo, investimento e etapas são apresentados antes da contratação.",
							icon: FaFileLines,
						},
						{
							title: "O projeto pode evoluir",
							desc: "A solução pode começar menor e receber novos recursos conforme a necessidade.",
							icon: FaArrowTrendUp,
						},
					].map((item, idx) => (
						<ScrollReveal key={item.title} delay={100 * (idx + 1)}>
							<div
								className="group relative rounded-lg border border-white/5 bg-white/[0.01] p-6 space-y-4 hover:border-aurora-violet/30 hover:bg-[#121218] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] data-[active=true]:border-aurora-violet/30 data-[active=true]:bg-[#121218] data-[active=true]:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-500 h-full flex flex-col items-start overflow-hidden cursor-pointer md:cursor-default"
								onClick={() =>
									setActiveFeature(activeFeature === idx ? null : idx)
								}
								data-active={activeFeature === idx}
								style={{ WebkitTapHighlightColor: "transparent" }}
							>
								{/* Sutil glow de fundo no hover */}
								<div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-aurora-violet/5 blur-[40px] opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity duration-500 pointer-events-none" />

								{/* Wrapper do Ícone com glow sutil */}
								<div className="w-10 h-10 rounded-lg bg-aurora-violet/10 border border-aurora-violet/15 flex items-center justify-center text-aurora-violet group-hover:scale-110 group-data-[active=true]:scale-110 transition-transform duration-300">
									<item.icon className="size-4" />
								</div>

								<div className="space-y-2 relative z-10 pointer-events-none md:pointer-events-auto">
									<h4 className="text-sm font-display font-semibold text-white group-hover:text-aurora-violet group-data-[active=true]:text-aurora-violet transition-colors duration-300">
										{item.title}
									</h4>
									<p className="text-xs text-slate-400 leading-relaxed font-light">
										{item.desc}
									</p>
								</div>
							</div>
						</ScrollReveal>
					))}
				</div>

				{/* Diagnóstico Inicial Alternativo e Falar com a Opnora */}
				<ScrollReveal delay={300}>
					<div className="mt-14 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
						<div className="space-y-2 text-center md:text-left max-w-xl">
							<h3 className="text-lg font-display font-bold text-white">
								Ainda não sabe exatamente do que precisa?
							</h3>
							<p className="text-xs text-slate-400 font-light leading-relaxed">
								Explique brevemente o problema por WhatsApp ou solicite um
								diagnóstico. A Opnora ajuda a identificar o melhor ponto de
								partida por meio de uma conversa preliminar.
							</p>
						</div>
						<div className="shrink-0 w-full md:w-auto">
							<a
								href="https://wa.me/5585999973965?text=Ol%C3%A1%2C%20gostaria%20de%20um%20diagn%C3%B3stico%20inicial%20e%20falar%20com%20um%20consultor%20da%20Opnora."
								target="_blank"
								rel="noopener noreferrer"
								className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-aurora-violet text-white hover:bg-aurora-violet/90 hover:shadow-[0_0_25px_rgba(162,128,255,0.4)] transition-all duration-300 font-display font-bold text-xs uppercase tracking-wider"
							>
								<FaWhatsapp className="size-4" />
								FALAR COM UM CONSULTOR
							</a>
						</div>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}
