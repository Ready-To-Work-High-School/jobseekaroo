
export interface UserProfile {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  user_type?: 'student' | 'employer' | 'admin' | 'teacher';
  company_name?: string;
  company_website?: string;
  phone?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  redeemed_code?: string;
  redeemed_at?: string;
  premium_status?: string;
  created_at: string;
  updated_at: string;
  preferences: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    hasPremium?: boolean;
    accessibility_settings?: {
      fontSize?: 'small' | 'medium' | 'large';
      highContrast?: boolean;
      reduceMotion?: boolean;
    };
  };
  contact_details_encrypted?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  company_name?: string;
  company_website?: string;
  created_at: string;
  updated_at?: string;
  redeemed_code?: string;
  redeemed_at?: string;
  premium_status?: string;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  query: string;
  filters: JobSearchFilters;
  created_at: string;
  updated_at?: string;
}
