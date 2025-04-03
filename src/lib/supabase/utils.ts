
import { ApplicationStatus } from '@/types/application';
import { supabase } from './index';

// Helper function to validate application status
export function validateApplicationStatus(status: string): ApplicationStatus {
  const validStatuses: ApplicationStatus[] = ['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn'];
  
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  
  // Default to 'applied' if an invalid status is provided
  return 'applied';
}

// Get the base URL for authentication redirects
export function getRedirectUrl(): string {
  // In production, use the actual deployed URL
  // For local development, use localhost
  return `${window.location.origin}/`;
}
