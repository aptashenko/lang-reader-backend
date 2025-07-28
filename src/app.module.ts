import { Module } from '@nestjs/common';
import {TextsService} from "./controllers/texts/texts.service";
import {TextsController} from "./controllers/texts/texts.controller";
import { ConfigModule } from '@nestjs/config';
import {SupabaseModule} from "./supabase/supabase.module";
import {SupabaseService} from "./supabase/supabase.service";
import {AuthController} from "./controllers/auth/auth.controller";
import {AuthService} from "./controllers/auth/auth.service";
import { OpenaiModule } from './openai/openai.module';
import {WordsController} from "./controllers/words/words.controller";
import {WordsService} from "./controllers/words/words.service";
import {ProfileController} from "./controllers/profile/profile.controller";
import {ProfileService} from "./controllers/profile/profile.service";
import {TranslateController} from "./controllers/translate/translate.controller";
import {TranslateService} from "./controllers/translate/translate.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    OpenaiModule,
  ],
  controllers: [TextsController, AuthController, WordsController, ProfileController, TranslateController],
  providers: [TextsService, SupabaseService, AuthService, WordsService, ProfileService, TranslateService],
})
export class AppModule {}
