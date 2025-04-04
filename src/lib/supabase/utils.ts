
import { ApplicationStatus } from '@/types/application';

// Validate application status to ensure it's a valid enum value
export const validateApplicationStatus = (status: string): ApplicationStatus => {
  const validStatuses: ApplicationStatus[] = [
    'applied',
    'screening',
    'interview',
    'offer',
    'rejected',
    'accepted',
    'withdrawn'
  ];
  
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  
  console.warn(`Invalid application status: ${status}, defaulting to 'applied'`);
  return 'applied';
};

// Additional Supabase utilities can be added here
