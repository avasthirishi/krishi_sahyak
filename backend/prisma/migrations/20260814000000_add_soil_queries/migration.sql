CREATE TABLE "soil_queries" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "land_size" DOUBLE PRECISION,
  "soil_type" TEXT NOT NULL,
  "current_crops" TEXT,
  "query_type" TEXT NOT NULL,
  "problem_description" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "soil_queries_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "soil_queries_status_idx" ON "soil_queries"("status");
CREATE INDEX "soil_queries_query_type_idx" ON "soil_queries"("query_type");
CREATE INDEX "soil_queries_email_idx" ON "soil_queries"("email");
