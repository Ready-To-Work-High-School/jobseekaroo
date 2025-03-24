
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  useRedemptionCodeData,
  useRedemptionCodeOperations,
  useRedemptionCodeSelection,
  useRedemptionCodeUtils,
  useRedemptionCodeDialog
} from '@/hooks/redemption';
import RedemptionCodeStats from '../RedemptionCodeStats';
import DeleteRedemptionCodeDialog from './DeleteRedemptionCodeDialog';
import RedemptionCodeGenerators from './RedemptionCodeGenerators';
import RedemptionCodeTable from './RedemptionCodeTable';
import RedemptionCodeOptions from './RedemptionCodeOptions';
import CodeGenerationPanel from './code-generation/CodeGenerationPanel';
import CodesTablePanel from './codes-table/CodesTablePanel';
import { useCodeOperationHandlers } from './hooks/useCodeOperationHandlers';
import { useCodeDetailView } from './hooks/useCodeDetailView';

const RedemptionCodeContainer: React.FC = () => {
  // Use individual hooks instead of the facade hook for more direct access
  const {
    codes,
    stats,
    isLoading,
    activeTab,
    setActiveTab,
    currentPage,
    pageSize,
    totalCodes,
    fetchCodes,
    handlePageChange,
    handlePageSizeChange,
    updateCodes
  } = useRedemptionCodeData();

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
  } = useRedemptionCodeSelection(codes);

  const { formatDate, exportCodes } = useRedemptionCodeUtils();

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

  // Use extracted operation handlers
  const {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
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

  // Detail view for individual codes
  const { detailsView, handlers } = useCodeDetailView({ formatDate });
  const { handleCopyCode, handleViewDetails, handleEmailCode, handleBulkEmail } = handlers;

  return (
    <div className="space-y-6">
      <RedemptionCodeStats stats={stats} />

      <RedemptionCodeOptions
        codeType={codeType}
        setCodeType={setCodeType}
        expireDays={expireDays}
        setExpireDays={setExpireDays}
      />

      <CodeGenerationPanel 
        onGenerateCode={handleCodeGeneration}
        onBulkGenerate={handleBulkGeneration}
        onAutomatedGeneration={handleAutomatedGeneration}
        isGenerating={isGenerating}
        codeType={codeType}
        setCodeType={setCodeType}
        expireDays={expireDays}
        setExpireDays={setExpireDays}
      />

      <CodesTablePanel
        codes={codes}
        selectedCodes={selectedCodes}
        allSelected={allSelected}
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCodes={totalCodes}
        formatDate={formatDate}
        onSelectCode={handleSelectCode}
        onSelectAll={handleSelectAll}
        onCopyCode={handleCopyCode}
        onEmailCode={handleEmailCode}
        onViewDetails={handleViewDetails}
        onRefresh={fetchCodes}
        onExport={() => exportCodes(codes)}
        onPrint={() => window.print()}
        onEmailSelected={() => handleBulkEmail(selectedCodes)}
        onDeleteSelected={handleShowDeleteDialog}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isDeleting={isDeleting}
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
