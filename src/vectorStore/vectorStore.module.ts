import { Module } from "@nestjs/common";
import { VectorStoreService } from "./vectorStore.service";
import { VectorStoreController } from "./vectorStore.controller";
import { EmbeddingModule } from "src/embedding/embedding.module";

@Module({
    imports: [EmbeddingModule],
    providers: [VectorStoreService],
    controllers: [VectorStoreController],
    exports: [VectorStoreService],
})
export class VectorStoreModule { }