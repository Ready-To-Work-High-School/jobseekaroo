
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';

interface DeleteCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: RedemptionCode | null;
  onConfirm: () => void;
}

const DeleteCodeDialog = ({
  open,
  onOpenChange,
  code,
  onConfirm
}: DeleteCodeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Redemption Code
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this code? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        {code && (
          <div className="py-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Code:</div>
                <div className="font-mono">{code.code}</div>
                
                <div className="font-medium">Type:</div>
                <div className="capitalize">{code.type}</div>
                
                <div className="font-medium">Status:</div>
                <div>{code.used ? 'Used' : 'Unused'}</div>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCodeDialog;
