
import React, { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodeDetails from '@/components/admin/RedemptionCodeDetails';
import { useToast } from '@/hooks/use-toast';

interface CodeDetailViewProps {
  formatDate: (date?: Date | string) => string;
}

export function useCodeDetailView({ formatDate }: CodeDetailViewProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCodeForDetails, setSelectedCodeForDetails] = useState<RedemptionCode | null>(null);
  const { toast } = useToast();

  const handleViewDetails = (code: RedemptionCode) => {
    setSelectedCodeForDetails(code);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The code has been copied to your clipboard.",
      });
    }).catch(err => {
      console.error('Failed to copy code:', err);
      toast({
        title: "Copy failed",
        description: "Failed to copy the code to clipboard.",
        variant: "destructive",
      });
    });
  };

  const handleEmailCode = (code: RedemptionCode) => {
    // This would typically open an email dialog or form
    console.log('Email code:', code);
    toast({
      title: "Email action triggered",
      description: `Preparing to email code: ${code.code}`,
    });
  };
  
  const handleBulkEmail = (codes: RedemptionCode[]) => {
    // This would typically open a bulk email dialog
    console.log('Bulk email codes:', codes);
    toast({
      title: "Bulk email action triggered",
      description: `Preparing to email ${codes.length} codes`,
    });
  };

  const handleSelectCode = (code: RedemptionCode, isSelected: boolean) => {
    // This will be implemented by the parent component
    console.log('Select code:', code, isSelected);
  };

  const handleSelectAll = (isSelected: boolean) => {
    // This will be implemented by the parent component
    console.log('Select all:', isSelected);
  };

  const handlePageChange = (page: number) => {
    // This will be implemented by the parent component
    console.log('Page change:', page);
  };

  const handlePageSizeChange = (size: number) => {
    // This will be implemented by the parent component
    console.log('Page size change:', size);
  };

  // Render the details view
  const detailsView = (
    <RedemptionCodeDetails
      isOpen={isDetailsOpen}
      onClose={handleCloseDetails}
      selectedCode={selectedCodeForDetails}
      onCopyCode={handleCopyCode}
      formatDate={formatDate}
    />
  );

  return {
    detailsView,
    handlers: {
      handleViewDetails,
      handleCopyCode,
      handleEmailCode,
      handleBulkEmail,
      handleSelectCode,
      handleSelectAll,
      handlePageChange,
      handlePageSizeChange
    }
  };
}
