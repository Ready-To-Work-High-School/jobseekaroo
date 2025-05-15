
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { UserProfile } from '@/types/user';

export const usePremiumManagement = () => {
  const [premiumUsers, setPremiumUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPremiumUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('premium_subscriptions')
        .select('*, user_id');

      if (error) throw error;

      // If we have premium users, fetch their profile details
      if (data && data.length > 0) {
        const userIds = data.map(subscription => subscription.user_id);
        
        const { data: profiles, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', userIds);

        if (profileError) throw profileError;

        // Combine premium subscription data with user profiles
        const combinedData = data.map(subscription => {
          const profile = profiles?.find(p => p.id === subscription.user_id);
          if (!profile) return subscription;

          return {
            ...subscription,
            ...profile,
            premium_status: subscription.status,
            // Ensure student_badges is processed correctly as an array
            student_badges: Array.isArray(profile.student_badges) 
              ? profile.student_badges 
              : [],
          };
        });

        setPremiumUsers(combinedData);
      } else {
        setPremiumUsers([]);
      }
    } catch (err) {
      console.error('Error fetching premium users:', err);
      toast({
        title: 'Error',
        description: 'Failed to fetch premium users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (stripeSubscriptionId: string) => {
    try {
      setLoading(true);
      // Call your edge function to cancel the subscription
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscription_id: stripeSubscriptionId }
      });

      if (error) throw error;

      // Update the local state
      setPremiumUsers(prevUsers => 
        prevUsers.map(user => 
          user.stripe_subscription_id === stripeSubscriptionId 
            ? { ...user, premium_status: 'canceled' } 
            : user
        )
      );

      toast({
        title: 'Subscription cancelled',
        description: 'The subscription has been cancelled successfully',
      });
      
      return data;
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    premiumUsers,
    loading,
    fetchPremiumUsers,
    cancelSubscription
  };
};

export default usePremiumManagement;
