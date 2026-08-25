import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Plus, Eye, Copy, Trash2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/admin/proposals")({
  component: ProposalsPage,
});

type Proposal = {
  id: string;
  lead_id: string;
  valor_total: number;
  servicos: string;
  prazos: string;
  condicoes_pagamento: string;
  status: "pendente" | "aceita" | "recusada";
  created_at: string;
  leads?: { nome: string; empresa: string };
};

function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  async function fetchProposals() {
    setLoading(true);
    const { data, error } = await supabase
      .from("proposals")
      .select("*, leads(nome, empresa)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProposals(data as unknown as Proposal[]);
    }
    setLoading(false);
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/proposta/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link da proposta copiado!");
  };

  async function deleteProposal(id: string) {
    if (!confirm("Deseja apagar esta proposta?")) return;
    const { error } = await supabase.from("proposals").delete().eq("id", id);
    if (error) toast.error("Erro ao apagar.");
    else {
      toast.success("Proposta apagada.");
      setProposals(proposals.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <FileText className="size-8 text-purple-400" />
            Propostas Comerciais
          </h1>
          <p className="text-slate-400">
            Gere orçamentos em formato de página web e envie para seus clientes.
          </p>
        </div>
        <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
          <Link to="/admin/leads">
            <Plus className="size-4 mr-2" /> Nova Proposta (Via CRM)
          </Link>
        </Button>
      </div>

      <Card className="bg-[#131318] border-white/5 shadow-none mt-6">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle>Histórico de Propostas</CardTitle>
          <CardDescription>Acompanhe se os clientes aceitaram os orçamentos.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-400">Data</TableHead>
                <TableHead className="text-slate-400">Cliente</TableHead>
                <TableHead className="text-slate-400">Serviços</TableHead>
                <TableHead className="text-slate-400">Valor</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-right text-slate-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="border-white/5">
                  <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : proposals.length === 0 ? (
                <TableRow className="border-white/5">
                  <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                    Nenhuma proposta gerada.
                  </TableCell>
                </TableRow>
              ) : (
                proposals.map((p) => (
                  <TableRow key={p.id} className="border-white/5 hover:bg-white/[0.02]">
                    <TableCell className="text-slate-300">
                      {format(new Date(p.created_at), "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-white">
                        {p.leads?.nome || "Lead Desconhecido"}
                      </div>
                      <div className="text-xs text-slate-500">{p.leads?.empresa}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-slate-300 text-sm">
                        {p.servicos}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-white">
                      {formatCurrency(p.valor_total)}
                    </TableCell>
                    <TableCell>
                      {p.status === "pendente" && (
                        <Badge
                          variant="outline"
                          className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        >
                          <Clock className="size-3 mr-1" /> Pendente
                        </Badge>
                      )}
                      {p.status === "aceita" && (
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        >
                          <CheckCircle2 className="size-3 mr-1" /> Aceita
                        </Badge>
                      )}
                      {p.status === "recusada" && (
                        <Badge
                          variant="outline"
                          className="bg-red-500/10 text-red-400 border-red-500/20"
                        >
                          <XCircle className="size-3 mr-1" /> Recusada
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          onClick={() => copyLink(p.id)}
                          className="size-8 p-0 text-slate-400 hover:text-white hover:bg-white/10"
                          title="Copiar Link"
                        >
                          <Copy className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          asChild
                          className="size-8 p-0 text-slate-400 hover:text-white hover:bg-white/10"
                          title="Ver Proposta"
                        >
                          <a href={`/proposta/${p.id}`} target="_blank" rel="noreferrer">
                            <Eye className="size-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => deleteProposal(p.id)}
                          className="size-8 p-0 text-slate-500 hover:text-red-400 hover:bg-red-400/10"
                          title="Apagar"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
