
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Download, Printer, Mail } from 'lucide-react';

interface RedemptionCodeActionsProps {
  selectedCount: number;
  onRefresh: () => Promise<void>;
  onExport: () => void;
  onPrint: () => void;
  onEmailSelected: () => void;
}

const RedemptionCodeActions: React.FC<RedemptionCodeActionsProps> = ({
  selectedCount,
  onRefresh,
  onExport,
  onPrint,
  onEmailSelected
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm" onClick={onPrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>
      
      {selectedCount > 0 && (
        <Button variant="secondary" size="sm" onClick={onEmailSelected}>
          <Mail className="h-4 w-4 mr-2" />
          Email Selected ({selectedCount})
        </Button>
      )}
    </div>
  );
};

export default RedemptionCodeActions;
