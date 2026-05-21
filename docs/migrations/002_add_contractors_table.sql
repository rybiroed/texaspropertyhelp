-- Migration 002: Add contractors table
-- Run this in the Supabase SQL editor.
-- Safe to run more than once (IF NOT EXISTS guards).

CREATE TABLE IF NOT EXISTS contractors (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at           timestamptz NOT NULL DEFAULT now(),

  -- Identity
  company_name         text NOT NULL,
  contact_name         text,
  phone                text NOT NULL,
  email                text,

  -- Service profile
  trade                text NOT NULL,   -- e.g. 'roofing', 'hvac', 'general'
  zip_code             text,
  service_radius_miles integer NOT NULL DEFAULT 50,
  service_area         text[],
  languages            text[],
  emergency_available  boolean NOT NULL DEFAULT false,
  notes                text,

  -- Workflow
  status               text NOT NULL DEFAULT 'pending'   -- 'pending' | 'approved' | 'rejected'
);

CREATE INDEX IF NOT EXISTS contractors_status_idx      ON contractors (status);
CREATE INDEX IF NOT EXISTS contractors_trade_idx       ON contractors (trade);
CREATE INDEX IF NOT EXISTS contractors_created_at_idx  ON contractors (created_at DESC);

-- Service role key only — no direct client access.
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
