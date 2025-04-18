
import { supabase } from '@/integrations/supabase/client';

export const checkAndAssignFoundingMemberBadge = async (userId: string) => {
  try {
    // Get the count of employers with jobs
    // Instead of querying 'employers' table which doesn't exist, 
    // we'll query the 'profiles' table for users who have the employer role and have posted jobs
    const { count, error: countError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .eq('user_type', 'employer')
      .not('first_job_posted_at', 'is', null);
      
    if (countError) throw countError;
    
    // If we're still under 50 employers, award the badge
    if (count !== null && count < 50) {
      // Check if the user already has the founding member badge
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('badges')
        .eq('id', userId)
        .single();
        
      if (profileError) throw profileError;
      
      // If the profile exists and has badges, check if the founding member badge already exists
      let currentBadges = profile?.badges || [];
      
      // Check if the founding member badge already exists
      const foundingMemberBadgeExists = Array.isArray(currentBadges) && 
        currentBadges.some((badge: any) => badge.id === 'founding-member');
        
      // Only add the badge if it doesn't already exist
      if (!foundingMemberBadgeExists) {
        const newBadge = {
          id: 'founding-member',
          name: 'Founding Member',
          earned_at: new Date().toISOString()
        };
        
        const updatedBadges = Array.isArray(currentBadges) ? 
          [...currentBadges, newBadge] : 
          [newBadge];
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            badges: updatedBadges
          })
          .eq('id', userId);
          
        if (updateError) throw updateError;
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking/assigning founding member badge:', error);
    return false;
  }
};
