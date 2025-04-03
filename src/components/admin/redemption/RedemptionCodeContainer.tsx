
import React, { useState } from 'react';
import { 
  useRedemptionCodeData,
  useRedemptionCodeOperations,
  useRedemptionCodeSelection,
  useRedemptionCodeUtils,
  useRedemptionCodeDialog
} from '@/hooks/redemption';
import { useAdvancedCodeFiltering } from '@/hooks/redemption/useAdvancedCodeFiltering';
import { useBulkExport } from '@/hooks/redemption/useBulkExport';
import { useScheduledEmails } from '@/hooks/redemption/useScheduledEmails';
import DeleteRedemptionCodeDialog from './DeleteRedemptionCodeDialog';
import RedemptionTabManager from './RedemptionTabManager';
import { useRedemptionContainerHandlers } from './hooks/useRedemptionContainerHandlers';
import { prepareDefaultUsageData, prepareDefaultGenerationData } from './analytics/utils/chartData';

const RedemptionCodeContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('codes');
  
  const {
    codes,
    stats,
    isLoading,
    activeTab: codesTab,
    setActiveTab: setCodesTab,
    currentPage,
    pageSize,
    totalCodes,
    fetchCodes,
    handlePageChange,
    handlePageSizeChange,
    updateCodes
  } = useRedemptionCodeData();

  const { filters, applyFilters, filteredCodes } = useAdvancedCodeFiltering(codes);

  const { exportCodes, isExporting } = useBulkExport();

  const { scheduleEmail, isScheduling } = useScheduledEmails();

  const {
    isGenerating,
    isDeleting,
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration,
    handleDeleteSelectedCodes
  } = useRedemptionCodeOperations();

  const {
    selectedCodes,
    allSelected,
    handleSelectCode,
    handleSelectAll,
    clearSelection
  } = useRedemptionCodeSelection(filteredCodes);

  const { formatDate } = useRedemptionCodeUtils();

  const { 
    showDeleteDialog, 
    selectedForDelete, 
    openDeleteDialog, 
    closeDeleteDialog 
  } = useRedemptionCodeDialog();

  const [codeType, setCodeType] = React.useState<'student' | 'employer'>('student');
  const [expireDays, setExpireDays] = React.useState<number>(30);

  const usageOverTime = prepareDefaultUsageData();
  const generationOverTime = prepareDefaultGenerationData();

  const {
    handlers,
    detailsView,
    handleConfirmDelete
  } = useRedemptionContainerHandlers({
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
  });

  return (
    <div className="space-y-6">
      <RedemptionTabManager
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        filteredCodes={filteredCodes}
        selectedCodes={selectedCodes}
        allSelected={allSelected}
        isLoading={isLoading}
        isGenerating={isGenerating}
        isDeleting={isDeleting}
        isScheduling={isScheduling}
        codesTab={codesTab}
        setCodesTab={setCodesTab}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCodes={totalCodes}
        codeType={codeType}
        setCodeType={setCodeType}
        expireDays={expireDays}
        setExpireDays={setExpireDays}
        formatDate={formatDate}
        usageOverTime={usageOverTime}
        generationOverTime={generationOverTime}
        handlers={{
          onApplyFilters: handlers.onApplyFilters,
          onSelectCode: handlers.onSelectCode,
          onSelectAll: handlers.onSelectAll,
          onCopyCode: handlers.onCopyCode,
          onEmailCode: handlers.onEmailCode,
          onViewDetails: handlers.onViewDetails,
          onViewQRCode: handlers.onViewQRCode,
          onCodeGeneration: handlers.onCodeGeneration,
          onBulkGeneration: handlers.onBulkGeneration,
          onAutomatedCodeGeneration: handlers.onAutomatedGeneration,
          onWizardGeneration: handlers.onWizardGeneration,
          onScheduleEmail: handlers.onScheduleEmail,
          onRefresh: handlers.onRefresh,
          onExport: handlers.onExport,
          onPrint: handlers.onPrint,
          onEmailSelected: handlers.onEmailSelected,
          onDeleteSelected: handlers.onDeleteSelected,
          onPageChange: handlers.onPageChange,
          onPageSizeChange: handlers.onPageSizeChange
        }}
      />

      {detailsView}

      <DeleteRedemptionCodeDialog
        isOpen={showDeleteDialog}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        selectedCodes={selectedForDelete}
      />
    </div>
  );
};

export default RedemptionCodeContainer;
