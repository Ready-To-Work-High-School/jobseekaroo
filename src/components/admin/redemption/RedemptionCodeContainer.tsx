
import React, { useState } from 'react';
import { 
  useRedemptionCodeData,
  useRedemptionCodeOperations,
  useRedemptionCodeSelection,
  useRedemptionCodeUtils,
  useRedemptionCodeDialog
} from '@/hooks/redemption';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdvancedCodeFiltering } from '@/hooks/redemption/useAdvancedCodeFiltering';
import { useBulkExport } from '@/hooks/redemption/useBulkExport';
import { useScheduledEmails } from '@/hooks/redemption/useScheduledEmails';
import DeleteRedemptionCodeDialog from './DeleteRedemptionCodeDialog';
import { useCodeOperationHandlers } from './hooks/useCodeOperationHandlers';
import { useCodeDetailView } from './hooks/useCodeDetailView';
import { useCodeGenerationHandler } from '@/hooks/redemption/useCodeGenerationHandler';
import { useDeleteCodeHandler } from '@/hooks/redemption/useDeleteCodeHandler';

// Import tab components
import CodesTab from './tabs/CodesTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import ReportsTab from './tabs/ReportsTab';
import WizardTab from './tabs/WizardTab';
import SchedulerTab from './tabs/SchedulerTab';

const RedemptionCodeContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('codes');
  
  // Use individual hooks for data and operations
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

  // Advanced filtering
  const { filters, applyFilters, filteredCodes } = useAdvancedCodeFiltering(codes);

  // Bulk export
  const { exportCodes, isExporting } = useBulkExport();

  // Email scheduling
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

  // Use dialog management hook
  const { 
    showDeleteDialog, 
    selectedForDelete, 
    openDeleteDialog, 
    closeDeleteDialog 
  } = useRedemptionCodeDialog();

  // Local state for code generation options
  const [codeType, setCodeType] = React.useState<'student' | 'employer'>('student');
  const [expireDays, setExpireDays] = React.useState<number>(30);

  // Use code generation handlers
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

  // Use delete handlers
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

  // Detail view for individual codes
  const { detailsView, handlers } = useCodeDetailView({ formatDate });
  const { handleCopyCode, handleViewDetails, handleEmailCode, handleBulkEmail } = handlers;

  // Handler for email scheduling
  const handleScheduleEmail = async (params: {
    recipients: string;
    subject: string;
    message: string;
    codeType: 'student' | 'employer';
    amount: number;
    expiresInDays: number;
    scheduleDate: Date;
    scheduleTime: string;
  }) => {
    await scheduleEmail(params);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="codes">Redemption Codes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="wizard">Generation Wizard</TabsTrigger>
          <TabsTrigger value="scheduler">Email Scheduler</TabsTrigger>
        </TabsList>
        
        <TabsContent value="codes">
          <CodesTab
            stats={stats}
            filteredCodes={filteredCodes}
            selectedCodes={selectedCodes}
            allSelected={allSelected}
            isLoading={isLoading}
            isGenerating={isGenerating}
            isDeleting={isDeleting}
            activeTab={codesTab}
            setActiveTab={setCodesTab}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCodes={totalCodes}
            codeType={codeType}
            setCodeType={setCodeType}
            expireDays={expireDays}
            setExpireDays={setExpireDays}
            formatDate={formatDate}
            onApplyFilters={applyFilters}
            onSelectCode={handleSelectCode}
            onSelectAll={handleSelectAll}
            onCopyCode={handleCopyCode}
            onEmailCode={handleEmailCode}
            onViewDetails={handleViewDetails}
            onCodeGeneration={handleCodeGeneration}
            onBulkGeneration={handleBulkGeneration}
            onAutomatedGeneration={handleAutomatedGeneration}
            onRefresh={fetchCodes}
            onExport={() => exportCodes(filteredCodes, 'csv')}
            onPrint={() => window.print()}
            onEmailSelected={() => handleBulkEmail(selectedCodes)}
            onDeleteSelected={handleShowDeleteDialog}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsTab stats={stats} />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsTab codes={codes} formatDate={formatDate} />
        </TabsContent>
        
        <TabsContent value="wizard">
          <WizardTab 
            onGenerate={handleWizardGeneration}
            isGenerating={isGenerating}
          />
        </TabsContent>
        
        <TabsContent value="scheduler">
          <SchedulerTab 
            onSchedule={handleScheduleEmail}
            isScheduling={isScheduling}
          />
        </TabsContent>
      </Tabs>

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
