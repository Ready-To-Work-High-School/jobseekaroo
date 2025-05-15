
export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  user_type?: 'student' | 'employer' | 'admin' | 'teacher';
  company_name?: string;
  company_website?: string;
  job_title?: string;
  skills?: string[];
  resume_url?: string;
  resume_data_encrypted?: string;
  contact_details_encrypted?: string;
  badges?: Record<string, any>[];
  student_badges?: Record<string, any>[];
  preferences?: Record<string, any>;
  employer_verification_status?: string;
  verification_notes?: string;
  created_at: string;
  updated_at: string;
  redeemed_at?: string;
  redeemed_code?: string;
  accessibility_settings?: AccessibilitySettings;
}

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  avatar_url?: string;
  resume_url?: string;
  company_name?: string;
  company_website?: string;
  job_title?: string;
  accessibility_settings?: AccessibilitySettings;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  query: string;
  filters: Record<string, any>;
  name: string;
  created_at: string;
}

export interface UserBadge {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  earned_at: string;
}
