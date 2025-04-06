
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface PremiumPostingOptions {
  jobId: string;
  includeAnalytics: boolean;
}

export function usePremiumFeatures() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Purchase a premium job posting
  const purchasePremiumPost = async ({ jobId, includeAnalytics }: PremiumPostingOptions) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to purchase premium features",
        variant: "destructive",
      });
      throw new Error('User not authenticated');
    }
    
    setIsLoading(true);
    
    try {
      // Call our edge function to create a checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          jobId,
          planType: includeAnalytics ? 'premium_analytics_post' : 'premium_post',
          returnUrl: window.location.origin + '/employer-premium',
        }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
      
      return data;
    } catch (error: any) {
      console.error('Error purchasing premium post:', error);
      
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process your payment request",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if a job is premium
  const checkJobPremiumStatus = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('is_premium, is_featured')
        .eq('id', jobId)
        .single();
        
      if (error) throw error;
      
      return {
        isPremium: data?.is_premium || false,
        isFeatured: data?.is_featured || false
      };
    } catch (error) {
      console.error('Error checking premium status:', error);
      return { isPremium: false, isFeatured: false };
    }
  };
  
  return {
    purchasePremiumPost,
    checkJobPremiumStatus,
    isLoading
  };
}
