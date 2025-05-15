
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://juzawihlfesurtewxgdy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1emF3aWhsZmVzdXJ0ZXd4Z2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzY2MTQsImV4cCI6MjA1ODA1MjYxNH0.Nr03z5g2dRPGOsDHSqrpkmdsZnBdlpXRlOpRBBIApIA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
