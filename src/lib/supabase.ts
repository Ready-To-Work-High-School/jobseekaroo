
import { createClient } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import { ApplicationStatus } from '@/types/application';

// Export the already configured supabase client
export const supabase = supabaseClient;

// Helper function to validate application status
export function validateApplicationStatus(status: string): ApplicationStatus {
  const validStatuses: ApplicationStatus[] = ['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn'];
  
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  
  // Default to 'applied' if an invalid status is provided
  return 'applied';
}
