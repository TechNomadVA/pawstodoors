# Paws2Doors — Dog Walking Business Website

## Goal
A website for your sister's dog walking business that works alongside Instagram and Facebook:
- **Public:** Main feed (Instagram/Facebook), inquiries, sign-up, service info
- **Owners:** Log in to see their dog’s profile, updates, photos/videos; request extra walks, notify about holidays/breaks, ask for extra services

---

## Phase 1 — Public website (this phase)
- **Home** — Hero, tagline, link to services and inquiry
- **Services** — What she offers (walks, extra services, etc.)
- **Contact / Inquiry** — Form for new sign-ups and general inquiries (e.g. Formspree or Netlify Forms)
- **Public feed** — Section where her Instagram/Facebook presence is shown:
  - **Facebook:** Use Facebook’s official [Page Plugin](https://developers.facebook.com/docs/plugins/page-plugin) (embed her business page; no API key required, just her page URL)
  - **Instagram:** Options: (1) Link/button to her profile, (2) Later: oEmbed for a few chosen posts, or (3) If she has a business account: Graph API with a Meta Developer App (needs app review for some features).

**Getting the Facebook Page Plugin:** Go to https://developers.facebook.com/docs/plugins/page-plugin — enter her Facebook Page URL, set width (e.g. 400) and optional tabs (timeline, events). Copy the code and paste the iframe part inside the `.fb-embed-wrap` div on `index.html`. Optionally load the Facebook SDK script if you want the full plugin behaviour.
- **Owner login** — Placeholder page (“Log in” from nav) that explains “Owner portal coming soon” and links back; sets up the future URL (`/login`, `/owner`)

No backend or database in Phase 1. Static HTML/CSS and minimal JS. Forms can post to Formspree (or similar) so she gets emails.

---

## Phase 2 — Owner portal and dog profiles (later)
Requires backend + database + auth. Suggested approach:
- **Auth:** Simple login (e.g. email + password; or magic links). Options: Supabase Auth, Firebase Auth, or a small Node/Express + sessions.
- **Data:** One “owner” can have one or more “dogs”. Each dog has: name, photo, notes, and a **feed** (posts: photos, videos, short status updates).
- **Features:**
  - Sister: admin area to add/edit dogs, assign owners, post to a dog’s feed (photo/video/status).
  - Owners: log in → see their dog(s) → view feed, request “extra walk”, “holiday/break”, “extra services” (forms that create requests she can see in admin or by email).
- **Hosting:** Same site can be static for Phase 1; Phase 2 add a backend (e.g. Node on a small VPS, or Supabase/Firebase for serverless).

---

## Instagram & Facebook API — What’s realistic
- **Facebook:** Easiest is the **Page Plugin** (iframe). Paste her Facebook Page URL in the plugin config; her timeline shows on the site. No API key needed.
- **Instagram:**
  - **Simple:** “Follow us on Instagram” button linking to her profile.
  - **Better:** If she has an Instagram **business or creator account**, she can use the [Instagram Graph API](https://developers.facebook.com/docs/instagram-platform) to show recent posts on the site. That requires a [Meta Developer App](https://developers.facebook.com/), connecting her IG business account, and (for some features) App Review. Alternatively, **oEmbed** lets you embed individual posts by pasting the post URL (no app needed for a few manual embeds).
- **Unified “main feed”:** Option A: Use Facebook Page Plugin only (one embed). Option B: Facebook Page Plugin + a row of Instagram oEmbed posts (manual choice of posts). Option C: Build a small backend that fetches from both APIs and merges (needs Meta app and tokens).

Phase 1 will use the **Facebook Page Plugin** and an **Instagram link** (and optional manual oEmbed blocks). Phase 2 can add a proper combined feed if she sets up a Meta app.

---

## Folder structure (Phase 1)

```
Olivias Gift/
├── index.html              # Home
├── services.html           # Services
├── contact.html            # Inquiry / sign-up form
├── login.html              # Owner login placeholder
├── css/
│   └── main.css            # Global styles, variables
├── js/
│   └── main.js             # Minimal shared JS (e.g. nav)
├── images/                 # Local images (logo, placeholders)
├── archive/                # (Nothing yet; for any retired files)
├── PLAN.md                 # This file
└── README.md               # How to run and what to fill in
```

No new top-level folders beyond these. If we add an owner portal later, we might add `owner/` or use a subdomain.

---

## What you’ll need to provide later
- Business name (e.g. “Olivia’s Gift” or the real name)
- Short tagline and location (e.g. “Manchester-rooted” or her area)
- Facebook Page URL (for the Page Plugin)
- Instagram profile URL
- Any logo or brand colours (or we keep the current friendly, accessible design)
- For Phase 2: how she wants to receive requests (email, in-app list, or both)

---

## Summary
- **Phase 1:** Public site with home, services, inquiry form, public feed (Facebook embed + Instagram link), and owner login placeholder.
- **Phase 2:** Backend + auth + dog profiles + owner requests; Instagram/Facebook API can be deepened then.
- **Testing:** Open `index.html` in a browser (or use a local server like `npx serve .` in the project folder).
