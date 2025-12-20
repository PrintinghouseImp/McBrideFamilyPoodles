// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tbtispbfchdypqyrsjgd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidGlzcGJmY2hkeXBxeXJzamdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDQxMTQsImV4cCI6MjA4MTA4MDExNH0.FRSpI7-uIJoWm9BlxUn1eBuX_nNmkYELSUGEHLl0xyo'`

export const supabase = createClient(supabaseUrl, supabaseAnonKey)