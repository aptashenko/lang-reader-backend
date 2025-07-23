import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi, {OpenAI} from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import { SupabaseService } from '../supabase/supabase.service';
import {Message} from "./types";

@Injectable()
export class OpenaiService {
    public openai: OpenAIApi;

    constructor(private readonly supabaseService: SupabaseService) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    /**
     * Make a request to ChatGPT to generate a response based on a prompt and message history.
     * @param prompt - The prompt for the ChatGPT model
     * @param messages - An array of messages representing the conversation history
     * @returns A string containing the generated response
     */

    async chatGptRequest(prompt: string, messages?: Message[]): Promise<string | null> {
        try {
            // Convert message history to the format expected by the OpenAI API
            const history = messages?.map(
                (message): ChatCompletionMessageParam => ({
                    role: message.ai ? 'assistant' : 'user',
                    content: message.text,
                }),
            ) ?? [];

            const completion: ChatCompletion = await this.openai.chat.completions.create({
                model: 'gpt-4.1-mini',
                messages: [
                    {
                        role: 'system',
                        content: prompt,
                    },
                    ...history,
                ],
                temperature: 0.5,
                max_tokens: 1000,
            });

            // Extract the content from the response
            const [content] = completion.choices.map((choice) => choice.message.content);

            return content;
        } catch (e) {
            // Log and propagate the error
            console.error(e);
            throw new ServiceUnavailableException('Failed request to ChatGPT');
        }
    }

}
