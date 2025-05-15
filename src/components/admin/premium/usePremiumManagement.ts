
import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

export const usePremiumManagement = () => {
  const [premiumUsers, setPremiumUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch all premium users
  const fetchPremiumUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('premium_status', 'is', null);
      
      if (error) {
        throw error;
      }
      
      // Convert data to UserProfile type by adding required fields
      const formattedData = data.map(user => ({
        ...user,
        preferences: user.preferences || {},
      })) as UserProfile[];
      
      setPremiumUsers(formattedData);
    } catch (error) {
      console.error('Error fetching premium users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load premium users',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Cancel a subscription
  const cancelSubscription = useCallback(async (stripeSubscriptionId: string) => {
    try {
      // Call your API to cancel the subscription
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscription_id: stripeSubscriptionId }
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Subscription Cancelled',
        description: 'The premium subscription has been cancelled successfully'
      });

      // Refresh the premium users list
      await fetchPremiumUsers();
      return data;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription',
        variant: 'destructive'
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
