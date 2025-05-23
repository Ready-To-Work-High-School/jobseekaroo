
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
import RedemptionTabManager from './tab-manager/RedemptionTabManager';
import { useRedemptionContainerHandlers } from './hooks/useRedemptionContainerHandlers';
import { 
  prepareDefaultUsageData,
  prepareDefaultGenerationData 
} from './analytics/utils/chartData';
import { SchoolProvider, getDefaultSchool } from '@/contexts/SchoolContext';
import { useCeoStatus } from './tab-manager/useCeoStatus';

const RedemptionCodeContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('codes');
  const { isCeo } = useCeoStatus();
  
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
    <SchoolProvider school={getDefaultSchool()}>
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
          handlers={handlers}
          isCeo={isCeo}
        />

        {detailsView}

        <DeleteRedemptionCodeDialog
          isOpen={showDeleteDialog}
          onClose={closeDeleteDialog}
          onConfirm={handleConfirmDelete}
          selectedCodes={selectedForDelete}
        />
      </div>
    </SchoolProvider>
  );
};

export default RedemptionCodeContainer;
