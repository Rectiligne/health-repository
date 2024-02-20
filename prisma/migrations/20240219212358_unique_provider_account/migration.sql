/*
  Warnings:

  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_user_id_fkey";

-- DropIndex
DROP INDEX "Account_provider_provider_account_id_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "endpoint" TEXT,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "provider_account_id" DROP NOT NULL;

-- DropTable
DROP TABLE "Provider";

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_key" ON "Account"("provider");
