
export type UserType = 'student' | 'employer' | 'admin' | 'teacher';

export interface UserProfile {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  user_type?: UserType;
  company_name?: string;
  company_website?: string;
  resume_url?: string;
  bio?: string;
  job_title?: string;
  skills?: string[];
  badges?: any[];
  student_badges?: any[];
  location?: string;
  redeemed_code?: string;
  redeemed_at?: string;
  employer_verification_status?: string;
  verification_notes?: string;
  preferences?: any;
  created_at: string;
  updated_at: string;
  premium_status?: string;
  contact_details_encrypted?: string;
  resume_data_encrypted?: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  query?: string;
  zipCode?: string;
  radius?: number;
  filters?: JobSearchFilters;
  created_at: string;
  updated_at?: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  screenReaderOptimized: boolean;
}
