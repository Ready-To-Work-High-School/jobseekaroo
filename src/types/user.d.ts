
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
  preferences: Record<string, any>;
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
