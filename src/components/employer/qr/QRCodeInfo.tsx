
import React from 'react';

interface QRCodeInfoProps {
  qrValue: string;
  refreshInterval: number;
  remainingRequests: number;
}

const QRCodeInfo: React.FC<QRCodeInfoProps> = ({
  qrValue,
  refreshInterval,
  remainingRequests
}) => {
  return (
    <div className="text-center space-y-2">
      <p className="text-sm text-muted-foreground">
        Scan to create a job posting
      </p>
      <p className="text-xs text-green-600 font-medium">
        🔒 Auto-refreshes every {refreshInterval}s for security
      </p>
      <p className="text-xs text-orange-600 font-medium">
        ⏱️ Session validation: {refreshInterval}s window
      </p>
      <p className="text-xs text-blue-600 font-medium">
        ⚡ {remainingRequests} manual actions remaining
      </p>
      <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
        {qrValue}
      </p>
    </div>
  );
};

export default QRCodeInfo;
