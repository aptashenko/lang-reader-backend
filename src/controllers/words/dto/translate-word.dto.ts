// @ts-ignore
import {IsString, IsNotEmpty} from 'class-validator';
import {LanguagesTypes} from "../../texts/types/languages.types";

export class TranslateWordDto {
    @IsNotEmpty()
    @IsString()
    word: string;

    @IsNotEmpty()
    @IsString()
    language_learning: LanguagesTypes;

    @IsNotEmpty()
    @IsString()
    language_native: LanguagesTypes;

    @IsString()
    context: string
}
