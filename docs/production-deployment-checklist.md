# Texas Property Help — Production Deployment Checklist

Last updated: 2026-05-17  
Branch: `ai-agents-dev` → merge to `main` before deploying

---

## 1. Environment Variables

Set all of the following in the Vercel dashboard under **Project → Settings → Environment Variables**.  
Never commit `.env.local` or any file containing real secrets to git.

### Required (deployment will be broken without these)

| Variable | Required value | Notes |
|---|---|---|
| `SUPABASE_URL` | Your Supabase project URL | Without this, leads log to console only — data is lost |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Server-only. Never expose in client code or `NEXT_PUBLIC_*` |
| `IP_HASH_SALT` | Random secret string (≥ 32 chars) | See generation command below. **Do not use the default.** |
| `RESEND_API_KEY` | Your Resend API key | Without this, all emails are silently skipped |
| `RESEND_FROM_EMAIL` | `leads@texaspropertyhelp.com` | **Must be this exact value.** Must be verified in Resend. |
| `ADMIN_NOTIFICATION_EMAIL` | Your admin inbox address | Where new lead notifications are delivered |

### Optional (feature degrades gracefully without these)

| Variable | Purpose | Behavior if missing |
|---|---|---|
| `INDEXNOW_KEY` | Bing/AI search indexing | IndexNow submissions silently skipped |
| `INDEXNOW_SUBMIT_SECRET` | Protects `/api/indexnow` POST endpoint | Endpoint returns 401 for all requests |
| `NEXT_PUBLIC_LEAD_API_URL` | Overrides default `/api/leads` URL | Uses `/api/leads` (correct default — leave blank) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | Tracking skipped |

### Generate `IP_HASH_SALT`

```bash
openssl rand -hex 32
```

Copy the output directly into the Vercel env var. Do not use the fallback
`tph-default-salt-change-in-prod` — it is a publicly known string.

---

## 2. Secrets Audit

- [ ] No secrets committed to git (`git log --all -S "key"` to check)
- [ ] `.env.local` is in `.gitignore` (confirmed — pattern `.env*` covers it)
- [ ] `.env.example` is committed and contains only placeholder values
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is never prefixed with `NEXT_PUBLIC_`
- [ ] `RESEND_API_KEY` is never prefixed with `NEXT_PUBLIC_`
- [ ] `IP_HASH_SALT` is set to a real random value (not the default)

**Known fallback behavior in source code (not secrets — informational):**

| File | Fallback value | Risk if env var missing |
|---|---|---|
| `src/app/api/leads/route.ts` | `IP_HASH_SALT` → `"tph-default-salt-change-in-prod"` | Rate limiting still works but hashes are predictable |
| `src/lib/email.ts` | `RESEND_FROM_EMAIL` → `"noreply@texaspropertyhelp.com"` | Emails sent from unverified address — likely rejected by Resend |
| `src/lib/email.ts` | `ADMIN_NOTIFICATION_EMAIL` → `"help@texaspropertyhelp.com"` | Acceptable default if that inbox is monitored |

---

## 3. Supabase Setup

Run these SQL files in the **Supabase SQL Editor** before going live.  
Both are idempotent — safe to re-run.

### Step 1 — Create the leads table (new project)

```
docs/schema.sql
```

Creates: `leads` table, all indexes, RLS enabled (service role bypasses RLS).

### Step 2 — Apply intelligence columns migration (existing project)

```
docs/migrations/001_add_lead_intelligence.sql
```

Adds: `utm_medium`, `referrer`, `landing_page`, `user_agent` columns.  
All nullable — existing rows are unaffected.

### Verify after running

```sql
SELECT column_name FROM information_schema.columns
WHERE table_name = 'leads'
ORDER BY ordinal_position;
```

Expected columns (in order):
`id`, `created_at`, `full_name`, `email`, `phone`, `city`, `zip_code`,
`language`, `property_type`, `issue_types`, `insurance_claim_opened`, `urgency`,
`notes`, `source_page`, `utm_source`, `utm_medium`, `utm_campaign`, `referrer`,
`landing_page`, `user_agent`, `ip_hash`, `status`

### Supabase checklist

- [ ] Project created and region selected (recommend `us-east-1` for Texas audience)
- [ ] `docs/schema.sql` executed successfully
- [ ] `docs/migrations/001_add_lead_intelligence.sql` executed successfully
- [ ] Column list matches expected above
- [ ] RLS is enabled on `leads` table
- [ ] Service role key copied to Vercel env var (not the anon key)
- [ ] Supabase project URL copied to Vercel env var

---

## 4. Resend / Email Setup

- [ ] Domain `texaspropertyhelp.com` is verified in Resend
- [ ] `leads@texaspropertyhelp.com` sender is verified (or domain-level verification covers it)
- [ ] `RESEND_FROM_EMAIL` set to exactly `leads@texaspropertyhelp.com` in Vercel
- [ ] `ADMIN_NOTIFICATION_EMAIL` set to your real admin inbox
- [ ] Test email can be sent from the Resend dashboard to confirm domain DNS is correct

### Required DNS records (Resend)

Resend requires SPF, DKIM, and optionally DMARC records on `texaspropertyhelp.com`.  
These are shown in the Resend dashboard under **Domains**. Add them at your DNS provider before first deployment.

Without correct DNS records, outbound emails will fail or go to spam.

---

