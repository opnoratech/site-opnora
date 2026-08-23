import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, ShieldCheck, Mail, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/layout/Logo";

export const Route = createFileRoute("/proposta/$id")({
	component: PublicProposalPage,
});

type Proposal = {
	id: string;
	valor_total: number;
	servicos: string;
	prazos: string;
	condicoes_pagamento: string;
	status: string;
	created_at: string;
	leads?: { nome: string; empresa: string; email: string };
};

function PublicProposalPage() {
	const { id } = useParams({ from: "/proposta/$id" });
	const [proposal, setProposal] = useState<Proposal | null>(null);
	const [loading, setLoading] = useState(true);
	const [accepting, setAccepting] = useState(false);
	const [accepted, setAccepted] = useState(false);

	useEffect(() => {
		async function fetchProposal() {
			const { data, error } = await supabase
				.from("proposals")
				.select("*, leads(nome, empresa, email)")
				.eq("id", id)
				.single();

			if (!error && data) {
				setProposal(data as any);
				if (data.status === "aceita") setAccepted(true);
			}
			setLoading(false);
		}
		fetchProposal();
	}, [id]);

	const handleAccept = async () => {
		setAccepting(true);
		const { error } = await supabase.from("proposals").update({ status: "aceita" }).eq("id", id);
		if (!error) {
			setAccepted(true);
		}
		setAccepting(false);
	};

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
				<div className="text-white/50">Carregando proposta...</div>
			</div>
		);
	}

	if (!proposal) {
		return (
			<div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
				<div className="text-white">Proposta não encontrada ou expirada.</div>
			</div>
		);
	}

	const servicosList = proposal.servicos.split(",").map(s => s.trim()).filter(Boolean);

	return (
		<div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-purple-500/30 font-sans pb-24">
			{/* Header / Aurora */}
			<div className="relative pt-12 pb-20 px-6 lg:px-8 overflow-hidden">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
				<div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center">
					<Logo className="mb-12" />
					<Badge status={proposal.status} />
					<h1 className="text-4xl md:text-5xl font-display font-bold mt-6 leading-tight">
						Proposta Comercial
					</h1>
					<p className="text-xl text-slate-400 mt-4 max-w-xl">
						Preparada exclusivamente para <strong className="text-white">{proposal.leads?.nome}</strong> {proposal.leads?.empresa && `da ${proposal.leads.empresa}`}.
					</p>
				</div>
			</div>

			<div className="max-w-3xl mx-auto px-6 relative z-10 space-y-8">
				
				{/* Seção de Serviços */}
				<section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
					<h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
						<div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">1</div>
						Escopo do Projeto
					</h2>
					<ul className="space-y-4">
						{servicosList.map((servico, i) => (
							<li key={i} className="flex items-start gap-3">
								<CheckCircle2 className="size-6 text-emerald-400 shrink-0" />
								<span className="text-slate-300 text-lg">{servico}</span>
							</li>
						))}
					</ul>
				</section>

				{/* Seção de Prazos e Condições */}
				<div className="grid md:grid-cols-2 gap-8">
					<section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
						<h2 className="text-xl font-display font-bold mb-4 flex items-center gap-3">
							<div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">2</div>
							Cronograma
						</h2>
						<p className="text-slate-300 text-lg leading-relaxed">{proposal.prazos}</p>
					</section>

					<section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
						<h2 className="text-xl font-display font-bold mb-4 flex items-center gap-3">
							<div className="size-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">3</div>
							Pagamento
						</h2>
						<p className="text-slate-300 text-lg leading-relaxed">{proposal.condicoes_pagamento}</p>
					</section>
				</div>

				{/* Investimento */}
				<section className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<ShieldCheck className="size-32" />
					</div>
					<h2 className="text-2xl font-display font-bold mb-2 text-purple-100">Investimento Total</h2>
					<p className="text-sm text-purple-200/60 mb-6 uppercase tracking-wider font-semibold">Garantia Opnora Inclusa</p>
					<div className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
						{formatCurrency(proposal.valor_total)}
					</div>

					{!accepted ? (
						<Button 
							onClick={handleAccept} 
							disabled={accepting || proposal.status === "recusada"}
							size="lg" 
							className="w-full sm:w-auto h-14 px-8 text-lg bg-white text-black hover:bg-slate-200 font-bold"
						>
							{accepting ? "Processando..." : (
								<>Aceitar Proposta e Iniciar Projeto <ArrowRight className="ml-2 size-5" /></>
							)}
						</Button>
					) : (
						<div className="inline-flex items-center gap-3 bg-emerald-500/20 text-emerald-400 px-6 py-4 rounded-xl border border-emerald-500/30 font-semibold text-lg">
							<Check className="size-6" /> Proposta Aceita com Sucesso!
						</div>
					)}
					
					{accepted && (
						<p className="text-sm text-slate-400 mt-6">
							Nossa equipe entrará em contato pelo WhatsApp em breve para dar os próximos passos.
						</p>
					)}
				</section>

				{/* Footer Contato */}
				<div className="text-center mt-16 pt-8 border-t border-white/10">
					<p className="text-slate-500 text-sm mb-4">Em caso de dúvidas, fale conosco:</p>
					<a href="mailto:contato@opnoratech.com" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
						<Mail className="size-4" /> contato@opnoratech.com
					</a>
				</div>

			</div>
		</div>
	);
}

function Badge({ status }: { status: string }) {
	if (status === "aceita") {
		return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium"><CheckCircle2 className="size-4"/> Proposta Aceita</span>
	}
	if (status === "recusada") {
		return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium">Proposta Recusada</span>
	}
	return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-medium animate-pulse">Aguardando Avaliação</span>
}
