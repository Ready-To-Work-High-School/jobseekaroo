
import { UserBadge } from '@/types/badges';

export interface UserProfile {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  bio?: string | null;
  location?: string | null;
  resume_url?: string | null;
  skills?: string[] | null;
  preferences?: Record<string, any> | null;
  user_type?: 'student' | 'employer' | 'admin' | 'teacher' | null;
  saved_searches?: SavedSearch[];
  accessibility_settings?: AccessibilitySettings;
  redeemed_at?: string | null;
  redeemed_code?: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
  email?: string;
  company_name?: string | null;
  company_website?: string | null;
  job_title?: string | null;
  employer_verification_status?: 'pending' | 'approved' | 'rejected' | null;
  verification_notes?: string | null;
  resume_data_encrypted?: string | null;
  contact_details_encrypted?: string | null;
  badges?: UserBadge[];
  premium_status?: string;
}

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  resume_url?: string;
  skills?: string[];
  preferences?: Record<string, any>;
  user_type?: 'student' | 'employer' | 'admin' | 'teacher';
  redeemed_at?: string;
  redeemed_code?: string;
  avatar_url?: string;
  company_name?: string;
  company_website?: string;
  job_title?: string;
  employer_verification_status?: 'pending' | 'approved' | 'rejected';
  verification_notes?: string;
  accessibility_settings?: AccessibilitySettings;
  resume_data_encrypted?: string;
  contact_details_encrypted?: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  zipCode: string;
  radius?: number;
  filters: Record<string, any>;
  created_at?: string;
}

export interface JobRecommendation {
  id: string;
  user_id: string;
  job_id: string;
  score: number;
  reason: string | null;
  created_at: string;
}

export interface AccessibilitySettings {
  high_contrast: boolean;
  increased_font_size: boolean;
  reduce_motion: boolean;
  screen_reader_optimized: boolean;
}

export type { UserBadge } from '@/types/badges';
