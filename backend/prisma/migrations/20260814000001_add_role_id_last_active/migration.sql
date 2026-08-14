-- Add role_id (numeric role identifier) and last_active_at to users table
ALTER TABLE "users" ADD COLUMN "role_id" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "users" ADD COLUMN "last_active_at" TIMESTAMP(3);

-- Back-fill role_id for existing users based on their role
UPDATE "users" SET "role_id" = CASE "role"
  WHEN 'FARMER'          THEN 1
  WHEN 'RESEARCHER'      THEN 2
  WHEN 'MANDI_OWNER'     THEN 3
  WHEN 'LAB_OWNER'       THEN 4
  WHEN 'CONTENT_MANAGER' THEN 5
  WHEN 'SUPER_ADMIN'     THEN 6
  ELSE 1
END;

CREATE INDEX "users_role_id_idx" ON "users"("role_id");
