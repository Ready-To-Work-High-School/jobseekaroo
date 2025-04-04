
import { UserProfile } from '@/types/user';

export const isAdmin = (userProfile: UserProfile | null): boolean => {
  if (!userProfile) return false;
  return userProfile.user_type === 'admin';
};

export const isTestMode = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('adminTest') && urlParams.get('adminTest') === 'true';
};
