/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `FundCatalog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FundCatalog_code_key" ON "FundCatalog"("code");
