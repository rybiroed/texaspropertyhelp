-- Migration 011: Contractor document storage tracking
-- Tracks all uploaded compliance documents with verification lifecycle.
-- Safe to run multiple times (IF NOT EXISTS guards).

CREATE TABLE IF NOT EXISTS contractor_documents (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  contractor_id       uuid REFERENCES contractors(id) ON DELETE CASCADE,
  document_type       text NOT NULL,         -- 'insurance' | 'license' | 'id' | 'w9' | 'agreement'
  file_path           text NOT NULL,         -- path in Supabase Storage bucket
  original_filename   text,
  mime_type           text,
  verification_status text NOT NULL DEFAULT 'pending_review', -- 'pending_review' | 'verified' | 'rejected' | 'expired'
  verified_at         timestamptz,
  verified_by         text,
  rejection_reason    text,
  expires_at          timestamptz,           -- used for insurance certificate expiry
  metadata            jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS contractor_documents_contractor_id_idx        ON contractor_documents (contractor_id);
CREATE INDEX IF NOT EXISTS contractor_documents_verification_status_idx  ON contractor_documents (verification_status);
CREATE INDEX IF NOT EXISTS contractor_documents_document_type_idx        ON contractor_documents (document_type);
CREATE INDEX IF NOT EXISTS contractor_documents_created_at_idx           ON contractor_documents (created_at DESC);
