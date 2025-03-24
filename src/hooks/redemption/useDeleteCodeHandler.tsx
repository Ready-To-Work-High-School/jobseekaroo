
import { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';
import { useToast } from '@/hooks/use-toast';

export interface DeleteCodeHandlerProps {
  handleDeleteSelectedCodes: (selectedCodeIds: string[]) => Promise<number>;
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
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShowDeleteDialog = () => {
    if (selectedCodes.length > 0) {
      openDeleteDialog(selectedCodes);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedForDelete.length === 0) return;
    
    setIsDeleting(true);
    try {
      const codeIds = selectedForDelete.map(code => code.id);
      const deletedCount = await handleDeleteSelectedCodes(codeIds);
      
      if (deletedCount > 0) {
        await fetchCodes();
        clearSelection();
        
        toast({
          title: 'Success',
          description: `Deleted ${deletedCount} codes successfully`,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete the selected codes',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting codes:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while deleting codes',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      closeDeleteDialog();
    }
  };

  return {
    isDeleting,
    handleShowDeleteDialog,
    handleConfirmDelete
  };
}
