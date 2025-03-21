
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/user';
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
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data as UserProfile;
};
