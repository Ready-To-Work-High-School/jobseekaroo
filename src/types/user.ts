
export interface UserProfile {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  job_title?: string;
  skills?: string[];
  preferences?: any;
  company_name?: string;
  company_website?: string;
  premium_status?: string;
  employer_verification_status?: string;
  user_type?: string;
  badges?: any[];
  student_badges?: any[];
  created_at: string;
  updated_at: string;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  query?: string;
  zipCode?: string;
  radius?: number;
  filters?: any;
  created_at: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  user_type?: string;
  created_at: string;
  updated_at?: string;
  preferences?: any;
  premium_status?: string;
}
