-- Texas Property Help — Supabase Schema
-- Run this in the Supabase SQL editor for your project.
-- Re-running is safe: CREATE TABLE IF NOT EXISTS / CREATE INDEX IF NOT EXISTS.

-- ─── Leads Table ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            timestamptz NOT NULL DEFAULT now(),

  -- Contact
  full_name             text NOT NULL,
  email                 text NOT NULL,
  phone                 text NOT NULL,
  city                  text NOT NULL,
  zip_code              text NOT NULL,

  -- Request details
  language              text NOT NULL DEFAULT 'en',        -- 'en' | 'es'
  property_type         text NOT NULL,
  issue_types           text[] NOT NULL DEFAULT '{}',
  insurance_claim_opened boolean NOT NULL DEFAULT false,
  urgency               text NOT NULL,                      -- 'emergency' | 'urgent' | 'soon' | 'planning'
  notes                 text,

  -- Tracking
  source_page           text,
  utm_source            text,
  utm_campaign          text,
  ip_hash               text,                               -- SHA-256(salt + IP), truncated to 32 chars

  -- CRM workflow
  status                text NOT NULL DEFAULT 'new'         -- 'new' | 'contacted' | 'qualified' | 'closed' | 'spam'
);

-- ─── Indexes ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS leads_email_created_idx  ON leads (email, created_at);
CREATE INDEX IF NOT EXISTS leads_ip_hash_created_idx ON leads (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS leads_status_idx          ON leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx      ON leads (created_at DESC);

-- ─── Row Level Security ──────────────────────────────────────────────────────
-- The API route uses the service role key (bypasses RLS).
-- Enable RLS so anon/authenticated roles cannot read leads directly.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- No policies = service role key only (intended behavior).
-- Add policies here when building an authenticated admin dashboard.
