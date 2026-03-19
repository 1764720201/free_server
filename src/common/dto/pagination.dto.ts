import { IsInt, IsOptional, Max, Min } from "class-validator"

export class PaginationDto {
    @IsInt()
    @IsOptional()
    @Min(1)
    pageNo: number = 1

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    pageSize: number = 10
}