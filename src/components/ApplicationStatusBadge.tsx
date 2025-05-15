
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ApplicationStatus } from '@/types/application';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  size?: 'default' | 'sm';
  className?: string;
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({
  status,
  size = 'default',
  className = '',
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200';
      case 'interviewing':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200';
      case 'offered':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200';
      case 'hired':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200';
    }
  };
  
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-sm';
  
  return (
    <Badge 
      variant="outline" 
      className={`font-medium border ${getStatusStyles()} ${sizeClass} ${className}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default ApplicationStatusBadge;
