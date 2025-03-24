
import { useCallback } from 'react';
import { RedemptionCode } from '@/types/redemption';

interface DeleteCodeHandlerProps {
  handleDeleteSelectedCodes: (codeIds: string[]) => Promise<number>;
  selectedCodes: RedemptionCode[];
  selectedForDelete: RedemptionCode[];
  fetchCodes: () => Promise<void>;
  clearSelection: () => void;
  openDeleteDialog: (codes: RedemptionCode[]) => void;
  closeDeleteDialog: () => void;
}

export function useDeleteCodeHandler({
  handleDeleteSelectedCodes,
  selectedCodes,
  selectedForDelete,
  fetchCodes,
  clearSelection,
  openDeleteDialog,
  closeDeleteDialog
}: DeleteCodeHandlerProps) {
  
  const handleShowDeleteDialog = useCallback(() => {
    if (selectedCodes.length > 0) {
      openDeleteDialog(selectedCodes);
    }
  }, [selectedCodes, openDeleteDialog]);

  const handleConfirmDelete = useCallback(async () => {
    await handleDeleteSelectedCodes(selectedForDelete.map(code => code.id));
    clearSelection();
    closeDeleteDialog();
    await fetchCodes();
  }, [handleDeleteSelectedCodes, selectedForDelete, clearSelection, closeDeleteDialog, fetchCodes]);

  return {
    handleShowDeleteDialog,
    handleConfirmDelete
  };
}
