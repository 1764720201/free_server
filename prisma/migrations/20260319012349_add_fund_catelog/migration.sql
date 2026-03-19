-- CreateTable
CREATE TABLE "FundCatalog" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "pinyinShort" TEXT,
    "pinyinFull" TEXT,
    "source" TEXT NOT NULL DEFAULT 'easy-money',
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FundCatalog_name_idx" ON "FundCatalog"("name");

-- CreateIndex
CREATE INDEX "FundCatalog_pinyinShort_idx" ON "FundCatalog"("pinyinShort");

-- CreateIndex
CREATE INDEX "FundCatalog_pinyinFull_idx" ON "FundCatalog"("pinyinFull");
