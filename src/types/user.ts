
export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  user_type?: 'student' | 'employer' | 'admin';
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
}
