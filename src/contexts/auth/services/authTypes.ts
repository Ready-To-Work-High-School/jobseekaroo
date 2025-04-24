
import { User } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error: Error | null;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType?: 'student' | 'employer';
  additionalData?: Record<string, any>;
}

export interface EmployerVerificationResult {
  canPostJobs: boolean;
  message: string;
}
