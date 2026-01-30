# Supabase infrastructure

This project uses [Supabase](https://supabase.com) for PostgreSQL. Use this guide to set up the database and run migrations.

---

## 1. Create a Supabase project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) and sign in.
2. Click **New project**.
3. Choose organization, name, database password (save it securely), and region.
4. Wait for the project to finish provisioning.

---

## 2. Get connection strings

1. In the project, open **Project Settings** (gear icon) → **Database**.
2. Under **Connection string**, choose **URI**.
3. You’ll see two options:

| Use case              | Mode        | Port  | When to use                          |
|-----------------------|------------|-------|--------------------------------------|
| **Migrations & CLI** | Session    | 5432  | `prisma migrate deploy`, Prisma Studio |
| **App (serverless)**  | Transaction| 6543  | Next.js API routes (optional pooling) |

For **Prisma migrations you must use the direct (Session) connection** on port **5432**.

### Copy the Session (direct) URL

- Click **URI** and copy the connection string.
- It looks like:
  ```text
  postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
  ```
  Or for older projects:
  ```text
  postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
  ```

Replace `[YOUR-PASSWORD]` with your actual database password.

---

## 3. Password with special characters

If your password contains `@`, `#`, `/`, `%`, or other special characters, they must be **URL-encoded** in `DATABASE_URL`:

| Character | Encoded |
|-----------|---------|
| `@`       | `%40`   |
| `#`       | `%23`   |
| `/`       | `%2F`   |
| `%`       | `%25`   |
| `?`       | `%3F`   |

Example: password `decode@db8090` → use `decode%40db8090` in the URL:

```env
DATABASE_URL="postgresql://postgres:decode%40db8090@db.xxxxx.supabase.co:5432/postgres"
```

Otherwise the `@` in the password can be interpreted as the start of the hostname and the connection will fail or point to the wrong host.

---

## 4. Configure `.env`

Create or update `.env` in the project root:

```env
# Use the DIRECT connection (port 5432) for migrations
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
```

- Use the **Session/direct** URL (port 5432), not the pooler (6543), for `prisma migrate deploy`.
- Encode any special characters in the password (see above).

---

## 5. Run migrations

### Vercel (automatic)

Migrations run **automatically on every deploy**. The build script is:

```json
"build": "prisma generate && prisma migrate deploy && next build"
```

So on Vercel, each deployment will:

1. Generate the Prisma client  
2. Apply any pending migrations (`prisma migrate deploy`)  
3. Build Next.js  

Ensure **`DATABASE_URL`** is set in your Vercel project (**Settings → Environment Variables**) with the **direct** connection (port 5432) and URL-encoded password.

### Local / manual

From the project root:

```bash
# Install dependencies (includes prisma generate)
npm install

# Apply all pending migrations (production / CI / first-time setup)
npm run db:migrate
```

Or with Prisma directly:

```bash
npx prisma migrate deploy
```

For **local development** (create new migrations):

```bash
npm run prisma:migrate
# or
npx prisma migrate dev
```

---

## 6. Troubleshooting

### Error: `P1001: Can't reach database server`

- **Supabase project paused**  
  Free-tier projects pause after inactivity. In the dashboard, open the project and click **Restore** if it’s paused.

- **Wrong connection string**  
  Use the **Database** → **Connection string** → **URI** from Project Settings.  
  Use the **direct** connection (port **5432**) for migrations, not the transaction pooler (6543).

- **Password not URL-encoded**  
  If the password has `@` or other special characters, encode them (e.g. `@` → `%40`).

- **Firewall / network**  
  Port 5432 must be allowed. Try from another network or VPN to see if it’s blocked.

- **IPv6**  
  Some networks only allow IPv4. Supabase supports both; if you have issues, try from a different network.

### Error: `relation "User" does not exist` (or similar)

Migrations haven’t been applied. Run:

```bash
npm run db:migrate
```

### Using connection pooling in the app (optional)

For serverless (e.g. Vercel), you can use the **Transaction** pooler (port 6543) in the app and add `?pgbouncer=true` so Prisma uses the right mode:

```env
# Only for the running app, not for migrations
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

Keep a **separate** direct URL (port 5432) for running `npm run db:migrate` and Prisma Studio (e.g. in a script or CI secret like `DIRECT_URL` / `DATABASE_URL` only for deploy/migrate).

---

## 7. Prisma schema (reference)

The app expects `DATABASE_URL` in the environment. Example from `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

No change needed unless you introduce a separate direct URL for migrations (then you’d set `directUrl` in the schema and use `url` for the pooler).

---

## 8. Quick checklist

- [ ] Supabase project created and **not paused**.
- [ ] `DATABASE_URL` in `.env` uses the **direct** URI (port **5432**) from Project Settings → Database.
- [ ] Database password in the URL is **URL-encoded** if it contains `@`, `#`, etc.
- [ ] Run `npm run db:migrate` once to apply migrations.
- [ ] Optional: use pooler URL with `?pgbouncer=true` only for the app runtime; keep direct URL for migrations.
