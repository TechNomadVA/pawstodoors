# Paws2Doors — Studio-grade dog platform

A **Next.js** app for Paws2Doors: public site, owner portal (dashboard, dog profiles, feeds, requests), and admin for Liv. Built to scale and not outgrow.

## Stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Tailwind CSS** + design tokens
- **Cloudflare** — Host on **Cloudflare Pages** and use **D1** (SQLite) for the database. Optional: **R2** for photos/videos, **Lucia** or **Clerk** for auth.
- **Supabase** — Still supported as an alternative (auth, PostgreSQL); see `supabase/migrations/` and `.env.local.example`.

## What’s included

- **Public:** Home, Services, Contact (form), Login placeholder, Facebook feed embed
- **Owner:** `/dashboard` (my dogs), `/dashboard/dogs/[id]` (dog profile + feed) — placeholders until auth is wired
- **Admin:** `/admin`, `/admin/dogs`, `/admin/dogs/[id]` — placeholders for Liv to manage dogs and post to feeds
- **Cloudflare D1:** Schema in `d1/migrations/001_initial.sql` (users, profiles, dogs, dog_owners, posts, requests, inquiries). Run with `npm run d1:create`, then set `database_id` in `wrangler.toml`, then `npm run d1:migrate:local` or `d1:migrate:remote`.
- **Supabase (optional):** Schema in `supabase/migrations/001_initial.sql` if you prefer PostgreSQL.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Environment (optional)

Copy `.env.local.example` to `.env.local` and add your Supabase URL and anon key. Without them, the app still runs; auth and data features will be disabled until you connect Supabase.

## Folder structure

```
├── src/
│   ├── app/              # Routes (home, services, contact, login, dashboard, admin)
│   ├── components/       # layout/, ui/
│   ├── lib/              # supabase client/server
│   └── types/            # database types
├── public/               # logo.png, banner.png
├── d1/migrations/        # 001_initial.sql (D1/SQLite)
├── supabase/migrations/  # 001_initial.sql (optional PostgreSQL)
├── wrangler.toml         # Cloudflare Pages + D1 binding
├── archive/static-site/  # Previous static HTML site
├── ARCHITECTURE.md       # Full stack and design decisions
├── PLAN.md
└── README.md
```

## Hosting on Cloudflare

1. **Create a D1 database:** `npm run d1:create`. Copy the `database_id` into `wrangler.toml` under `d1_databases[0].database_id`.
2. **Run migrations:** `npm run d1:migrate:remote` (or `d1:migrate:local` for local testing).
3. **Build and deploy:** `npm run pages:deploy`. First time: create a Pages project in the Cloudflare dashboard and link it, or use `wrangler pages project create paws2doors`.
4. **Optional:** Add an R2 bucket for dog photos (see `wrangler.toml` commented section). Auth: add **Lucia** (sessions in D1) or **Clerk** — see ARCHITECTURE.md.

## Before going live

1. **Contact form** — Point the form in `src/app/contact/ContactForm.tsx` to Formspree or to an API route that writes to D1 `inquiries` (using `getRequestContext().env.DB`).
2. **Auth** — Add Lucia + D1 sessions or Clerk; create `profiles` when a user signs up; set Liv’s profile to `role = 'admin'`.
3. **Admin** — Protect `/admin` by checking `profiles.role === 'admin'` in middleware or layout.

See **ARCHITECTURE.md** for the full plan, D1 usage, and how to extend (payments, messaging, mobile).