## 5. Build Verification

Run locally before every production deploy:

```bash
npm run lint    # must exit with 0 errors
npm run build   # must complete with 0 errors, all 37 pages generated
```

- [ ] `npm run lint` passes with zero errors
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors in build output
- [ ] All 37 static pages generated (confirmed in build output)

---

## 6. Vercel Deployment Steps

1. Push branch to GitHub
2. Merge `ai-agents-dev` → `main` (or deploy from branch for staging)
3. Vercel auto-deploys on push to `main`
4. Verify all environment variables are set in Vercel dashboard **before** the deploy completes
5. Check Vercel deployment logs for any build errors
6. Visit the deployment URL and run manual smoke tests (Section 7)

### Vercel project settings to confirm

- [ ] Framework: Next.js (auto-detected)
- [ ] Root directory: `/` (default)
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)
- [ ] Node.js version: 18.x or 20.x (not 16.x)
- [ ] All env vars added to **Production** environment (not just Preview)

---

## 7. Post-Deployment Smoke Tests

Run these against the live production URL immediately after deploying.

### Lead form — English

- [ ] Navigate to `/request-help`
- [ ] Fill all required fields with test data
- [ ] Select at least one help type
- [ ] Check consent checkbox
- [ ] Submit form
- [ ] Confirm success message appears
- [ ] Confirm new row in Supabase `leads` table
- [ ] Confirm admin notification email received
- [ ] Confirm homeowner confirmation email received at test address

### Lead form — Spanish

- [ ] Navigate to `/es/request-help`
- [ ] Repeat form submission with Spanish form
- [ ] Confirm homeowner email arrives in Spanish

### Anti-spam

- [ ] Open browser devtools, find `input[name="website_url"]`, set value to `bot`, submit
- [ ] Confirm response is 200 but no Supabase row inserted and no emails sent
- [ ] Confirm server log shows `[leads/spam] honeypot triggered`

### Rate limiting

- [ ] Submit 3 valid leads within 10 minutes from same IP (use different emails)
- [ ] 4th submission: confirm 429 response and error message in form

### Static pages

- [ ] `/` loads correctly
- [ ] `/es` loads correctly
- [ ] `/guides/texas-hail-damage-homeowner-checklist` loads
- [ ] `/sitemap.xml` returns valid XML
- [ ] Language switcher on guide pages navigates to correct ES slug

### API routes

- [ ] `GET /api/indexnow-key` returns 404 if `INDEXNOW_KEY` not set, or the key text if set
- [ ] `POST /api/leads` with missing required field returns 400

---

## 8. Rollback Procedures

### Option A — Revert to previous Vercel deployment (fastest)

1. Open Vercel dashboard → **Deployments**
2. Find the last known-good deployment
3. Click **...** → **Promote to Production**
4. No code changes required — takes effect immediately

### Option B — Revert the git commit

```bash
git revert HEAD --no-edit
git push origin main
```

Vercel will auto-deploy the reverted commit.  
Use this if you need to undo a code change specifically.

### Option C — Disable the lead form temporarily

If the lead endpoint is causing issues and you need to stop accepting submissions immediately:

1. In Vercel env vars, set: `NEXT_PUBLIC_LEAD_API_URL=https://example.com/disabled`
2. Redeploy (or trigger a redeploy without code change via Vercel dashboard)
3. The form will submit to a dead URL — users will see an error message
4. Restore the correct URL when ready

This is a blunt instrument. Use only if the API route itself is broken and you need to stop data flow without taking the whole site down.

### Option D — Disable Supabase inserts without downtime

Remove `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` from Vercel env vars and redeploy.  
Leads will log to the Vercel function console instead of persisting to the database.  
Email notifications continue to fire. No user-facing error.  
Use this to pause database writes while investigating a Supabase issue.

---

## 9. Deployment Blockers

These must be resolved before going live. The site will build and run without them, but the lead flow will silently fail.

| Blocker | Consequence | Resolution |
|---|---|---|
| `IP_HASH_SALT` not set or using default | Rate limiting works but hashes are predictable — an attacker who knows the default salt could precompute mappings | Set to a real random secret |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` not set | All leads lost — logged to console only | Add both to Vercel env vars |
| Supabase migration not run | Insert will fail with column-not-found error | Run `001_add_lead_intelligence.sql` |
| `RESEND_FROM_EMAIL` not set to `leads@texaspropertyhelp.com` | Emails sent from `noreply@` which is not verified — Resend will reject them | Set env var to correct value |
| `texaspropertyhelp.com` DNS records not set for Resend | Outbound emails rejected or spam-foldered | Add SPF/DKIM in DNS before first send |

---

## 10. Known Limitations

- **Rate limiting is Supabase-dependent.** If Supabase is unavailable, the rate limit check is skipped and all valid submissions are allowed through. This is intentional (fail-open) to avoid blocking real users during a DB outage.
- **Rate limiting is not shared across Vercel instances.** Each serverless invocation queries Supabase independently. The database is authoritative, so this is correct behavior — not a bug.
- **Honeypot stops naive bots only.** Bots that parse CSS or skip invisible fields bypass it. A Cloudflare Turnstile challenge can be added later if bot volume warrants it.
- **No admin dashboard.** Leads are visible only in the Supabase table view. A read-only admin portal is documented in `docs/PORTAL_ARCHITECTURE.md` but not yet built.
