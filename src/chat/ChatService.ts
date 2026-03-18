import { Injectable } from "@nestjs/common";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { LlmService } from "src/llm/llm.service";
import { PrismaService } from "src/prisma/prisma.service";
import { VectorStoreService } from "src/vectorStore/vectorStore.service";


@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService, private readonly llmService: LlmService, private readonly vectorStoreService: VectorStoreService) { }

    async create(message: string, userId: string) {
        await this.prisma.chatMessage.create({
            data: {
                userId,
                role: 'user',
                content: message
            }
        })

        const reply = await this.llmService.chat(message)

        await this.prisma.chatMessage.create({
            data: {
                userId,
                role: 'assistant',
                content: reply
            }
        })

        return {
            reply
        }
    }

    async history(userId: string, pagination: PaginationDto) {
        return this.prisma.chatMessage.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: (pagination.pageNo - 1) * pagination.pageSize,
            take: pagination.pageSize
        })
    }

    async ask(question: string, userId: string) {
        await this.prisma.chatMessage.create({
            data: {
                userId,
                role: 'user',
                content: question
            }
        })

        const recentMessages = await this.prisma.chatMessage.findMany({
            where: {
                userId,
            },
            take: 10,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const vectorStore = await this.vectorStoreService.search(question, 3)
        const context = vectorStore.map((v, index) => `${index + 1}) ${v.pageContent}`).join('\n')
        const prompt = `
        You are a helpful assistant.
        You are given a question and a context.
        Recent Messages: ${recentMessages.map(m => `${m.role}: ${m.content}`).join('\n')}
        You need to answer the question based on the context.
        Question: ${question}
        Context: ${context}
        Answer:
        If the question is not related to the context, say "I don't know".
        `

        const reply = await this.llmService.chat(prompt)
        await this.prisma.chatMessage.create({
            data: {
                userId,
                role: 'assistant',
                content: reply
            }
        })

        return {
            reply
        }
    }
}