# The Living Quarters — Client Portal MVP

## Project Specification for Claude Code

-----

## What we’re building

A full-stack web application for **The Living Quarters**, a premium kitchen and joinery company. The product has two sides:

1. **Client Portal** — a private dashboard each customer logs into to track their kitchen project, view their contract and documents, manage payments, see their appliance spec, and message their team.
1. **Admin CRM** — an internal dashboard the Living Quarters team uses to manage all active projects, update stages, upload documents, send messages, and track payments.

This is a real production app handling real customer contracts and real money. Security and data isolation between clients are non-negotiable.

-----

## Tech stack

|Layer                |Choice                     |Reason                                             |
|---------------------|---------------------------|---------------------------------------------------|
|Frontend             |React (Vite)               |Fast, component-based, good ecosystem              |
|Styling              |CSS modules + CSS variables|No Tailwind — custom design system (see below)     |
|Routing              |React Router v6            |Client-side routing, protected routes              |
|Backend / DB         |Supabase                   |Auth, Postgres DB, row-level security, file storage|
|Payments             |Stripe                     |Deposit + staged payments; test mode first         |
|E-signatures         |SignWell API               |Third-party; do not build bespoke                  |
|Hosting              |Vercel                     |Zero-config, free tier sufficient                  |
|Email / notifications|Resend                     |Transactional email for stage-change updates       |

-----

## Design system

The Living Quarters is a premium, considered brand. The UI must feel like the product itself — calm, precise, unhurried. Never generic. Never busy.

### Colour tokens

```css
--ink:        #15130F;   /* near-black background */
--panel:      #1C1915;   /* elevated surfaces / cards */
--panel-2:    #23201A;   /* nested panels */
--cream:      #EDE6D6;   /* primary text */
--cream-dim:  #A89F8C;   /* secondary / muted text */
--line:       #332E25;   /* borders and dividers */
--brass:      #B08D57;   /* primary accent — use sparingly */
--brass-soft: #C9A876;   /* softer accent for interactive states */
--green:      #7E8B5C;   /* success / paid states */
```

### Typography

- **Display / headings:** Cormorant Garamond — `font-weight: 500`, italics used deliberately for warmth
- **Body / UI:** Inter — `font-weight: 300` default, `400` for labels, `500` for emphasis
- **Eyebrows / tags:** Inter, `font-size: .65rem`, `letter-spacing: .28em`, `text-transform: uppercase`, colour `--brass`

Load via Google Fonts:

```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap
```

### Layout principles

- Sidebar navigation: `240px` fixed, `--panel` background, sticky
- Main content: max-width `980px`, padding `2.6rem 3rem`
- Cards / panels: `background: --panel`, `border: 1px solid --line`, `border-radius: 3px`, padding `1.8rem`
- All buttons: `border-radius: 2px` — never rounded-pill
- Hairline dividers: `1px solid --line` — no shadows
- Motion: subtle only. Fade-in on view switch (`opacity 0→1`, `translateY 6px→0`, `0.35s ease`). No bounce, no scale.

### Component rules

- Chips/badges: `font-size: .64rem`, `letter-spacing: .14em`, uppercase, `border: 1px solid`, no fill except on hover
- Primary button: `background: --brass-soft`, `color: --ink`, on hover `background: --brass`
- Ghost button: `border: 1px solid --brass`, `color: --brass-soft`, transparent background
- Section eyebrow always above heading, never inline

-----

## Database schema (Supabase / Postgres)

### `clients`

```
id              uuid PK
email           text unique
full_name       text
property_address text
phone           text
created_at      timestamptz
```

### `projects`

```
id              uuid PK
client_id       uuid FK → clients.id
reference       text unique  -- e.g. LQ-2618
stage           int (1–8)
stage_label     text
install_date    date
contract_total  numeric
designer_name   text
coordinator_name text
notes           text
created_at      timestamptz
updated_at      timestamptz
```

### `stage_updates`

```
id              uuid PK
project_id      uuid FK → projects.id
stage           int
message         text
sent_by         text  -- staff name
created_at      timestamptz
```

### `documents`

```
id              uuid PK
project_id      uuid FK → projects.id
label           text  -- e.g. "Sales Contract — LQ-2618"
file_url        text  -- Supabase Storage URL
doc_type        text  -- contract | drawing | spec | warranty | survey
signed          boolean default false
signed_at       timestamptz
visible_to_client boolean default true
created_at      timestamptz
```

### `payments`

```
id              uuid PK
project_id      uuid FK → projects.id
label           text  -- e.g. "Deposit"
amount          numeric
due_date        date
paid_at         timestamptz
stripe_payment_intent_id text
status          text  -- upcoming | due | paid
```

### `appliances`

```
id              uuid PK
project_id      uuid FK → projects.id
category        text  -- e.g. "Range cooker"
brand_model     text
detail          text
```

### `messages`

```
id              uuid PK
project_id      uuid FK → projects.id
sender_name     text
sender_role     text  -- client | designer | coordinator
body            text
created_at      timestamptz
read_by_client  boolean default false
```

