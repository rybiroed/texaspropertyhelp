-- Migration 008: Contractor audit event log
-- Append-only log for all status changes and key contractor actions.
-- Safe to run multiple times (IF NOT EXISTS guard).

CREATE TABLE IF NOT EXISTS contractor_events (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  contractor_id  uuid REFERENCES contractors(id) ON DELETE SET NULL,
  event_type     text NOT NULL,   -- 'contractor_created' | 'approved' | 'rejected' | 'suspended' | 'blocked' | 'agreement_signed' | 'lead_sent'
  performed_by   text,
  metadata       jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS contractor_events_contractor_id_idx ON contractor_events (contractor_id);
CREATE INDEX IF NOT EXISTS contractor_events_created_at_idx    ON contractor_events (created_at DESC);
CREATE INDEX IF NOT EXISTS contractor_events_event_type_idx    ON contractor_events (event_type);
