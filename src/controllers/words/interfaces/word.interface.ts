import {LanguagesTypes} from "../../texts/types/languages.types";

export interface IWord {
    id: string;
    original: string;
    translation: string;
    language: LanguagesTypes;
}
