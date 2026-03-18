import { Injectable } from "@nestjs/common";
import {
    PrismaService
} from "../prisma/prisma.service";
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany()
    }

    async findOne(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email
            }
        })
    }

    async create(email: string, password: string) {
        const hashedPassword = await hash(password, 10)

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })
    }
}