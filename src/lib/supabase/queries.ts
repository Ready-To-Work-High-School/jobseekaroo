
import { supabase } from './client';
import { ApplicationStatus } from '@/types/job';
import { normalizeJob } from '@/utils/jobAdapter';

// Application status update
export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
) {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .update({ status })
      .eq('id', applicationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}

// Delete application
export async function deleteApplication(applicationId: string) {
  try {
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', applicationId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}

// Get job details
export async function getJobById(jobId: string) {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (error) throw error;
    return normalizeJob(data);
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
}

// Save job to favorites
export async function saveJob(userId: string, jobId: string) {
  try {
    const { error } = await supabase
      .from('saved_jobs')
      .insert({ user_id: userId, job_id: jobId });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
}

// Remove job from favorites
export async function removeSavedJob(userId: string, jobId: string) {
  try {
    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq('user_id', userId)
      .eq('job_id', jobId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing saved job:', error);
    throw error;
  }
}

// Premium user management
export async function fetchPremiumUsers() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('premium_status', 'active');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching premium users:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    // This would normally call a server function that interacts with Stripe
    const { data, error } = await supabase.functions.invoke('cancel-subscription', {
      body: { subscriptionId }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

export async function grantPremiumAccess(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ premium_status: 'active' })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error granting premium access:', error);
    throw error;
  }
}

export async function revokePremiumAccess(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ premium_status: 'inactive' })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error revoking premium access:', error);
    throw error;
  }
}

export async function usePremiumManagement() {
  const [premiumUsers, setPremiumUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPremiumUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchPremiumUsers();
      setPremiumUsers(data || []);
    } catch (error) {
      console.error('Error fetching premium users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle cancellation
  const cancelSubscription = async (stripeSubscriptionId: string) => {
    try {
      await cancelSubscription(stripeSubscriptionId);
      fetchPremiumUsers(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return false;
    }
  };

  return { premiumUsers, loading, fetchPremiumUsers, cancelSubscription };
}

// Import React for the hook
import React from 'react';
