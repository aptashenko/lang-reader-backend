// @ts-ignore
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {CreateBookDto} from "./create-book.dto";
import {DefaultValuePipe} from "@nestjs/common"; // ✅ правильно

export class BookQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    sort: keyof CreateBookDto;

    @IsOptional()
    order: 'asc' | 'desc';

}
