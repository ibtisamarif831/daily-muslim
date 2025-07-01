# Hono + React Router + V## Tech Stack

- **Frontend**: React + React Router + ShadCN UI

  - SPA architecture powered by React Router
  - Includes accessible, themeable UI from ShadCN
  - Styled with utility-first Tailwind CSS
  - Built and optimized with Vite

- **Backend**: Hono on Cloudflare Workers

  - API routes defined and handled via Hono in `/api/*`
  - Supports REST-like endpoints, CORS, and middleware

- **Database**: Drizzle ORM + Cloudflare D1

  - Type-safe database operations with Drizzle ORM
  - SQLite-compatible Cloudflare D1 database
  - Automatic migrations and schema management
  - Database service layer for common operations

- **Deployment**: Cloudflare Workers via Wrangler
  - Vite plugin auto-bundles frontend and backend together
  - Deployed worldwide on Cloudflare's edge network

## Database Setup

This project uses [Drizzle ORM](https://orm.drizzle.team/) with [Cloudflare D1](https://developers.cloudflare.com/d1/) for the database layer.

### Development

1. **Generate migrations** after schema changes:
   ```bash
   pnpm db:generate
   ```

2. **Apply migrations locally**:
   ```bash
   pnpm db:migrate:local
   ```

3. **Open Drizzle Studio** to view/edit data:
   ```bash
   pnpm db:studio
   ```

### Production

1. **Apply migrations to production**:
   ```bash
   pnpm db:migrate
   ```

### Environment Variables

For production deployments that need to run migrations, create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your Cloudflare account details:
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `CLOUDFLARE_D1_TOKEN`: API token with D1 edit permissions

### Database Schema

The current schema includes:
- **Users**: User accounts with email authentication
- **Tasks**: User tasks with completion tracking
- **Prayers**: Daily prayer tracking for Muslim users

Check `app/db/schema.ts` for the complete schema definition.n Cloudflare Workers

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/react-router-hono-fullstack-template)
![Build modern full-stack apps with Hono, React Router, and ShadCN UI on Cloudflare Workers](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/24c5a7dd-e1e3-43a9-b912-d78d9a4293bc/public)

<!-- dash-content-start -->

A modern full-stack template powered by [Cloudflare Workers](https://workers.cloudflare.com/), using [Hono](https://hono.dev/) for backend APIs, [React Router](https://reactrouter.com/) for frontend routing, and [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components styled with [Tailwind CSS](https://tailwindcss.com/).

Built with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) for optimized static asset delivery and seamless local development. React is configured in single-page app (SPA) mode via Workers.

A perfect starting point for building interactive, styled, and edge-deployed SPAs with minimal configuration.

## Features

- ⚡ Full-stack app on Cloudflare Workers
- 🔁 Hono for backend API endpoints
- 🧭 React Router for client-side routing
- 🎨 ShadCN UI with Tailwind CSS for components and styling
- 🧱 File-based route separation
- 🚀 Zero-config Vite build for Workers
- 🛠️ Automatically deploys with Wrangler

<!-- dash-content-end -->

## Tech Stack

- **Frontend**: React + React Router + ShadCN UI

  - SPA architecture powered by React Router
  - Includes accessible, themeable UI from ShadCN
  - Styled with utility-first Tailwind CSS
  - Built and optimized with Vite

- **Backend**: Hono on Cloudflare Workers

  - API routes defined and handled via Hono in `/api/*`
  - Supports REST-like endpoints, CORS, and middleware

- **Deployment**: Cloudflare Workers via Wrangler
  - Vite plugin auto-bundles frontend and backend together
  - Deployed worldwide on Cloudflare’s edge network

## Resources

- 🧩 [Hono on Cloudflare Workers](https://hono.dev/docs/getting-started/cloudflare-workers)
- 📦 [Vite Plugin for Cloudflare](https://developers.cloudflare.com/workers/vite-plugin/)
- 🛠 [Wrangler CLI reference](https://developers.cloudflare.com/workers/wrangler/)
- 🎨 [shadcn/ui](https://ui.shadcn.com)
- 💨 [Tailwind CSS Documentation](https://tailwindcss.com/)
- 🔀 [React Router Docs](https://reactrouter.com/)
