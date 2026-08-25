import { createFileRoute } from "@tanstack/react-router";
import {
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  Trash2,
} from "lucide-react";
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
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format, isSameMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/admin/finance")({
  component: FinancePage,
});

type Transaction = {
  id: string;
  tipo: "entrada" | "saida";
  categoria: string;
  valor: number;
  data_pagamento: string;
  descricao: string;
  is_recurring: boolean;
};

const CATEGORIAS_ENTRADA = [
  "Site Completo",
  "Manutenção (Mensalidade)",
  "Landing Page",
  "Identidade Visual",
  "Outros",
];
const CATEGORIAS_SAIDA = [
  "Hospedagem / Servidor",
  "Domínio",
  "Ferramentas / Software",
  "Impostos",
  "Marketing / Ads",
  "Outros",
];

function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoForm, setTipoForm] = useState<"entrada" | "saida">("entrada");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    const { data, error } = await supabase
      .from("finance_transactions")
      .select("*")
      .order("data_pagamento", { ascending: false });

    if (!error && data) {
      setTransactions(data);
    }
    setLoading(false);
  }

  // Cálculos
  const { receitaMes, despesaMes, lucroLiquido, mrr } = useMemo(() => {
    const hoje = new Date();
    let rMes = 0;
    let dMes = 0;
    let mrrTotal = 0;

    transactions.forEach((t) => {
      const data = new Date(t.data_pagamento);
      const isEsteMes = isSameMonth(data, hoje);

      if (isEsteMes) {
        if (t.tipo === "entrada") rMes += Number(t.valor);
        if (t.tipo === "saida") dMes += Number(t.valor);
      }

      // MRR considera todas as entradas ativas que são recorrentes (simplificado)
      if (t.tipo === "entrada" && t.is_recurring) {
        mrrTotal += Number(t.valor);
      }
    });

    return {
      receitaMes: rMes,
      despesaMes: dMes,
      lucroLiquido: rMes - dMes,
      mrr: mrrTotal,
    };
  }, [transactions]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  async function saveTransaction(e: React.FormEvent) {
    e.preventDefault();
    if (!categoria || !valor) {
      toast.error("Preencha categoria e valor.");
      return;
    }

    const numValor = parseFloat(valor.replace(",", "."));
    if (isNaN(numValor)) {
      toast.error("Valor inválido.");
      return;
    }

    const { error } = await supabase.from("finance_transactions").insert([
      {
        tipo: tipoForm,
        categoria,
        valor: numValor,
        descricao,
        is_recurring: isRecurring,
        data_pagamento: new Date().toISOString(),
      },
    ]);

    if (error) {
      toast.error("Erro ao salvar transação.");
    } else {
      toast.success("Transação registrada!");
      setIsModalOpen(false);
      setCategoria("");
      setValor("");
      setDescricao("");
      setIsRecurring(false);
      fetchTransactions();
    }
  }

  async function deleteTransaction(id: string) {
    if (!confirm("Deseja apagar esta transação?")) return;
    const { error } = await supabase.from("finance_transactions").delete().eq("id", id);
    if (error) toast.error("Erro.");
    else {
      toast.success("Apagado.");
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <DollarSign className="size-8 text-purple-400" />
            Gestão Financeira
          </h1>
          <p className="text-slate-400">
            Controle de caixa, lucros e receita recorrente mensal (MRR).
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          <Plus className="size-4 mr-2" /> Nova Transação
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#131318] border-white/5 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Receita do Mês</CardTitle>
            <ArrowUpRight className="size-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">{formatCurrency(receitaMes)}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#131318] border-white/5 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Despesas do Mês</CardTitle>
            <ArrowDownRight className="size-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{formatCurrency(despesaMes)}</div>
          </CardContent>
        </Card>

        <Card className={`bg-[#131318] border-white/5 shadow-none`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Lucro Líquido</CardTitle>
            <Wallet className={`size-4 ${lucroLiquido >= 0 ? "text-blue-400" : "text-red-400"}`} />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${lucroLiquido >= 0 ? "text-blue-400" : "text-red-400"}`}
            >
              {formatCurrency(lucroLiquido)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-500/10 border-emerald-500/20 shadow-none relative overflow-hidden">
          <div className="absolute -right-4 -top-4 p-4 opacity-10">
            <TrendingUp className="size-24 text-emerald-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-emerald-400">MRR (Recorrente)</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-white">{formatCurrency(mrr)}</div>
            <p className="text-xs text-emerald-400/60 mt-1">Previsão base mensal</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#131318] border-white/5 shadow-none mt-6">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle>Histórico de Transações</CardTitle>
          <CardDescription>Todas as entradas e saídas registradas.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-400">Data</TableHead>
                <TableHead className="text-slate-400">Descrição</TableHead>
                <TableHead className="text-slate-400">Categoria</TableHead>
                <TableHead className="text-right text-slate-400">Valor</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="border-white/5">
                  <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow className="border-white/5">
                  <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                    Nenhuma transação registrada.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((t) => (
                  <TableRow key={t.id} className="border-white/5 hover:bg-white/[0.02]">
                    <TableCell className="text-slate-300">
                      {format(new Date(t.data_pagamento), "dd MMM yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-white">{t.descricao || "Sem descrição"}</div>
                      {t.is_recurring && (
                        <Badge
                          variant="outline"
                          className="mt-1 text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        >
                          Recorrente (MRR)
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-white/5 text-slate-300 border-white/10"
                      >
                        {t.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${t.tipo === "entrada" ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {t.tipo === "entrada" ? "+" : "-"}
                      {formatCurrency(t.valor)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => deleteTransaction(t.id)}
                        className="size-8 p-0 text-slate-500 hover:text-red-400 hover:bg-red-400/10"
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
        <DialogContent className="bg-[#121218] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Nova Transação</DialogTitle>
            <DialogDescription>Registre uma entrada ou saída no caixa.</DialogDescription>
          </DialogHeader>
          <form onSubmit={saveTransaction} className="space-y-4 mt-4">
            <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
              <button
                type="button"
                onClick={() => setTipoForm("entrada")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${tipoForm === "entrada" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Entrada (Receita)
              </button>
              <button
                type="button"
                onClick={() => setTipoForm("saida")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${tipoForm === "saida" ? "bg-red-500 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Saída (Despesa)
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                required
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Categoria</label>
              <Select required value={categoria} onValueChange={setCategoria}>
                <SelectTrigger className="w-full bg-black/50 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-emerald-500">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a24] border-white/10 text-white">
                  {(tipoForm === "entrada" ? CATEGORIAS_ENTRADA : CATEGORIAS_SAIDA).map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Descrição (Opcional)</label>
              <input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="Ex: Site da Empresa X"
              />
            </div>

            {tipoForm === "entrada" && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="accent-emerald-500"
                />
                <label htmlFor="recurring" className="text-sm text-emerald-400 cursor-pointer">
                  É uma mensalidade recorrente (MRR)?
                </label>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className={
                  tipoForm === "entrada"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-red-500 hover:bg-red-600"
                }
              >
                Salvar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
