
import { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';
import { useRedemptionCodeUtils } from '@/hooks/redemption/useRedemptionCodeUtils';
import { useClipboard } from '@/hooks/useClipboard';
import { useToast } from '@/hooks/use-toast';
import { useCodeGenerationHandler } from '@/hooks/redemption/useCodeGenerationHandler';
import { useDeleteCodeHandler } from '@/hooks/redemption/useDeleteCodeHandler';
import { useCodeDetailView } from './useCodeDetailView';

interface RedemptionContainerHandlersProps {
  handleGenerateCode: (type: 'student' | 'employer', expireDays: number) => Promise<RedemptionCode | null>;
  handleBulkGenerate: (amount: number, type: 'student' | 'employer', expireDays: number) => Promise<RedemptionCode[]>;
  handleAutomatedCodeGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<RedemptionCode[]>;
  handleDeleteSelectedCodes: (selectedCodeIds: string[]) => Promise<number>;
  codeType: 'student' | 'employer';
  expireDays: number;
  selectedCodes: RedemptionCode[];
  selectedForDelete: RedemptionCode[];
  filteredCodes: RedemptionCode[];
  updateCodes: (codes: RedemptionCode[]) => void;
  fetchCodes: () => Promise<void>;
  clearSelection: () => void;
  openDeleteDialog: (code: RedemptionCode[]) => void;
  closeDeleteDialog: () => void;
  formatDate: (date?: Date | string) => string;
  exportCodes: (codes: RedemptionCode[], format?: 'csv' | 'json' | 'txt') => Promise<void>;
  scheduleEmail: (params: any) => Promise<boolean>;
  isScheduling: boolean;
}

export function useRedemptionContainerHandlers({
  handleGenerateCode,
  handleBulkGenerate,
  handleAutomatedCodeGeneration,
  handleDeleteSelectedCodes,
  codeType,
  expireDays,
  selectedCodes,
  selectedForDelete,
  filteredCodes,
  updateCodes,
  fetchCodes,
  clearSelection,
  openDeleteDialog,
  closeDeleteDialog,
  formatDate,
  exportCodes,
  scheduleEmail,
  isScheduling
}: RedemptionContainerHandlersProps) {
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();
  
  // Use the useCodeGenerationHandler hook
  const {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
    handleWizardGeneration
  } = useCodeGenerationHandler({
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration,
    codeType,
    expireDays,
    updateCodes,
    fetchCodes
  });
  
  // Use the useDeleteCodeHandler hook
  const {
    handleConfirmDelete
  } = useDeleteCodeHandler({
    handleDeleteSelectedCodes,
    selectedForDelete,
    closeDeleteDialog,
    clearSelection,
    fetchCodes
  });
  
  // Handle copying code to clipboard
  const handleCopyCode = (code: string) => {
    copyToClipboard(code);
    toast({
      title: 'Copied to clipboard',
      description: `Code ${code} copied to clipboard.`,
    });
  };
  
  // Handle email code
  const handleEmailCode = (code: RedemptionCode) => {
    // Open email dialog with selected code
    toast({
      title: 'Email Feature',
      description: 'Sending email feature initiated.',
    });
    
    // Logic to email code would go here
    const emailSubject = `Your Redemption Code: ${code.code}`;
    const emailBody = `
      Here is your redemption code: ${code.code}
      
      You can redeem this code at: ${window.location.origin}/redemption-code
      
      This code will expire on: ${formatDate(code.expiresAt)}
    `;
    
    // Create a mailto link
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
  };
  
  // Handle email selected codes
  const handleEmailSelected = (codes: RedemptionCode[]) => {
    if (codes.length === 0) {
      toast({
        title: 'No Codes Selected',
        description: 'Please select at least one code to email.',
        variant: 'destructive',
      });
      return;
    }
    
    // Logic to email multiple codes would go here
    const emailSubject = `Your Redemption Codes`;
    const emailBody = `
      Here are your redemption codes:
      ${codes.map(code => `- ${code.code} (Expires: ${formatDate(code.expiresAt)})`).join('\n')}
      
      You can redeem these codes at: ${window.location.origin}/redemption-code
    `;
    
    // Create a mailto link
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
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
  const handleExport = () => {
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

  // Use the useCodeDetailView hook for details and QR code functionality
  const {
    detailsView,
    handleViewDetails,
    handleViewQRCode
  } = useCodeDetailView(handleCopyCode, formatDate);
  
  const handlers = {
    onApplyFilters: handleApplyFilters,
    onSelectCode: (code: RedemptionCode, isSelected: boolean) => {
      // This would be handled by the selection hook
    },
    onSelectAll: (isSelected: boolean) => {
      // This would be handled by the selection hook
    },
    onCopyCode: handleCopyCode,
    onEmailCode: handleEmailCode,
    onViewDetails: handleViewDetails,
    onViewQRCode: handleViewQRCode,
    onCodeGeneration: handleCodeGeneration,
    onBulkGeneration: handleBulkGeneration,
    onAutomatedGeneration: handleAutomatedGeneration,
    onWizardGeneration: handleWizardGeneration,
    onScheduleEmail: scheduleEmail,
    onRefresh: handleRefresh,
    onExport: handleExport,
    onPrint: handlePrint,
    onEmailSelected: handleEmailSelected,
    onDeleteSelected: handleDeleteSelected,
    onPageChange: (page: number) => {
      // This would be handled by the pagination hook
    },
    onPageSizeChange: (size: number) => {
      // This would be handled by the pagination hook
    }
  };

  return {
    handlers,
    detailsView,
    handleConfirmDelete
  };
}
