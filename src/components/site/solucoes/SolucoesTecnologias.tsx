import type React from "react";
import { useRef, useState } from "react";
import { FaBrain, FaGears, FaLaptopCode, FaServer } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type TechCapability = {
	num: string;
	category: string;
	title: string;
	desc: string;
	icon: React.ElementType;
	stack: string[];
	accentColor: string;
};

const TECH_CAPABILITIES: TechCapability[] = [
	{
		num: "01",
		category: "FRONT-END & UX",
		title: "Interfaces e experiências digitais",
		desc: "Aplicações web e plataformas fluidas, responsivas e velozes, projetadas para workflows eficientes e usabilidade de nível superior.",
		icon: FaLaptopCode,
		stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
		accentColor: "var(--aurora-violet)",
	},
	{
		num: "02",
		category: "BACK-END & CONECTIVIDADE",
		title: "Sistemas, APIs e integrações",
		desc: "Arquiteturas robustas que conectam seus sistemas internos, CRMs, ERPs, gateways de pagamento e serviços de terceiros sem falhas operacionais.",
		icon: FaGears,
		stack: ["Node.js", "Python", "APIs REST", "GraphQL", "Webhooks"],
		accentColor: "var(--aurora-violet)",
	},
	{
		num: "03",
		category: "INTELIGÊNCIA & ANALYTICS",
		title: "Dados, automação e IA",
		desc: "Agentes inteligentes, automação de processos e painéis de dados consolidados para otimizar o atendimento e fundamentar decisões estratégicas.",
		icon: FaBrain,
		stack: ["LLMs", "Agentes IA", "Dashboards", "SQL", "Workflows"],
		accentColor: "var(--aurora-violet)",
	},
	{
		num: "04",
		category: "CLOUD & DEVOPS",
		title: "Infraestrutura, segurança e performance",
		desc: "Ambientes escaláveis em nuvem, com proteção de dados, autenticação segura e alta disponibilidade para crescer sem gargalos.",
		icon: FaServer,
		stack: ["Cloud", "Docker", "PostgreSQL", "Segurança", "CI/CD"],
		accentColor: "var(--aurora-violet)",
	},
];
function TechCardItem({ cap, idx }: { cap: TechCapability; idx: number }) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState("translateX(0px) translateY(0px)");

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const moveX = ((x - centerX) / centerX) * 3;
		const moveY = ((y - centerY) / centerY) * 3;

		setTransform(`translateX(${moveX}px) translateY(calc(-6px + ${moveY}px))`);
	};

	const handleMouseLeave = () => {
		setTransform("translateX(0px) translateY(0px)");
	};

	return (
		<ScrollReveal key={cap.num} delay={idx * 80} className="h-full">
			<div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{
					transform,
					transition: "transform 0.3s ease-out, background-color 0.5s ease",
				}}
				className="group relative flex flex-col justify-between h-full bg-[#131318] p-8 sm:p-9 rounded-sm border border-white/5 transition-all duration-500 hover:border-white/15 hover:bg-[#15151c] overflow-hidden will-change-transform z-10"
			>
				{/* Glow Effect on Hover */}
				<div className="absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-aurora-violet/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none z-10" />

				{/* Top line accent */}
				<div
					className="absolute top-0 left-0 right-0 h-[4px] opacity-65 transition-all duration-500 group-hover:opacity-100 group-hover:h-[4px]"
					style={{
						background: cap.accentColor,
					}}
				/>

				<div className="relative z-10">
					{/* Header Row: Num + Category Badge */}
					<div className="flex items-center justify-between gap-4 mb-6">
						<div className="flex items-center gap-3">
							<span className="font-mono text-xs font-bold text-aurora-violet">
								{cap.num}
							</span>
							<span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-slate-400">
								{cap.category}
							</span>
						</div>
					</div>

					{/* Title & Description */}
					<h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 tracking-tight">
						{cap.title}
					</h3>
					<p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-8">
						{cap.desc}
					</p>
				</div>

				{/* Tech Stack Pills Footer */}
				<div className="relative z-10 pt-6 border-t border-white/5 flex flex-wrap items-center gap-2">
					{cap.stack.map((tech) => (
						<span
							key={tech}
							className="px-2.5 py-1 text-xs font-mono font-medium rounded-sm bg-white/[0.03] text-slate-300 border border-white/5 transition-colors duration-300 group-hover:border-aurora-violet/20 group-hover:text-white"
						>
							{tech}
						</span>
					))}
				</div>
			</div>
		</ScrollReveal>
	);
}

type SolucoesTecnologiasProps = {
	bgClass?: string;
};

export function SolucoesTecnologias({
	bgClass = "bg-[#0e0e12]",
}: SolucoesTecnologiasProps = {}) {
	return (
		<section
			className={`relative w-full ${bgClass} py-20 lg:py-28 border-t border-b border-white/5 overflow-hidden`}
		>
			{/* Background Subtle Gradient */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-aurora-violet/5 via-transparent to-aurora-cyan/5 blur-[120px] pointer-events-none" />

			<div className="relative z-10 mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12">
				{/* Header */}
				<div className="flex flex-col items-start text-left mb-16 lg:mb-20 max-w-3xl">
					<ScrollReveal delay={0} className="flex items-center gap-4 mb-6">
						<div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
						<span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
							ENGENHARIA & STACK
						</span>
					</ScrollReveal>

					<ScrollReveal
						as="h2"
						delay={100}
						className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-white"
					>
						Capacidades técnicas &{" "}
						<span
							className="text-transparent bg-clip-text"
							style={{
								backgroundImage:
									"linear-gradient(135deg, #a280ff 0%, #40c4ff 100%)",
							}}
						>
							stack moderna
						</span>
					</ScrollReveal>

					<ScrollReveal
						as="p"
						delay={200}
						className="text-sm sm:text-base text-slate-400 font-light leading-relaxed"
					>
						Não utilizamos soluções engessadas. Selecionamos a tecnologia certa
						para cada desafio, garantindo que sua aplicação tenha arquitetura
						limpa, velocidade de execução e facilidade de evolução.
					</ScrollReveal>
				</div>

				{/* 2-Column Wide Architectural Matrix */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
					{TECH_CAPABILITIES.map((cap, idx) => (
						<TechCardItem key={cap.num} cap={cap} idx={idx} />
					))}
				</div>
			</div>
		</section>
	);
}
