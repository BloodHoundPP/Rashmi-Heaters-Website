-- ==============================================================================
-- Migration: Add gallery_images to subcategories table
-- Run this query in your Supabase Dashboard:
-- 1. Go to https://supabase.com/dashboard/project/xeqayalsoomdtjbzvjwv/sql
-- 2. Click "New Query"
-- 3. Paste this command and click "Run"
-- ==============================================================================

ALTER TABLE subcategories 
ADD COLUMN IF NOT EXISTS gallery_images jsonb DEFAULT '[]'::jsonb;

COMMENT ON COLUMN subcategories.gallery_images IS 'List of image URLs showcasing this subcategory';
