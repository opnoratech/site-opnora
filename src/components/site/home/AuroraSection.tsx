import { Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { AntigravityParticleField } from "@/components/site/backgrounds/AntigravityParticleField";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

export function AuroraSection() {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.5 },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#050507] border-t border-b border-white/5 py-24"
		>
			{/* Fluxo de energia aurora animado (fundo) */}
			<div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
				{isVisible && (
					<svg
						viewBox="0 0 1000 400"
						className="absolute w-[150%] max-w-[2000px] h-auto text-transparent"
						style={{ filter: "blur(20px)" }}
					>
						{/* Definições de gradiente dinâmico */}
						<defs>
							<linearGradient
								id="aurora-flow"
								x1="0%"
								y1="0%"
								x2="100%"
								y2="0%"
							>
								<stop offset="0%" stopColor="#a79df0" stopOpacity="0" />
								<stop offset="20%" stopColor="#a79df0" stopOpacity="0.8">
									<animate
										attributeName="stopColor"
										values="#a79df0;#82b8f7;#a79df0"
										dur="16s"
										repeatCount="1"
										fill="freeze"
									/>
								</stop>
								<stop offset="50%" stopColor="#82b8f7" stopOpacity="1">
									<animate
										attributeName="stopColor"
										values="#82b8f7;#4ed4cf;#82b8f7"
										dur="16s"
										repeatCount="1"
										fill="freeze"
									/>
								</stop>
								<stop offset="80%" stopColor="#4ed4cf" stopOpacity="0.8">
									<animate
										attributeName="stopColor"
										values="#4ed4cf;#58e5a6;#4ed4cf"
										dur="16s"
										repeatCount="1"
										fill="freeze"
									/>
								</stop>
								<stop offset="100%" stopColor="#58e5a6" stopOpacity="0" />
							</linearGradient>
						</defs>
						<path
							d="M-100,300 C200,350 400,100 600,150 C800,200 900,50 1100,100"
							fill="none"
							stroke="url(#aurora-flow)"
							strokeWidth="8"
							className="animate-aurora-path-once"
						/>
						<path
							d="M-100,250 C300,350 500,50 700,200 C800,250 1000,100 1200,150"
							fill="none"
							stroke="url(#aurora-flow)"
							strokeWidth="4"
							className="animate-aurora-path-slow-once opacity-60"
						/>
					</svg>
				)}
			</div>

			{/* Antigravity Particle Field */}
			<AntigravityParticleField />

			{/* Conteúdo Central */}
			<div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
				<ScrollReveal
					delay={100}
					className="mb-6 flex items-center justify-center gap-4"
				>
					<div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan"></div>
					<span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 md:text-[11px]">
						Engenharia como arte
					</span>
					<div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan"></div>
				</ScrollReveal>

				<ScrollReveal
					as="h2"
					delay={200}
					className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl uppercase"
				>
					SEU PRÓXIMO PROJETO
					<br />
					<span
						className="inline-block text-transparent bg-clip-text w-fit pt-1 pb-1 mt-0 sm:mt-0.5"
						style={{
							backgroundImage:
								"linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
						}}
					>
						COMEÇA AQUI.
					</span>
				</ScrollReveal>

				<ScrollReveal
					as="p"
					delay={300}
					className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-slate-400 sm:text-base md:text-lg"
				>
					Conte o que sua empresa precisa resolver. A Opnora avalia o escopo e
					propõe uma solução digital adequada para o seu momento.
				</ScrollReveal>

				<ScrollReveal delay={400} className="mt-10">
					<Link
						to="/contato"
						hash="formulario-contato"
						className="group inline-flex h-11 md:h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-white px-8 text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
					>
						SOLICITAR PROPOSTA
						<span className="transition-transform duration-300 group-hover:translate-x-1">
							→
						</span>
					</Link>
				</ScrollReveal>
			</div>
		</section>
	);
}
