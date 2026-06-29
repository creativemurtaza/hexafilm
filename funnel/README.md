# Hexafilm.ai — Qualification Funnel

A lead-qualification quiz followed by a Calendly appointment-booking step.
Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev        # → http://localhost:5173
```

## Configuration

### Calendly URL

Set your Calendly scheduling link via the `VITE_CALENDLY_URL` environment variable:

```bash
# .env
VITE_CALENDLY_URL=https://calendly.com/your-org/strategy-call
```

The funnel pre-fills the invitee's name and email from the quiz answers.

### Lead endpoint

On final submission the funnel POSTs collected answers as JSON to `/api/lead`.
In production, proxy this to your CRM, webhook, or serverless function.

During local development the request will 404 harmlessly — answers are
still stored in `localStorage` and the booking step appears regardless.

### Customizing questions

Edit `src/config/funnelConfig.ts`. Each entry in the `steps` array defines
one screen. Change labels, add choices, or reorder freely — the app
renders from this array.

### Brand tokens

All colors, fonts, and radii live in `src/config/brand.ts` and
`tailwind.config.ts`.

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, etc.).
