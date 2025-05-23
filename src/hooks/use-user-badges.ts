
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserBadge } from '@/types/badges';
import { useAuth } from '@/hooks/useAuth';

export function useUserBadges(userId?: string) {
  const { user } = useAuth();
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use the current user's ID if no specific userId is provided
  const targetUserId = userId || user?.id;

  useEffect(() => {
    const fetchBadges = async () => {
      if (!targetUserId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('badges')
          .eq('id', targetUserId)
          .single();
        
        if (error) throw error;
        
        // Handle the case where badges might not exist in the profile
        if (data && data.badges) {
          // Ensure we're working with an array by using proper type conversion
          if (Array.isArray(data.badges)) {
            // Convert the unknown JSON array to UserBadge[] by validating each entry
            const badgesArray = data.badges.filter((badge: any) => 
              badge && typeof badge === 'object' && 
              typeof badge.id === 'string' && 
              typeof badge.name === 'string'
            ) as unknown as UserBadge[];
            
            setBadges(badgesArray);
          } else {
            setBadges([]);
          }
        } else {
          setBadges([]);
        }
      } catch (err) {
        console.error('Error fetching user badges:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch badges'));
        setBadges([]); // Set empty badges array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchBadges();
  }, [targetUserId]);

  return { badges, isLoading, error };
}
