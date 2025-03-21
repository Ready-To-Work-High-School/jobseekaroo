
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

interface ApplicationsHeaderProps {
  onAddApplication: () => void;
  onRefresh: () => void;
}

export const ApplicationsHeader = ({ onAddApplication, onRefresh }: ApplicationsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage your job applications
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
        <Button onClick={onAddApplication}>
          <Plus className="h-4 w-4 mr-1" />
          Add Application
        </Button>
      </div>
    </div>
  );
};
