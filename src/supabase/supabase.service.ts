import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const logger = new Logger('SupabaseLogger');

@Injectable()
export class SupabaseService {
    private readonly client: SupabaseClient;
    private readonly url: string;
    private readonly key: string;

    constructor(private readonly configService: ConfigService) {
        const url = this.configService.get<string>('SUPABASE_URL');
        const key = this.configService.get<string>('SUPABASE_KEY');

        if (!url || !key) {
            throw new Error('Missing Supabase URL or Key in .env');
        }

        this.url = url;
        this.key = key;

        this.client = createClient(this.url, this.key);
    }

    getClient(): SupabaseClient {
        return this.client;
    }

    getClientWithToken(token: string): SupabaseClient {
        return createClient(this.url, this.key, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });
    }
}
