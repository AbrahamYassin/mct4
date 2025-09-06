# MyCVTop — Next.js SaaS (SQL / Prisma)

## Démarrage
```bash
cp .env.example .env.local
# Remplis DATABASE_URL (MySQL) et JWT_SECRET
npm install
npx prisma generate
npx prisma migrate dev --name init   # crée les tables
npm run dev
# option: npm run seed   # admin+demo + 1 CV
```

## Déploiement Vercel
- Framework: Next.js — Root Directory: `.`
- Env Vars: `USE_SQL=true`, `DATABASE_URL`, `JWT_SECRET` (+ option Cloudinary/Stripe)
- En prod: `npx prisma migrate deploy` (Vercel postinstall si souhaité)
