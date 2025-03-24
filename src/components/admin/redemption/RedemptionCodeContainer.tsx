import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  useRedemptionCodeData,
  useRedemptionCodeOperations,
  useRedemptionCodeSelection,
  useRedemptionCodeUtils,
  useRedemptionCodeDialog
} from '@/hooks/redemption';
import { useRedemptionCodeDetailView } from './RedemptionCodeDetailView';
import RedemptionCodeStats from '../RedemptionCodeStats';
import DeleteRedemptionCodeDialog from './DeleteRedemptionCodeDialog';
import RedemptionCodeGenerators from './RedemptionCodeGenerators';
import RedemptionCodeTable from './RedemptionCodeTable';
import RedemptionCodeOptions from './RedemptionCodeOptions';

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

  // Detail view for individual codes
  const { view: detailsView, handlers } = useRedemptionCodeDetailView({ formatDate });
  const { handleCopyCode, handleViewDetails, handleEmailCode, handleBulkEmail } = handlers;

  // Handlers for operations that combine multiple hooks
  const handleCodeGeneration = async () => {
    const newCode = await handleGenerateCode(codeType, expireDays);
    if (newCode) {
      updateCodes([newCode]);
      await fetchCodes();
    }
  };

  const handleBulkGeneration = async (amount: number) => {
    const newCodes = await handleBulkGenerate(amount, codeType, expireDays);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  };

  const handleAutomatedGeneration = async (
    userType: string, 
    amount: number, 
    expiresInDays: number,
    emailDomain: string
  ) => {
    const newCodes = await handleAutomatedCodeGeneration(userType, amount, expiresInDays, emailDomain);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  };

  const handleShowDeleteDialog = () => {
    if (selectedCodes.length > 0) {
      openDeleteDialog(selectedCodes);
    }
  };

  const handleConfirmDelete = async () => {
    await handleDeleteSelectedCodes(selectedForDelete.map(code => code.id));
    clearSelection();
    closeDeleteDialog();
    await fetchCodes();
  };

  return (
    <div className="space-y-6">
      <RedemptionCodeStats stats={stats} />

      <RedemptionCodeOptions
        codeType={codeType}
        setCodeType={setCodeType}
        expireDays={expireDays}
        setExpireDays={setExpireDays}
      />

      <RedemptionCodeGenerators
        onGenerateCode={handleCodeGeneration}
        onBulkGenerate={handleBulkGeneration}
        onAutomatedGeneration={handleAutomatedGeneration}
        isGenerating={isGenerating}
        codeType={codeType}
        setCodeType={setCodeType}
        expireDays={expireDays}
        setExpireDays={setExpireDays}
      />

      <Card>
        <CardHeader>
          <CardTitle>Redemption Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <RedemptionCodeTable
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
          />
        </CardContent>
      </Card>

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
