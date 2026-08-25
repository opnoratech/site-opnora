import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-white/5 bg-[#0c0c0f]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Aqui poderia ter um botão para toggle da sidebar no mobile */}
        <button className="text-slate-400 hover:text-white md:hidden">
          <Menu className="size-5" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-aurora-violet to-aurora-violet flex items-center justify-center text-xs font-bold text-white">
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white leading-none">{user?.email}</p>
            <p className="text-xs text-slate-500 mt-1">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
