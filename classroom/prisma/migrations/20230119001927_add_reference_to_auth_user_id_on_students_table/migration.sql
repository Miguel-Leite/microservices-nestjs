/*
  Warnings:

  - You are about to drop the column `createAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "authUserId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Student_authUserId_key" ON "Student"("authUserId");
