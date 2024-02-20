/*
  Warnings:

  - A unique constraint covering the columns `[user_id,provider]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_provider_key" ON "Account"("user_id", "provider");
