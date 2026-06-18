import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://piekmrliuxifsjjuczrv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZWttcmxpdXhpZnNqanVjenJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MjMwMjksImV4cCI6MjA5NzE5OTAyOX0.MfTe3ZPdizRakcSSeE3rhj81c2gFg95e9IxoRZZBXDM'

export const supabase = createClient(supabaseUrl, supabaseKey)