import { ApplicationStatus } from '@/types/application';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  CalendarRange, 
  CheckCircle, 
  ThumbsUp, 
  XCircle, 
  XOctagon 
} from 'lucide-react';
import { Badge } from './ui/badge';
import { validateApplicationStatus } from '@/lib/supabase';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
  large?: boolean;
}

export const ApplicationStatusBadge = ({ status, className, large = false }: ApplicationStatusBadgeProps) => {
  // Make sure we're dealing with a valid status
  const validStatus = validateApplicationStatus(status);
  
  const getStatusConfig = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return {
          icon: Clock,
          label: 'Applied',
          variant: 'secondary' as const,
        };
      case 'interviewing':
        return {
          icon: CalendarRange,
          label: 'Interviewing',
          variant: 'default' as const,
        };
      case 'offered':
        return {
          icon: ThumbsUp,
          label: 'Offered',
          variant: 'default' as const,
        };
      case 'accepted':
        return {
          icon: CheckCircle,
          label: 'Accepted',
          variant: 'default' as const,
        };
      case 'rejected':
        return {
          icon: XCircle,
          label: 'Rejected',
          variant: 'outline' as const,
        };
      case 'withdrawn':
        return {
          icon: XOctagon,
          label: 'Withdrawn',
          variant: 'outline' as const,
        };
      default:
        return {
          icon: Clock,
          label: 'Unknown',
          variant: 'secondary' as const,
        };
    }
  };

  const { icon: Icon, label, variant } = getStatusConfig(validStatus);

  return (
    <Badge 
      variant={variant} 
      className={cn(
        "gap-1 font-medium flex items-center",
        status === 'applied' && "bg-secondary text-secondary-foreground",
        status === 'interviewing' && "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
        status === 'offered' && "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
        status === 'accepted' && "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
        status === 'rejected' && "bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-100",
        status === 'withdrawn' && "bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-100",
        large && "text-sm px-3 py-1",
        className
      )}
    >
      <Icon className={cn("h-3 w-3", large && "h-4 w-4")} />
      {label}
    </Badge>
  );
};
