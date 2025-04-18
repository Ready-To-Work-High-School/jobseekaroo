
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserBadge } from '@/types/user';

export const usePremiumManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;

      const { data: premiumData, error: premiumError } = await supabase
        .from('premium_subscriptions')
        .select('*');
        
      if (premiumError) throw premiumError;
      
      const usersWithPremium = profiles.map(profile => {
        const premiumSub = premiumData?.find(sub => sub.user_id === profile.id);
        
        // Transform profile data to match UserProfile type
        const userProfile: UserProfile = {
          ...profile,
          badges: Array.isArray(profile.badges) ? 
            profile.badges.map((badge: any) => ({ 
              id: badge.id || '', 
              name: badge.name || '',
              earned_at: badge.earned_at
            })) : [],
          premium_status: premiumSub ? `${premiumSub.plan_type} (${premiumSub.status})` : 'Free'
        };
        
        return userProfile;
      });
      
      setUsers(usersWithPremium);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const grantPremiumAccess = async (userId: string) => {
    try {
      const { data: existingSub, error: checkError } = await supabase
        .from('premium_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (existingSub) {
        const { error: updateError } = await supabase
          .from('premium_subscriptions')
          .update({
            status: 'active',
            plan_type: 'premium_plus',
            current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          })
          .eq('id', existingSub.id);
          
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('premium_subscriptions')
          .insert({
            user_id: userId,
            plan_type: 'premium_plus',
            status: 'active',
            current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          });
          
        if (insertError) throw insertError;
      }
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          preferences: { hasPremium: true }
        })
        .eq('id', userId);
        
      if (profileError) throw profileError;
      
      await fetchUsers();
      
      toast({
        title: 'Success',
        description: 'Premium access granted successfully',
      });
    } catch (error) {
      console.error('Error granting premium access:', error);
      toast({
        title: 'Error',
        description: 'Failed to grant premium access',
        variant: 'destructive'
      });
    }
  };

  const revokePremiumAccess = async (userId: string) => {
    try {
      const { data: existingSub, error: checkError } = await supabase
        .from('premium_subscriptions')
        .select('*')
        .eq('user_id', userId);
        
      if (existingSub && existingSub.length > 0) {
        const { error: updateError } = await supabase
          .from('premium_subscriptions')
          .update({
            status: 'cancelled'
          })
          .eq('user_id', userId);
          
        if (updateError) throw updateError;
      }
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          preferences: { hasPremium: false }
        })
        .eq('id', userId);
        
      if (profileError) throw profileError;
      
      await fetchUsers();
      
      toast({
        title: 'Success',
        description: 'Premium access revoked successfully',
      });
    } catch (error) {
      console.error('Error revoking premium access:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke premium access',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    grantPremiumAccess,
    revokePremiumAccess
  };
};
