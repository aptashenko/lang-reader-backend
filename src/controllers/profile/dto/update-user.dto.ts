import {IsEmail, IsIn, IsOptional} from "class-validator";
import {LanguagesTypes} from "../../texts/types/languages.types";
import {LevelsTypes} from "../../texts/types/levels.types";

const allowedLanguages = ['en', 'fr', 'es', 'de', 'uk', 'ru'] as const;
const allowedLevels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const;

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsIn(allowedLanguages, { message: 'language must be a valid LanguagesTypes enum value' })
    language?: LanguagesTypes;

    @IsOptional()
    @IsIn(allowedLevels, { message: 'level must be a valid LevelsTypes enum value' })
    level?: LevelsTypes;
}
