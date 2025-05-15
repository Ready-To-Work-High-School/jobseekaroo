
import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

export const usePremiumManagement = () => {
  const [premiumUsers, setPremiumUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPremiumUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('premium_subscriptions')
        .select(`
          *,
          user:profiles(*)
        `)
        .eq('status', 'active');

      if (error) throw error;

      // Transform data to match expected format
      const formattedUsers = data
        .filter(item => item.user)
        .map(item => ({
          ...item.user,
          premium_status: 'active',
          subscription_id: item.stripe_subscription_id,
          subscription_plan: item.plan_type,
          subscription_end: item.current_period_end
        }));

      setPremiumUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching premium users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load premium users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const cancelSubscription = useCallback(async (stripeSubscriptionId: string) => {
    try {
      // Call your backend endpoint to cancel the subscription
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscriptionId: stripeSubscriptionId }
      });

      if (error) throw error;
      
      await fetchPremiumUsers(); // Refresh the list
      
      return data;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription',
        variant: 'destructive',
      });
      throw error;
    }
  }, [fetchPremiumUsers, toast]);

  return {
    premiumUsers,
    loading,
    fetchPremiumUsers,
    cancelSubscription
  };
};
