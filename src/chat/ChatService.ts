import { Injectable } from "@nestjs/common";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { LlmService } from "src/llm/llm.service";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService, private readonly llmService: LlmService) { }

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
}