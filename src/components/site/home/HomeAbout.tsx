import { TerminalPanel } from "@/components/site/home/TerminalPanel";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type HomeAboutProps = {
	eyebrow?: string;
};

export function HomeAbout({
	eyebrow = "01 / OS PROBLEMAS QUE RESOLVEMOS",
}: HomeAboutProps = {}) {
	return (
		<section className="relative bg-[#0e0e12] min-h-dvh flex flex-col items-center justify-center overflow-hidden border-t border-white/5 py-24">
			<div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
					{/* Left Column: Copy & Stats */}
					<div className="flex flex-col items-start text-left">
						<ScrollReveal delay={0} className="flex items-center gap-4 mb-6">
							<div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan"></div>
							<span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
								{eyebrow}
							</span>
						</ScrollReveal>

						<ScrollReveal
							as="h2"
							delay={100}
							className="font-bold leading-[1.1] mb-6 tracking-tight font-display uppercase"
							style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
						>
							<span className="text-white">Construímos sistemas </span>
							<span
								className="text-transparent bg-clip-text"
								style={{
									backgroundImage:
										"linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
								}}
							>
								que ainda não existem.
							</span>
						</ScrollReveal>

						<ScrollReveal
							as="div"
							delay={200}
							className="space-y-4 text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-10 max-w-xl"
						>
							<p>
								A Opnora desenvolve soluções digitais sob medida para empresas,
								projetos e instituições que buscam mais eficiência, organização
								e inovação. Acreditamos que a tecnologia deve simplificar o dia
								a dia, resolver problemas reais e acompanhar o crescimento de
								cada negócio.
							</p>
							<p>
								Mais do que criar sistemas, entendemos as necessidades de cada
								cliente para desenvolver soluções que façam sentido na prática.
								Da ideia à entrega, trabalhamos lado a lado para transformar
								desafios em resultados, com tecnologia confiável, intuitiva e
								preparada para evoluir junto com o seu projeto.
							</p>
						</ScrollReveal>

						<div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 mt-4 w-full max-w-xl">
							<ScrollReveal
								delay={300}
								className="flex flex-col pl-2.5 sm:pl-4 border-l-2 border-[#a280ff]/40"
							>
								<div className="text-2xl sm:text-3xl font-bold text-[#b3a1ff] font-display mb-1 tracking-tight">
									<AnimatedNumber end={3} duration={1500} />
								</div>
								<div className="font-mono text-[10px] sm:text-xs text-slate-400 leading-tight">
									Frentes Digitais
								</div>
							</ScrollReveal>
							<ScrollReveal
								delay={400}
								className="flex flex-col pl-2.5 sm:pl-4 border-l-2 border-[#a280ff]/40"
							>
								<div className="text-2xl sm:text-3xl font-bold text-[#b3a1ff] font-display mb-1 tracking-tight">
									<AnimatedNumber end={3} suffix={"\u200A+"} duration={2500} />
								</div>
								<div className="font-mono text-[10px] sm:text-xs text-slate-400 leading-tight">
									Projetos Lançados
								</div>
							</ScrollReveal>
							<ScrollReveal
								delay={500}
								className="flex flex-col pl-2.5 sm:pl-4 border-l-2 border-[#a280ff]/40"
							>
								<div className="text-2xl sm:text-3xl font-bold text-[#b3a1ff] font-display mb-1 tracking-tight">
									<AnimatedNumber
										end={100}
										suffix={"\u200A%"}
										duration={2000}
									/>
								</div>
								<div className="font-mono text-[10px] sm:text-xs text-slate-400 leading-tight">
									Comprometimento
								</div>
							</ScrollReveal>
						</div>
					</div>

					{/* Right Column: Terminal */}
					<ScrollReveal delay={400} className="w-full relative">
						{/* Optional glow behind terminal */}
						<div className="absolute -inset-4 bg-gradient-to-tr from-[#a280ff]/10 to-[#60a5fa]/10 blur-3xl z-0 rounded-full opacity-50"></div>
						<div className="relative z-10">
							<TerminalPanel />
						</div>
					</ScrollReveal>
				</div>
			</div>
		</section>
	);
}
