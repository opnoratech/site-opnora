import {
  FaCheck,
  FaCode,
  FaArrowTrendUp,
  FaPalette,
  FaMagnifyingGlass,
  FaPenNib,
  FaRocket,
  FaChartLine,
  FaMaximize,
  FaTrophy,
} from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const COBERTURA_ITEMS = [
  {
    title: "Produto & UX",
    description: "Auditorias de UX, pesquisa de usuário, wireframes, sistemas de UI, design tokens, design de interação, QA de design, teste de protótipos.",
  },
  {
    title: "Engenharia Web & App",
    description: "Landing pages, sites, plataformas SaaS, portais mobile, fluxos de e-commerce, integrações de API, dashboards, CMS e manutenção contínua.",
  },
  {
    title: "Engenharia de Growth",
    description: "Arquitetura SEO, análise de funil, campanhas pagas, experimentos de conversão, fluxos de e-mail, automações de CRM, loops de retenção.",
  },
  {
    title: "Sistemas de Marca",
    description: "Naming, estratégia de marca, design de identidade, brand books, templates para redes, pitch decks, materiais de vendas, design de campanhas.",
  },
  {
    title: "Estúdio de Marketing",
    description: "Estratégia de conteúdo, copy para landing pages e anúncios, roteiros curtos, newsletters, planos editoriais, ritmo de relatórios.",
  },
  {
    title: "Extensão de Equipe",
    description: "Squads de produto fracionados, pods de sprint, forças-tarefa de lançamento e suporte especializado para fundadores que precisam de velocidade sem overhead de tempo integral.",
  },
];

