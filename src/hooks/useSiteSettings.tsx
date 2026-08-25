import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { CONTACT as defaultContact } from "@/config/site";
import { supabase } from "@/lib/supabase";

export type SiteSettings = {
  whatsapp: string;
  email: string;
  instagram: string;
  linkedin: string;
  whatsappFormatted: string;
  // Novos campos do Dev Hub
  seo_title: string;
  seo_description: string;
  seo_og_image: string;
  enable_portfolio: boolean;
  enable_services: boolean;
  maintenance_mode: boolean;
  google_analytics_id: string;
};

const defaultSettings: SiteSettings = {
  whatsapp: defaultContact.whatsappUrl,
  email: defaultContact.email,
  instagram: defaultContact.instagramUrl,
  linkedin: defaultContact.linkedinUrl,
  whatsappFormatted: defaultContact.whatsappFormatted,
  seo_title: "Opnora | Soluções em Tecnologia",
  seo_description: "Transformamos ideias em soluções digitais de alto impacto.",
  seo_og_image: "",
  enable_portfolio: true,
  enable_services: true,
  maintenance_mode: false,
  google_analytics_id: "",
};

const SettingsContext = createContext<{
  settings: SiteSettings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}>({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {},
});

function formatWhatsapp(wa: string) {
  if (!wa) return "";
  const cleaned = wa.replace(/\D/g, "");
  if (cleaned.length >= 12 && cleaned.startsWith("55")) {
    const ddd = cleaned.substring(2, 4);
    const num1 = cleaned.substring(4, 9);
    const num2 = cleaned.substring(9, 13);
    return `(${ddd}) ${num1}-${num2}`;
  }
  return wa;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  async function loadSettings() {
    setLoading(true);
    const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();

    if (data && !error) {
      setSettings({
        whatsapp: data.whatsapp
          ? `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`
          : defaultContact.whatsappUrl,
        whatsappFormatted: data.whatsapp
          ? formatWhatsapp(data.whatsapp)
          : defaultContact.whatsappFormatted,
        email: data.email || defaultContact.email,
        instagram: data.instagram || defaultContact.instagramUrl,
        linkedin: data.linkedin || defaultContact.linkedinUrl,
        // Campos do Dev Hub (fazendo fallback pro default se for null)
        seo_title: data.seo_title || defaultSettings.seo_title,
        seo_description: data.seo_description || defaultSettings.seo_description,
        seo_og_image: data.seo_og_image || "",
        enable_portfolio: data.enable_portfolio ?? true,
        enable_services: data.enable_services ?? true,
        maintenance_mode: data.maintenance_mode ?? false,
        google_analytics_id: data.google_analytics_id || "",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: loadSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteSettings() {
  return useContext(SettingsContext);
}
