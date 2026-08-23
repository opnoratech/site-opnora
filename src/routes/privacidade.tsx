import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
	head: () => ({
		meta: [{ title: "Política de Privacidade | Opnora" }],
	}),
	component: PrivacidadePage,
});

function PrivacidadePage() {
	return (
		<main className="flex-1 bg-[#0e0e12]">
			{/* Header Section */}
			<section
				className="relative pt-32 pb-16 md:pt-40 md:pb-24 min-h-[50vh] md:min-h-[55vh] flex flex-col justify-center overflow-hidden bg-[#0e0e12]"
				style={{
					backgroundImage: "url('/images/privacidade_aurora_hero.png')",
					backgroundSize: "cover",
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat",
				}}
			>
				{/* Gradiente escuro focado apenas no lado esquerdo (atrás do texto), estilo Azemble */}
				<div className="absolute inset-0 bg-gradient-to-r from-[#0e0e12] via-[#0e0e12]/90 via-40% to-transparent z-0 pointer-events-none" />

				<div className="relative mx-auto w-full px-6 md:px-8 lg:pl-[6.5rem] lg:pr-12 z-10">
					<div className="max-w-4xl text-left">
						<div className="flex items-center gap-4 mb-6">
							<div className="h-[1px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
							<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a280ff]">
								LEGAL
							</span>
						</div>

						<h1 className="font-display text-[3.2rem] xs:text-[3.8rem] sm:text-[4.4rem] md:text-[5.2rem] lg:text-[6rem] font-black tracking-tight leading-[0.98] uppercase py-2">
							<span className="block text-white">POLÍTICA DE</span>
							<span
								className="inline-block text-transparent bg-clip-text w-fit pt-1 pb-1 mt-0 sm:mt-0.5"
								style={{
									backgroundImage:
										"linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
								}}
							>
								PRIVACIDADE
							</span>
						</h1>

						<p className="text-slate-500 mt-10 font-mono text-[11px] uppercase tracking-wider">
							Última atualização: Junho de 2026
						</p>
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-16 lg:py-24 bg-[#0e0e12]">
				<div className="mx-auto max-w-4xl px-6 md:px-8 lg:pl-[6.5rem] lg:pr-12">
					<div className="space-y-12 text-slate-400 font-light leading-relaxed text-[14px] sm:text-[15px]">
						{/* 1. Informações que Coletamos */}
						<div className="pb-8 border-b border-white/5">
							<h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
								1. Informações que Coletamos
							</h2>
							<p className="mb-4 text-slate-300">
								Coletamos exclusivamente as informações fornecidas por você ao
								interagir com nosso site:
							</p>
							<ul className="list-disc pl-5 space-y-2 mt-4 marker:text-white">
								<li>
									<strong className="text-white font-medium">
										Formulários de contato:
									</strong>{" "}
									Nome, endereço de e-mail e conteúdo da mensagem enviados para
									nossa equipe.
								</li>
								<li>
									<strong className="text-white font-medium">
										Simulador e propostas de projetos:
									</strong>{" "}
									Requisitos técnicos, escolhas de funcionalidades, prazos e
									estimativas de orçamento fornecidos durante o planejamento da
									sua solução.
								</li>
							</ul>
						</div>

						{/* 2. Informações Coletadas Automaticamente */}
						<div className="pb-8 border-b border-white/5">
							<h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
								2. Informações Coletadas Automaticamente
							</h2>
							<p className="mb-4 text-slate-300">
								Quando você navega no site da Opnora, podemos coletar
								automaticamente dados técnicos genéricos:
							</p>
							<ul className="list-disc pl-5 space-y-2 mt-4 marker:text-white">
								<li>
									Visualizações de páginas, acessos e métricas anônimas de
									tráfego.
								</li>
								<li>
									Tipo de navegador, sistema operacional e tipo de dispositivo.
								</li>
								<li>Origem de acesso e região geográfica aproximada.</li>
							</ul>
							<p className="mt-6 text-sm text-slate-400 font-light">
								Estes dados são utilizados apenas para garantir o bom
								funcionamento técnico e otimizar a experiência de uso. Não
								comercializamos dados com terceiros.
							</p>
						</div>

						{/* 3. Como Usamos Suas Informações */}
						<div className="pb-8 border-b border-white/5">
							<h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
								3. Como Usamos Suas Informações
							</h2>
							<p className="mb-4 text-slate-300">
								As informações coletadas são utilizadas para:
							</p>
							<ul className="list-disc pl-5 space-y-2 marker:text-white">
								<li>
									Responder às suas solicitações de contato e tirar dúvidas.
								</li>
								<li>
									Elaborar propostas comerciais e orçamentos para o seu projeto
									de software.
								</li>
								<li>
									Garantir a segurança, integridade e estabilidade do site.
								</li>
							</ul>
						</div>

						{/* 4. Compartilhamento de Dados */}
						<div className="pb-8 border-b border-white/5">
							<h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
								4. Compartilhamento de Dados
							</h2>
							<p className="text-slate-300">
								A Opnora não vende, aluga ou compartilha seus dados pessoais
								para fins comerciais. Compartilhamos dados exclusivamente em
								casos de obrigação legal ou com provedores de infraestrutura
								essencial (como hospedagem em nuvem e servidores de e-mail),
								estritamente vinculados a deveres de confidencialidade.
							</p>
						</div>

						{/* 5. Seus Direitos (LGPD) */}
						<div className="pb-8 border-b border-white/5">
							<h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
								5. Seus Direitos (LGPD)
							</h2>
							<p className="mb-4 text-slate-300">
								Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei
								nº 13.709/2018), você tem o direito de:
							</p>
							<ul className="list-disc pl-5 space-y-2 marker:text-white">
								<li>
									Confirmar a existência de tratamento e acessar seus dados
									mantidos pela Opnora.
								</li>
								<li>
									Solicitar a correção de dados incompletos ou desatualizados.
								</li>
								<li>
									Solicitar a eliminação dos seus dados pessoais fornecidos nos
									formulários.
								</li>
							</ul>
						</div>

						{/* 6. Segurança dos Dados */}
						<div className="pb-8 border-b border-white/5">
							<h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
								6. Segurança dos Dados
							</h2>
							<p className="text-slate-300">
								Adotamos medidas de segurança técnicas e organizacionais para
								proteger suas informações contra acessos não autorizados. Toda a
								navegação no site é criptografada via protocolo HTTPS/TLS.
							</p>
						</div>

						{/* 7. Contato */}
						<div>
							<h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
								7. Contato
							</h2>
							<p className="text-slate-300">
								Para solicitar informações ou exercer seus direitos de
								privacidade, entre em contato com nossa equipe através do e-mail{" "}
								<a
									href="mailto:contato@opnora.tech"
									className="text-[#a280ff] hover:text-[#b3a1ff] font-medium underline transition-colors"
								>
									contato@opnora.tech
								</a>
								.
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
