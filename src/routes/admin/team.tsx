import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2, Link as LinkIcon, Users } from "lucide-react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/team")({
	component: TeamPage,
});

type Member = {
	id: string;
	nome: string;
	cargo: string;
	descricao?: string;
	color?: string;
	foto_url?: string;
	imagem_url?: string;
	linkedin?: string;
	ordem: number;
};

function TeamPage() {
	const [members, setMembers] = useState<Member[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		nome: "",
		cargo: "",
		descricao: "",
		color: "#a280ff",
		foto_url: "",
		linkedin: "",
		ordem: 0,
	});

	useEffect(() => {
		fetchMembers();
	}, []);

	async function fetchMembers() {
		setLoading(true);
		const { data, error } = await supabase
			.from("team_members")
			.select("*")
			.order("ordem", { ascending: true });
		if (error) {
			console.warn("Aviso ao carregar equipe:", error.message);
		}
		setMembers(data || []);
		setLoading(false);
	}

	function openNewModal() {
		setEditingId(null);
		setFormData({
			nome: "",
			cargo: "",
			descricao: "",
			color: "#a280ff",
			foto_url: "",
			linkedin: "",
			ordem: members.length,
		});
		setIsModalOpen(true);
	}

	function openEditModal(member: Member) {
		setEditingId(member.id);
		setFormData({
			nome: member.nome,
			cargo: member.cargo,
			descricao: member.descricao || "",
			color: member.color || "#a280ff",
			foto_url: member.foto_url || member.imagem_url || "",
			linkedin: member.linkedin || "",
			ordem: member.ordem ?? 0,
		});
		setIsModalOpen(true);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const payload = {
			nome: formData.nome,
			cargo: formData.cargo,
			descricao: formData.descricao,
			color: formData.color,
			foto_url: formData.foto_url,
			imagem_url: formData.foto_url,
			linkedin: formData.linkedin,
			ordem: formData.ordem,
		};

		if (editingId) {
			const { error } = await supabase
				.from("team_members")
				.update(payload)
				.eq("id", editingId);
			if (error) {
				toast.error("Erro ao atualizar membro: " + error.message);
			} else {
				toast.success("Membro atualizado!");
				setIsModalOpen(false);
				fetchMembers();
			}
		} else {
			const { error } = await supabase.from("team_members").insert([payload]);
			if (error) {
				toast.error("Erro ao adicionar membro: " + error.message);
			} else {
				toast.success("Membro adicionado!");
				setIsModalOpen(false);
				fetchMembers();
			}
		}
	}

	async function handleDelete(id: string) {
		if (!confirm("Tem certeza que deseja remover este membro?")) return;
		const { error } = await supabase.from("team_members").delete().eq("id", id);
		if (error) {
			toast.error("Erro ao excluir: " + error.message);
		} else {
			toast.success("Membro removido!");
			fetchMembers();
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
                        <Users className="size-8 text-purple-400" /> Equipe
                    </h1>
					<p className="text-slate-400">
						Gerencie os membros da equipe exibidos na seção "Sobre a Equipe".
					</p>
				</div>
				<Button
					onClick={openNewModal}
					className="bg-aurora-violet text-white hover:bg-aurora-violet/80"
				>
					<Plus className="size-4 mr-2" /> Novo Membro
				</Button>
			</div>

			<Card className="bg-[#131318] border-white/5 shadow-none">
				<CardHeader className="border-b border-white/5 pb-4">
					<CardTitle>Membros Cadastrados</CardTitle>
					<CardDescription>Estes membros aparecem no site público.</CardDescription>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader className="bg-white/[0.02]">
							<TableRow className="border-white/5 hover:bg-transparent">
								<TableHead className="w-[260px]">Membro</TableHead>
								<TableHead className="w-[200px]">Cargo</TableHead>
								<TableHead>Descrição</TableHead>
								<TableHead className="w-[100px] text-center">Ordem</TableHead>
								<TableHead className="w-[120px] text-right">Ações</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow className="border-white/5 hover:bg-white/[0.02]">
									<TableCell colSpan={5} className="h-32 text-center text-slate-500">
										<Loader2 className="size-6 animate-spin mx-auto mb-2" />
										Carregando equipe...
									</TableCell>
								</TableRow>
							) : members.length === 0 ? (
								<TableRow className="border-white/5 hover:bg-white/[0.02]">
									<TableCell colSpan={5} className="h-32 text-center text-slate-500">
										Nenhum membro cadastrado ainda. Clique em "Novo Membro" para adicionar.
									</TableCell>
								</TableRow>
							) : (
								members.map((m) => (
									<TableRow key={m.id} className="border-white/5 hover:bg-white/[0.02]">
										<TableCell>
											<div className="flex items-center gap-4">
												<Avatar className="size-10 border border-white/10 shrink-0">
													<AvatarImage src={m.foto_url || m.imagem_url} alt={m.nome} />
													<AvatarFallback
														className="text-white font-bold"
														style={{ backgroundColor: m.color || "#a280ff" }}
													>
														{m.nome.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div className="min-w-0">
													<div className="font-medium text-white truncate">{m.nome}</div>
													{m.linkedin && (
														<a
															href={m.linkedin}
															target="_blank"
															className="text-xs text-aurora-violet hover:underline flex items-center gap-1 mt-0.5"
															rel="noopener noreferrer"
														>
															<LinkIcon className="size-3" /> LinkedIn
														</a>
													)}
												</div>
											</div>
										</TableCell>
										<TableCell>
											<span
												className="font-mono text-xs px-2.5 py-1 rounded-full whitespace-nowrap inline-block"
												style={{
													color: m.color || "#a280ff",
													backgroundColor: `${m.color || "#a280ff"}15`,
												}}
											>
												{m.cargo}
											</span>
										</TableCell>
										<TableCell className="text-slate-400 text-xs max-w-sm line-clamp-2">
											{m.descricao || "-"}
										</TableCell>
										<TableCell className="text-center font-mono text-slate-300">
											{m.ordem ?? 0}
										</TableCell>
										<TableCell className="text-right space-x-1">
											<Button
												variant="ghost"
												size="icon"
												onClick={() => openEditModal(m)}
												className="text-slate-400 hover:text-white hover:bg-white/10"
												title="Editar"
											>
												<Pencil className="size-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleDelete(m.id)}
												className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
												title="Excluir"
											>
												<Trash2 className="size-4" />
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="bg-[#121218] border-white/10 text-white sm:max-w-[480px]">
					<DialogHeader>
						<DialogTitle>{editingId ? "Editar Membro" : "Adicionar Membro"}</DialogTitle>
						<DialogDescription className="text-slate-400">
							Preencha os detalhes do membro da equipe para exibir no site.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[75vh] overflow-y-auto px-1">
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-300">Nome</label>
							<Input
								required
								type="text"
								value={formData.nome}
								onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white placeholder:text-slate-500"
								placeholder="Ex: Nicolas Harnisch"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-300">Cargo</label>
							<Input
								required
								type="text"
								value={formData.cargo}
								onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white placeholder:text-slate-500"
								placeholder="Ex: Fundador e CEO"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-300">Descrição / Bio</label>
							<Textarea
								rows={3}
								value={formData.descricao}
								onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white placeholder:text-slate-500"
								placeholder="Breve resumo da atuação na Opnora..."
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-300">Cor de Destaque</label>
								<div className="flex items-center gap-2">
									<input
										type="color"
										value={formData.color}
										onChange={(e) => setFormData({ ...formData, color: e.target.value })}
										className="w-10 h-10 rounded cursor-pointer bg-transparent border-0"
									/>
									<Input
										type="text"
										value={formData.color}
										onChange={(e) => setFormData({ ...formData, color: e.target.value })}
										className="bg-[#0a0a0c] border-white/10 text-white text-xs font-mono"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-300">Ordem de Exibição</label>
								<Input
									type="number"
									value={formData.ordem}
									onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) || 0 })}
									className="bg-[#0a0a0c] border-white/10 text-white placeholder:text-slate-500"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-300">URL da Foto (Opcional)</label>
							<Input
								type="url"
								value={formData.foto_url}
								onChange={(e) => setFormData({ ...formData, foto_url: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white placeholder:text-slate-500"
								placeholder="https://exemplo.com/foto.jpg"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-300">Link do LinkedIn (Opcional)</label>
							<Input
								type="url"
								value={formData.linkedin}
								onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
								className="bg-[#0a0a0c] border-white/10 text-white placeholder:text-slate-500"
								placeholder="https://linkedin.com/in/..."
							/>
						</div>
						<div className="flex justify-end pt-4">
							<Button type="submit" className="bg-aurora-violet text-white hover:bg-aurora-violet/80">
								{editingId ? "Salvar Alterações" : "Adicionar Membro"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
