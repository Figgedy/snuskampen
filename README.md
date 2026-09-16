# Snuskampen

Statisk sida (HTML/JS) + Supabase för röster. Inga byggsteg.

## Filer
- `index.html` – duell + topplista
- `products.js` – all produktdata (redigera här)
- `config.js` – Supabase-nycklar
- `img/<id>.png` – produktbilder, filnamn = `id` i products.js. Saknas bild visas en färgad dosa automatiskt.
- `supabase/schema.sql` – tabeller + Elo-funktion

## Deploy (Vercel)
1. `gh repo create Figgedy/snuskampen --public --source=. --push` (eller vanlig git init/push)
2. Vercel → New Project → importera repot → Framework "Other" → deploy
3. Peka snuskampen.se på Vercel

## Supabase
1. Nytt projekt → SQL Editor → klistra in `supabase/schema.sql` → Run
2. Project Settings → API → kopiera URL + anon key till `config.js`
3. Tom config = lokal prototyp (röster sparas bara i webbläsaren)

## Bilder
Lägg tillverkarnas pressbilder i `img/` som PNG med transparent bakgrund, ~600×600 px, döpta efter `id`.
Rättigheter: ta bilder från tillverkare (Swedish Match/PMI, BAT, Skruf, ASF etc.), inte från återförsäljare.

## Manipulation
`cast_vote` spärrar >40 röster/min per session. Session-id sätts i localStorage, så en rensning ger nytt id.
Vill du hårdare skydd: lägg till Vercel-proxy med IP-baserad rate limit, eller Cloudflare Turnstile före rpc-anropet.
