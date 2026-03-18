import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class SearchDto {
    @IsString()
    @IsNotEmpty()
    query: string

    @IsNumber()
    @IsNotEmpty()
    k: number
}