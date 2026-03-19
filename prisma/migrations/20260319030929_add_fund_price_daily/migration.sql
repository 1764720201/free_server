-- CreateTable
CREATE TABLE "FundDailyPrice" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "nav" DECIMAL(65,30) NOT NULL,
    "accNav" DECIMAL(65,30),
    "source" TEXT NOT NULL DEFAULT 'east-money-fundgz',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundDailyPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FundDailyPrice_code_date_idx" ON "FundDailyPrice"("code", "date");

-- CreateIndex
CREATE UNIQUE INDEX "FundDailyPrice_code_date_key" ON "FundDailyPrice"("code", "date");
