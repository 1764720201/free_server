import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./ChatService";
import { AuthGuard } from "src/auth/auth.guard";
import { MessageDto } from "./dto/message.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { AskDto } from "./dto/ask.dto";


@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post('message')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async create(@Body() body: MessageDto, @Req() req: Request) {
        return this.chatService.create(body.message, req['user'].sub)
    }

    @Get('history')
    @UseGuards(AuthGuard)
    async history(@Req() req: Request, @Query() query: PaginationDto) {
        return this.chatService.history(req['user'].sub, query)
    }

    @Post('ask')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async ask(@Body() body: AskDto, @Req() req: Request) {
        return this.chatService.ask(body.question, req['user'].sub)
    }
}