import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Building2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Job {
  id: string;
  title: string;
  company_name: string;
  location_city: string;
  location_state: string;
  job_type: string;
  pay_rate_min: number;
  pay_rate_max: number;
  pay_rate_period: string;
  posted_date: string;
  logo_url?: string;
  is_featured?: boolean;
  is_remote?: boolean;
  is_flexible?: boolean;
  description?: string;
  experience_level?: string;
}

interface EnhancedJobCardProps {
  job: Job;
  size?: 'default' | 'compact';
  className?: string;
}

const EnhancedJobCard: React.FC<EnhancedJobCardProps> = ({ 
  job, 
  size = 'default',
  className 
}) => {
  // Safely handle potentially undefined job data
  if (!job) {
    return (
      <Card className={cn("hover:shadow-md transition-shadow", className)}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Job data unavailable
          </div>
        </CardContent>
      </Card>
    );
  }

  const isCompact = size === 'compact';
  
  // Format posted date safely
  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return '1 day ago';
      if (diffDays <= 7) return `${diffDays} days ago`;
      if (diffDays <= 14) return '1 week ago';
      if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      return '1+ month ago';
    } catch (error) {
      return 'Recently posted';
    }
  };

  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <Card className={cn(
        "hover:shadow-md transition-shadow cursor-pointer",
        job.is_featured && "ring-2 ring-blue-200 border-blue-300",
        className
      )}>
        <CardContent className={cn("p-6", isCompact && "p-4")}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              {/* Company logo with safe handling */}
              {job.logo_url ? (
                <div className="flex-shrink-0">
                  <img 
                    src={job.logo_url} 
                    alt={`${job.company_name} logo`}
                    className={cn(
                      "rounded-lg object-contain bg-white border",
                      isCompact ? "w-10 h-10" : "w-12 h-12"
                    )}
                    onError={(e) => {
                      // Hide image if it fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className={cn(
                  "flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center border",
                  isCompact ? "w-10 h-10" : "w-12 h-12"
                )}>
                  <Building2 className={cn(
                    "text-gray-400",
                    isCompact ? "h-5 w-5" : "h-6 w-6"
                  )} />
                </div>
              )}
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={cn(
                    "font-semibold text-gray-900 truncate",
                    isCompact ? "text-base" : "text-lg"
                  )}>
                    {job.title || 'Job Title Unavailable'}
                  </h3>
                  {job.is_featured && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                  )}
                </div>
                <p className={cn(
                  "text-gray-600 truncate",
                  isCompact ? "text-sm" : "text-base"
                )}>
                  {job.company_name || 'Company Unavailable'}
                </p>
              </div>
            </div>
            
            <div className="text-right flex-shrink-0">
              <div className={cn(
                "font-semibold text-green-600",
                isCompact ? "text-sm" : "text-base"
              )}>
                ${job.pay_rate_min || 0}-${job.pay_rate_max || 0}
                <span className="text-gray-500">
                  /{job.pay_rate_period === 'hourly' ? 'hr' : job.pay_rate_period || 'hr'}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {job.posted_date ? formatPostedDate(job.posted_date) : 'Recently posted'}
              </div>
            </div>
          </div>

          {/* Job details */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              {job.location_city && job.location_state 
                ? `${job.location_city}, ${job.location_state}`
                : 'Location TBD'
              }
            </Badge>
            
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {job.job_type ? job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1) : 'Type TBD'}
            </Badge>
            
            {job.is_remote && (
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                Remote
              </Badge>
            )}
            
            {job.is_flexible && (
              <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                Flexible
              </Badge>
            )}
          </div>

          {/* Description preview for non-compact cards */}
          {!isCompact && job.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {job.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {job.experience_level && (
                <Badge variant="outline" className="text-xs">
                  {job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1)}
                </Badge>
              )}
            </div>
            
            <Button size={isCompact ? "sm" : "default"} onClick={(e) => e.stopPropagation()}>
              {isCompact ? 'View' : 'View Details'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EnhancedJobCard;
