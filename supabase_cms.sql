-- Criação da tabela de configurações (Single row)
create table public.site_settings (
  id uuid default gen_random_uuid() primary key,
  whatsapp text default '',
  email text default '',
  instagram text default '',
  linkedin text default '',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Inserir registro inicial
insert into public.site_settings (whatsapp, email) values ('5585999973965', 'contato@opnora.com');

-- Criação da tabela de Projetos/Portfólio
create table public.projetos (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descricao text not null,
  imagem_url text not null,
  categoria text not null,
  link text,
  destaque boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criação da tabela da Equipe
create table public.team_members (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  cargo text not null,
  foto_url text not null,
  linkedin text,
  ordem integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criação da tabela de Depoimentos
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  nome_cliente text not null,
  empresa text,
  texto text not null,
  foto_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas RLS (Row Level Security) - Leitura pública, escrita apenas para autenticados
alter table public.site_settings enable row level security;
alter table public.projetos enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;

-- Policies para site_settings
create policy "Leitura pública site_settings" on public.site_settings for select to public using (true);
create policy "Edição admin site_settings" on public.site_settings for all to authenticated using (true);

-- Policies para projetos
create policy "Leitura pública projetos" on public.projetos for select to public using (true);
create policy "Edição admin projetos" on public.projetos for all to authenticated using (true);

-- Policies para team_members
create policy "Leitura pública team_members" on public.team_members for select to public using (true);
create policy "Edição admin team_members" on public.team_members for all to authenticated using (true);

-- Policies para testimonials
create policy "Leitura pública testimonials" on public.testimonials for select to public using (true);
create policy "Edição admin testimonials" on public.testimonials for all to authenticated using (true);
