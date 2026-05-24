-- Migration 012: Contractor magic-link access tokens
-- One-time login tokens for the contractor portal.
-- Safe to run multiple times (IF NOT EXISTS guards).

CREATE TABLE IF NOT EXISTS contractor_access_tokens (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL DEFAULT now(),
  contractor_id uuid NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  token_hash    text NOT NULL,        -- SHA-256 of the raw token sent in the email
  expires_at    timestamptz NOT NULL,
  used_at       timestamptz           -- null = unused; set when token is consumed
);

CREATE UNIQUE INDEX IF NOT EXISTS contractor_access_tokens_token_hash_idx ON contractor_access_tokens (token_hash);
CREATE INDEX IF NOT EXISTS contractor_access_tokens_contractor_id_idx     ON contractor_access_tokens (contractor_id);
CREATE INDEX IF NOT EXISTS contractor_access_tokens_expires_at_idx        ON contractor_access_tokens (expires_at);
