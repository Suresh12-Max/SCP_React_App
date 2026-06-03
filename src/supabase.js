import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zuoubqiyynabalorjqqj.supabase.co'
const supabaseKey = 'sb_publishable_rzXVSr0vCyalceyTPGMFxg_omKzcNqf'

export const supabase = createClient(supabaseUrl, supabaseKey)