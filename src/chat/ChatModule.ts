import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ChatService } from "./ChatService";
import { ChatController } from "./ChatController";
import { LlmService } from "src/llm/llm.service";
import { VectorStoreService } from "src/vectorStore/vectorStore.service";
import { EmbeddingModule } from "src/embedding/embedding.module";
import { VectorStoreModule } from "src/vectorStore/vectorStore.module";


@Module({
    imports: [PrismaModule, EmbeddingModule, VectorStoreModule],
    providers: [ChatService, LlmService, VectorStoreService],
    controllers: [ChatController],
    exports: [ChatService],
})
export class ChatModule { }