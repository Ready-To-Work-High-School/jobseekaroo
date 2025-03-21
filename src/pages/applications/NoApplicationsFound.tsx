
import { Button } from '@/components/ui/button';

interface NoApplicationsFoundProps {
  hasApplications: boolean;
  onAddApplication: () => void;
}

export const NoApplicationsFound = ({ hasApplications, onAddApplication }: NoApplicationsFoundProps) => {
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
        {hasApplications
          ? "No applications match your current filters."
          : "You haven't added any job applications to track yet."}
      </p>
      {!hasApplications && (
        <Button onClick={onAddApplication}>
          Add Your First Application
        </Button>
      )}
    </div>
  );
};
