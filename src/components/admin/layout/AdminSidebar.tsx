import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Settings as SettingsIcon,
  MessageSquare,
  LogOut,
  FolderKanban,
  Briefcase,
  DollarSign,
  FileText,
  FolderHeart,
} from "lucide-react";
import { Logo } from "@/components/site/layout/Logo";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const { signOut } = useAuth();
  const location = useLocation();

  const navGroups = [
    {
      title: "DASHBOARD",
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          href: "/admin",
        },
      ],
    },
    {
      title: "VENDAS & CRM",
      items: [
        {
          title: "Leads (CRM)",
          icon: MessageSquare,
          href: "/admin/leads",
        },
        {
          title: "Propostas Comerciais",
          icon: FileText,
          href: "/admin/proposals",
        },
        {
          title: "Portfólio",
          icon: FolderHeart,
          href: "/admin/portfolio",
        },
      ],
    },
    {
      title: "PRODUÇÃO & FINANCEIRO",
      items: [
        {
          title: "Caixa & MRR",
          icon: DollarSign,
          href: "/admin/finance",
        },
      ],
    },
    {
      title: "GESTÃO",
      items: [
        {
          title: "Equipe",
          icon: Users,
          href: "/admin/team",
        },
        {
          title: "Configurações",
          icon: SettingsIcon,
          href: "/admin/settings",
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0c] border-r border-white/5 flex flex-col h-full">
      <div className="p-4 border-b border-white/5 flex items-center justify-start h-16">
        <Logo className="h-6 w-auto" />
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        <nav className="space-y-8">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-[10px] font-mono font-bold text-slate-500 tracking-widest mb-3 px-4">
                {group.title}
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? location.pathname === "/admin"
                      : location.pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                        isActive
                          ? "text-white bg-white/5"
                          : "text-slate-400 hover:text-white hover:bg-white/2",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "size-4 transition-colors",
                          isActive
                            ? "text-aurora-violet"
                            : "text-slate-500 group-hover:text-aurora-violet/70",
                        )}
                      />
                      {item.title}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-linear-to-b from-aurora-violet to-aurora-blue rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={signOut}
          className="group flex items-center gap-4 px-4 py-3 w-full text-left rounded-xl text-[15px] font-medium text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors"
        >
          <LogOut className="size-5 text-slate-500 group-hover:text-red-400 transition-colors" />
          Sair
        </button>
      </div>
    </aside>
  );
}
