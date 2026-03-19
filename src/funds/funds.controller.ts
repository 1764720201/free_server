import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FundsService } from './funds.service';
import { SearchDto } from './dto/search.dto';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) { }


  @Post('sync-catalog')
  syncCatalog() {
    return this.fundsService.syncCatalog()
  }

  @Post('sync-daily-price')
  syncDailyPrice() {
    return this.fundsService.syncAllDailyPrice()
  }

  @Get('search')
  search(@Query() query: SearchDto) {
    return this.fundsService.search(query.keyword, query.pageNo, query.pageSize)
  }

  @Get(':code')
  detail(@Param('code') code: string) {
    return this.fundsService.detail(code)
  }
}
