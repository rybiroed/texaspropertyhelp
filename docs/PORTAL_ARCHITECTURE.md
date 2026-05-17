# Texas Property Help — Portal Architecture

This document defines the planned architecture for the Contractor and Client portal features. **No portal pages exist yet.** This is a planning document only. Build against this spec when the portal sprint begins.

---

## Overview

The portal has two distinct user types with separate access flows:

| Role | Description |
|------|-------------|
| **Homeowner (Client)** | Tracks their own lead/service request status |
| **Contractor** | Views and claims leads; updates job status |
| **Admin** | Full read/write across all leads and contractors |

All portal routes live under `/portal/` (not yet created). The `(en)` route group wraps them so they share the main EN layout.

---

## Database Schema (Supabase)

### Tables to add (see `docs/schema.sql` for leads table)

#### `contractors`
```sql
CREATE TABLE contractors (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      timestamptz NOT NULL DEFAULT now(),
  full_name       text NOT NULL,
  business_name   text NOT NULL,
  email           text NOT NULL UNIQUE,
  phone           text NOT NULL,
  license_number  text,               -- TDLR or relevant TX license
  service_types   text[] NOT NULL DEFAULT '{}',
  service_zip_codes text[] NOT NULL DEFAULT '{}',
  status          text NOT NULL DEFAULT 'pending',  -- 'pending' | 'active' | 'suspended'
  notes           text
);
```

#### `lead_assignments`
```sql
CREATE TABLE lead_assignments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      timestamptz NOT NULL DEFAULT now(),
  lead_id         uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  contractor_id   uuid NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  assigned_by     text,               -- admin user identifier
  status          text NOT NULL DEFAULT 'assigned',  -- 'assigned' | 'contacted' | 'won' | 'lost'
  contractor_notes text,
  UNIQUE (lead_id, contractor_id)
);
```

#### `portal_sessions`
Handled by Supabase Auth — no custom table needed for MVP.

---

## Authentication Strategy

**Supabase Auth** for both homeowners and contractors.

- Homeowners: magic link (email OTP) — no password to manage
- Contractors: email + password with email verification
- Admin: Supabase dashboard or a specific `role` claim in JWT

**Implementation approach:**
1. Use `@supabase/ssr` package for Next.js App Router session handling
2. Middleware at `src/middleware.ts` protects `/portal/**` routes
3. Server Components read the session via `createServerClient()` from `@supabase/ssr`
4. Client Components use `createBrowserClient()` for auth state

**Key constraint:** Use `@supabase/ssr` — NOT `@supabase/auth-helpers-nextjs` (deprecated).

---

## Route Structure

```
src/app/(en)/portal/
  layout.tsx              ← Portal shell (sidebar nav, auth guard)
  page.tsx                ← Redirect based on role

  homeowner/
    page.tsx              ← Homeowner dashboard: view own request status
    [leadId]/page.tsx     ← Detail view for a specific request

  contractor/
    page.tsx              ← Lead feed: browse available leads by zip/type
    leads/[leadId]/
      page.tsx            ← Lead detail + claim action
    my-leads/page.tsx     ← Contractor's claimed/won leads

  admin/
    page.tsx              ← Admin dashboard: all leads, all contractors
    leads/page.tsx        ← Leads table with filter/sort/export
    contractors/page.tsx  ← Contractor management
    contractors/[id]/
      page.tsx            ← Contractor detail + lead assignment
```

---

## Permissions Model

| Action | Homeowner | Contractor | Admin |
|--------|-----------|------------|-------|
| View own lead | ✅ | ❌ | ✅ |
| View all leads | ❌ | Filtered by zip/type | ✅ |
| Claim a lead | ❌ | ✅ (unassigned only) | ✅ |
| Update lead status | ❌ | Own assignments only | ✅ |
| View contractor list | ❌ | ❌ | ✅ |
| Approve contractor | ❌ | ❌ | ✅ |

**RLS enforcement in Supabase:**
- `leads`: homeowner can SELECT where `email = auth.jwt()->'email'`
- `lead_assignments`: contractor can SELECT/UPDATE where `contractor_id = auth.uid()`
- `contractors`: contractor can SELECT/UPDATE own row where `id = auth.uid()`
- Admin: service role key bypasses all RLS (server-side only)

---

## Data Flow

### Lead Claim Flow (Contractor)
1. Contractor logs in → views lead feed filtered to their zip codes and service types
2. Contractor clicks "Claim Lead" → `lead_assignments` row created with `status: 'assigned'`
3. Lead `status` in `leads` table updated to `'assigned'` (admin sees this)
4. Contractor contacts homeowner directly → updates assignment status to `'contacted'` / `'won'` / `'lost'`

### Admin Assignment Flow
1. Admin views new leads (`status: 'new'`)
2. Admin selects a contractor from the qualified list for that zip/service type
3. Admin creates `lead_assignments` row → both lead and contractor notified via email

---

## Email Notifications (Resend)

| Trigger | Recipient | Template |
|---------|-----------|---------|
| New lead submitted | Admin | `sendAdminNotification` (exists in `src/lib/email.ts`) |
| New lead submitted | Homeowner | `sendHomeownerConfirmation` (exists) |
| Lead assigned to contractor | Contractor | `sendContractorAssignment` (to build) |
| Lead claimed by contractor | Admin | `sendAdminClaimNotification` (to build) |

---

## Security Considerations

1. **Never expose service role key client-side.** All Supabase admin operations go through server-side route handlers only.
2. **Rate limit contractor lead claims** — prevent contractors from batch-claiming leads they won't pursue.
3. **Validate contractor status** before showing them leads — only `status: 'active'` contractors see the feed.
4. **Homeowner PII protection** — contractors see only name and city until they claim a lead. Full contact info revealed only after claim.
5. **Audit log** — log all lead assignments and status changes with `created_at` and actor for dispute resolution.

---

## Build Order (Recommended)

1. Supabase Auth setup + middleware
2. Admin portal (internal-only, no public access)
3. Contractor portal (invite-only beta)
4. Homeowner portal (public — tied to lead submission)

Do not build the homeowner portal until the admin and contractor flows are stable. Homeowners should never interact with a half-built system.

---

*This document is the planning spec. Update it before and after each portal sprint.*
