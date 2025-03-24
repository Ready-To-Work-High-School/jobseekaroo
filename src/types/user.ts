
export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  location: string | null;
  resume_url: string | null;
  skills: string[] | null;
  preferences: Record<string, any> | null;
  user_type?: 'student' | 'employer' | 'admin' | null;
}

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  resume_url?: string;
  skills?: string[];
  preferences?: Record<string, any>;
  user_type?: 'student' | 'employer' | 'admin';
}
