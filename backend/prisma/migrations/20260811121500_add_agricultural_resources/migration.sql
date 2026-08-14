CREATE TABLE "agricultural_resources" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "fees" TEXT,
  "duration" TEXT,
  "image_url" TEXT,
  "status" TEXT NOT NULL DEFAULT 'published',
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_by_id" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "agricultural_resources_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "agricultural_resources"
ADD CONSTRAINT "agricultural_resources_created_by_id_fkey"
FOREIGN KEY ("created_by_id") REFERENCES "users"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "agricultural_resources_status_idx" ON "agricultural_resources"("status");
CREATE INDEX "agricultural_resources_category_idx" ON "agricultural_resources"("category");
CREATE INDEX "agricultural_resources_sort_order_idx" ON "agricultural_resources"("sort_order");
