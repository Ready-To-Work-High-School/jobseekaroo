
import { RedemptionCode } from '@/types/redemption';
import { useToast } from '@/hooks/use-toast';
import { useClipboard } from '@/hooks/useClipboard';

interface BasicHandlersProps {
  fetchCodes: () => Promise<void>;
  exportCodes: (codes: RedemptionCode[], format?: 'csv' | 'json' | 'txt') => Promise<void>;
}

export function useBasicHandlers({ fetchCodes, exportCodes }: BasicHandlersProps) {
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();
  
  // Handle copying code to clipboard
  const handleCopyCode = (code: string) => {
    copyToClipboard(code);
    toast({
      title: 'Copied to clipboard',
      description: `Code ${code} copied to clipboard.`,
    });
  };
  
  // Handle refresh
  const handleRefresh = async () => {
    await fetchCodes();
    toast({
      title: 'Refreshed',
      description: 'The code list has been refreshed.',
    });
  };
  
  // Handle export
  const handleExport = (filteredCodes: RedemptionCode[]) => {
    exportCodes(filteredCodes, 'csv');
  };
  
  // Handle print
  const handlePrint = () => {
    window.print();
  };
  
  // Handle apply filters
  const handleApplyFilters = (filters: any) => {
    console.log('Applying filters:', filters);
    // Logic to apply filters would go here
  };

  return {
    handleCopyCode,
    handleRefresh,
    handleExport,
    handlePrint,
    handleApplyFilters
  };
}
