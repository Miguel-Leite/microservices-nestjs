/*
  Warnings:

  - You are about to drop the column `createAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "authUserId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authUserId_key" ON "Customer"("authUserId");
