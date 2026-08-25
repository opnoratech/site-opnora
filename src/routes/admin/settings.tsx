import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  Activity,
  BarChart3,
  Globe,
  Lock,
  Puzzle,
  Save,
  Terminal,
  MessageCircle,
  Loader2,
  Settings,
} from "lucide-react";
import { useSiteSettings, type SiteSettings } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsRoute,
});

function SettingsRoute() {
  const { settings: globalSettings, loading, refreshSettings } = useSiteSettings();

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("seo");

  const [formData, setFormData] = useState<Partial<SiteSettings> & { id?: number | string }>({});

  // Initialize form data when global settings load
  useEffect(() => {
    if (!loading) {
      setFormData({
        // Original fields
        whatsapp: globalSettings.whatsapp || "",
        email: globalSettings.email || "",
        instagram: globalSettings.instagram || "",
        linkedin: globalSettings.linkedin || "",
        // New Dev Hub fields
        seo_title: globalSettings.seo_title || "",
        seo_description: globalSettings.seo_description || "",
        seo_og_image: globalSettings.seo_og_image || "",
        enable_portfolio: globalSettings.enable_portfolio ?? true,
        enable_services: globalSettings.enable_services ?? true,
        maintenance_mode: globalSettings.maintenance_mode ?? false,
        google_analytics_id: globalSettings.google_analytics_id || "",
      });
    }
  }, [globalSettings, loading]);

  // Fech extra row ID if necessary since useSiteSettings doesn't expose ID
  useEffect(() => {
    async function fetchId() {
      const { data } = await supabase.from("site_settings").select("id").limit(1).maybeSingle();
      if (data) {
        setFormData((prev) => ({ ...prev, id: data.id }));
      }
    }
    fetchId();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-slate-400">
        <Loader2 className="animate-spin size-8" />
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { id, ...dataToSave } = formData;

      if (id) {
        const { error } = await supabase
          .from("site_settings")
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);
        if (error) throw error;
      } else {
        // Fallback if no row exists yet
        const { data, error } = await supabase.from("site_settings").insert([dataToSave]).select("id").single();
        if (error) throw error;
        if (data) {
          setFormData((prev) => ({ ...prev, id: data.id }));
        }
      }

      await refreshSettings();
      toast.success("Configurações salvas com sucesso!");
    } catch (err: any) {
      console.error("Erro ao salvar:", err);
      toast.error(`Erro ao salvar: ${err.message || err.details || "Erro desconhecido"}`);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "seo", label: "SEO & Metadados", icon: Globe },
    { id: "social", label: "Contatos e Redes", icon: MessageCircle },
    { id: "scripts", label: "Integrações", icon: BarChart3 },
    { id: "system", label: "Status do Sistema", icon: Activity },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <Settings className="size-8 text-purple-400" /> Configurações do Site
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Gerencie módulos, SEO, contatos e o modo de manutenção.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-aurora-violet text-white px-6 py-2.5 rounded-lg font-medium hover:bg-aurora-violet/90 transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin size-4" /> : <Save className="size-4" />}
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-56 flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`size-4 ${isActive ? "text-aurora-violet" : "text-slate-500"}`} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-[#131318] border border-white/5 rounded-2xl p-6 sm:p-8">
            {/* ABA SEO */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">SEO & Metadados</h2>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Título da Página (Meta Title)
                  </label>
                  <input
                    type="text"
                    value={formData.seo_title || ""}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-aurora-violet/50 transition-colors"
                    placeholder="Opnora | Soluções em Tecnologia"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Aparece na aba do navegador e no título das buscas do Google.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Descrição (Meta Description)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.seo_description || ""}
                    onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-aurora-violet/50 transition-colors resize-none"
                    placeholder="Transformamos ideias em soluções digitais de alto impacto."
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Resumo exibido nos resultados de busca. Mantenha entre 150-160 caracteres.
                  </p>
                </div>
              </div>
            )}

            {/* ABA REDES SOCIAIS E CONTATO */}
            {activeTab === "social" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Contatos e Redes Sociais</h2>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp || ""}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-aurora-violet/50 transition-colors font-mono"
                    placeholder="Ex: 5585999999999"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Apenas números (DDI + DDD + Número). Ex: 5585...
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    E-mail Público
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-aurora-violet/50 transition-colors"
                    placeholder="contato@opnora.com.br"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Link do Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.instagram || ""}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-aurora-violet/50 transition-colors"
                    placeholder="https://instagram.com/opnoratech"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Link do LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin || ""}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-aurora-violet/50 transition-colors"
                    placeholder="https://linkedin.com/company/opnora"
                  />
                </div>
              </div>
            )}

            {/* ABA INTEGRAÇÕES */}
            {activeTab === "scripts" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Scripts e Analytics</h2>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={formData.google_analytics_id || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, google_analytics_id: e.target.value })
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-aurora-violet/50 transition-colors font-mono"
                    placeholder="G-XXXXXXXXXX"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Deixe em branco para desativar o rastreamento.
                  </p>
                </div>
              </div>
            )}

            {/* ABA STATUS */}
            {activeTab === "system" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Health Check</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-4">
                    <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="size-3 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-400">Banco de Dados</p>
                      <p className="text-xs text-emerald-500/70">
                        Conectado e respondendo (Supabase)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-4">
                    <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="size-3 rounded-full bg-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-400">Serviço de E-mail</p>
                      <p className="text-xs text-emerald-500/70">API Resend acessível</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
