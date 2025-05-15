
import { Badge } from '@/components/ui/badge';
import { ApplicationStatus } from '@/types/job';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'default';
}

const ApplicationStatusBadge = ({ status, size = 'default' }: ApplicationStatusBadgeProps) => {
  let variant = 'default';
  let label = status;
  const className = size === 'sm' ? 'text-xs py-0 px-2' : '';
  
  switch (status) {
    case 'applied':
      variant = 'secondary';
      break;
    case 'interviewing':
      variant = 'warning';
      label = 'Interviewing';
      break;
    case 'accepted':
      variant = 'success';
      label = 'Accepted';
      break;
    case 'rejected':
      variant = 'destructive';
      label = 'Rejected';
      break;
    case 'withdrawn':
      variant = 'outline';
      label = 'Withdrawn';
      break;
    case 'offered':
      variant = 'info';
      label = 'Offer Received';
      break;
    case 'hired':
      variant = 'success';
      label = 'Hired';
      break;
    default:
      variant = 'secondary';
  }
  
  return (
    <Badge variant={variant as any} className={className}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </Badge>
  );
};

export default ApplicationStatusBadge;
