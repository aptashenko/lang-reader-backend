import {Controller, Get, Query} from "@nestjs/common";
import {WordsService} from "./words.service";
import {TranslateWordDto} from "./dto/translate-word.dto";
import {SuccessResponse} from "../../common/interfaces/success-response";
import {IWord} from "./interfaces/word.interface";

@Controller('words')
export class WordsController {
    constructor(private readonly wordsService: WordsService) {}

    @Get('translation')
    getWordsTranslation(@Query() query: TranslateWordDto): Promise<SuccessResponse<IWord>> {
        return this.wordsService.getWordTranslation(query)
    }
}
