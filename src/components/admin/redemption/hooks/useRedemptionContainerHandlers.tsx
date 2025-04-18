
import { School } from '@/types/school';
import { RedemptionCode } from '@/types/redemption';
import { useCodeOperationHandlers } from './useCodeOperationHandlers';
import { useCodeDetailView } from './useCodeDetailView';
import { useBasicHandlers } from './useBasicHandlers';
import { useEmailHandlers } from './useEmailHandlers';

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
    codeDetailsOpen, 
    selectedCodeForDetails, 
    qrCodeOpen,
    selectedCodeForQR,
    handleViewDetails,
    handleCloseDetails,
    handleViewQRCode,
    handleCloseQRCode
  } = useCodeDetailView();

  const {
    handleCopyCode,
    handleExportCodes,
    handlePrintCodes,
    handleSelectCode,
    handleSelectAll,
    handleApplyFilters
  } = useBasicHandlers({
    filteredCodes,
    exportCodes
  });

  const {
    handleEmailCode,
    handleEmailSelected,
    handleScheduleEmail
  } = useEmailHandlers({
    scheduleEmail,
    isScheduling
  });

  const detailsView = (
    <>
      {/* Code details dialog */}
      {selectedCodeForDetails && codeDetailsOpen && (
        <div>
          {/* Details dialog component would be here */}
        </div>
      )}
      
      {/* QR code dialog */}
      {selectedCodeForQR && qrCodeOpen && (
        <div>
          {/* QR code dialog component would be here */}
        </div>
      )}
    </>
  );

  const handleRefresh = async () => {
    await fetchCodes();
  };
  
  return {
    handlers: {
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
      onExport: handleExportCodes,
      onPrint: handlePrintCodes,
      onEmailSelected: handleEmailSelected,
      onDeleteSelected: handleShowDeleteDialog,
      onPageChange: (page: number) => console.log('Page change to', page),
      onPageSizeChange: (size: number) => console.log('Page size change to', size)
    },
    detailsView,
    handleConfirmDelete
  };
}
