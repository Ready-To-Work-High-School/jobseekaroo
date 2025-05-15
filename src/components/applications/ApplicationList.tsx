import React from 'react';
import ApplicationCard from "@/components/ApplicationCard";
import { Button } from '@/components/ui/button';
import { Briefcase, Plus } from 'lucide-react';

interface ApplicationListProps {
  applications: any[];
  isLoading: boolean;
  onUpdate: () => void;
  totalCount: number;
  onAddFirst: () => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  isLoading,
  onUpdate,
  totalCount,
  onAddFirst
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-md p-4 border">
            <div className="h-4 bg-muted rounded-md w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded-md w-1/2 mb-4"></div>
            <div className="h-2 bg-muted rounded-md w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <Briefcase className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          No Applications Yet
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Start tracking your job applications to stay organized.
        </p>
        <Button onClick={onAddFirst}>
          <Plus className="h-4 w-4 mr-2" />
          Add Your First Application
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onDelete={async (id: string) => {
            // Optimistically update the UI
            const updatedApplications = applications.filter(app => app.id !== id);
            // setApplications(updatedApplications);
            onUpdate();
          }}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
