-- AlterTable
ALTER TABLE "FundCatalog" ALTER COLUMN "source" SET DEFAULT 'east-money';

-- CreateTable
CREATE TABLE "FundCatalogSyncRun" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'east-money',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "totalFetched" INTEGER,
    "upsertedCount" INTEGER,
    "updatedCount" INTEGER,
    "insertedCount" INTEGER,
    "errorMessage" TEXT,
    "runDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundCatalogSyncRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FundCatalogSyncRun_status_idx" ON "FundCatalogSyncRun"("status");

-- CreateIndex
CREATE INDEX "FundCatalogSyncRun_runDate_idx" ON "FundCatalogSyncRun"("runDate");
