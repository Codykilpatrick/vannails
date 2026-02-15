# Van Nails — Culpeper, VA

Custom website for Van Nails nail salon located at 15315 Montanus Dr, Culpeper, VA 22701.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, `src/` directory)
- **Tailwind CSS v4** — utility-first styling
- **Motion** (Framer Motion) — scroll reveals, step transitions, hover effects
- **clsx** — conditional classnames
- **Vercel KV** — Redis-based data persistence for Vercel hosting
- **Playfair Display** + **Inter** — Google Fonts via `next/font`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file in the project root:

```
ADMIN_PASSWORD=vannails2024

# Auto-populated when you link a Vercel KV store
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured services, testimonials, CTA |
| Services | `/services` | 48 services across 6 categories with tab filtering |
| Gallery | `/gallery` | Masonry image grid with lightbox modal |
| About | `/about` | Salon story and team grid (6 technicians) |
| Contact | `/contact` | Contact info, Google Maps embed, contact form |
| Booking | `/booking` | 4-step booking wizard (services, technician, date/time, confirm) |

## Admin Dashboard

Access at `/admin/login` with the password from `.env.local`.

| View | Route | Description |
|------|-------|-------------|
| Appointments | `/admin` | Calendar view, filterable appointment list, status management |
| Schedule | `/admin/schedule` | Column-per-technician daily schedule |
| Services | `/admin/services` | Add, edit, delete services with inline editing |
| Technicians | `/admin/technicians` | Add, edit, activate/deactivate technicians |

## API Routes

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/admin/login` | POST | Password verification |
| `/api/appointments` | GET, POST | List and create appointments |
| `/api/appointments/[id]` | PATCH, DELETE | Update status or delete appointment |
| `/api/services` | GET, POST, PATCH, DELETE | Service CRUD |
| `/api/technicians` | GET, POST, PATCH, DELETE | Technician CRUD |

## Data Persistence

Uses **Vercel KV** (Redis) for data storage. To set up:

1. In the Vercel dashboard, go to your project's **Storage** tab
2. Create a new **KV Database**
3. Link it to your project — this auto-populates `KV_REST_API_URL` and `KV_REST_API_TOKEN`

On first load, services and technicians fall back to seed data from `src/data/services.ts` and `src/data/technicians.ts` until edits are made via the admin dashboard.

## Build

```bash
npm run build
```

## Contact

- **Phone:** (540) 764-2843
- **Address:** 15315 Montanus Dr, Culpeper, VA 22701
- **Instagram:** [@vannailsculpeper](https://www.instagram.com/vannailsculpeper/)
