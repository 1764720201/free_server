import { IsNumber, IsOptional } from "class-validator"

export class PaginationDto {
    @IsNumber()
    @IsOptional()
    pageNo: number = 1

    @IsNumber()
    @IsOptional()
    pageSize: number = 10
}