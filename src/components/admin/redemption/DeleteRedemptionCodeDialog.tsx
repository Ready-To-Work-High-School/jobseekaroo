
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { RedemptionCode } from '@/types/redemption';

interface DeleteRedemptionCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  selectedCodes: RedemptionCode[];
}

const DeleteRedemptionCodeDialog: React.FC<DeleteRedemptionCodeDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCodes
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Redemption {selectedCodes.length === 1 ? 'Code' : 'Codes'}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {selectedCodes.length === 1 
              ? `the redemption code ${selectedCodes[0].code}?` 
              : `${selectedCodes.length} redemption codes?`
            }
            <br /><br />
            This action cannot be undone.
            {selectedCodes.some(code => code.used) && (
              <p className="mt-2 text-yellow-600 font-medium">
                Warning: One or more selected codes have already been used by users.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRedemptionCodeDialog;