export function PrecosServicos() {
  return (
    <>
      {/* 1.5 O QUE FAZEMOS (What we do) */}
      <section className="relative w-full bg-[#0c0c0f] pt-20 pb-24 border-b border-white/5">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  O QUE FAZEMOS
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
                Soluções digitais{" "}
                <span
                  className="text-transparent bg-clip-text inline-block"
                  style={{
                    backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  completas
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="max-w-2xl text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Construímos produtos, tráfego e marcas. Design responsivo, marketing estratégico e
                excelência técnica — tudo estruturado internamente.
              </p>
            </ScrollReveal>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Desenvolvimento Web */}
            <ScrollReveal delay={300} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#0e0e12] border border-white/5 rounded-sm p-8 lg:p-10 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#131318] hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)]">
                {/* Glow no topo direito */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#b3a1ff]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#b3a1ff]/20" />

                {/* Ícone */}
                <div className="mb-8 relative z-10 w-14 h-14 rounded-xl bg-[#b3a1ff] flex items-center justify-center shadow-[0_0_20px_rgba(179,161,255,0.3)]">
                  <FaCode
                    className="size-7 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>

                <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-4 relative z-10">
                  Desenvolvimento Web
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-10 relative z-10">
                  Sites e aplicações sob medida construídos com tecnologias modernas. Responsivos,
                  rápidos e otimizados para conversão.
                </p>

                <ul className="space-y-4 mt-auto relative z-10">
                  {[
                    "Aplicações Web Customizadas",
                    "Plataformas E-commerce",
                    "Progressive Web Apps (PWA)",
                    "Desenvolvimento de APIs",
                    "Otimização de Performance",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-300 font-light"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#b3a1ff] flex items-center justify-center shrink-0">
                        <FaCheck className="size-3 text-black" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Card 2: Marketing Digital */}
            <ScrollReveal delay={400} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#0e0e12] border border-white/5 rounded-sm p-8 lg:p-10 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#131318] hover:border-[#40c4ff]/20 hover:shadow-[0_8px_30px_rgba(64,196,255,0.08)]">
                {/* Glow no topo direito */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#40c4ff]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#40c4ff]/20" />

                {/* Ícone */}
                <div className="mb-8 relative z-10 w-14 h-14 rounded-xl bg-[#40c4ff] flex items-center justify-center shadow-[0_0_20px_rgba(64,196,255,0.3)]">
                  <FaArrowTrendUp
                    className="size-7 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>

                <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-4 relative z-10">
                  Marketing Digital
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-10 relative z-10">
                  Estratégias baseadas em dados para crescer sua marca, alcançar sua audiência e
                  gerar resultados mensuráveis.
                </p>

                <ul className="space-y-4 mt-auto relative z-10">
                  {[
                    "SEO e Estratégia de Conteúdo",
                    "Gestão de Redes Sociais",
                    "Mídia Paga (PPC / Tráfego)",
                    "Email Marketing",
                    "CRO e Analytics",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-300 font-light"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#40c4ff] flex items-center justify-center shrink-0">
                        <FaCheck className="size-3 text-black" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Card 3: Marca & Design */}
            <ScrollReveal delay={500} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#0e0e12] border border-white/5 rounded-sm p-8 lg:p-10 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#131318] hover:border-[#58e5a6]/20 hover:shadow-[0_8px_30px_rgba(88,229,166,0.08)]">
                {/* Glow no topo direito */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#58e5a6]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#58e5a6]/20" />

                {/* Ícone */}
                <div className="mb-8 relative z-10 w-14 h-14 rounded-xl bg-[#58e5a6] flex items-center justify-center shadow-[0_0_20px_rgba(88,229,166,0.3)]">
                  <FaPalette
                    className="size-7 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>

                <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-4 relative z-10">
                  Marca & Design
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-10 relative z-10">
                  Identidades visuais marcantes que ressoam com o público. Desde o logotipo a
                  sistemas de marca completos.
                </p>

                <ul className="space-y-4 mt-auto relative z-10">
                  {[
                    "Estratégia de Marca",
                    "Logo e Identidade Visual",
                    "Design de Interface (UI/UX)",
                    "Manual da Marca",
                    "Materiais de Marketing",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-300 font-light"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#58e5a6] flex items-center justify-center shrink-0">
                        <FaCheck className="size-3 text-black" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Separador */}
          <hr className="w-full border-t border-white/10 my-16" />

          {/* Grid de Cards - Como Trabalhamos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <ScrollReveal delay={100} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#131318] border border-white/5 rounded-sm p-8 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#181820] hover:border-[#a79df0]/20 hover:shadow-[0_8px_30px_rgba(167,157,240,0.08)]">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#a79df0]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#a79df0]/20" />
                <div className="mb-8 relative z-10 w-12 h-12 rounded-xl bg-[#a79df0] flex items-center justify-center shadow-[0_0_20px_rgba(167,157,240,0.3)]">
                  <FaMagnifyingGlass
                    className="size-6 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-4 relative z-10">
                  01. Descoberta & Estratégia
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10">
                  Começamos entendendo seu negócio, objetivos e público-alvo. Conversas profundas
                  geram clareza estratégica e um plano de sucesso.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={200} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#131318] border border-white/5 rounded-sm p-8 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#181820] hover:border-[#82b8f7]/20 hover:shadow-[0_8px_30px_rgba(130,184,247,0.08)]">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#82b8f7]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#82b8f7]/20" />
                <div className="mb-8 relative z-10 w-12 h-12 rounded-xl bg-[#82b8f7] flex items-center justify-center shadow-[0_0_20px_rgba(130,184,247,0.3)]">
                  <FaPenNib
                    className="size-6 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-4 relative z-10">
                  02. Design & Planejamento
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10">
                  Nossa equipe cria wireframes, protótipos e designs detalhados. Cada pixel tem um
                  propósito: impulsionar engajamento e conversão.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={300} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#131318] border border-white/5 rounded-sm p-8 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#181820] hover:border-[#4ed4cf]/20 hover:shadow-[0_8px_30px_rgba(78,212,207,0.08)]">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#4ed4cf]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#4ed4cf]/20" />
                <div className="mb-8 relative z-10 w-12 h-12 rounded-xl bg-[#4ed4cf] flex items-center justify-center shadow-[0_0_20px_rgba(78,212,207,0.3)]">
                  <FaRocket
                    className="size-6 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-4 relative z-10">
                  03. Construção & Lançamento
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10">
                  Desenvolvimento, testes e implantação com precisão. Lançamos soluções refinadas e
                  de alta performance que escalam com seu negócio.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal delay={400} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#131318] border border-white/5 rounded-sm p-8 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#181820] hover:border-[#58e5a6]/20 hover:shadow-[0_8px_30px_rgba(88,229,166,0.08)]">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#58e5a6]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#58e5a6]/20" />
                <div className="mb-8 relative z-10 w-12 h-12 rounded-xl bg-[#58e5a6] flex items-center justify-center shadow-[0_0_20px_rgba(88,229,166,0.3)]">
                  <FaChartLine
                    className="size-6 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-4 relative z-10">
                  04. Otimização & Suporte
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10">
                  Monitoramento contínuo, análises e otimização. Oferecemos suporte contínuo para
                  garantir que sua solução se mantenha à frente.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 5 */}
            <ScrollReveal delay={500} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#131318] border border-white/5 rounded-sm p-8 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#181820] hover:border-[#a79df0]/20 hover:shadow-[0_8px_30px_rgba(167,157,240,0.08)]">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#a79df0]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#a79df0]/20" />
                <div className="mb-8 relative z-10 w-12 h-12 rounded-xl bg-[#a79df0] flex items-center justify-center shadow-[0_0_20px_rgba(167,157,240,0.3)]">
                  <FaMaximize
                    className="size-6 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-4 relative z-10">
                  05. Escala & Evolução
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10">
                  Conforme seu projeto cresce, escalamos a infraestrutura, adicionamos recursos e
                  refinamos estratégias. O crescimento é integrado.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 6 */}
            <ScrollReveal delay={600} className="h-full">
              <div className="group relative h-full flex flex-col bg-[#131318] border border-white/5 rounded-sm p-8 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-[#181820] hover:border-[#82b8f7]/20 hover:shadow-[0_8px_30px_rgba(130,184,247,0.08)]">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#82b8f7]/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 group-hover:bg-[#82b8f7]/20" />
                <div className="mb-8 relative z-10 w-12 h-12 rounded-xl bg-[#82b8f7] flex items-center justify-center shadow-[0_0_20px_rgba(130,184,247,0.3)]">
                  <FaTrophy
                    className="size-6 text-black transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-4 relative z-10">
                  06. Resultados & Relatórios
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10">
                  Métricas transparentes e relatórios regulares. Você sempre saberá como seu
                  investimento está performando e quais são os próximos passos.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* DESENVOLVIMENTO WEB */}
      <section className="relative w-full bg-[#0e0e12] py-24 border-b border-white/5">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Esquerda - Textos */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    DESENVOLVIMENTO WEB
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-2">
                  Construa Rápido,
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-8">
                  <span
                    className="text-transparent bg-clip-text inline-block"
                    style={{
                      backgroundImage:
                        "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                    }}
                  >
                    Escale Mais Rápido
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-10">
                  Criamos aplicações web e plataformas sob medida que impulsionam o seu negócio. De
                  sites responsivos a sistemas complexos, cada linha de código é escrita com foco na
                  performance e na experiência do usuário.
                </p>
              </ScrollReveal>

              <div className="flex flex-col gap-6">
                {/* Item 1 */}
                <ScrollReveal delay={100}>
                  <h3 className="text-white font-bold text-base mb-1">Stack Tecnológico Moderno</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    React, Node.js, Python, PostgreSQL, AWS — escolhemos as ferramentas certas para
                    suas necessidades.
                  </p>
                </ScrollReveal>
                {/* Item 2 */}
                <ScrollReveal delay={200}>
                  <h3 className="text-white font-bold text-base mb-1">
                    Performance em Primeiro Lugar
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Tempos de carregamento otimizados, código limpo e infraestrutura escalável. Seus
                    usuários têm uma experiência rápida e fluida.
                  </p>
                </ScrollReveal>
                {/* Item 3 */}
                <ScrollReveal delay={300}>
                  <h3 className="text-white font-bold text-base mb-1">Segurança & Conformidade</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Criptografia de dados, auditorias regulares e conformidade com os padrões do
                    mercado. Seus dados estão seguros conosco.
                  </p>
                </ScrollReveal>
                {/* Item 4 */}
                <ScrollReveal delay={400}>
                  <h3 className="text-white font-bold text-base mb-1">Suporte Contínuo</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Monitoramento pós-lançamento, correções, atualizações e novas funcionalidades.
                    Estamos aqui quando você precisar.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Direita - Card */}
            <div className="w-full lg:w-1/2">
              <ScrollReveal delay={300} className="w-full">
                <div className="relative w-full max-w-md mx-auto rounded-2xl bg-[#131318] border border-white/5 p-8 sm:p-12 overflow-hidden">
                  <div className="flex flex-col items-center mb-8 relative z-10">
                    <FaCode className="size-12 text-[#a79df0] mb-4" />
                    <h3 className="text-white font-bold text-lg sm:text-xl">O Que Você Recebe</h3>
                  </div>

                  <ul className="flex flex-col gap-5 relative z-10">
                    {[
                      "Aplicação web desenvolvida sob medida",
                      "Design totalmente responsivo",
                      "Otimização avançada para SEO",
                      "Integração completa de APIs",
                      "Estruturação de banco de dados",
                      "Analytics e monitoramento contínuo",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-sm text-slate-300 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                      >
                        <FaCheck className="size-4 text-[#a79df0] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETING DIGITAL */}
      <section className="relative w-full bg-[#0c0c0f] py-24 border-b border-white/5">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Esquerda - Textos */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    MARKETING DIGITAL
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-2">
                  Alcance Sua
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-8">
                  <span
                    className="text-transparent bg-clip-text inline-block"
                    style={{
                      backgroundImage:
                        "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                    }}
                  >
                    Audiência Certa
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-8">
                  Mais visibilidade. Mais leads. Mais vendas. Nossas estratégias de marketing baseadas em dados colocam sua marca na frente das pessoas que mais importam, quando estão prontas para comprar.
                </p>
              </ScrollReveal>

              <div className="flex flex-col gap-6">
                {/* Item 1 */}
                <ScrollReveal delay={100}>
                  <h3 className="text-white font-bold text-base mb-1">Mestres em SEO</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Pesquisa de palavras-chave, otimização on-page, link building e SEO técnico para ranquear mais alto nos resultados de busca.
                  </p>
                </ScrollReveal>
                {/* Item 2 */}
                <ScrollReveal delay={200}>
                  <h3 className="text-white font-bold text-base mb-1">
                    Tráfego Pago
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Google Ads, Facebook Ads, LinkedIn Ads — campanhas direcionadas que entregam ROI e leads qualificados.
                  </p>
                </ScrollReveal>
                {/* Item 3 */}
                <ScrollReveal delay={300}>
                  <h3 className="text-white font-bold text-base mb-1">Crescimento nas Redes</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Estratégia de conteúdo, gestão de comunidade e táticas de engajamento que constroem seguidores e clientes fiéis.
                  </p>
                </ScrollReveal>
                {/* Item 4 */}
                <ScrollReveal delay={400}>
                  <h3 className="text-white font-bold text-base mb-1">Analytics & Insights</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Rastreamento em tempo real, relatórios detalhados e insights acionáveis para melhorar constantemente as campanhas.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Direita - Card */}
            <div className="w-full lg:w-1/2">
              <ScrollReveal delay={300} className="w-full">
                <div className="relative w-full max-w-md mx-auto rounded-2xl bg-[#131318] border border-white/5 p-8 sm:p-12 overflow-hidden">
                  <div className="flex flex-col items-center mb-8 relative z-10">
                    <FaArrowTrendUp className="size-12 text-[#40c4ff] mb-4" />
                    <h3 className="text-white font-bold text-lg sm:text-xl">O Que Você Recebe</h3>
                  </div>

                  <ul className="flex flex-col gap-5 relative z-10">
                    {[
                      "Estratégia de SEO e plano de conteúdo",
                      "Calendário de postagens para redes",
                      "Configuração de campanhas de tráfego pago",
                      "Sequências de email marketing",
                      "Analytics e relatórios completos",
                      "Revisões trimestrais de estratégia",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-sm text-slate-300 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                      >
                        <FaCheck className="size-4 text-[#40c4ff] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* MARCA E DESIGN */}
      <section className="relative w-full bg-[#0e0e12] py-24 border-b border-white/5">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Esquerda - Textos */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    MARCA & DESIGN
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-2">
                  Deixe uma
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-8">
                  <span
                    className="text-transparent bg-clip-text inline-block"
                    style={{
                      backgroundImage:
                        "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                    }}
                  >
                    Marca Inesquecível
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-8">
                  Sua marca é mais do que um logotipo — é um sentimento, uma promessa, uma experiência. Criamos identidades visuais que se destacam, ressoam com seu público e geram lealdade.
                </p>
              </ScrollReveal>

              <div className="flex flex-col gap-6">
                {/* Item 1 */}
                <ScrollReveal delay={100}>
                  <h3 className="text-white font-bold text-base mb-1">Estratégia de Marca</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Posicionamento, mensagens, tom de voz e diretrizes de marca que definem quem você é de forma única no mercado.
                  </p>
                </ScrollReveal>
                {/* Item 2 */}
                <ScrollReveal delay={200}>
                  <h3 className="text-white font-bold text-base mb-1">
                    Identidade Visual
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Design de logotipo, paleta de cores, tipografia e imagens que criam um visual de marca coeso e marcante.
                  </p>
                </ScrollReveal>
                {/* Item 3 */}
                <ScrollReveal delay={300}>
                  <h3 className="text-white font-bold text-base mb-1">Design UI/UX</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Interfaces bonitas e intuitivas que os usuários amam. A forma encontra a função em cada decisão de design.
                  </p>
                </ScrollReveal>
                {/* Item 4 */}
                <ScrollReveal delay={400}>
                  <h3 className="text-white font-bold text-base mb-1">Design Systems</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    Diretrizes abrangentes de marca e sistemas de design para garantir consistência absoluta em todos os pontos de contato.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Direita - Card */}
            <div className="w-full lg:w-1/2">
              <ScrollReveal delay={300} className="w-full">
                <div className="relative w-full max-w-md mx-auto rounded-2xl bg-[#131318] border border-white/5 p-8 sm:p-12 overflow-hidden">
                  <div className="flex flex-col items-center mb-8 relative z-10">
                    <FaPalette className="size-12 text-[#58e5a6] mb-4" />
                    <h3 className="text-white font-bold text-lg sm:text-xl">O Que Você Recebe</h3>
                  </div>

                  <ul className="flex flex-col gap-5 relative z-10">
                    {[
                      "Documento de estratégia de marca",
                      "Logotipo e identidade visual",
                      "Guia de cores e tipografia",
                      "Mockups de design UI/UX",
                      "Manual completo da marca",
                      "Templates para materiais de marketing",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-sm text-slate-300 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                      >
                        <FaCheck className="size-4 text-[#58e5a6] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* COBERTURA DE A a Z */}
      <section className="relative w-full bg-[#0c0c0f] py-24 border-b border-white/5">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-12">
          {/* Top Section */}
          <div className="mb-16">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-8 bg-gradient-to-r from-aurora-violet to-aurora-cyan" />
                <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  COBERTURA DE A a Z
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
                Todas as camadas de serviço,{" "}
                <span
                  className="text-transparent bg-clip-text inline-block pb-2"
                  style={{
                    backgroundImage: "linear-gradient(160deg, #a79df0, #82b8f7, #4ed4cf, #58e5a6)",
                  }}
                >
                  em um só lugar.
                </span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <p className="max-w-3xl text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Do primeiro rascunho ao crescimento sustentável, a Opnora opera em produto, engenharia, marketing e sistemas operacionais, para que fundadores evitem cadeias fragmentadas de fornecedores.
              </p>
            </ScrollReveal>
          </div>

          {/* Grid de 6 cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COBERTURA_ITEMS.map((item, i) => (
              <ScrollReveal
                key={item.title}
                delay={i < 3 ? 300 + i * 100 : 400 + (i - 3) * 100}
                className="h-full"
              >
                <div className="bg-[#131318] border border-white/5 rounded-sm p-8 md:p-10 flex flex-col h-full hover:-translate-y-2 hover:bg-[#181820] hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none transition-all duration-700 ease-out">
                  <h3 className="font-display text-lg font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mt-auto font-light">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
