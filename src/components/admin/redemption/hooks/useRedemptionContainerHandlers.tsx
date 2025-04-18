
import { School } from '@/types/school';
import { RedemptionCode } from '@/types/redemption';
import { useCodeOperationHandlers } from './useCodeOperationHandlers';
import { useCodeDetailView } from './useCodeDetailView';
import { useBasicHandlers } from './useBasicHandlers';
import { useEmailHandlers } from './useEmailHandlers';
import { useDeleteHandlers } from './useDeleteHandlers';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';

interface RedemptionContainerHandlersProps {
  handleGenerateCode: (type: 'student' | 'employer', school: School, expireDays: number) => Promise<RedemptionCode | null>;
  handleBulkGenerate: (amount: number, type: 'student' | 'employer', school: School, expireDays: number) => Promise<RedemptionCode[]>;
  handleAutomatedCodeGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string, school: School) => Promise<RedemptionCode[]>;
  handleDeleteSelectedCodes: (codeIds: string[]) => Promise<number>;
  codeType: 'student' | 'employer';
  expireDays: number;
  selectedCodes: RedemptionCode[];
  selectedForDelete: RedemptionCode[];
  filteredCodes: RedemptionCode[];
  updateCodes: (codes: RedemptionCode[]) => void;
  fetchCodes: () => Promise<void>;
  clearSelection: () => void;
  openDeleteDialog: (codes: RedemptionCode[]) => void;
  closeDeleteDialog: () => void;
  formatDate: (date?: Date | string) => string;
  exportCodes: (codes: RedemptionCode[]) => void;
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
  
  const {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
    handleWizardGeneration,
    handleShowDeleteDialog,
    handleConfirmDelete
  } = useCodeOperationHandlers({
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration,
    handleDeleteSelectedCodes,
    codeType,
    expireDays,
    selectedCodes,
    selectedForDelete,
    updateCodes,
    fetchCodes,
    clearSelection,
    openDeleteDialog,
    closeDeleteDialog
  });
  
  const {
    handleViewDetails,
    handleViewQRCode,
    detailsView
  } = useCodeDetailView(undefined, formatDate);

  const {
    handleCopyCode,
    handleRefresh,
    handleExport,
    handlePrint,
    handleApplyFilters,
    handleSelectCode,
    handleSelectAll,
  } = useBasicHandlers({
    filteredCodes,
    exportCodes: async (codes) => exportCodes(codes),
    fetchCodes
  });

  const {
    handleEmailCode,
    handleEmailSelected,
    handleScheduleEmail
  } = useEmailHandlers({
    formatDate,
    selectedCodes,
    scheduleEmail,
    isScheduling
  });
  
  const {
    handleDeleteSelected
  } = useDeleteHandlers({
    selectedCodes,
    openDeleteDialog
  });

  const handlers = {
    onApplyFilters: handleApplyFilters,
    onSelectCode: handleSelectCode,
    onSelectAll: handleSelectAll,
    onCopyCode: handleCopyCode,
    onEmailCode: handleEmailCode,
    onViewDetails: handleViewDetails,
    onViewQRCode: handleViewQRCode,
    onCodeGeneration: handleCodeGeneration,
    onBulkGeneration: handleBulkGeneration,
    onAutomatedGeneration: handleAutomatedGeneration,
    onWizardGeneration: handleWizardGeneration,
    onScheduleEmail: handleScheduleEmail,
    onRefresh: handleRefresh,
    onExport: () => handleExport(filteredCodes),
    onPrint: handlePrint,
    onEmailSelected: handleEmailSelected,
    onDeleteSelected: handleDeleteSelected,
    onPageChange: (page: number) => console.log('Page change to', page),
    onPageSizeChange: (size: number) => console.log('Page size change to', size)
  };

  return {
    handlers,
    detailsView,
    handleConfirmDelete
  };
}
