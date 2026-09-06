create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_name text not null, actor_email text,
  action text not null, resource_type text not null, resource_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_logs_created_at_idx on public.audit_logs (created_at desc);
alter table public.audit_logs enable row level security;
revoke all on table public.audit_logs from anon, authenticated;
grant all on table public.audit_logs to service_role;
