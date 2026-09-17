-- SNUSKAMPEN v2.1 – land per röst. Kör efter 002_views.sql.

alter table votes add column if not exists country text;
create index if not exists votes_country on votes (country);

drop function if exists cast_vote(text, text, text);

create or replace function cast_vote(p_winner text, p_loser text, p_session text, p_country text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  rw numeric; rl numeric; ew numeric; k numeric := 32; recent int; c text;
begin
  if p_winner is null or p_loser is null or p_winner = p_loser then raise exception 'invalid pair'; end if;
  if length(p_winner) > 80 or length(p_loser) > 80 then raise exception 'invalid id'; end if;
  c := upper(left(coalesce(p_country, ''), 2)); if c !~ '^[A-Z]{2}$' then c := null; end if;

  select count(*) into recent from votes where session = p_session and created_at > now() - interval '1 minute';
  if recent >= 40 then raise exception 'rate limited'; end if;

  insert into ratings (product_id) values (p_winner) on conflict do nothing;
  insert into ratings (product_id) values (p_loser)  on conflict do nothing;
  select rating into rw from ratings where product_id = p_winner for update;
  select rating into rl from ratings where product_id = p_loser  for update;
  ew := 1 / (1 + power(10, (rl - rw) / 400));
  update ratings set rating = rating + k * (1 - ew), wins = wins + 1,   duels = duels + 1, updated_at = now() where product_id = p_winner;
  update ratings set rating = rating - k * (1 - ew), losses = losses + 1, duels = duels + 1, updated_at = now() where product_id = p_loser;
  insert into votes (winner_id, loser_id, session, country) values (p_winner, p_loser, p_session, c);
end;
$$;

revoke all on function cast_vote(text, text, text, text) from public;
grant execute on function cast_vote(text, text, text, text) to anon, authenticated;

-- Landsstatistik: vinster/förluster per produkt och land.
create or replace view country_stats as
select coalesce(country, '??') as country, product_id, sum(w)::int as wins, sum(l)::int as losses
from (
  select country, winner_id as product_id, 1 as w, 0 as l from votes
  union all
  select country, loser_id, 0, 1 from votes
) v
group by 1, 2;

grant select on country_stats to anon, authenticated;
