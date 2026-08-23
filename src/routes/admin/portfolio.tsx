import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2, ExternalLink, FolderHeart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/admin/portfolio")({
	component: PortfolioPage,
});

type Project = {
	id: string;
	titulo: string;
	descricao: string;
	categoria: string;
	link: string;
	status: string;
	recursos: string[];
};

function PortfolioPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		titulo: "",
		descricao: "",
		categoria: "E-commerce",
		link: "",
		status: "Concluído",
		recursosTexto: "React, Supabase, Cloudinary, Admin Dashboard, Checkout WhatsApp, Analytics",
	});

	useEffect(() => {
		fetchProjects();
	}, []);

	async function fetchProjects() {
		setLoading(true);
		const { data, error } = await supabase
			.from("projetos")
			.select("*")
			.order("created_at", { ascending: false });
		if (error) {
			console.warn("Aviso ao carregar projetos:", error.message);
		}
		setProjects(data || []);
		setLoading(false);
	}

	function openNewModal() {
		setEditingId(null);
		setFormData({
			titulo: "",
			descricao: "",
			categoria: "E-commerce",
			link: "",
			status: "Concluído",
			recursosTexto: "React, Supabase, Tailwind, Admin Dashboard",
		});
		setIsModalOpen(true);
	}

	function openEditModal(project: Project) {
		setEditingId(project.id);
		setFormData({
			titulo: project.titulo,
			descricao: project.descricao,
			categoria: project.categoria,
			link: project.link || "",
			status: project.status || "Concluído",
			recursosTexto: Array.isArray(project.recursos)
				? project.recursos.join(", ")
				: "React, Supabase",
		});
		setIsModalOpen(true);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const tags = formData.recursosTexto
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean);

		const payload = {
			titulo: formData.titulo,
			descricao: formData.descricao,
			categoria: formData.categoria,
			link: formData.link,
			status: formData.status,
			recursos: tags,
		};

		if (editingId) {
			const { error } = await supabase
				.from("projetos")
				.update(payload)
				.eq("id", editingId);
			if (error) toast.error("Erro ao atualizar projeto: " + error.message);
			else {
				toast.success("Projeto atualizado!");
				setIsModalOpen(false);
				fetchProjects();
			}
		} else {
			const { error } = await supabase.from("projetos").insert([payload]);
			if (error) toast.error("Erro ao criar projeto: " + error.message);
			else {
				toast.success("Projeto criado!");
				setIsModalOpen(false);
				fetchProjects();
			}
		}
	}

	async function handleDelete(id: string) {
		if (!confirm("Tem certeza que deseja excluir este projeto?")) return;
		const { error } = await supabase.from("projetos").delete().eq("id", id);
		if (error) toast.error("Erro ao excluir");
		else {
			toast.success("Projeto excluído!");
			fetchProjects();
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
						<FolderHeart className="size-8 text-purple-400" /> Portfólio & Projetos
					</h1>
					<p className="text-slate-400">
						Gerencie os projetos e cases exibidos na seção de Soluções.
					</p>
				</div>
				<Button
					onClick={openNewModal}
					className="bg-aurora-violet text-white hover:bg-aurora-violet/80"
				>
					<Plus className="size-4 mr-2" /> Novo Projeto
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{loading ? (
					<div className="col-span-full py-12 flex justify-center text-slate-400">
						<Loader2 className="animate-spin size-8" />
					</div>
				) : projects.length === 0 ? (
					<div className="col-span-full py-12 text-center text-slate-500 bg-[#131318] rounded-xl border border-white/5">
						Nenhum projeto cadastrado no banco ainda. (O site exibirá o projeto padrão TFBrand).
					</div>
				) : (
					projects.map((p) => (
						<Card key={p.id} className="bg-[#131318] border-white/5 shadow-none overflow-hidden flex flex-col group relative">
							<CardHeader className="p-6 pb-3">
								<div className="flex items-center justify-between gap-3 mb-3">
									<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#a280ff] font-bold">
										{p.categoria}
									</span>
									<span
										className={`inline-flex items-center rounded-full border border-white/10 px-3 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider ${
											p.status === "Concluído"
												? "text-[#58e5a6] bg-[#58e5a6]/10"
												: "text-slate-400 bg-white/5"
										}`}
									>
										{p.status || "Concluído"}
									</span>
								</div>
								<CardTitle className="text-xl font-display font-bold text-white flex items-center gap-2">
									{p.titulo}
									{p.link && (
										<a
											href={p.link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-slate-500 hover:text-white"
										>
											<ExternalLink className="size-4" />
										</a>
									)}
								</CardTitle>
							</CardHeader>
							<CardContent className="px-6 py-0 flex-1 flex flex-col">
								<p className="text-sm text-slate-400 font-light leading-relaxed mb-6 flex-1">
									{p.descricao}
								</p>

								{p.recursos && p.recursos.length > 0 && (
									<div className="mb-4">
										<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-2">
											tecnologias e recursos
										</p>
										<div className="flex flex-wrap gap-1.5">
											{p.recursos.map((r, i) => (
												<span
													key={i}
													className="inline-flex items-center rounded-sm border border-white/5 bg-white/[0.02] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-400"
												>
													{r}
												</span>
											))}
										</div>
									</div>
								)}
							</CardContent>
							<CardFooter className="px-6 py-4 flex justify-end gap-2 border-t border-white/5 mt-auto bg-white/[0.01]">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => openEditModal(p)}
									className="text-slate-400 hover:text-white hover:bg-white/10"
									title="Editar"
								>
									<Pencil className="size-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleDelete(p.id)}
									className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
									title="Excluir"
								>
									<Trash2 className="size-4" />
								</Button>
							</CardFooter>
						</Card>
					))
				)}
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="bg-[#121218] border-white/10 text-white sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>{editingId ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
						<DialogDescription className="text-slate-400">
							Insira os detalhes do projeto para a seção de Soluções.
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
						<div className="space-y-2">
							<Label className="text-slate-300">Título do Projeto</Label>
							<Input
								required
								value={formData.titulo}
								onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white"
								placeholder="Ex: TFBrand"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-slate-300">Categoria</Label>
								<Select value={formData.categoria} onValueChange={(v) => setFormData({ ...formData, categoria: v })}>
									<SelectTrigger className="bg-[#0a0a0c] border-white/10 text-white">
										<SelectValue placeholder="Selecione..." />
									</SelectTrigger>
									<SelectContent className="bg-[#1a1a24] border-white/10 text-white">
										<SelectItem value="E-commerce">E-commerce</SelectItem>
										<SelectItem value="Plataforma Web">Plataforma Web</SelectItem>
										<SelectItem value="Sistema Web">Sistema Web</SelectItem>
										<SelectItem value="Landing Page">Landing Page</SelectItem>
										<SelectItem value="Automação / IA">Automação / IA</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label className="text-slate-300">Status</Label>
								<Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
									<SelectTrigger className="bg-[#0a0a0c] border-white/10 text-white">
										<SelectValue placeholder="Selecione..." />
									</SelectTrigger>
									<SelectContent className="bg-[#1a1a24] border-white/10 text-white">
										<SelectItem value="Concluído">Concluído</SelectItem>
										<SelectItem value="Em Andamento">Em Andamento</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-2">
							<Label className="text-slate-300">Descrição Completa</Label>
							<Textarea
								required
								rows={4}
								value={formData.descricao}
								onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white text-sm"
								placeholder="Descreva o que a plataforma faz, tecnologias e diferenciais..."
							/>
						</div>

						<div className="space-y-2">
							<Label className="text-slate-300">Tecnologias e Recursos (separadas por vírgula)</Label>
							<Input
								value={formData.recursosTexto}
								onChange={(e) => setFormData({ ...formData, recursosTexto: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white text-xs font-mono"
								placeholder="React, Supabase, Cloudinary, Admin Dashboard..."
							/>
						</div>

						<div className="space-y-2">
							<Label className="text-slate-300">Link do Projeto (Opcional)</Label>
							<Input
								type="url"
								value={formData.link}
								onChange={(e) => setFormData({ ...formData, link: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white"
								placeholder="https://..."
							/>
						</div>

						<div className="flex justify-end pt-4">
							<Button type="submit" className="bg-aurora-violet text-white hover:bg-aurora-violet/80">
								{editingId ? "Salvar Alterações" : "Adicionar Projeto"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
