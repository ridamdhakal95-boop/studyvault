# ExamPrep — Vercel-ready full-stack exam preparation platform

A professional, database-driven exam preparation platform built around Next.js App Router, PostgreSQL and Prisma. Educational content is never hardcoded into the student UI: admins manage it from `/admin`.

## Stack

- Next.js App Router + React + TypeScript
- PostgreSQL + Prisma ORM
- Secure httpOnly JWT session for the admin panel
- Zod backend validation
- Responsive custom CSS UI
- Vercel deployment

Next.js supports full-stack applications through the App Router and route handlers. Vercel also provides current Next.js + Prisma/Postgres starter patterns. Keep database secrets server-side and never prefix them with `NEXT_PUBLIC_`.

## Local setup

1. Install Node.js 20+.
2. Create a PostgreSQL database.
3. Copy `.env.example` to `.env.local`.
4. Fill in `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
5. Run:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

Admin: `http://localhost:3000/login`

## Vercel deployment

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Provision/connect a PostgreSQL database (Prisma Postgres or another Vercel-compatible PostgreSQL provider).
4. Add these Vercel environment variables:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_APP_NAME`
   - `NEXT_PUBLIC_SITE_URL`
5. Deploy.
6. Run `npx prisma migrate deploy` as part of your production database setup. A common Vercel build command is `prisma generate && next build`.

Do not expose `DATABASE_URL` or `AUTH_SECRET` to the browser. Only variables intentionally prefixed with `NEXT_PUBLIC_` belong in client-side code.

## Content workflow

Admin login → create chapter → create content → save as Draft or Published → students see published material automatically.

Supported content types:

- Important question
- Numerical
- Short answer
- Long answer
- Give reason
- Formula
- Note

## Production notes

- Change the seeded admin password immediately.
- Use a long random `AUTH_SECRET`.
- Use HTTPS in production (Vercel handles TLS for deployed domains).
- Keep database credentials only in Vercel environment variables.
- For very large datasets, add cursor pagination and full-text search; the current search is intentionally simple and safe for an MVP.
- Back up your production PostgreSQL database before destructive migrations.
