import {LanguagesTypes} from "../../texts/types/languages.types";
import {LevelsTypes} from "../../texts/types/levels.types";

export interface IUser {
    id: string;
    email: string;
    language: LanguagesTypes | null;
    level: LevelsTypes | null;
    created_at: string;
}
