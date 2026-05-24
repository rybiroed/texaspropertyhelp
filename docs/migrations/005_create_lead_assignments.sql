-- Migration 005: Lead assignments table
-- Tracks which contractors a lead has been sent to, by whom, and the outcome.
-- Safe to run multiple times (IF NOT EXISTS guards).

CREATE TABLE IF NOT EXISTS lead_assignments (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  lead_id        uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  contractor_id  uuid NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  assigned_by    text,          -- admin identifier (future: user email)
  status         text NOT NULL DEFAULT 'sent',   -- 'sent' | 'accepted' | 'declined'
  notes          text
);

CREATE INDEX IF NOT EXISTS lead_assignments_lead_id_idx       ON lead_assignments (lead_id);
CREATE INDEX IF NOT EXISTS lead_assignments_contractor_id_idx ON lead_assignments (contractor_id);
CREATE INDEX IF NOT EXISTS lead_assignments_created_at_idx    ON lead_assignments (created_at DESC);
