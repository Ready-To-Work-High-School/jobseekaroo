
import ApplicationCard from '@/components/ApplicationCard';
import { Button } from '@/components/ui/button';
import { JobApplication } from '@/types/application';

interface ApplicationListProps {
  applications: JobApplication[];
  isLoading: boolean;
  onUpdate: () => void;
  totalCount: number;
  onAddFirst: () => void;
}

export const ApplicationList = ({
  applications,
  isLoading,
  onUpdate,
  totalCount,
  onAddFirst
}: ApplicationListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/20 rounded-lg">
        <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-muted-foreground"
          >
            <rect width="8" height="14" x="8" y="5" rx="1" />
            <path d="M4 5h4" />
            <path d="M16 5h4" />
            <path d="M4 10h4" />
            <path d="M16 10h4" />
            <path d="M4 15h4" />
            <path d="M16 15h4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium">No applications found</h3>
        <p className="text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
          {totalCount === 0 
            ? "You haven't added any job applications to track yet."
            : "No applications match your current filters."}
        </p>
        {totalCount === 0 && (
          <Button onClick={onAddFirst}>
            Add Your First Application
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {applications.map((application) => (
        <ApplicationCard 
          key={application.id} 
          application={application} 
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
