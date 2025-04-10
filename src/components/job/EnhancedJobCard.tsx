
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, CalendarDays, Share2, Bookmark, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/types/job';
import JobApplicationFlow from './JobApplicationFlow';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedJobCardProps {
  job: Job;
  size?: 'default' | 'compact';
  className?: string;
}

const EnhancedJobCard = ({ job, size = 'default', className }: EnhancedJobCardProps) => {
  const [showApplicationFlow, setShowApplicationFlow] = useState(false);
  const isMobile = useIsMobile();
  const isCompact = size === 'compact' || isMobile;
  
  const jobUrl = `/jobs/${job.id}`;
  const postedDate = new Date(job.postedDate);
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });
  
  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowApplicationFlow(true);
  };
  
  return (
    <>
      <Card className={cn("overflow-hidden transition-all hover:border-primary/50 hover:shadow-md", className)}>
        <Link to={jobUrl} className="block">
          <CardContent className={cn(
            "flex items-start gap-4",
            isCompact ? "p-3" : "p-5"
          )}>
            <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center overflow-hidden shrink-0">
              {job.company.logoUrl ? (
                <img 
                  src={job.company.logoUrl}
                  alt={job.company.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23dddddd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M12 7v10'%3E%3C/path%3E%3Cpath d='M7 12h10'%3E%3C/path%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <Briefcase className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                <h3 className={cn(
                  "font-semibold text-foreground line-clamp-1", 
                  isCompact ? "text-base" : "text-lg"
                )}>
                  {job.title}
                </h3>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs">{timeAgo}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                <span className="font-medium line-clamp-1">{job.company.name}</span>
              </div>
              
              {!isCompact ? (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{job.location.city}, {job.location.state}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                    <span>{job.type}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{job.location.city}, {job.location.state}</span>
                </div>
              )}
              
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                  ${job.payRate.min}-${job.payRate.max}/{job.payRate.period}
                </Badge>
                
                {job.isRemote && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                    Remote
                  </Badge>
                )}
                
                {job.isFlexible && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200">
                    Flexible Schedule
                  </Badge>
                )}
                
                {job.experienceLevel === 'entry-level' && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">
                    Entry Level
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Link>
        
        <CardFooter className={cn(
          "flex justify-between border-t bg-muted/10",
          isCompact ? "px-3 py-2" : "px-5 py-3"
        )}>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size={isCompact ? "sm" : "default"} className="gap-1">
              <Bookmark className={cn("", isCompact ? "h-4 w-4" : "h-4 w-4")} />
              <span className={isCompact ? "sr-only" : ""}>Save</span>
            </Button>
            
            <Button variant="ghost" size={isCompact ? "sm" : "default"} className="gap-1">
              <Share2 className={cn("", isCompact ? "h-4 w-4" : "h-4 w-4")} />
              <span className={isCompact ? "sr-only" : ""}>Share</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              as="a" 
              href={jobUrl}
              variant="outline" 
              size={isCompact ? "sm" : "default"} 
              className="gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className={cn("", isCompact ? "h-3.5 w-3.5" : "h-4 w-4")} />
              <span>Details</span>
            </Button>
            
            <Button 
              size={isCompact ? "sm" : "default"} 
              className="gap-1"
              onClick={handleApplyClick}
            >
              Apply Now
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {showApplicationFlow && (
        <JobApplicationFlow job={job} onClose={() => setShowApplicationFlow(false)} />
      )}
    </>
  );
};

export default EnhancedJobCard;
