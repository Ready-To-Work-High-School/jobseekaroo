
import { useCallback } from 'react';
import { RedemptionCode } from '@/types/redemption';
import { useCodeOperationHandlers } from './useCodeOperationHandlers';
import { useCodeDetailView } from './useCodeDetailView';
import { useCodeGenerationHandler } from '@/hooks/redemption/useCodeGenerationHandler';
import { useDeleteCodeHandler } from '@/hooks/redemption/useDeleteCodeHandler';

interface RedemptionContainerHandlersProps {
  // Code operations
  handleGenerateCode: (type: 'student' | 'employer', expireDays: number) => Promise<RedemptionCode | null>;
  handleBulkGenerate: (amount: number, type: 'student' | 'employer', expireDays: number) => Promise<RedemptionCode[]>;
  handleAutomatedCodeGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<RedemptionCode[]>;
  handleDeleteSelectedCodes: (codeIds: string[]) => Promise<number>;
  
  // State and data
  codeType: 'student' | 'employer';
  expireDays: number;
  selectedCodes: RedemptionCode[];
  selectedForDelete: RedemptionCode[];
  filteredCodes: RedemptionCode[];
  
  // Operations
  updateCodes: (codes: RedemptionCode[]) => void;
  fetchCodes: () => Promise<void>;
  clearSelection: () => void;
  openDeleteDialog: (codes: RedemptionCode[]) => void;
  closeDeleteDialog: () => void;
  
  // UI utilities
  formatDate: (date?: Date | string) => string;
  exportCodes: (codes: RedemptionCode[]) => void;
  
  // Email scheduling
  scheduleEmail: (params: any) => Promise<void>;
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
  // Generation handlers
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
  
  // Delete handlers
  const {
    handleShowDeleteDialog,
    handleConfirmDelete
  } = useDeleteCodeHandler({
    handleDeleteSelectedCodes,
    selectedCodes,
    selectedForDelete,
    fetchCodes,
    clearSelection,
    openDeleteDialog,
    closeDeleteDialog
  });
  
  // Code detail view
  const { detailsView, handlers: detailHandlers } = useCodeDetailView({ formatDate });
  
  // UI Handlers
  const handleApplyFilters = useCallback((filters: any) => {
    // This function is typically passed down from a parent component
    // For now, we'll just log it
    console.log('Apply filters:', filters);
  }, []);
  
  const handleExport = useCallback(() => {
    exportCodes(filteredCodes);
  }, [exportCodes, filteredCodes]);
  
  const handlePrint = useCallback(() => {
    window.print();
  }, []);
  
  const handleScheduleEmail = useCallback(async (params: any) => {
    await scheduleEmail(params);
  }, [scheduleEmail]);
  
  return {
    // Combine all handlers
    handlers: {
      onApplyFilters: handleApplyFilters,
      onSelectCode: detailHandlers.handleSelectCode,
      onSelectAll: detailHandlers.handleSelectAll,
      onCopyCode: detailHandlers.handleCopyCode,
      onEmailCode: detailHandlers.handleEmailCode,
      onViewDetails: detailHandlers.handleViewDetails,
      onCodeGeneration: handleCodeGeneration,
      onBulkGeneration: handleBulkGeneration,
      onAutomatedGeneration: handleAutomatedGeneration,
      onWizardGeneration: handleWizardGeneration,
      onScheduleEmail: handleScheduleEmail,
      onRefresh: fetchCodes,
      onExport: handleExport,
      onPrint: handlePrint,
      onEmailSelected: detailHandlers.handleBulkEmail,
      onDeleteSelected: handleShowDeleteDialog,
      onPageChange: detailHandlers.handlePageChange,
      onPageSizeChange: detailHandlers.handlePageSizeChange,
    },
    detailsView,
    handleConfirmDelete
  };
}
