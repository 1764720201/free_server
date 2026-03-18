import { Body, Controller, Post } from "@nestjs/common";
import { VectorStoreService } from "./vectorStore.service";
import { AddTextsDto } from "./dto/add-texts.dto";
import { SearchDto } from "./dto/search.dto";

@Controller('vector-store')
export class VectorStoreController {
    constructor(private vectorStoreService: VectorStoreService) { }

    @Post('search')
    search(@Body() searchDto: SearchDto) {
        return this.vectorStoreService.search(searchDto.query, searchDto.k)
    }

    @Post('add-texts')
    addTexts(@Body() addTextsDto: AddTextsDto) {
        return this.vectorStoreService.addTexts(addTextsDto.texts)
    }
}