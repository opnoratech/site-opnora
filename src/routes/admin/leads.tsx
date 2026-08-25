import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  Loader2,
  Trash2,
  RefreshCcw,
  Eye,
  MoreHorizontal,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  Calculator,
  FileText,
  Users,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsPage,
});

type Lead = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string | null;
  empresa: string | null;
  tipo: string;
  mensagem: string;
  status: "novo" | "em_andamento" | "concluido";
  created_at: string;
  is_simulador?: boolean;
  simulador_data?: {
    objectives: string;
    solutions: string;
    features: string;
    basePlanoLabel: string;
    estimativaPreco: string;
  };
};

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [proposalModalLead, setProposalModalLead] = useState<Lead | null>(null);
  const [proposalData, setProposalData] = useState({
    valor: "",
    servicos: "",
    prazos: "",
    condicoes: "",
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar leads.");
      console.error(error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: Lead["status"]) {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar status.");
    } else {
      toast.success("Status atualizado.");
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));

      // Envia notificação para o e-mail da Opnora
      const lead = leads.find((l) => l.id === id);
      if (lead) {
        fetch("/api/contato", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "status_update",
            nome: lead.nome,
            email: lead.email,
            whatsapp: lead.whatsapp,
            empresa: lead.empresa,
            tipoContato: lead.tipo,
            status: status,
          }),
        }).catch((err) => console.error("Erro ao notificar status:", err));
      }
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;

    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir lead.");
    } else {
      toast.success("Lead excluído.");
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setSelectedLead(null);
    }
  }

  async function generateProposal(e: React.FormEvent) {
    e.preventDefault();
    if (!proposalModalLead) return;

    const numValor = parseFloat(proposalData.valor.replace(",", "."));
    if (isNaN(numValor)) {
      toast.error("Valor inválido.");
      return;
    }

    const { data, error } = await supabase
      .from("proposals")
      .insert([
        {
          lead_id: proposalModalLead.id,
          valor_total: numValor,
          servicos: proposalData.servicos,
          prazos: proposalData.prazos,
          condicoes_pagamento: proposalData.condicoes,
          status: "pendente",
        },
      ])
      .select()
      .single();

    if (error) {
      toast.error("Erro ao gerar proposta.");
    } else {
      toast.success("Proposta gerada com sucesso!");
      setProposalModalLead(null);
      setProposalData({ valor: "", servicos: "", prazos: "", condicoes: "" });

      const url = `${window.location.origin}/proposta/${data.id}`;
      navigator.clipboard.writeText(url);
      toast.info("Link da proposta copiado para a área de transferência!");
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "novo":
        return (
          <Badge className="bg-aurora-violet text-white hover:bg-aurora-violet/80">Novo</Badge>
        );
      case "em_andamento":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
          >
            Em Andamento
          </Badge>
        );
      case "concluido":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500/30">
            Concluído
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <Users className="size-8 text-purple-400" /> Leads & CRM
          </h1>
          <p className="text-slate-400">Gerencie os contatos e orçamentos recebidos pelo site.</p>
        </div>
        <Button
          onClick={fetchLeads}
          variant="outline"
          className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
        >
          <RefreshCcw className="size-4 mr-2" /> Atualizar
        </Button>
      </div>

      <Card className="bg-[#131318] border-white/5 shadow-none">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle>Todos os Leads</CardTitle>
          <CardDescription>Lista completa de requisições em ordem cronológica.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-400">Data</TableHead>
                <TableHead className="text-slate-400">Cliente</TableHead>
                <TableHead className="text-slate-400">Origem</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-right text-slate-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="border-white/5 hover:bg-white/[0.02]">
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    <Loader2 className="size-6 animate-spin mx-auto mb-2" />
                    Carregando leads...
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow className="border-white/5 hover:bg-white/[0.02]">
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    Nenhum lead recebido ainda.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id} className="border-white/5 hover:bg-white/[0.02]">
                    <TableCell className="text-slate-300 whitespace-nowrap">
                      {format(new Date(lead.created_at), "dd MMM, HH:mm", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-white">{lead.nome}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <Mail className="size-3" /> {lead.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.is_simulador ? (
                        <Badge
                          variant="outline"
                          className="bg-purple-400/10 text-purple-400 border-purple-400/20"
                        >
                          Simulador
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-blue-400/10 text-blue-400 border-blue-400/20"
                        >
                          Site
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="size-8 p-0 text-slate-400 hover:text-white hover:bg-white/10"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[#1a1a24] border-white/10 text-slate-300"
                        >
                          <DropdownMenuItem
                            onClick={() => setSelectedLead(lead)}
                            className="hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer"
                          >
                            <Eye className="size-4 mr-2" /> Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem
                            onClick={() => updateStatus(lead.id, "em_andamento")}
                            disabled={lead.status === "em_andamento"}
                            className="hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer"
                          >
                            Marcar "Em Andamento"
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateStatus(lead.id, "concluido")}
                            disabled={lead.status === "concluido"}
                            className="hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer"
                          >
                            Marcar "Concluído"
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem
                            onClick={() => deleteLead(lead.id)}
                            className="text-red-400 hover:bg-red-400/10 focus:bg-red-400/10 focus:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="size-4 mr-2" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Detalhes (usando Dialog do Shadcn) */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="bg-[#121218] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display flex items-center gap-2">
              <MessageSquare className="size-5 text-aurora-violet" />
              Detalhes do Lead
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Informações completas enviadas pelo cliente.
            </DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                    Nome
                  </h4>
                  <p className="text-white font-medium">{selectedLead.nome}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                    Data
                  </h4>
                  <p className="text-slate-300">
                    {format(new Date(selectedLead.created_at), "dd 'de' MMM, yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Mail className="size-3" /> Email
                  </h4>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-aurora-violet hover:underline"
                  >
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Phone className="size-3" /> WhatsApp
                  </h4>
                  {selectedLead.whatsapp ? (
                    <a
                      href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-aurora-violet hover:underline"
                    >
                      {selectedLead.whatsapp}
                    </a>
                  ) : (
                    <span className="text-slate-500">Não informado</span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Briefcase className="size-3" /> Empresa
                  </h4>
                  <p className="text-slate-300">{selectedLead.empresa || "Não informada"}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                    Tipo de Serviço
                  </h4>
                  <p className="text-slate-300">{selectedLead.tipo}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                  Mensagem
                </h4>
                <div className="bg-[#0a0a0c] p-4 rounded-lg border border-white/5 text-slate-300 text-sm whitespace-pre-wrap">
                  {selectedLead.mensagem || "Sem mensagem."}
                </div>
              </div>

              {selectedLead.is_simulador && selectedLead.simulador_data && (
                <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
                  <h3 className="text-lg font-display text-purple-400 flex items-center gap-2">
                    <Calculator className="size-5" />
                    Resumo do Simulador
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#1a1a24]/50 p-5 rounded-xl border border-white/5">
                    <div>
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                        Plano Sugerido
                      </h4>
                      <p className="text-white font-medium">
                        {selectedLead.simulador_data.basePlanoLabel}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                        Estimativa de Investimento
                      </h4>
                      <p className="text-emerald-400 font-bold">
                        {selectedLead.simulador_data.estimativaPreco}
                      </p>
                    </div>
                    {selectedLead.simulador_data.objectives && (
                      <div className="col-span-full">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                          Objetivos
                        </h4>
                        <p className="text-slate-300 text-sm">
                          {selectedLead.simulador_data.objectives}
                        </p>
                      </div>
                    )}
                    {selectedLead.simulador_data.solutions && (
                      <div className="col-span-full">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                          Soluções
                        </h4>
                        <p className="text-slate-300 text-sm">
                          {selectedLead.simulador_data.solutions}
                        </p>
                      </div>
                    )}
                    {selectedLead.simulador_data.features && (
                      <div className="col-span-full">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                          Recursos
                        </h4>
                        <p className="text-slate-300 text-sm">
                          {selectedLead.simulador_data.features}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ações Rápidas de Atendimento */}
              <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 mr-2">Alterar Status:</span>
                  <Button
                    size="sm"
                    variant={selectedLead.status === "novo" ? "default" : "outline"}
                    onClick={() => {
                      updateStatus(selectedLead.id, "novo");
                      setSelectedLead({ ...selectedLead, status: "novo" });
                    }}
                    className="text-xs h-8"
                  >
                    Novo
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedLead.status === "em_andamento" ? "default" : "outline"}
                    onClick={() => {
                      updateStatus(selectedLead.id, "em_andamento");
                      setSelectedLead({ ...selectedLead, status: "em_andamento" });
                    }}
                    className="text-xs h-8"
                  >
                    Em Andamento
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedLead.status === "concluido" ? "default" : "outline"}
                    onClick={() => {
                      updateStatus(selectedLead.id, "concluido");
                      setSelectedLead({ ...selectedLead, status: "concluido" });
                    }}
                    className="text-xs h-8"
                  >
                    Concluído
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  {selectedLead.whatsapp ? (
                    <a
                      href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${selectedLead.nome}, recebemos sua solicitação na Opnora sobre ${selectedLead.tipo}!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm h-10 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors w-full"
                    >
                      <Phone className="size-4" /> Chamar no WhatsApp
                    </a>
                  ) : (
                    <div className="h-10 px-4 rounded-lg flex items-center justify-center gap-2 border border-white/10 text-slate-500 text-sm">
                      <Phone className="size-4" /> WhatsApp Indisponível
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      setSelectedLead(null);
                      setProposalModalLead(selectedLead);
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold text-sm h-10 px-4 rounded-lg flex items-center justify-center gap-2 w-full"
                  >
                    <FileText className="size-4" /> Gerar Proposta
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Gerar Proposta */}
      <Dialog
        open={!!proposalModalLead}
        onOpenChange={(open) => !open && setProposalModalLead(null)}
      >
        <DialogContent className="bg-[#121218] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display flex items-center gap-2">
              <FileText className="size-5 text-purple-400" />
              Gerar Proposta Web
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Crie um orçamento exclusivo para {proposalModalLead?.nome}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={generateProposal} className="space-y-4 mt-2">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Valor Total (R$)</label>
              <input
                type="number"
                step="0.01"
                required
                autoFocus
                value={proposalData.valor}
                onChange={(e) => setProposalData({ ...proposalData, valor: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="3500.00"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Serviços (separados por vírgula)
              </label>
              <textarea
                required
                value={proposalData.servicos}
                onChange={(e) => setProposalData({ ...proposalData, servicos: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 min-h-[80px]"
                placeholder="Ex: Landing Page Premium, Integração WhatsApp, E-mails Corporativos"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Prazo de Entrega</label>
              <input
                required
                value={proposalData.prazos}
                onChange={(e) => setProposalData({ ...proposalData, prazos: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="Ex: 15 dias úteis após o briefing"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Condições de Pagamento</label>
              <input
                required
                value={proposalData.condicoes}
                onChange={(e) => setProposalData({ ...proposalData, condicoes: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="Ex: 50% de entrada via Pix, 50% na aprovação final"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => setProposalModalLead(null)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white">
                Criar Proposta
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