### `affiliate_items`

```
id              uuid PK
project_id      uuid FK → projects.id
category        text
name            text
retailer        text
price_label     text
affiliate_url   text
```

### Row-level security (RLS) — critical

Every table must have RLS enabled. Clients may only read rows where `project.client_id = auth.uid()`. Staff (admin role) can read and write all rows. Never skip this step.

-----

## Application structure

```
/src
  /components
    Sidebar.jsx
    NavItem.jsx
    Panel.jsx
    Chip.jsx
    Button.jsx
    StatCard.jsx
    ProgressTrack.jsx
    DocumentRow.jsx
    PaymentRow.jsx
    AffiliateCard.jsx
    MessageThread.jsx
  /pages
    /client
      Overview.jsx
      Progress.jsx
      Specs.jsx
      Documents.jsx
      Payments.jsx
      Shop.jsx
      Messages.jsx
    /admin
      Dashboard.jsx        -- all projects at a glance
      ProjectDetail.jsx    -- single project management
      ClientList.jsx
      NewProject.jsx
    Login.jsx
    NotFound.jsx
  /lib
    supabase.js            -- Supabase client init
    stripe.js              -- Stripe helpers
  /hooks
    useProject.js          -- fetch current client's project
    useAuth.js             -- auth state
  /styles
    tokens.css             -- all CSS variables
    global.css
  App.jsx
  main.jsx
```

-----

## Routes

### Client-facing (protected — requires auth, client role)

```
/login                   Login page
/portal                  → Overview
/portal/progress         → Project Progress
/portal/specs            → Design & Appliances
/portal/documents        → Contract & Documents
/portal/payments         → Invoices & Payments
/portal/shop             → Furnish Your Space
/portal/messages         → Messages
```

### Admin (protected — requires auth, admin role)

```
/admin                   → All projects dashboard
/admin/projects/:id      → Single project detail + edit
/admin/clients           → Client list
/admin/clients/new       → Create new client + project
```

-----

## The 8 project stages

These are fixed. Stage number lives in `projects.stage`. The label and description are derived from this map:

```js
const STAGES = [
  { n: 1, label: 'Enquiry & Showroom Visit' },
  { n: 2, label: 'Design & Proposal' },
  { n: 3, label: 'Agreement & Sign-off' },
  { n: 4, label: 'Survey & Final Measure' },
  { n: 5, label: 'Manufacture & Procurement' },
  { n: 6, label: 'Delivery & Installation' },
  { n: 7, label: 'Handover & Sign-off' },
  { n: 8, label: 'Aftercare' },
]
```

When admin advances the stage, it:

1. Updates `projects.stage`
1. Inserts a row into `stage_updates` with the message
1. Triggers a Resend email to the client

-----

## Payment structure

Flexible per project. Supported schedules:

- Deposit only upfront → balance on completion
- Deposit + stage payment (post-survey) + balance on completion
- Deposit + pre-delivery balance + final balance
- Full upfront

Deposit is always required before stage 4 begins. Payment is handled via **Stripe**. MVP uses deposit-only Stripe integration; full staged payments in v2.

-----

## MVP scope (build this first)

### In scope for MVP

- [ ] Supabase project setup with schema above and RLS
- [ ] Authentication (Supabase Auth) — email + password
- [ ] Client portal: all 7 views (Overview, Progress, Specs, Documents, Payments, Shop, Messages)
- [ ] Admin: project list, single project detail, stage advancement, document upload
- [ ] Stripe: deposit payment flow (test mode)
- [ ] Resend: stage-change email notification to client
- [ ] Vercel deployment

### Explicitly out of scope for MVP

- E-signatures (SignWell) — manual upload of signed PDF for now
- Full staged Stripe payments — deposit only
- Mobile app
- Customer self-registration — admin creates all accounts

-----

## Reference UI

A working HTML prototype of the client portal exists. Refer to it for the visual language, component structure, layout, and copy tone. The prototype uses mock data; this app replaces that with live Supabase data. The prototype is at: `portal-prototype.html` in the project root.

-----

## Tone of voice (copy in the UI)

- Plain, active verbs. “View contract” not “Access your contractual documentation.”
- Calm and specific. “Your cabinetry has entered manufacture.” Not “Your order is being processed.”
- Never apologetic in error states. State what happened and what to do.
- Sentence case throughout. No title case on buttons or labels.
- The brand name is always “The Living Quarters” in full on first reference; “Living Quarters” thereafter.

-----

## First Claude Code session prompt

Use this to start your first session:

> “Read SPEC.md. Set up a new Vite + React project called living-quarters-portal. Install react-router-dom. Create the folder structure exactly as specified. Set up tokens.css and global.css with the design system. Create the Sidebar and Panel components. Then build the client portal shell — the layout with sidebar navigation and routing between the 7 client views, using placeholder content in each view for now. Do not connect to Supabase yet.”

-----

*Last updated: June 2026. This spec is the source of truth. Update it when scope changes.*