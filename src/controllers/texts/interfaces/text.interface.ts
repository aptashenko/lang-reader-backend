import {LevelsTypes} from "../types/levels.types";
import {LanguagesTypes} from "../types/languages.types";

export interface TextInterface {
    id: number,
    title: string,
    content: string,
    level: LevelsTypes,
    created_at: string,
    updated_at: string,
    language: LanguagesTypes
}
