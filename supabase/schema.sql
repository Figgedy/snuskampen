-- SNUSKAMPEN – kör i Supabase SQL Editor (en gång).

create table if not exists ratings (
  product_id text primary key,
  rating numeric not null default 1500,
  wins int not null default 0,
  losses int not null default 0,
  duels int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists votes (
  id bigserial primary key,
  winner_id text not null,
  loser_id text not null,
  session text,
  created_at timestamptz not null default now()
);
create index if not exists votes_session_time on votes (session, created_at desc);

alter table ratings enable row level security;
alter table votes enable row level security;

-- Alla får läsa topplistan. Ingen får skriva direkt – bara via funktionen.
drop policy if exists "ratings read" on ratings;
create policy "ratings read" on ratings for select to anon, authenticated using (true);

-- Elo-uppdatering, atomisk. K=32.
create or replace function cast_vote(p_winner text, p_loser text, p_session text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  rw numeric; rl numeric; ew numeric; k numeric := 32; recent int;
begin
  if p_winner is null or p_loser is null or p_winner = p_loser then
    raise exception 'invalid pair';
  end if;
  if length(p_winner) > 80 or length(p_loser) > 80 then
    raise exception 'invalid id';
  end if;

  -- enkel spam-spärr: max 40 röster/minut per session
  select count(*) into recent from votes
   where session = p_session and created_at > now() - interval '1 minute';
  if recent >= 40 then
    raise exception 'rate limited';
  end if;

  insert into ratings (product_id) values (p_winner) on conflict do nothing;
  insert into ratings (product_id) values (p_loser)  on conflict do nothing;

  select rating into rw from ratings where product_id = p_winner for update;
  select rating into rl from ratings where product_id = p_loser  for update;

  ew := 1 / (1 + power(10, (rl - rw) / 400));

  update ratings set rating = rating + k * (1 - ew), wins = wins + 1,   duels = duels + 1, updated_at = now() where product_id = p_winner;
  update ratings set rating = rating - k * (1 - ew), losses = losses + 1, duels = duels + 1, updated_at = now() where product_id = p_loser;

  insert into votes (winner_id, loser_id, session) values (p_winner, p_loser, p_session);
end;
$$;

revoke all on function cast_vote(text, text, text) from public;
grant execute on function cast_vote(text, text, text) to anon, authenticated;
