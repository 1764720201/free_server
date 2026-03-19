import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FundsService {
  constructor(private readonly prisma: PrismaService) { }
  async syncCatalog() {
    const res = await fetch('http://fund.eastmoney.com/js/fundcode_search.js')

    const text = await res.text()
    const match = text.match(/var\s+r\s*=\s*(\[\[[\s\S]*?\]\])\s*;?/)
    if (!match) throw new Error('parse fundcode_search.js failed')
    const rows = JSON.parse(match[1]) as [string, string, string, string, string][]

    const items = rows.map(([code, pinyinShort, name, type, pinyinFull]) => ({
      code,
      pinyinShort,
      name,
      type,
      pinyinFull,
    }))
    const totalFetched = items.length
    let processedCount = 0
    const run = await this.prisma.fundCatalogSyncRun.create({
      data: {
        source: "east-money",
        status: 'running'
      }
    })


    try {
      const batchSize = 300
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize)

        await Promise.all(
          batch.map(item => this.prisma.fundCatalog.upsert({
            where: { code: item.code },
            update: {
              ...item,
              syncedAt: new Date()
            },
            create: {
              ...item,
              syncedAt: new Date(),
              source: 'east-money'
            }
          }))
        )

        processedCount += batch.length
      }

      await this.prisma.fundCatalogSyncRun.update({
        where: {
          id: run.id
        },
        data: {
          status: 'success',
          finishedAt: new Date(),
          totalFetched,
          upsertedCount: processedCount
        }
      })
    } catch (error) {
      await this.prisma.fundCatalogSyncRun.update({
        where: {
          id: run.id
        },
        data: {
          status: 'failed',
          finishedAt: new Date(),
          errorMessage: error.message
        }
      })
      throw error
    }
  }


  async syncAllDailyPrice() {
    const funds = await this.prisma.fundCatalog.findMany({
      select: { code: true }
    })

    const concurrency = 10
    const codes = funds.map(f => f.code)

    for (let i = 0; i < codes.length; i += concurrency) {
      const group = codes.slice(i, i + concurrency)

      await Promise.all(group.map(code => this.syncSingleDailyPrice(code)))
    }

    return {
      total: codes.length
    }
  }

  private async syncSingleDailyPrice(code: string) {
    const res = await fetch(`http://fundgz.1234567.com.cn/js/${code}.js`);
    const text = await res.text()

    if (!text.startsWith('jsonpgz(')) return;

    const jsonStr = text
      .replace(/^jsonpgz\(/, '')
      .replace(/\);?$/, '')
      .trim();

    if (!jsonStr) return

    let data: {
      fundcode: string;
      jzrq: string;
      dwjz: string;
      ljjz?: string;
    }

    try {
      data = JSON.parse(jsonStr)
    } catch (error) {
      console.error(`parse ${code} daily price failed:`, error)
      return
    }

    const date = new Date(data.jzrq)
    const nav = new Prisma.Decimal(data.dwjz)
    const accNav = data.ljjz ? new Prisma.Decimal(data.ljjz) : null

    await this.prisma.fundDailyPrice.upsert({
      where: {
        code_date: { code: data.fundcode, date }
      },
      update: {
        nav,
        accNav,
        source: 'east-money-fundgz'
      },
      create: {
        code: data.fundcode,
        date,
        nav,
        accNav,
        source: 'east-money-fundgz'
      }
    })
  }

  async search(keyword: string, pageNo: number, pageSize: number) {
    const key = keyword.trim()
    const upperKey = key.toUpperCase()
    const where: Prisma.FundCatalogWhereInput = {
      OR: [
        { code: { startsWith: key } },
        { name: { contains: key } },
        { pinyinShort: { contains: upperKey } },
        { pinyinFull: { contains: upperKey } }
      ]
    }

    const [list, total] = await Promise.all([
      this.prisma.fundCatalog.findMany({
        where,
        take: pageSize,
        skip: (pageNo - 1) * pageSize,
        select: { code: true, name: true, type: true }
      }),
      this.prisma.fundCatalog.count({ where })])

    return { list, total }
  }

  async detail(code: string) {
    const [fund, recentPrice] = await Promise.all([
      this.prisma.fundCatalog.findUnique({
        where: { code },
        select: { code: true, name: true, type: true }
      }),
      this.prisma.fundDailyPrice.findFirst({
        where: { code },
        orderBy: { date: 'desc' },
        select: { date: true, nav: true, accNav: true }
      })
    ])

    if (!fund) throw new NotFoundException('Fund not found')

    return { ...fund, recentPrice }
  }
}
