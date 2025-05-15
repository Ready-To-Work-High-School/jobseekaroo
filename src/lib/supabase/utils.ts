
import { ApplicationStatus } from '@/types/application';

// Validate application status to ensure it's a valid enum value
export const validateApplicationStatus = (status: string): ApplicationStatus => {
  const validStatuses: ApplicationStatus[] = [
    'applied',
    'interviewing',
    'offered',
    'rejected',
    'accepted',
    'withdrawn'
  ];
  
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  
  // Special case mappings for backward compatibility
  if (status === 'interview') return 'interviewing';
  if (status === 'offer') return 'offered';
  if (status === 'screening') return 'applied'; // Map screening to applied as fallback
  
  console.warn(`Invalid application status: ${status}, defaulting to 'applied'`);
  return 'applied';
};

// Additional Supabase utilities can be added here
