
import { ApplicationStatus } from '@/types/application';

export const validateApplicationStatus = (status: string): ApplicationStatus => {
  const validStatuses: ApplicationStatus[] = ['applied', 'interviewing', 'rejected', 'accepted', 'pending', 'hired', 'withdrawn', 'offered'];
  
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  
  // Default to 'applied' if invalid status
  return 'applied';
};
