import {Global, Module} from '@nestjs/common';
import { OpenaiService } from './openai.service';
import {SupabaseService} from "../supabase/supabase.service";

@Global()
@Module({
  providers: [OpenaiService, SupabaseService],
  exports: [OpenaiService]
})
export class OpenaiModule {}
