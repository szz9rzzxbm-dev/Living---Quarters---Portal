# The Living Quarters — Client Portal

A private dashboard each customer logs into to track their kitchen project, view
their contract and documents, manage payments, see their appliance spec, and
message their team.

Built with **Vite + React** and **React Router v6**. Styling is a custom design
system (CSS variables + CSS modules) — no Tailwind. `SPEC.md` is the source of
truth; `portal-prototype.html` is the reference visual prototype.

## Status — frontend only

This phase builds the **client portal shell** with sidebar navigation and all
seven views, using mock data. No backend is connected yet:

- `src/lib/supabase.js`, `src/lib/stripe.js` — stubs, not wired up
- `src/hooks/useAuth.js`, `src/hooks/useProject.js` — return mock state
- `src/lib/mockData.js` — placeholder content mirroring the prototype
- Routes are **not yet protected** — auth guards come with Supabase Auth

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Routes

| Path                  | View                          |
| --------------------- | ----------------------------- |
| `/login`              | Login (stub)                  |
| `/portal`             | Overview                      |
| `/portal/progress`    | Project Progress              |
| `/portal/specs`       | Design & Appliances           |
| `/portal/documents`   | Contract & Documents          |
| `/portal/payments`    | Invoices & Payments           |
| `/portal/shop`        | Furnish Your Space            |
| `/portal/messages`    | Messages                      |
| `/admin*`             | Admin CRM (stubs)             |

## Project structure

```
src/
  components/   Sidebar, NavItem, Panel, Chip, Button, StatCard,
                ProgressTrack, DocumentRow, PaymentRow, AffiliateCard,
                MessageThread, SpecList, PageHeader, PortalLayout
  pages/
    client/     Overview, Progress, Specs, Documents, Payments, Shop, Messages
    admin/      Dashboard, ProjectDetail, ClientList, NewProject
    Login, NotFound
  lib/          supabase.js, stripe.js, mockData.js
  hooks/        useProject.js, useAuth.js
  styles/       tokens.css, global.css
  App.jsx, main.jsx
```

## Design system

Colour, type and shape tokens live in `src/styles/tokens.css`. The brand is
premium and considered — calm, precise, unhurried. Sentence case throughout,
hairline dividers, no shadows, subtle fade-in on view switch.
