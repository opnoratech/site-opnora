import { useEffect, useState } from "react";
import { FaUser, FaLinkedin } from "react-icons/fa6";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { supabase } from "@/lib/supabase";

type TeamMember = {
  id: string;
  nome: string;
  cargo: string;
  color?: string;
  descricao?: string;
  foto_url?: string;
  imagem_url?: string;
  linkedin?: string;
  ordem?: number;
};

export function SobreEquipe() {
  const [equipe, setEquipe] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("team_members")
      .select("*")
      .order("ordem", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.warn("Erro ao buscar membros:", error.message);
        } else if (data) {
          setEquipe(data);
        }
        setLoading(false);
      });
  }, []);

  // Se não houver membros cadastrados e não estiver carregando, não exibe a seção ou exibe container limpo
  if (!loading && equipe.length === 0) {
    return null;
  }

  return (
    <section className="relative min-h-dvh flex flex-col justify-center py-24 lg:py-32 border-b border-white/5 bg-[#0c0c0f]">
      <div className="relative z-10 mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-12">
        <div className="mb-20">
          <ScrollReveal className="flex items-center gap-4 mb-8">
            <div className="h-0.5 w-8 bg-linear-to-r from-aurora-violet to-aurora-cyan" />
            <span className="font-display text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              NOSSA EQUIPE
            </span>
          </ScrollReveal>

          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6">
              As pessoas por trás da
              <br />
              Opnora
            </h2>
            <div className="space-y-2 text-slate-400 font-light text-sm sm:text-base leading-relaxed">
              <p>Uma equipe focada de construtores, pensadores e desenvolvedores.</p>
              <p>Cada um de nós focado em entregar soluções digitais fora de série.</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-340 mx-auto">
          {equipe.map((membro, i) => {
            const foto = membro.foto_url || membro.imagem_url;
            const cor = membro.color || "#a280ff";

            return (
              <ScrollReveal key={membro.id} delay={300 + i * 120} className="h-full">
                <div className="group relative flex h-full w-full flex-col items-center text-center bg-[#131318] border border-white/5 rounded-sm p-8 hover:-translate-y-2 hover:bg-[#181820] hover:border-[#b3a1ff]/20 hover:shadow-[0_8px_30px_rgba(179,161,255,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none overflow-hidden transition-all duration-700 ease-out">
                  {/* Avatar Foto ou Ícone */}
                  <ScrollReveal
                    delay={400 + i * 120}
                    className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-6 border border-white/10 bg-[#0e0e12] transition-colors duration-500 group-hover:border-[#a280ff]/30 overflow-hidden"
                  >
                    {foto ? (
                      <img
                        src={foto}
                        alt={membro.nome}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <FaUser
                        className="w-10 h-10 transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)]"
                        style={{ color: cor }}
                      />
                    )}
                  </ScrollReveal>

                  <h3 className="font-display text-xl font-bold text-white mb-2 relative z-10">
                    {membro.nome}
                  </h3>

                  <p
                    className="font-mono text-[13px] mb-4 relative z-10 font-medium"
                    style={{ color: cor }}
                  >
                    {membro.cargo}
                  </p>

                  {membro.descricao && (
                    <p className="text-sm text-slate-400 font-light leading-relaxed relative z-10 mb-4 flex-1">
                      {membro.descricao}
                    </p>
                  )}

                  {membro.linkedin && (
                    <a
                      href={membro.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mt-auto pt-2 transition-colors"
                    >
                      <FaLinkedin className="size-3.5 text-[#0077b5]" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
