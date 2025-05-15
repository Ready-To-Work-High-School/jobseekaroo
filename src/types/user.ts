
import { ApplicationStatus } from './application';

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  company_name?: string;
  company_website?: string;
  location?: string;
  job_title?: string;
  skills?: string[];
  user_type?: 'student' | 'employer' | 'admin';
  employer_verification_status?: 'pending' | 'approved' | 'denied';
  badges?: any[];
  student_badges?: any[];
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    accessibility_settings?: {
      fontSize?: 'small' | 'medium' | 'large';
      highContrast?: boolean;
      reduceMotion?: boolean;
    };
  };
  created_at?: string;
  updated_at?: string;
}

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  company_name?: string;
  company_website?: string;
  location?: string;
  job_title?: string;
  skills?: string[];
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    accessibility_settings?: {
      fontSize?: 'small' | 'medium' | 'large';
      highContrast?: boolean;
      reduceMotion?: boolean;
    };
  };
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
}
