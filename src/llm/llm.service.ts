import { Injectable } from "@nestjs/common";
import { ChatOpenAI } from '@langchain/openai'
import { llmConstants } from "./constants";


@Injectable()
export class LlmService {
    private readonly model: ChatOpenAI

    constructor() {
        this.model = new ChatOpenAI({
            apiKey: llmConstants.qiNiuApiKey,
            model: 'gpt-oss-120b',
            configuration: {
                baseURL: llmConstants.qiNiuBaseUrl
            }
        })
    }

    async chat(message: string): Promise<string> {
        const res = await this.model.invoke(message)
        const content = typeof res.content === 'string' ? res.content : JSON.stringify(res.content)

        return content
    }
}