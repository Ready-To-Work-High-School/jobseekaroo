
import React from 'react';

interface RedemptionCodeEmptyStateProps {
  message?: string;
  submessage?: string;
}

const RedemptionCodeEmptyState: React.FC<RedemptionCodeEmptyStateProps> = ({
  message = "No redemption codes found",
  submessage = "Try changing the filter or generate new codes"
}) => {
  return (
    <div className="text-center p-8 border rounded-md bg-muted/20">
      <p className="text-muted-foreground mb-2">{message}</p>
      <p className="text-sm text-muted-foreground">{submessage}</p>
    </div>
  );
};

export default RedemptionCodeEmptyState;
