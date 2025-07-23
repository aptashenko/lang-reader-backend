import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);
export { supabase };
