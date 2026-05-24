-- Migration 006: Dispatch event log
-- Append-only log for all lead dispatch actions and their outcomes.
-- Safe to run multiple times (IF NOT EXISTS guard).

CREATE TABLE IF NOT EXISTS dispatch_events (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  lead_id        uuid REFERENCES leads(id) ON DELETE SET NULL,
  contractor_id  uuid REFERENCES contractors(id) ON DELETE SET NULL,
  event_type     text NOT NULL,   -- 'lead_sent' | 'email_sent' | 'send_failed'
  metadata       jsonb            -- free-form context: assignment_id, error, etc.
);

CREATE INDEX IF NOT EXISTS dispatch_events_lead_id_idx    ON dispatch_events (lead_id);
CREATE INDEX IF NOT EXISTS dispatch_events_created_at_idx ON dispatch_events (created_at DESC);
