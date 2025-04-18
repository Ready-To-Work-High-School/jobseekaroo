
import { RedemptionCode } from '@/types/redemption';

interface DeleteHandlersProps {
  selectedCodes: RedemptionCode[];
  openDeleteDialog: (codes: RedemptionCode[]) => void;
}

export function useDeleteHandlers({
  selectedCodes,
  openDeleteDialog
}: DeleteHandlersProps) {
  
  const handleDeleteSelected = () => {
    if (selectedCodes.length === 0) {
      // In a real implementation, you would show a toast notification
      console.log('No codes selected');
      return;
    }
    
    openDeleteDialog(selectedCodes);
  };

  return {
    handleDeleteSelected
  };
}
