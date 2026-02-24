-- Paws2Doors initial schema
-- Run in Supabase SQL Editor or via supabase db push

-- Profiles (extends auth.users; link via auth.uid())
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'owner' check (role in ('owner', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Dogs
create table if not exists public.dogs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Dog–owner many-to-many
create table if not exists public.dog_owners (
  dog_id uuid not null references public.dogs (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (dog_id, owner_id)
);

-- Posts (feed per dog)
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  dog_id uuid not null references public.dogs (id) on delete cascade,
  type text not null check (type in ('photo', 'video', 'status')),
  content text,
  media_urls text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Owner requests (extra walk, holiday, break, etc.)
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  dog_id uuid not null references public.dogs (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  type text not null check (type in ('extra_walk', 'holiday', 'break', 'other')),
  message text,
  status text not null default 'pending' check (status in ('pending', 'acknowledged', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger dogs_updated_at before update on public.dogs
  for each row execute function public.set_updated_at();
create trigger posts_updated_at before update on public.posts
  for each row execute function public.set_updated_at();
create trigger requests_updated_at before update on public.requests
  for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.dogs enable row level security;
alter table public.dog_owners enable row level security;
alter table public.posts enable row level security;
alter table public.requests enable row level security;

-- Profiles: users see own row; admin sees all
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Admin can read all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Dogs: owners see dogs they're linked to; admin sees all
create policy "Owners see their dogs" on public.dogs
  for select using (
    exists (select 1 from public.dog_owners do where do.dog_id = dogs.id and do.owner_id = auth.uid())
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
create policy "Admin can manage dogs" on public.dogs
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Dog owners: owners see own links; admin manages
create policy "Owners see own dog links" on public.dog_owners
  for select using (owner_id = auth.uid());
create policy "Admin manages dog_owners" on public.dog_owners
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Posts: owners see posts for their dogs; admin all
create policy "Owners see posts for their dogs" on public.posts
  for select using (
    exists (select 1 from public.dog_owners do where do.dog_id = posts.dog_id and do.owner_id = auth.uid())
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
create policy "Admin manages posts" on public.posts
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Requests: owners see own requests; admin all
create policy "Owners see own requests" on public.requests
  for select using (owner_id = auth.uid());
create policy "Owners can insert requests" on public.requests
  for insert with check (owner_id = auth.uid());
create policy "Admin manages requests" on public.requests
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Create profile on signup (Supabase Auth hook or trigger)
-- Optional: run from Dashboard > Database > Extensions, enable pg_net or use Edge Function
-- For now, create profile manually or via app on first login:
-- insert into public.profiles (id, display_name, role) values (auth.uid(), 'Display Name', 'owner') on conflict (id) do nothing;
