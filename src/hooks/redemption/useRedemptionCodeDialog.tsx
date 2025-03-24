
import { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';

export function useRedemptionCodeDialog() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<RedemptionCode[]>([]);
  
  const openDeleteDialog = (codes: RedemptionCode[]) => {
    if (codes.length > 0) {
      setSelectedForDelete(codes);
      setShowDeleteDialog(true);
    }
  };
  
  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  
  return {
    showDeleteDialog,
    selectedForDelete,
    openDeleteDialog,
    closeDeleteDialog
  };
}
