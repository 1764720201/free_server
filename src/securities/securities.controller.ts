import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SecuritiesService } from './securities.service';
import { SearchDto } from './dto/search.dto';


@Controller('securities')
export class SecuritiesController {
  constructor(private readonly securitiesService: SecuritiesService) { }

  @Get('search')
  search(@Query() query: SearchDto) {
    return this.securitiesService.search(query.keyword, query.pageNo, query.pageSize)
  }
}
