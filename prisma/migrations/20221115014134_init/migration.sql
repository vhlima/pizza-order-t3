-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizzas" (
    "product_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizzas_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "pizza_size_types" (
    "code" VARCHAR(10) NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizza_size_types_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "pizzas_sizes" (
    "id" SERIAL NOT NULL,
    "pizza_id" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "size_type_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizzas_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza_topping_types" (
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizza_topping_types_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "pizzas_toppings" (
    "id" SERIAL NOT NULL,
    "pizza_id" INTEGER NOT NULL,
    "include" BOOLEAN NOT NULL DEFAULT false,
    "available" BOOLEAN NOT NULL DEFAULT false,
    "topping_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizzas_toppings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza_base_types" (
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizza_base_types_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "pizzas_bases" (
    "id" SERIAL NOT NULL,
    "pizza_id" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "base_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizzas_bases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pizzas_name_key" ON "pizzas"("name");

-- AddForeignKey
ALTER TABLE "pizzas" ADD CONSTRAINT "pizzas_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizzas_sizes" ADD CONSTRAINT "pizzas_sizes_pizza_id_fkey" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizzas_sizes" ADD CONSTRAINT "pizzas_sizes_size_type_code_fkey" FOREIGN KEY ("size_type_code") REFERENCES "pizza_size_types"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizzas_toppings" ADD CONSTRAINT "pizzas_toppings_pizza_id_fkey" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizzas_toppings" ADD CONSTRAINT "pizzas_toppings_topping_code_fkey" FOREIGN KEY ("topping_code") REFERENCES "pizza_topping_types"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizzas_bases" ADD CONSTRAINT "pizzas_bases_pizza_id_fkey" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizzas_bases" ADD CONSTRAINT "pizzas_bases_base_code_fkey" FOREIGN KEY ("base_code") REFERENCES "pizza_base_types"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
