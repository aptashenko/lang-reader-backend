import {Injectable} from "@nestjs/common";
import {SupabaseService} from "../../supabase/supabase.service";
import {Logger} from "@nestjs/common";
import {Levels} from "./constants/levels.enum";
import {TextsQueryDto} from "./dto/texts-query.dto";
import {SuccessResponse} from "../../common/interfaces/success-response";
import {TextInterface} from "./interfaces/text.interface";
import {getRandomInt} from "../../utils/random-number.util";
import {LanguagesTypes} from "./types/languages.types";
import {Languages} from "./constants/languages.enum";
import {LevelsTypes} from "./types/levels.types";

const logger = new Logger("TextsService");
@Injectable()
export class TextsService {
    constructor(private readonly supabaseService: SupabaseService) {
    }
    async getAll({language_learning = 'en', language_native = 'uk', level = 'a1'}: TextsQueryDto): Promise<SuccessResponse<TextInterface[] | null>> {
        const response = await this.supabaseService.getClient()
            .from('texts')
            .select('*')
            .eq('language', language_learning)
            .eq('level', level)

        return {
            data: response.data && response.data.length === 0 ? response.data : null,
            message: 'All texts recived successfully.',
        }
    }

    async getTextsQuestions(id: number): Promise<any> {
        const {data} = await this.supabaseService.getClient()
            .from('text_questions')
            .select('*')
            .eq('text_id', id)
            .order('question_number')

        return data
    }

    async getRandomText({language_learning = 'en', language_native = 'uk', level = 'a1'}: TextsQueryDto): Promise<SuccessResponse<TextInterface>>  {
        const {data} = await this.supabaseService.getClient()
            .from('texts')
            .select('*')
            .eq('language', language_learning)
            .eq('level', level.toUpperCase())
        const randomIndex = getRandomInt(0, (data ?? []).length - 1);
        const randomText = (data ?? [])[randomIndex];
        const questions = await this.getTextsQuestions(randomText?.id);
        const result = {...randomText, questions}

        return {
            data: result,
            message: 'Randomized texts recived successfully.',
        }
    }

    async getTextById(id: number, {language_learning = 'en', language_native = 'uk', level = 'a1'}: TextsQueryDto): Promise<SuccessResponse<TextInterface>>  {
        const {data} = await this.supabaseService.getClient()
            .from('texts')
            .select('*')
            .eq('language', language_learning)
            .eq('level', level.toUpperCase())
            .eq('id', id)
            .single()

        const questions = await this.getTextsQuestions(id);

        return {
            data: {...data, questions},
            message: 'Randomized texts recived successfully.',
        }
    }

    async getAvailableLanguages(): Promise<SuccessResponse<Record<LanguagesTypes, boolean>[]>> {
        const activeLanguages: Record<LanguagesTypes, boolean>[] = Object.entries(Languages)
            .map(([key, value]) => ({ [key]: value } as Record<LanguagesTypes, boolean>));

        return {
            data: activeLanguages,
            message: 'All languages recived successfully.',
        }
    }

    async getAvailableLevels(): Promise<SuccessResponse<Record<LevelsTypes, boolean>[]>> {
        const activeLevels: Record<LevelsTypes, boolean>[] = Object.entries(Levels)
            .map(([key, value]) => ({ [key]: value } as Record<LevelsTypes, boolean>));

        return {
            data: activeLevels,
            message: 'All languages recived successfully.',
        }
    }
}
