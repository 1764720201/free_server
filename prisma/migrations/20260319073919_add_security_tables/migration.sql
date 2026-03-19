-- CreateTable
CREATE TABLE "SecurityCatalog" (
    "id" TEXT NOT NULL,
    "secid" TEXT NOT NULL,
    "tradeDate" TIMESTAMP(3) NOT NULL,
    "open" DECIMAL(65,30) NOT NULL,
    "high" DECIMAL(65,30) NOT NULL,
    "low" DECIMAL(65,30) NOT NULL,
    "close" DECIMAL(65,30) NOT NULL,
    "vol" DECIMAL(65,30),
    "amount" DECIMAL(65,30),
    "pctChg" DECIMAL(65,30),
    "chg" DECIMAL(65,30),
    "turnover" DECIMAL(65,30),
    "source" TEXT NOT NULL DEFAULT 'east-money-push2his',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityDailyPrice" (
    "id" TEXT NOT NULL,
    "secid" TEXT NOT NULL,
    "tradeDate" TIMESTAMP(3) NOT NULL,
    "open" DECIMAL(65,30) NOT NULL,
    "high" DECIMAL(65,30) NOT NULL,
    "low" DECIMAL(65,30) NOT NULL,
    "close" DECIMAL(65,30) NOT NULL,
    "vol" DECIMAL(65,30),
    "amount" DECIMAL(65,30),
    "pctChg" DECIMAL(65,30),
    "chg" DECIMAL(65,30),
    "turnover" DECIMAL(65,30),
    "source" TEXT NOT NULL DEFAULT 'east-money-push2his',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityDailyPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SecurityCatalog_secid_tradeDate_idx" ON "SecurityCatalog"("secid", "tradeDate");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityCatalog_secid_tradeDate_key" ON "SecurityCatalog"("secid", "tradeDate");

-- CreateIndex
CREATE INDEX "SecurityDailyPrice_secid_tradeDate_idx" ON "SecurityDailyPrice"("secid", "tradeDate");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityDailyPrice_secid_tradeDate_key" ON "SecurityDailyPrice"("secid", "tradeDate");
