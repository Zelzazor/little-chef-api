/*
  Warnings:

  - You are about to drop the column `approved` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `status` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "approved",
ADD COLUMN     "status" "Status" NOT NULL;
