-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PREPARING', 'SHIPPING', 'DELIVERED', 'REVIEWED');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('percentage', 'fixedValue');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255),
    "birthdate" TIMESTAMP(3) NOT NULL,
    "gender" CHAR(1) NOT NULL,
    "address" JSONB,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "shipping_address" TEXT,
    "billing_address" TEXT,
    "total_price" TEXT,
    "payment_method" TEXT,
    "transation" TEXT,
    "coupon_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PREPARING',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_variations" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "variation_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Product_variations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_variations_options" (
    "id" SERIAL NOT NULL,
    "products_variation_id" INTEGER NOT NULL,
    "product_stock_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "variationImg" TEXT NOT NULL,
    "sku" TEXT NOT NULL,

    CONSTRAINT "Product_variations_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_stock" (
    "id" SERIAL NOT NULL,
    "total_stock" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whislist" (
    "id" SERIAL NOT NULL,
    "product_variation_option_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "whislist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "oneTimeUse" BOOLEAN NOT NULL,
    "discountType" "DiscountType" NOT NULL DEFAULT 'percentage',
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_variations_options_product_stock_id_key" ON "Product_variations_options"("product_stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_name_key" ON "Coupon"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "Coupon"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_variations" ADD CONSTRAINT "Product_variations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_variations_options" ADD CONSTRAINT "Product_variations_options_products_variation_id_fkey" FOREIGN KEY ("products_variation_id") REFERENCES "Product_variations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_variations_options" ADD CONSTRAINT "Product_variations_options_product_stock_id_fkey" FOREIGN KEY ("product_stock_id") REFERENCES "product_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whislist" ADD CONSTRAINT "whislist_product_variation_option_id_fkey" FOREIGN KEY ("product_variation_option_id") REFERENCES "Product_variations_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whislist" ADD CONSTRAINT "whislist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
