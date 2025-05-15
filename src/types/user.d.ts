
import { UserType } from './auth';

export interface UserProfile {
  id: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  job_title?: string;
  company_name?: string;
  company_website?: string;
  location?: string;
  skills?: string[];
  user_type?: UserType;
  resume_url?: string;
  resume_data_encrypted?: string;
  contact_details_encrypted?: string;
  badges?: any[];
  student_badges?: any[];
  employer_verification_status?: string;
  verification_notes?: string;
  preferences?: any;
  redeemed_code?: string;
  redeemed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  job_title?: string;
  company_name?: string;
  company_website?: string;
  location?: string;
  skills?: string[];
  preferences?: Record<string, any>;
}

export interface SavedSearch {
  id: string;
  name: string;
  query?: string;
  zipCode?: string;
  radius?: number;
  filters?: Record<string, any>;
  created_at?: string;
  user_id?: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
  dyslexicFont: boolean;
}
