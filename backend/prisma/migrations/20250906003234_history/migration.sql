/*
  Warnings:

  - The `previousStatus` column on the `TaskHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `newStatus` on the `TaskHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."TaskHistory" DROP COLUMN "previousStatus",
ADD COLUMN     "previousStatus" TEXT,
DROP COLUMN "newStatus",
ADD COLUMN     "newStatus" TEXT NOT NULL;
