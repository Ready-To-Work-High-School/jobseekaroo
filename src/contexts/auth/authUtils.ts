
import { supabase } from '@/lib/supabase';
import { ApplicationStatus } from '@/types/application';

export const validateApplicationStatus = (status: string): ApplicationStatus => {
  const validStatuses: ApplicationStatus[] = [
    'applied',
    'interviewing',
    'offered',
    'accepted',
    'rejected',
    'withdrawn'
  ];
  
  return validStatuses.includes(status as ApplicationStatus) 
    ? (status as ApplicationStatus) 
    : 'applied'; // Default status
};

export const getRedirectUrl = (): string => {
  // In production, use the deployed URL, in development use localhost
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const port = window.location.port ? `:${window.location.port}` : '';
  const protocol = window.location.protocol;
  const host = window.location.hostname;
  
  return isLocalhost
    ? `${protocol}//${host}${port}/`
    : `${protocol}//${host}/`;
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select('*')
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
