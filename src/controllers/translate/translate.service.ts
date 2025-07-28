import {Injectable} from "@nestjs/common";
import {OpenaiService} from "../../openai/openai.service";
import {Message} from "../../openai/types";

@Injectable()
export class TranslateService {
    constructor(private readonly chatGPT: OpenaiService) {
    }
    async translate(original_text: string): Promise<string | null> {
        const prompt: string = `Translate this "${original_text}" to ukrainian`;
        const history: Message[] = [
            {
                ai: false,
                text: `You are helpful translator. Give me just translation without explanations.`
            }
        ]
        console.log(prompt)

        const response = await this.chatGPT.chatGptRequest(prompt, history);

        return response
    }
}
