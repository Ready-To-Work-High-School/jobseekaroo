
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Loader2 } from 'lucide-react';

interface UserActionButtonsProps {
  isLoading: boolean;
  onRefresh: () => void;
  onExport: () => void;
  usersCount: number;
}

const UserActionButtons: React.FC<UserActionButtonsProps> = ({
  isLoading,
  onRefresh,
  onExport,
  usersCount
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4 mr-2" />
        )}
        Refresh
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onExport}
        disabled={isLoading || usersCount === 0}
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
};

export default UserActionButtons;
