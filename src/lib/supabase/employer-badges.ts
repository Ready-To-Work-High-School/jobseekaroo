
import { supabase } from '@/integrations/supabase/client';

export const checkAndAssignFoundingMemberBadge = async (userId: string) => {
  try {
    // Get the count of employers with jobs
    const { count, error: countError } = await supabase
      .from('employers')
      .select('*', { count: 'exact' })
      .not('first_job_posted_at', 'is', null);
      
    if (countError) throw countError;
    
    // If we're still under 50 employers, award the badge
    if (count !== null && count < 50) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          badges: [{
            id: 'founding-member',
            name: 'Founding Member',
            earned_at: new Date().toISOString()
          }]
        })
        .eq('id', userId);
        
      if (updateError) throw updateError;
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking/assigning founding member badge:', error);
    return false;
  }
};
