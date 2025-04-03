import { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';
import { useToast } from '@/hooks/use-toast';
import { useCodeGenerationHandler } from '@/hooks/redemption/useCodeGenerationHandler';
import { useDeleteCodeHandler } from '@/hooks/redemption/useDeleteCodeHandler';
import { useCodeDetailView } from './useCodeDetailView';
import { useBasicHandlers } from './useBasicHandlers';
import { useEmailHandlers } from './useEmailHandlers';
import { useDeleteHandlers } from './useDeleteHandlers';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';

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
  scheduleEmail: (params: ScheduleEmailParams) => Promise<boolean>;
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
  // Use the specialized handlers
  const {
    handleCopyCode,
    handleRefresh,
    handleExport,
    handlePrint,
    handleApplyFilters
  } = useBasicHandlers({ fetchCodes, exportCodes });
  
  const {
    handleEmailCode,
    handleEmailSelected
  } = useEmailHandlers({ formatDate, selectedCodes, scheduleEmail, isScheduling });
  
  const {
    handleDeleteSelected
  } = useDeleteHandlers({ selectedCodes, openDeleteDialog });
  
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
    selectedCodes,
    selectedForDelete,
    fetchCodes,
    clearSelection,
    openDeleteDialog,
    closeDeleteDialog
  });

  // Use the useCodeDetailView hook for details and QR code functionality
  const {
    detailsView,
    handleViewDetails,
    handleViewQRCode
  } = useCodeDetailView(handleCopyCode, formatDate);
  
  // Combine all handlers into a single object
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
    onExport: () => handleExport(filteredCodes),
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
