
import { RedemptionCode } from '@/types/redemption';
import { useToast } from '@/hooks/use-toast';

interface DeleteHandlersProps {
  selectedCodes: RedemptionCode[];
  openDeleteDialog: (code: RedemptionCode[]) => void;
}

export function useDeleteHandlers({ selectedCodes, openDeleteDialog }: DeleteHandlersProps) {
  const { toast } = useToast();
  
  // Handle delete selected
  const handleDeleteSelected = () => {
    if (selectedCodes.length === 0) {
      toast({
        title: 'No Codes Selected',
        description: 'Please select at least one code to delete.',
        variant: 'destructive',
      });
      return;
    }
    
    openDeleteDialog(selectedCodes);
  };

  return {
    handleDeleteSelected
  };
}
