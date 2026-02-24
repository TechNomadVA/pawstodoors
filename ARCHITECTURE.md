# Paws2Doors — Studio-grade platform architecture

## Vision
A **studio-quality social platform for dogs**: scalable, maintainable, and built so you never outgrow it. Think Instagram-style feeds per dog, owner dashboards, admin tools, and room for messaging, bookings, and more.

---

## Stack (industry-standard, scalable)

| Layer | Choice | Why |
|-------|--------|-----|
| **Frontend** | Next.js 14 (App Router) + React 18 + TypeScript | Component-based UI, SSR/SSG, API routes, excellent DX. |
| **Styling** | Tailwind CSS + design tokens (CSS variables) | Fast iteration, consistent design system, small bundle, no design ceiling. |
| **Hosting** | **Cloudflare Pages** | Global edge, free tier, integrates with D1 and R2. Use `@cloudflare/next-on-pages` to run Next.js on Pages. |
| **Database** | **Cloudflare D1** (SQLite) | Serverless SQL built into Cloudflare; no separate DB host. Schema in `d1/migrations/`. |
| **Auth** | Optional: **Lucia** (sessions in D1) or **Clerk** | Lucia stores sessions in D1; Clerk is hosted. Both work with Cloudflare. |
| **Media** | **Cloudflare R2** (optional) | S3-compatible object storage for dog photos/videos; no egress fees. |

You can add later: Stripe (payments), Resend (email), push notifications, mobile app (React Native / Expo).

**Alternative:** Supabase (PostgreSQL + Auth + Storage) is still supported for non-Cloudflare deploys; see `supabase/migrations/` and `.env.local.example`.

---

## Data model (D1 / SQLite on Cloudflare)

Tables in `d1/migrations/001_initial.sql`:

```
users             — id, email (for auth; use with Lucia or similar)
profiles          — id (→ users), display_name, role (owner | admin)
dogs              — id, name, avatar_url, bio, created_at, updated_at
dog_owners        — dog_id, owner_id; many-to-many
posts             — id, dog_id, type (photo|video|status), content, media_urls (JSON), created_at, updated_at
requests          — id, dog_id, owner_id, type, message, status, created_at, updated_at
inquiries         — id, name, email, subject, message, created_at (contact form)
```

- **Access control:** Enforce in app code: owners only see their dogs (via `dog_owners`); admin (`profiles.role = 'admin'`) sees all.
- **Auth:** Add sessions table and use **Lucia** with D1, or use **Clerk** (hosted). Set `profiles.role` when creating a profile (e.g. first user = admin).

---

## App structure (Next.js App Router)

```
src/
├── app/
│   ├── layout.tsx              # Root layout (nav, footer, fonts)
│   ├── page.tsx                # Public home
│   ├── globals.css              # Tokens + Tailwind
│   ├── (public)/
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   └── login/page.tsx       # Auth UI (redirect if already logged in)
│   ├── (owner)/
│   │   ├── dashboard/
│   │   │   └── page.tsx         # My dogs, quick links
│   │   └── dogs/[id]/
│   │       └── page.tsx         # Single dog profile + feed + request CTA
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx         # Overview, requests queue
│   │       ├── dogs/page.tsx    # CRUD dogs, assign owners
│   │       └── dogs/[id]/page.tsx # Edit dog, post to feed
│   └── api/                     # Optional API routes (e.g. form submit, webhooks)
├── components/
│   ├── ui/                      # Buttons, cards, inputs, badges
│   ├── layout/                  # Header, Footer, Container
│   ├── feed/                    # PostCard, FeedList, MediaViewer
│   └── dogs/                    # DogAvatar, DogProfileHeader
├── lib/
│   ├── db.ts                    # D1 helpers (dbFirst, dbAll, dbRun); get binding via getRequestContext in API routes
│   ├── supabase/                # Optional (if not using Cloudflare)
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
├── hooks/                       # useAuth, useDog, usePosts
└── types/                       # DB types, API types
```

---

## Design system (no ceiling)

- **Tokens:** Colours (primary green, neutrals, semantic), spacing, typography, radii, shadows in `globals.css` and `tailwind.config`.
- **Components:** Reusable UI in `components/ui/`; layout in `components/layout/`. All use tokens so the whole app stays consistent.
- **Accessibility:** Focus states, aria, semantic HTML, contrast — baked into the component layer.
- **Responsive:** Mobile-first; breakpoints used consistently so new pages inherit the same behaviour.

When you want new features (e.g. stories, reactions, comments), you add components and routes without changing the foundation.

---

## Security & performance

- **Auth:** Sessions in D1 (Lucia) or Clerk; no secrets in client.
- **Admin:** Gated by `profiles.role = 'admin'`; admin routes check server-side.
- **Media:** R2 bucket with signed URLs or public read for dog photos; restrict uploads to admin.
- **Performance:** Next.js images, lazy loading; Cloudflare edge caches static assets.

---

## Migration from static site

- Current static site moved to `archive/static-site/`.
- Public content (copy, images) brought into Next.js: home, services, contact; logo/banner in `public/`.
- Facebook/Instagram embed and contact form (Formspree or Supabase) kept; owner and admin areas built on the new stack.

---

## What you get

1. **Single codebase** — One repo; deploy to Cloudflare Pages; public site, owner portal, and admin in one app.
2. **Room to grow** — Add feeds, requests, messaging, payments, mobile without redesigning the core.
3. **Studio quality** — TypeScript, components, design tokens, and clear structure.
4. **Operational** — Cloudflare dashboard for D1 and R2; wrangler for local D1 and deploy; env-based config.

---

## Cloudflare: quick reference

- **Create D1 database:** `npm run d1:create` (then put the `database_id` in `wrangler.toml`).
- **Run migrations:** `npm run d1:migrate:local` (local) or `npm run d1:migrate:remote` (production).
- **Local dev with D1:** `npm run build` then `npm run pages:dev` (or use `next dev` without D1 for frontend-only).
- **Deploy:** `npm run pages:deploy` (builds Next.js, runs next-on-pages, deploys to Cloudflare Pages).
- **D1 in code:** In API routes or edge Server Components, use `getRequestContext()` from `@cloudflare/next-on-pages` to get `env.DB`, then use `dbFirst`, `dbAll`, `dbRun` from `src/lib/db.ts`.
