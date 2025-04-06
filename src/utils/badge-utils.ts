
import { supabase } from '@/lib/supabase';
import { UserBadge } from '@/types/badges';

/**
 * Award a badge to a user
 * 
 * @param userId The ID of the user to award the badge to
 * @param badgeId The ID of the badge to award
 * @param badgeName The display name of the badge
 * @returns The updated list of user badges
 */
export async function awardBadge(userId: string, badgeId: string, badgeName: string): Promise<UserBadge[]> {
  try {
    // Get the current badges
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('badges')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    // Initialize badges array if it doesn't exist
    const currentBadges: UserBadge[] = profile?.badges ? 
      (Array.isArray(profile.badges) ? profile.badges as UserBadge[] : []) : [];
    
    // Check if the badge already exists
    const badgeExists = currentBadges.some(badge => badge.id === badgeId);
    if (badgeExists) {
      return currentBadges;
    }
    
    // Add the new badge
    const newBadge: UserBadge = {
      id: badgeId,
      name: badgeName,
      earned_at: new Date().toISOString()
    };
    
    const updatedBadges = [...currentBadges, newBadge];
    
    // Update the profile with the new badges
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ badges: updatedBadges })
      .eq('id', userId);
      
    if (updateError) throw updateError;
    
    return updatedBadges;
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
}

/**
 * Remove a badge from a user
 * 
 * @param userId The ID of the user to remove the badge from
 * @param badgeId The ID of the badge to remove
 * @returns The updated list of user badges
 */
export async function removeBadge(userId: string, badgeId: string): Promise<UserBadge[]> {
  try {
    // Get the current badges
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('badges')
      .eq('id', userId)
      .single();
      
    if (fetchError) throw fetchError;
    
    // Handle case where badges might not exist
    const currentBadges: UserBadge[] = profile?.badges ? 
      (Array.isArray(profile.badges) ? profile.badges as UserBadge[] : []) : [];
    const updatedBadges = currentBadges.filter(badge => badge.id !== badgeId);
    
    // Update the profile with the filtered badges
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ badges: updatedBadges })
      .eq('id', userId);
      
    if (updateError) throw updateError;
    
    return updatedBadges;
  } catch (error) {
    console.error('Error removing badge:', error);
    throw error;
  }
}
