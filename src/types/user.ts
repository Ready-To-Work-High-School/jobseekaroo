
export interface UserProfile {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  user_type?: string;
  company_name?: string;
  company_website?: string;
  job_title?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  preferences: Record<string, any>;
  badges?: any[];
  student_badges?: any[];
  resume_url?: string;
  redeemed_code?: string;
  redeemed_at?: string;
  premium_status?: string;
  employer_verification_status?: string;
  verification_notes?: string;
  created_at: string;
  updated_at: string;
  contact_details_encrypted?: string;
  resume_data_encrypted?: string;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  query: string;
  filters: any;
  created_at: string;
  updated_at?: string;
}

export interface AdminUser extends Partial<UserProfile> {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  created_at: string;
  updated_at?: string;
  redeemed_at?: string; // Add redeemed_at to match UserProfile
}
