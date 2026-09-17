-- SNUSKAMPEN v2 – vyer för head-to-head, månadsstatistik och senaste 30 dagarna.

create or replace view h2h as
select least(winner_id, loser_id) as a,
       greatest(winner_id, loser_id) as b,
       sum(case when winner_id = least(winner_id, loser_id) then 1 else 0 end)::int as a_wins,
       sum(case when winner_id = greatest(winner_id, loser_id) then 1 else 0 end)::int as b_wins,
       count(*)::int as duels
from votes
group by 1, 2;

create or replace view monthly_stats as
select date_trunc('month', created_at)::date as month,
       product_id,
       sum(w)::int as wins,
       sum(l)::int as losses
from (
  select created_at, winner_id as product_id, 1 as w, 0 as l from votes
  union all
  select created_at, loser_id, 0, 1 from votes
) v
group by 1, 2;

create or replace view recent_stats as
select product_id, sum(w)::int as wins, sum(l)::int as losses
from (
  select created_at, winner_id as product_id, 1 as w, 0 as l from votes
  union all
  select created_at, loser_id, 0, 1 from votes
) v
where created_at > now() - interval '30 days'
group by 1;

grant select on h2h, monthly_stats, recent_stats to anon, authenticated;
