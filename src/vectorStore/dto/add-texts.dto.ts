import { IsArray, IsString } from "class-validator";

export class AddTextsDto {
    @IsArray()
    @IsString({ each: true })
    texts: string[]
}