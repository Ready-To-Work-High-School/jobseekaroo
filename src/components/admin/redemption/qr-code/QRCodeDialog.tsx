
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodeQR from './RedemptionCodeQR';

interface QRCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  code: RedemptionCode | null;
}

const QRCodeDialog: React.FC<QRCodeDialogProps> = ({
  isOpen,
  onClose,
  code
}) => {
  if (!code) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Redemption Code QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <RedemptionCodeQR 
            code={code.code} 
            codeData={code}
            size={220} 
            withSecurityFeatures={true}
          />
          
          <div className="text-sm text-center">
            <p className="text-muted-foreground mb-2">
              This QR code includes security features:
            </p>
            <ul className="text-left text-xs space-y-1 text-muted-foreground">
              <li>• One-time use validation</li>
              <li>• Security hash verification</li>
              <li>• Expiration validation ({code.expiresAt ? new Date(code.expiresAt).toLocaleDateString() : 'None'})</li>
              <li>• Code type: {code.type}</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
