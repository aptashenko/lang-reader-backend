// @ts-ignore
import {IsString, Min, IsNotEmpty, Max, IsIn} from 'class-validator';
import {LanguagesTypes} from "../types/languages.types";
import {LevelsTypes} from "../types/levels.types";
import {Levels} from "../constants/levels.enum";

export class TextsQueryDto {
    @IsNotEmpty()
    @IsString()
    language_learning: LanguagesTypes;

    @IsNotEmpty()
    @IsString()
    language_native: LanguagesTypes;

    @IsIn(Object.keys(Levels), { message: 'Level must be one of a1, a2, b1, b2' })
    level: LevelsTypes;
}
