
import { format } from 'date-fns';
import { JobApplication } from '@/types/application';
import { ApplicationStatusBadge } from '@/components/ApplicationStatusBadge';
import { Building, Calendar } from 'lucide-react';
import { CardContent } from '@/components/ui/card';

interface ApplicationCardContentProps {
  application: JobApplication;
}

export const ApplicationCardContent = ({ application }: ApplicationCardContentProps) => {
  return (
    <CardContent className="pt-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{application.job_title}</h3>
          <div className="flex items-center text-muted-foreground mt-1">
            <Building className="h-4 w-4 mr-1" />
            <span>{application.company}</span>
          </div>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="flex items-center text-sm text-muted-foreground mt-1 mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Applied: {format(new Date(application.applied_date), 'MMM d, yyyy')}</span>
      </div>

      {application.notes && (
        <div className="mt-3 text-sm">
          <p className="text-muted-foreground line-clamp-2">{application.notes}</p>
        </div>
      )}

      {(application.next_step || application.next_step_date) && (
        <div className="mt-3 text-sm bg-secondary p-2 rounded-md">
          <div className="font-medium">Next Step:</div>
          <div className="text-muted-foreground mt-1 flex items-start gap-2">
            {application.next_step && (
              <span>{application.next_step}</span>
            )}
            {application.next_step_date && (
              <span className="text-muted-foreground">
                {format(new Date(application.next_step_date), 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>
      )}
    </CardContent>
  );
};
