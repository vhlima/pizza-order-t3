/*
  Warnings:

  - The primary key for the `drinks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `drinks` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `drinks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "drink_sizes" DROP CONSTRAINT "drink_sizes_drink_id_fkey";

-- AlterTable
ALTER TABLE "drinks" DROP CONSTRAINT "drinks_pkey",
DROP COLUMN "id",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD CONSTRAINT "drinks_pkey" PRIMARY KEY ("product_id");

-- AddForeignKey
ALTER TABLE "drinks" ADD CONSTRAINT "drinks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drink_sizes" ADD CONSTRAINT "drink_sizes_drink_id_fkey" FOREIGN KEY ("drink_id") REFERENCES "drinks"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
