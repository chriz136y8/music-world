import { createClient } from '@supabase/supabase-js'

const URL = 'url';


const API_KEY = 'key';



export const supabase = createClient(URL, API_KEY);