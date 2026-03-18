import { OpenAIEmbeddings } from "@langchain/openai";
import { Injectable } from "@nestjs/common";
import { llmConstants } from "src/llm/constants";
import { embeddingConstants } from "./contracts";


@Injectable()
export class EmbeddingService {
    private readonly embeddings: OpenAIEmbeddings

    constructor() {
        this.embeddings = new OpenAIEmbeddings({
            apiKey: embeddingConstants.bigModelApiKey,
            model: embeddingConstants.bigModelModel,
            configuration: {
                baseURL: embeddingConstants.bigModelBaseUrl
            }
        })
    }

    async embed(text: string): Promise<number[]> {
        const [vector] = await this.embeddings.embedDocuments([text])
        return vector
    }

    getEmbeddings() {
        return this.embeddings
    }
}