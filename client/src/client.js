import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "url"
const supabaseKey = "key"
export const supabase = createClient(supabaseUrl, supabaseKey);