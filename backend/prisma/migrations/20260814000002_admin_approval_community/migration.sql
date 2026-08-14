-- ============================================
-- Add isApproved to users + role-specific profile fields
-- ============================================
ALTER TABLE "users" ADD COLUMN "is_approved" BOOLEAN NOT NULL DEFAULT false;
-- Auto-approve existing SUPER_ADMIN accounts
UPDATE "users" SET "is_approved" = true WHERE "role" = 'SUPER_ADMIN';

ALTER TABLE "profiles" ADD COLUMN "institution"    TEXT;
ALTER TABLE "profiles" ADD COLUMN "specialization" TEXT;
ALTER TABLE "profiles" ADD COLUMN "mandi_name"     TEXT;
ALTER TABLE "profiles" ADD COLUMN "mandi_location" TEXT;
ALTER TABLE "profiles" ADD COLUMN "lab_name"       TEXT;
ALTER TABLE "profiles" ADD COLUMN "license_no"     TEXT;
ALTER TABLE "profiles" ADD COLUMN "village"        TEXT;
ALTER TABLE "profiles" ADD COLUMN "district"       TEXT;
ALTER TABLE "profiles" ADD COLUMN "land_holding"   TEXT;

-- ============================================
-- Research Papers
-- ============================================
CREATE TABLE "research_papers" (
  "id"          TEXT NOT NULL,
  "title"       TEXT NOT NULL,
  "abstract"    TEXT NOT NULL,
  "authors"     TEXT NOT NULL,
  "journal"     TEXT,
  "published_at" TIMESTAMP(3),
  "pdf_url"     TEXT,
  "tags"        TEXT[] DEFAULT ARRAY[]::TEXT[],
  "status"      TEXT NOT NULL DEFAULT 'published',
  "created_by_id" TEXT,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"  TIMESTAMP(3) NOT NULL,
  CONSTRAINT "research_papers_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "research_papers" ADD CONSTRAINT "research_papers_created_by_id_fkey"
  FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ============================================
-- Notices
-- ============================================
CREATE TABLE "notices" (
  "id"          TEXT NOT NULL,
  "title"       TEXT NOT NULL,
  "content"     TEXT NOT NULL,
  "category"    TEXT NOT NULL DEFAULT 'general',
  "priority"    TEXT NOT NULL DEFAULT 'normal',
  "expires_at"  TIMESTAMP(3),
  "status"      TEXT NOT NULL DEFAULT 'active',
  "created_by_id" TEXT,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"  TIMESTAMP(3) NOT NULL,
  CONSTRAINT "notices_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "notices" ADD CONSTRAINT "notices_created_by_id_fkey"
  FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ============================================
-- Government Events
-- ============================================
CREATE TABLE "government_events" (
  "id"                TEXT NOT NULL,
  "title"             TEXT NOT NULL,
  "description"       TEXT NOT NULL,
  "event_date"        TIMESTAMP(3) NOT NULL,
  "location"          TEXT,
  "category"          TEXT NOT NULL DEFAULT 'general',
  "organizer"         TEXT,
  "image_url"         TEXT,
  "registration_url"  TEXT,
  "status"            TEXT NOT NULL DEFAULT 'upcoming',
  "created_by_id"     TEXT,
  "created_at"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"        TIMESTAMP(3) NOT NULL,
  CONSTRAINT "government_events_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "government_events" ADD CONSTRAINT "government_events_created_by_id_fkey"
  FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ============================================
-- Weather Alerts
-- ============================================
CREATE TABLE "weather_alerts" (
  "id"          TEXT NOT NULL,
  "title"       TEXT NOT NULL,
  "message"     TEXT NOT NULL,
  "severity"    TEXT NOT NULL DEFAULT 'info',
  "region"      TEXT,
  "valid_from"  TIMESTAMP(3) NOT NULL,
  "valid_until" TIMESTAMP(3) NOT NULL,
  "created_by_id" TEXT,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"  TIMESTAMP(3) NOT NULL,
  CONSTRAINT "weather_alerts_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "weather_alerts" ADD CONSTRAINT "weather_alerts_created_by_id_fkey"
  FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ============================================
-- Mandi Price Entries
-- ============================================
CREATE TABLE "mandi_entries" (
  "id"          TEXT NOT NULL,
  "mandi_name"  TEXT NOT NULL,
  "state"       TEXT NOT NULL,
  "district"    TEXT,
  "commodity"   TEXT NOT NULL,
  "variety"     TEXT,
  "min_price"   DOUBLE PRECISION NOT NULL,
  "max_price"   DOUBLE PRECISION NOT NULL,
  "modal_price" DOUBLE PRECISION NOT NULL,
  "unit"        TEXT NOT NULL DEFAULT 'Quintal',
  "report_date" TIMESTAMP(3) NOT NULL,
  "created_by_id" TEXT,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"  TIMESTAMP(3) NOT NULL,
  CONSTRAINT "mandi_entries_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "mandi_entries" ADD CONSTRAINT "mandi_entries_created_by_id_fkey"
  FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "mandi_entries_commodity_idx" ON "mandi_entries"("commodity");
CREATE INDEX "mandi_entries_state_idx" ON "mandi_entries"("state");
CREATE INDEX "mandi_entries_report_date_idx" ON "mandi_entries"("report_date");

-- ============================================
-- Community Posts
-- ============================================
CREATE TABLE "community_posts" (
  "id"          TEXT NOT NULL,
  "author_id"   TEXT NOT NULL,
  "title"       TEXT,
  "content"     TEXT NOT NULL,
  "category"    TEXT NOT NULL DEFAULT 'general',
  "tags"        TEXT[] DEFAULT ARRAY[]::TEXT[],
  "image_url"   TEXT,
  "likes_count" INTEGER NOT NULL DEFAULT 0,
  "status"      TEXT NOT NULL DEFAULT 'active',
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"  TIMESTAMP(3) NOT NULL,
  CONSTRAINT "community_posts_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_author_id_fkey"
  FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "community_posts_author_id_idx" ON "community_posts"("author_id");
CREATE INDEX "community_posts_category_idx" ON "community_posts"("category");

-- ============================================
-- Community Comments
-- ============================================
CREATE TABLE "community_comments" (
  "id"        TEXT NOT NULL,
  "post_id"   TEXT NOT NULL,
  "author_id" TEXT NOT NULL,
  "content"   TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "community_comments_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "community_comments" ADD CONSTRAINT "community_comments_post_id_fkey"
  FOREIGN KEY ("post_id") REFERENCES "community_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "community_comments" ADD CONSTRAINT "community_comments_author_id_fkey"
  FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
