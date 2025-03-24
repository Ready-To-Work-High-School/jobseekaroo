
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RedemptionCodeQR from './RedemptionCodeQR';
import { RedemptionCode } from '@/types/redemption';

interface QRCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  code: RedemptionCode | null;
}

const QRCodeDialog: React.FC<QRCodeDialogProps> = ({ isOpen, onClose, code }) => {
  if (!code) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code for Redemption</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <RedemptionCodeQR code={code.code} />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          This QR code links directly to your redemption page with the code pre-filled.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
