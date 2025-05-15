
export interface UserBadge {
  id: string;
  name: string;
  earned_at?: string;
}

export interface AccessibilitySettings {
  highContrast?: boolean;
  largeText?: boolean;
  screenReader?: boolean;
  reducedMotion?: boolean;
  dyslexicFont?: boolean;
}

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  resume_url?: string;
  skills?: string[];
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
  user_type?: "student" | "employer" | "admin" | "teacher";
  redeemed_at?: string;
  redeemed_code?: string;
  avatar_url?: string;
  resume_data_encrypted?: string;
  contact_details_encrypted?: string;
  employer_verification_status?: string;
  email?: string;
  company_name?: string;
  company_website?: string;
  verification_notes?: string;
  job_title?: string;
  student_badges: Record<string, any>[];
  badges: UserBadge[];
  accessibility_settings?: AccessibilitySettings;
}

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  preferences?: Record<string, any>;
  avatar_url?: string;
  company_name?: string;
  company_website?: string;
  job_title?: string;
  accessibility_settings?: AccessibilitySettings;
}

export interface AdminUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: "student" | "employer" | "admin" | "teacher";
  created_at: string;
  updated_at: string;
  badges?: UserBadge[];
  student_badges?: Record<string, any>[];
}
