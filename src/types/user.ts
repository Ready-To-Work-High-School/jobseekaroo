
export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  location: string | null;
  resume_url: string | null;
  skills: string[] | null;
  preferences: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  user_type?: 'jobseeker' | 'employer' | null;
  saved_searches?: SavedSearch[];
  accessibility_settings?: AccessibilitySettings;
  notification_preferences?: NotificationPreferences;
  education?: Education[];
  work_experience?: WorkExperience[];
  certifications?: Certification[];
  languages?: Language[];
}

export interface SavedSearch {
  id: string;
  name: string;
  zipCode: string;
  radius?: number;
  filters: Record<string, any>;
  created_at: string;
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

export interface NotificationPreferences {
  email_alerts: boolean;
  job_recommendations: boolean;
  application_updates: boolean;
  saved_search_alerts: boolean;
  newsletter: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string | null;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string | null;
  responsibilities: string[] | null;
  achievements: string[] | null;
}

export interface Certification {
  id: string;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
}

export interface Language {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'fluent' | 'native';
}
