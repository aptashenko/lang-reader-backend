// @ts-ignore
import {IsString, IsNotEmpty} from 'class-validator';
import {LanguagesTypes} from "../../texts/types/languages.types";
import {LevelsTypes} from "../../texts/types/levels.types";

export class TranslateWordDto {
    @IsNotEmpty()
    @IsString()
    word: string;

    @IsNotEmpty()
    @IsString()
    difficulty: LevelsTypes;

    @IsNotEmpty()
    @IsString()
    language: LanguagesTypes;

    @IsString()
    translation: string
}
