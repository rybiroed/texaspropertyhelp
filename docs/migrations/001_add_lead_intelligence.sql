-- Migration 001: Add lead intelligence columns
-- Run this in the Supabase SQL editor against your existing leads table.
-- All columns are nullable — existing rows are unaffected.
-- Safe to run more than once (IF NOT EXISTS guard on each column).

ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium   text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS referrer     text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS landing_page text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS user_agent   text;

-- NOTE: utm_source and utm_campaign already exist from the initial schema.
-- NOTE: ip_hash already exists from the initial schema.
