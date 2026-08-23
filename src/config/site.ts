/**
 * Configurações centrais da Opnora.
 * Substitua os valores ao adquirir domínio / canais oficiais.
 */
export const SITE = {
	name: "Opnora",
	tagline:
		"Desenvolvemos software para empresas que querem sair do improviso digital.",
	description:
		"A Opnora é uma iniciativa de desenvolvimento de software. Criamos sites, sistemas e plataformas que organizam processos, melhoram o atendimento e ajudam empresas a crescer com tecnologia.",
	// Domínio oficial configurado para SEO/canonical
	url: "https://opnora.me",
	locale: "pt-BR",
} as const;

export const CONTACT = {
	// Placeholders — troque ao definir canais oficiais.
	email: "contato@opnora.dev",
	whatsappUrl: "https://wa.me/5585999973965",
	whatsappFormatted: "(85) 99997-3965",
	instagramUrl: "",
	linkedinUrl: "",
	githubUrl: "",
} as const;

export const NAV = [
	{ to: "/", label: "Início" },
	{ to: "/sobre", label: "Sobre" },
	{ to: "/solucoes", label: "Soluções" },
	{ to: "/precos", label: "Preços" },
	{ to: "/contato", label: "Contato" },
] as const;
