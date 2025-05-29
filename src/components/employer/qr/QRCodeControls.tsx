
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, RefreshCw } from 'lucide-react';

interface QRCodeControlsProps {
  onManualRefresh: () => void;
  onDownload: () => void;
  onShare: () => void;
  isBlocked: boolean;
}

const QRCodeControls: React.FC<QRCodeControlsProps> = ({
  onManualRefresh,
  onDownload,
  onShare,
  isBlocked
}) => {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onManualRefresh}
        disabled={isBlocked}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh Now
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onDownload}
        disabled={isBlocked}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onShare}
        disabled={isBlocked}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
};

export default QRCodeControls;
