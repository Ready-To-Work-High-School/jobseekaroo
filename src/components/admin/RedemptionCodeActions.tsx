
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Download, Printer, Mail, Trash, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RedemptionCodeActionsProps {
  selectedCount: number;
  onRefresh: () => Promise<void>;
  onExport: () => void;
  onPrint: () => void;
  onEmailSelected: () => void;
  onDeleteSelected: () => void;
  isRefreshing?: boolean;
}

const RedemptionCodeActions: React.FC<RedemptionCodeActionsProps> = ({
  selectedCount,
  onRefresh,
  onExport,
  onPrint,
  onEmailSelected,
  onDeleteSelected,
  isRefreshing = false
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
      <TooltipProvider delayDuration={300}>
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onRefresh} disabled={isRefreshing}>
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4 mr-2" />
                )}
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh code list</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export codes as CSV</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onPrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Print code list</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      
      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2 hidden sm:inline">
            {selectedCount} {selectedCount === 1 ? 'code' : 'codes'} selected
          </span>
          <Button variant="secondary" size="sm" onClick={onEmailSelected}>
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="destructive" size="sm" onClick={onDeleteSelected}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default RedemptionCodeActions;
