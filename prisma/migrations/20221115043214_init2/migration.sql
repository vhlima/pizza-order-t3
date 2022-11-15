/*
  Warnings:

  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "product_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drinks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "drinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drink_sizes" (
    "id" SERIAL NOT NULL,
    "drink_id" INTEGER NOT NULL,
    "drink_size_id" INTEGER NOT NULL,

    CONSTRAINT "drink_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drink_size_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "drink_size_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_name_key" ON "product_categories"("name");

-- AddForeignKey
ALTER TABLE "drink_sizes" ADD CONSTRAINT "drink_sizes_drink_id_fkey" FOREIGN KEY ("drink_id") REFERENCES "drinks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drink_sizes" ADD CONSTRAINT "drink_sizes_drink_size_id_fkey" FOREIGN KEY ("drink_size_id") REFERENCES "drink_size_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
