
import { Badge } from '@/components/ui/badge';
import { ApplicationStatus } from '@/types/application';

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
      label = 'interviewing';
      break;
    case 'accepted':
      variant = 'success';
      label = 'accepted';
      break;
    case 'rejected':
      variant = 'destructive';
      label = 'rejected';
      break;
    case 'withdrawn':
      variant = 'outline';
      label = 'withdrawn';
      break;
    case 'offered':
      variant = 'info';
      label = 'offered';
      break;
    case 'offer received':
      variant = 'info';
      label = 'offer received';
      break;
    case 'hired':
      variant = 'success';
      label = 'hired';
      break;
    case 'pending':
      variant = 'secondary';
      label = 'pending';
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
