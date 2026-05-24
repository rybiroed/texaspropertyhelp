-- Migration 009: Contractor complaints table
-- Internal-only complaint tracking. No public UI yet.
-- Safe to run multiple times (IF NOT EXISTS guard).

CREATE TABLE IF NOT EXISTS contractor_complaints (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  contractor_id  uuid REFERENCES contractors(id) ON DELETE SET NULL,
  lead_id        uuid REFERENCES leads(id) ON DELETE SET NULL,
  complaint_type text,   -- 'no_show' | 'poor_communication' | 'unsafe_work' | 'damage' | 'scam' | 'spam' | 'aggressive_behavior' | 'low_quality'
  notes          text,
  resolved       boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS contractor_complaints_contractor_id_idx ON contractor_complaints (contractor_id);
CREATE INDEX IF NOT EXISTS contractor_complaints_created_at_idx    ON contractor_complaints (created_at DESC);
CREATE INDEX IF NOT EXISTS contractor_complaints_resolved_idx      ON contractor_complaints (resolved);
