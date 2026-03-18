import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ChatService } from "./ChatService";
import { ChatController } from "./ChatController";
import { LlmService } from "src/llm/llm.service";


@Module({
    imports: [PrismaModule],
    providers: [ChatService, LlmService],
    controllers: [ChatController],
    exports: [ChatService],
})
export class ChatModule { }