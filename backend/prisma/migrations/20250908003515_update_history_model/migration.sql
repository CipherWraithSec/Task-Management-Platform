/*
  Warnings:

  - You are about to drop the column `newStatus` on the `TaskHistory` table. All the data in the column will be lost.
  - You are about to drop the column `previousStatus` on the `TaskHistory` table. All the data in the column will be lost.
  - Added the required column `fieldName` to the `TaskHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."TaskHistory" DROP COLUMN "newStatus",
DROP COLUMN "previousStatus",
ADD COLUMN     "fieldName" TEXT NOT NULL,
ADD COLUMN     "newValue" TEXT,
ADD COLUMN     "previousValue" TEXT;
