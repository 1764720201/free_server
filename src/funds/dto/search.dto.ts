import { IsNotEmpty, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class SearchDto extends PaginationDto {
    @IsString()
    @IsNotEmpty()
    keyword: string
}