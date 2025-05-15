
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, MessageCircle, HourglassIcon, Award, User, LogOut } from 'lucide-react';
import { ApplicationStatus } from '@/types/job.d';
import { cn } from '@/lib/utils';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status, className }) => {
  const getStatusDetails = (status: ApplicationStatus): {
    label: string;
    color: string;
    icon: React.ReactNode;
  } => {
    switch (status) {
      case 'applied':
        return {
          label: 'Applied',
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="h-3 w-3" />
        };
      case 'interviewing':
        return {
          label: 'Interviewing',
          color: 'bg-purple-100 text-purple-800',
          icon: <MessageCircle className="h-3 w-3" />
        };
      case 'accepted':
        return {
          label: 'Accepted',
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-3 w-3" />
        };
      case 'offered':
        return {
          label: 'Offered',
          color: 'bg-amber-100 text-amber-800',
          icon: <Award className="h-3 w-3" />
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'bg-red-100 text-red-800',
          icon: <XCircle className="h-3 w-3" />
        };
      case 'pending':
        return {
          label: 'Pending',
          color: 'bg-gray-100 text-gray-800',
          icon: <HourglassIcon className="h-3 w-3" />
        };
      case 'hired':
        return {
          label: 'Hired',
          color: 'bg-emerald-100 text-emerald-800',
          icon: <User className="h-3 w-3" />
        };
      case 'withdrawn':
        return {
          label: 'Withdrawn',
          color: 'bg-neutral-100 text-neutral-800',
          icon: <LogOut className="h-3 w-3" />
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
          icon: <Clock className="h-3 w-3" />
        };
    }
  };

  const { label, color, icon } = getStatusDetails(status);

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', 
        color, 
        className
      )}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default ApplicationStatusBadge;
