import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Clock, CheckCircle2, Calculator, TrendingUp, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

interface Lead {
  id: string;
  nome: string;
  email: string;
  empresa: string | null;
  status: string;
  is_simulador: boolean;
  created_at: string;
}

function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("id, nome, email, empresa, status, is_simulador, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    } finally {
      setLoading(false);
    }
  }

  const chartData = useMemo(() => {
    if (!leads.length) return [];

    // Create array of last 7 days (including today)
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split("T")[0]; // YYYY-MM-DD
    });

    // Count leads per day
    const countMap = last7Days.reduce(
      (acc, date) => {
        acc[date] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    leads.forEach((l) => {
      const dateStr = l.created_at.split("T")[0];
      if (countMap[dateStr] !== undefined) {
        countMap[dateStr]++;
      }
    });

    // Format for Recharts
    return last7Days.map((date) => {
      const [year, month, day] = date.split("-");
      return {
        name: `${day}/${month}`,
        "Novos Leads": countMap[date],
      };
    });
  }, [leads]);

  const hojeStr = new Date().toISOString().split("T")[0];
  const leadsHoje = leads.filter((l) => l.created_at.startsWith(hojeStr)).length;
  const aguardando = leads.filter((l) => l.status === "novo").length;
  const projetosAtivos = leads.filter((l) => l.status === "em_andamento").length;
  const simuladores = leads.filter((l) => l.is_simulador).length;

  const ultimosLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <LayoutDashboard className="size-8 text-purple-400" /> Dashboard Geral
          </h1>
          <p className="text-slate-400">
            Visão geral e desempenho dos leads nos últimos 7 dias.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#131318] border-white/5 shadow-none group relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-[#82b8f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Leads Hoje</CardTitle>
            <Users className="size-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{loading ? "-" : leadsHoje}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#131318] border-white/5 shadow-none group relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-500/70">Aguardando</CardTitle>
            <Clock className="size-4 text-amber-500/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{loading ? "-" : aguardando}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#131318] border-white/5 shadow-none group relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-500/70">Em Andamento</CardTitle>
            <CheckCircle2 className="size-4 text-emerald-500/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{loading ? "-" : projetosAtivos}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#131318] border-white/5 shadow-none group relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-400/70">
              Simuladores (Total)
            </CardTitle>
            <Calculator className="size-4 text-purple-500/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{loading ? "-" : simuladores}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <Card className="bg-[#131318] border-white/5 shadow-none col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
            <div>
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="size-5 text-aurora-violet" />
                Desempenho de Captação
              </CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                Novos leads gerados nos últimos 7 dias.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 h-[320px]">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-400">
                Carregando gráfico...
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#ffffff40"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#ffffff40"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0c",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#9b87f5" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Novos Leads"
                    stroke="#9b87f5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorLeads)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                Sem dados suficientes para gerar o gráfico.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ultimos leads */}
        <Card className="bg-[#131318] border-white/5 shadow-none col-span-1">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
            <div>
              <CardTitle className="text-lg font-bold text-white">Recentes</CardTitle>
            </div>
            <Link
              to="/admin/leads"
              className="text-sm font-medium text-[#82b8f7] hover:text-white transition-colors"
            >
              Ver todos
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col divide-y divide-white/5">
              {loading ? (
                <div className="p-4 text-center text-slate-400">Carregando...</div>
              ) : ultimosLeads.length === 0 ? (
                <div className="p-4 text-center text-slate-400">Nenhum lead encontrado.</div>
              ) : (
                ultimosLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-white text-sm">{lead.nome}</div>
                      <div className="text-xs text-slate-400">{lead.empresa || lead.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="mt-1">
                        {lead.is_simulador ? (
                          <Badge
                            variant="outline"
                            className="text-[10px] h-4 px-1 bg-purple-400/10 text-purple-400 border-purple-400/20"
                          >
                            Simulador
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-[10px] h-4 px-1 bg-blue-400/10 text-blue-400 border-blue-400/20"
                          >
                            Contato
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
