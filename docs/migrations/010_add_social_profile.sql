-- Migration 010: Add social_profile field to contractors
-- Stores any public social/business URL (Instagram, Facebook, LinkedIn, Google Business, etc.)
-- Safe to run multiple times (IF NOT EXISTS guard).

ALTER TABLE contractors
  ADD COLUMN IF NOT EXISTS social_profile text;
