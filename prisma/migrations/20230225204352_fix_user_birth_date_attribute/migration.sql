/*
  Warnings:

  - You are about to drop the column `birth_date` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birth_date",
ADD COLUMN     "birthDate" TIMESTAMP(3);
