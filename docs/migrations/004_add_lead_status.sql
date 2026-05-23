-- Migration 004: Ensure lead status column and index exist
-- Safe to run on both fresh installs and existing databases.
-- The initial schema.sql already includes this column; this migration
-- adds it idempotently and updates the allowed status vocabulary to:
-- 'new' | 'reviewing' | 'matched' | 'closed' | 'spam'

ALTER TABLE IF EXISTS leads
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- Update legacy status values from the original vocabulary
-- ('contacted' → 'reviewing', 'qualified' → 'reviewing') so existing
-- rows stay consistent with the new workflow states.
UPDATE leads SET status = 'reviewing' WHERE status IN ('contacted', 'qualified');

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
