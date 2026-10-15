# Jaki Tahsin — Creative Portfolio & Visual Communication Studio

A bespoke, production-grade creative developer & graphic design portfolio built for **Jaki Tahsin**, an independent graphic designer and visual communicator from Dhaka, Bangladesh.

Built on the **Obsidian + Electric Lime** design system, combining editorial Swiss typography, high-visibility graphic showcase, interactive canvas playground, spring-physics cursor, and modern Next.js 15 App Router engineering.

---

## ✦ Core Design System

- **Background (Obsidian):** `#101010`
- **Surface (Charcoal):** `#1D1D1D`
- **Elevated Surfaces:** `#252525`
- **Signature Accent (Electric Lime):** `#D7FF64`
- **Primary Text (Warm White):** `#F5F5F0`
- **Secondary Text (Muted Grey):** `#A3A3A3`
- **Borders (Graphite):** `#303030`
- **Typography:** Space Grotesk (Headings & Display), Inter (Body & Data)

---

## ✦ Features & Architecture

1. **Homepage (`/`)**:
   - **Hero:** Oversized headline, verified portrait of Jaki Tahsin with ambient framing, live studio status, and dual magnetic CTAs.
   - **Interactive Philosophy:** Editorial reveal statement on visual intelligence.
   - **Selected Works:** Editorial grid showcasing high-visibility billboard, branding, and publication projects.
   - **Creative Marquee:** Smooth, accessible infinite loop of core creative mantras.
   - **Capabilities & About Previews:** Highlight of core services and the intersection of graphic design and software engineering at Daffodil International University.
   - **Mini Design Playground:** "Play with the Palette" interactive laboratory allowing visitors to test color harmonics on an isolated editorial card without restyling the site.
   - **Clients & Collaborations:** Verified data-driven logo grid featuring Innoverse, The Dacca, Dacca Retro, Fides Properties, Gappe Shappe, The Next Agency, On Air by Punab, and Chorui Bhati.
   - **Final Action & Footer:** Clear conversion gateway with direct mail and Behance links.

2. **Work Gallery (`/work`)**:
   - Live category filtering across Brand Identity, Print, Billboards, Social Media, Events, and Pitch Decks.
   - Responsive editorial card system with hover zoom, tags, and category counters.
   - Dynamic empty-state handling.

3. **Case Studies (`/work/[slug]`)**:
   - Dedicated shareable case study templates with generateStaticParams.
   - Contextual overview, client metadata matrix, creative problem statement, design approach, and deliverables checklist.
   - Next and Previous project pagination.

4. **About Page (`/about`)**:
   - Biography exploring the philosophy of design thinking merged with software engineering rigor.
   - Professional experience timeline (Dacca Retro, Fides Properties, Eventizer, EcoEcho).
   - Academic credentials (BSc Software Engineering at Daffodil International University).
   - Complete technical tools and disciplines breakdown.

5. **Services Page (`/services`)**:
   - In-depth breakdown of 5 core disciplines: Brand Identity, Campaign & Social, Print & Editorial, Pitch Decks, and Event Identity.
   - Deliverables checklist, ideal brief suitability, execution stages, and one-click pre-populated contact links.

6. **Contact Experience (`/contact`)**:
   - React Hook Form + Zod validation with client-side error handling.
   - Server-side `/api/contact` route.
   - Intelligent fallback generating pre-filled mailto links to `jakitahsin@gmail.com`.
   - Professional confidentiality and privacy notice.

7. **The Digital Playground**:
   - **Custom Spring Cursor (Desktop):** Electric lime dot with smooth spring ring and contextual labels (`VIEW`, `EXPLORE`, `INQUIRE`). Automatically disables on touch and reduced-motion devices.
   - **Magnetic Buttons:** Smooth cursor attraction on primary CTAs.
   - **Secret Easter Egg:** Clicking the brand wordmark 5 times unlocks an interactive developer dialogue with design & code celebratory feedback.

---

## ✦ Local Development & Running

### Requirements
- Node.js 18+ (tested on Node v24)
- npm 9+

### Commands
```bash
# 1. Navigate to the project directory
cd "C:\Users\jakit\.gemini\antigravity\scratch\jaki-tahsin-portfolio"

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000

# 4. Production Build & Static Validation
npm run build
npm start
```

---

## ✦ Asset Structure & Content Editing

All real project artwork and client logos are stored in:
- `public/assets/portrait.webp` — Primary portrait
- `public/assets/works/*.webp` — Portfolio artwork & project covers
- `public/assets/clients/*.webp` — Client & partner logos

### Updating Projects
To add or modify portfolio case studies, edit [src/data/projects.ts](file:///C:/Users/jakit/.gemini/antigravity/scratch/jaki-tahsin-portfolio/src/data/projects.ts). Each project entry automatically renders across the gallery, homepage, and generates its own `/work/[slug]` route.

### Updating Clients
To add new client logos or links, edit [src/data/clients.ts](file:///C:/Users/jakit/.gemini/antigravity/scratch/jaki-tahsin-portfolio/src/data/clients.ts).

---

## ✦ Deployment Instructions (e.g. Vercel)

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Jaki Tahsin creative portfolio"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Import the repository into [Vercel](https://vercel.com):
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
3. Optional Environment Variables:
   - `RESEND_API_KEY`: Add your Resend API key to send contact form submissions directly to your email. If omitted, the site automatically uses the native mail client fallback.
4. Deploy! The site will automatically build and distribute globally across edge CDN nodes.
