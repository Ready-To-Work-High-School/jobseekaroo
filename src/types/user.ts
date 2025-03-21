
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
  saved_searches?: SavedSearch[];
  accessibility_settings?: AccessibilitySettings;
  notification_preferences?: NotificationPreferences;
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
