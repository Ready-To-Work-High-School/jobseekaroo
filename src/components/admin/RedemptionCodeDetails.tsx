
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, QrCode } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodeQR from './redemption/qr-code/RedemptionCodeQR';

interface RedemptionCodeDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCode: RedemptionCode | null;
  onCopyCode: (code: string) => void;
  formatDate: (date?: Date | string) => string;
}

const RedemptionCodeDetails: React.FC<RedemptionCodeDetailsProps> = ({
  isOpen,
  onClose,
  selectedCode,
  onCopyCode,
  formatDate
}) => {
  const [showQR, setShowQR] = React.useState(false);
  
  if (!selectedCode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Redemption Code Details</DialogTitle>
        </DialogHeader>
        
        {showQR ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <RedemptionCodeQR code={selectedCode.code} size={180} />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowQR(false)}
              className="w-full"
            >
              Show Details
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Code</p>
                <p className="font-mono font-medium">{selectedCode.code}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <Badge variant={selectedCode.type === 'student' ? 'default' : 'outline'}>
                  {selectedCode.type === 'student' ? 'Student' : 'Employer'}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant={selectedCode.used ? 'destructive' : 'success'}>
                  {selectedCode.used ? 'Used' : 'Available'}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p>{formatDate(selectedCode.createdAt)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Expires</p>
                <p>{formatDate(selectedCode.expiresAt)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Used By</p>
                <p>{selectedCode.usedBy || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Used At</p>
                <p>{formatDate(selectedCode.usedAt)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">ID</p>
                <p className="text-xs text-muted-foreground truncate">{selectedCode.id}</p>
              </div>
            </div>
            
            <div className="pt-2 border-t flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onCopyCode(selectedCode.code)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setShowQR(true)}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Show QR Code
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RedemptionCodeDetails;
