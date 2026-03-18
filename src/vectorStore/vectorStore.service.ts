import { Injectable } from "@nestjs/common";
import { QdrantClient } from '@qdrant/js-client-rest'
import { QdrantVectorStore } from '@langchain/qdrant'
import { EmbeddingService } from "src/embedding/embedding.service";
import { vectorStoreConstants } from "./contrants";
import { Document } from '@langchain/core/documents'

@Injectable()
export class VectorStoreService {
    private client: QdrantClient
    private store: QdrantVectorStore

    constructor(private readonly embeddingService: EmbeddingService) {
        this.client = new QdrantClient({
            url: vectorStoreConstants.qdrantUrl,
            apiKey: vectorStoreConstants.qdrantApiKey,
        })
    }

    async initStore() {
        if (this.store) return

        const embeddings = this.embeddingService.getEmbeddings()

        this.store = await QdrantVectorStore.fromExistingCollection(embeddings, {
            url: vectorStoreConstants.qdrantUrl,
            apiKey: vectorStoreConstants.qdrantApiKey,
            collectionName: vectorStoreConstants.qdrantCollection
        })
    }

    async addTexts(texts: string[]) {
        await this.initStore()

        if (!this.store) {
            throw new Error('Vector store not initialized')
        }

        await this.store.addDocuments(texts.map(t => ({
            pageContent: t,
            metadata: {}
        })))
    }

    async search(query: string, k: number): Promise<Document[]> {
        await this.initStore()

        if (!this.store) {
            throw new Error('Vector store not initialized')
        }

        const results = await this.store.similaritySearch(query, k)
        return results
    }
}