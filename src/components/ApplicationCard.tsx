import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { CalendarDays, Building2, MapPin, Clock } from 'lucide-react';
import { Application } from '@/types/application';
import { useAuth } from '@/hooks/useAuth';

interface ApplicationCardProps {
  application: Application;
  onUpdate?: (application: Application) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onUpdate }) => {
  const { user } = useAuth();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {application.job_title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <Building2 className="h-4 w-4" />
              <span>{application.company}</span>
            </div>
          </div>
          <Badge 
            variant={
              application.status === 'applied' ? 'secondary' :
              application.status === 'interviewing' ? 'default' :
              application.status === 'offer' ? 'default' :
              application.status === 'rejected' ? 'destructive' :
              'outline'
            }
          >
            {application.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 text-sm text-gray-600">
          {application.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{application.location}</span>
            </div>
          )}
          
          {application.applied_date && (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Applied {formatDistanceToNow(new Date(application.applied_date), { addSuffix: true })}</span>
            </div>
          )}
          
          {application.last_updated && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated {formatDistanceToNow(new Date(application.last_updated), { addSuffix: true })}</span>
            </div>
          )}
        </div>
        
        {application.notes && (
          <div className="mt-3 p-2 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">{application.notes}</p>
          </div>
        )}
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/applications/${application.id}`}>
              View Details
            </Link>
          </Button>
          {application.job_id && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/jobs/${application.job_id}`}>
                View Job
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
