/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `product_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "product_categories_name_key";

-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "code" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_code_key" ON "product_categories"("code");
