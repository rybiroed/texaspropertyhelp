-- Migration 007: Contractor compliance and trust fields
-- Adds status lifecycle, agreement tracking, insurance prep, and profile fields.
-- Safe to run multiple times (IF NOT EXISTS / idempotent guards).

-- ── Status column ────────────────────────────────────────────────────────────
-- Allowed: pending_review | approved | rejected | suspended | blocked
ALTER TABLE contractors
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending_review';

-- Migrate any existing 'pending' → 'pending_review', 'approved' stays
UPDATE contractors SET status = 'pending_review' WHERE status = 'pending';
UPDATE contractors SET status = 'approved'       WHERE status = 'approved';

-- ── Approval / rejection / suspension / block timestamps & reasons ──────────
ALTER TABLE contractors
  ADD COLUMN IF NOT EXISTS approved_at      timestamptz,
  ADD COLUMN IF NOT EXISTS approved_by      text,
  ADD COLUMN IF NOT EXISTS rejected_at      timestamptz,
  ADD COLUMN IF NOT EXISTS rejected_reason  text,
  ADD COLUMN IF NOT EXISTS suspended_at     timestamptz,
  ADD COLUMN IF NOT EXISTS suspended_reason text,
  ADD COLUMN IF NOT EXISTS blocked_at       timestamptz,
  ADD COLUMN IF NOT EXISTS blocked_reason   text;

-- ── Agreement tracking ────────────────────────────────────────────────────────
ALTER TABLE contractors
  ADD COLUMN IF NOT EXISTS agreement_signed    boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS agreement_signed_at timestamptz,
  ADD COLUMN IF NOT EXISTS agreement_version   text;

-- ── Insurance / profile prep ─────────────────────────────────────────────────
ALTER TABLE contractors
  ADD COLUMN IF NOT EXISTS insurance_uploaded  boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS insurance_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS website             text,
  ADD COLUMN IF NOT EXISTS years_in_business   integer;

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS contractors_status_idx      ON contractors (status);
CREATE INDEX IF NOT EXISTS contractors_created_at_idx  ON contractors (created_at DESC);
