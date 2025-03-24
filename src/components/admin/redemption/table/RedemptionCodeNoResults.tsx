
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const RedemptionCodeNoResults: React.FC = () => {
  return (
    <Alert variant="default" className="border-dashed bg-muted/50 mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-sm text-muted-foreground">
        No redemption codes found for the selected filter. Try generating some codes or changing the filter.
      </AlertDescription>
    </Alert>
  );
};

export default RedemptionCodeNoResults;
