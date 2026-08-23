-- Criação da tabela de leads
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text not null,
  whatsapp text,
  empresa text,
  tipo text not null,
  mensagem text not null,
  status text default 'novo' check (status in ('novo', 'em_andamento', 'concluido')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Configuração de RLS (Row Level Security)
alter table public.leads enable row level security;

-- Política para permitir inserção anônima (usuários do site enviando formulário)
create policy "Permitir inserção anônima em leads"
  on public.leads for insert
  to anon
  with check (true);

-- Política para permitir leitura e modificação apenas para usuários autenticados (admin)
create policy "Permitir select para usuários autenticados"
  on public.leads for select
  to authenticated
  using (true);

create policy "Permitir update para usuários autenticados"
  on public.leads for update
  to authenticated
  using (true);

create policy "Permitir delete para usuários autenticados"
  on public.leads for delete
  to authenticated
  using (true);
