-- Atualização da tabela de leads para suportar dados do Simulador
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS is_simulador boolean default false,
ADD COLUMN IF NOT EXISTS simulador_data jsonb;
