
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

export const validateApplicationStatus = (status: string): ApplicationStatus => {
  const validStatuses: ApplicationStatus[] = [
    'applied',
    'interview', 
    'offer',
    'accepted',
    'rejected',
    'withdrawn'
  ];
  
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  
  return 'applied'; // Default status
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data as UserProfile;
};

export const updateUserProfile = async (
  userId: string,
  profileData: Partial<UserProfile>
): Promise<UserProfile | null> => {
  // Convert Date objects to ISO strings if needed
  const formattedData: Record<string, any> = { ...profileData };
  
  // Check if redeemed_at exists and is a Date object
  if (profileData.redeemed_at && typeof profileData.redeemed_at === 'object') {
    formattedData.redeemed_at = (profileData.redeemed_at as Date).toISOString();
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(formattedData)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data as UserProfile;
};
