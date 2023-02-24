/*
  Warnings:

  - Added the required column `measure_unit` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "measure_unit" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
