
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Define premium posting types
interface PremiumPosting {
  id: string;
  user_id: string;
  job_id: string;
  is_featured: boolean;
  is_trial: boolean;
  trial_expires_at?: string;
  created_at: string;
  updated_at?: string;
}

export function usePremiumPostings() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Start a premium trial for the given job
  const startPremiumTrial = async (jobId: string) => {
    if (!user) {
      throw new Error('User must be logged in to start a premium trial');
    }
    
    setIsLoading(true);
    
    try {
      // Check if this user already used a trial
      const { data: existingTrials, error: checkError } = await supabase
        .from('premium_postings')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_trial', true) as { data: PremiumPosting[] | null, error: any };
        
      if (checkError) throw checkError;
      
      // If user already has trials, check if they've reached the limit
      if (existingTrials && existingTrials.length >= 1) {
        throw new Error('You have already used your free trial');
      }
      
      // Calculate expiry date (30 days from now)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      
      // Insert new premium posting record
      const { data, error } = await supabase
        .from('premium_postings')
        .insert({
          user_id: user.id,
          job_id: jobId,
          is_featured: true,
          is_trial: true,
          trial_expires_at: expiryDate.toISOString()
        })
        .select()
        .single() as { data: PremiumPosting | null, error: any };
        
      if (error) throw error;
      
      // Update the job to mark it as premium
      const { error: jobUpdateError } = await supabase
        .from('jobs')
        .update({ is_premium: true, is_featured: true })
        .eq('id', jobId);
        
      if (jobUpdateError) throw jobUpdateError;
      
      toast({
        title: "Premium trial activated!",
        description: "Your job posting has been upgraded to premium for 30 days.",
      });
      
      return data;
    } catch (error: any) {
      console.error('Error starting premium trial:', error);
      
      toast({
        title: "Error activating trial",
        description: error.message || "Failed to start premium trial",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if user is eligible for a free trial
  const checkTrialEligibility = async () => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('premium_postings')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_trial', true) as { data: PremiumPosting[] | null, error: any };
        
      if (error) throw error;
      
      // User is eligible if they have no trials yet
      return !data || data.length === 0;
    } catch (error) {
      console.error('Error checking trial eligibility:', error);
      return false;
    }
  };
  
  // Get active premium postings for the current user
  const getUserPremiumPostings = async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('premium_postings')
        .select('*')
        .eq('user_id', user.id) as { data: PremiumPosting[] | null, error: any };
        
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching premium postings:', error);
      return [];
    }
  };
  
  return {
    startPremiumTrial,
    checkTrialEligibility,
    getUserPremiumPostings,
    isLoading
  };
}
