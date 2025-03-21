
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw } from 'lucide-react';

interface ApplicationsHeaderProps {
  onAddApplication: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const ApplicationsHeader = ({ 
  onAddApplication, 
  onRefresh,
  isRefreshing = false
}: ApplicationsHeaderProps) => {
  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Applications</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications in one place
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onRefresh} 
            variant="outline" 
            size="sm"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          
          <Button 
            onClick={onAddApplication} 
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>
    </div>
  );
};
