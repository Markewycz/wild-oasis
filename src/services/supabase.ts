import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://sbociipmstesqvrjraxr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNib2NpaXBtc3Rlc3F2cmpyYXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4ODAzNjEsImV4cCI6MjAxMjQ1NjM2MX0.aj0HYcH7MYvxnhorwwrrusAMYTohLoc6d3BX_ToJjik';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
