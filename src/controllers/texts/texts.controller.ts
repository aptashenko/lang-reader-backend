import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {TextsService} from "./texts.service";
import {TextsQueryDto} from "./dto/texts-query.dto";
import {SuccessResponse} from "../../common/interfaces/success-response";
import {TextInterface} from "./interfaces/text.interface";

@Controller('texts')
export class TextsController {
    constructor(private readonly textsService: TextsService) {}

    @Get('languages-list')
    getLanguagesList() {
        return this.textsService.getAvailableLanguages()
    }

    @Get('levels-list')
    getLevelsList() {
        return this.textsService.getAvailableLevels()
    }

    @Get()
    getTexts(@Query() query: TextsQueryDto): Promise<SuccessResponse<TextInterface[] | null>> {
        return this.textsService.getAll(query);
    }
    @Get('random')
    getRandomText(@Query() query: TextsQueryDto): Promise<SuccessResponse<TextInterface>> {
        return this.textsService.getRandomText(query)
    }
    @Get(':id')
    getTextById(@Param('id', ParseIntPipe) id: number, @Query() query: TextsQueryDto): Promise<SuccessResponse<TextInterface>> {
        return this.textsService.getTextById(id, query)
    }
}
