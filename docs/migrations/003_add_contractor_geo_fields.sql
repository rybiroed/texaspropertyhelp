-- Migration 003: Add ZIP code and service radius to contractors table
-- Run in the Supabase SQL editor against your existing contractors table.
-- Safe to run more than once (IF NOT EXISTS guards).

-- zip_code is nullable here so existing rows are not broken.
-- The API now requires it for new inserts.
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS zip_code text;

-- Default 50 miles keeps existing rows valid.
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS service_radius_miles integer NOT NULL DEFAULT 50;
