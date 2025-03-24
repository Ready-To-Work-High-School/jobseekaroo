
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RedemptionCode } from '@/types/redemption';
import { deleteRedemptionCode, deleteRedemptionCodes } from '@/lib/supabase/redemption';

export function useCodeDeletion() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteCode = async (code: RedemptionCode) => {
    setIsDeleting(true);
    try {
      const success = await deleteRedemptionCode(code.id);
      
      if (success) {
        toast({
          title: 'Success',
          description: `Redemption code ${code.code} deleted successfully`,
        });
        return true;
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete redemption code',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Error deleting redemption code:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteSelectedCodes = async (selectedCodeIds: string[]) => {
    if (selectedCodeIds.length === 0) return 0;
    
    setIsDeleting(true);
    try {
      const deletedCount = await deleteRedemptionCodes(selectedCodeIds);
      
      if (deletedCount > 0) {
        toast({
          title: 'Success',
          description: `Deleted ${deletedCount} redemption codes successfully`,
        });
        return deletedCount;
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete redemption codes',
          variant: 'destructive',
        });
        return 0;
      }
    } catch (error) {
      console.error('Error deleting redemption codes:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return 0;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDeleteCode,
    handleDeleteSelectedCodes
  };
}
