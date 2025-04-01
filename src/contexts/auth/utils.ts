
import { UserProfile } from '@/types/user';

/**
 * Formats and validates a user profile from Supabase
 */
export const formatUserProfile = (data: any): UserProfile => {
  // Format the preferences to ensure they're an object
  let formattedPreferences: Record<string, any> | null = null;
  
  if (data.preferences) {
    try {
      if (typeof data.preferences === 'string') {
        formattedPreferences = JSON.parse(data.preferences);
      } else if (typeof data.preferences === 'object' && data.preferences !== null) {
        formattedPreferences = data.preferences as Record<string, any>;
      } else {
        // Handle other types by creating an empty object
        formattedPreferences = {};
        console.warn('Unexpected preferences format:', data.preferences);
      }
    } catch (parseError) {
      console.error('Error parsing preferences:', parseError);
      formattedPreferences = {};
    }
  }
  
  // Format and validate user_type
  const validUserTypes: Array<'student' | 'employer' | 'admin' | 'teacher'> = ['student', 'employer', 'admin', 'teacher'];
  let formattedUserType: 'student' | 'employer' | 'admin' | 'teacher' | null = null;
  
  if (data.user_type && validUserTypes.includes(data.user_type as any)) {
    formattedUserType = data.user_type as 'student' | 'employer' | 'admin' | 'teacher';
  }
  
  // Format and validate employer_verification_status
  const validVerificationStatuses: Array<'pending' | 'approved' | 'rejected'> = ['pending', 'approved', 'rejected'];
  let formattedVerificationStatus: 'pending' | 'approved' | 'rejected' | null = null;
  
  if (data.employer_verification_status && validVerificationStatuses.includes(data.employer_verification_status as any)) {
    formattedVerificationStatus = data.employer_verification_status as 'pending' | 'approved' | 'rejected';
  }
  
  return {
    ...data,
    preferences: formattedPreferences,
    user_type: formattedUserType,
    employer_verification_status: formattedVerificationStatus
  };
};
