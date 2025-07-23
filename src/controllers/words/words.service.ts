import {Injectable} from "@nestjs/common";
import {LanguagesTypes} from "../texts/types/languages.types";
import {OpenaiService} from "../../openai/openai.service";
import {Message} from "../../openai/types";
import {TranslateWordDto} from "./dto/translate-word.dto";
import {SuccessResponse} from "../../common/interfaces/success-response";
import {IWord} from "./interfaces/word.interface";
import * as crypto from "node:crypto";

@Injectable()
export class WordsService {
    constructor(private readonly openAiService: OpenaiService) {}

    async translateWord(word: string, context: string, language_learning: LanguagesTypes, language_native: LanguagesTypes) {
        const messages: Message[] = [
            {
                ai: false,
                text: 'You are a helpful language learning assistant.' },
            {
                ai: false,
                text: `Here is the text for context:\n${context}` },
        ]
        const prompt = `Translate the word "${word}" from ${language_learning} to ${language_native} in the context of the text above. Provide only the translation, no explanation.`
        return await this.openAiService.chatGptRequest(prompt, messages)
    }

    async getWordTranslation(payload: TranslateWordDto): Promise<SuccessResponse<IWord>> {
        const translation = await this.translateWord(payload.word, payload.context, payload.language_learning, payload.language_native)
        return {
            data: {
                id: crypto.randomUUID(),
                original: payload.word,
                translation: translation!,
                language: payload.language_learning
            },
            message: 'translation successful',
        }
    }
}
