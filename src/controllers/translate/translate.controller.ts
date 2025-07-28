import {Controller, Get, Query} from "@nestjs/common";
import {TranslateService} from "./translate.service";

@Controller('translate')
export class TranslateController {
    constructor(private readonly translateService: TranslateService) {}

    @Get()
    getWordTranslation(@Query() query: {value: string}) {
        return this.translateService.translate(query.value)
    }
}
