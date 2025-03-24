
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  useRedemptionCodeData,
  useRedemptionCodeOperations,
  useRedemptionCodeSelection,
  useRedemptionCodeUtils,
  useRedemptionCodeDialog
} from '@/hooks/redemption';
import { useRedemptionCodeDetailView } from './RedemptionCodeDetailView';
import RedemptionCodeStats from '../RedemptionCodeStats';
import RedemptionCodeGenerator from '../RedemptionCodeGenerator';
import RedemptionCodeActions from '../RedemptionCodeActions';
import RedemptionCodesTable from '../RedemptionCodesTable';
import AutomatedCodeGenerator from '../AutomatedCodeGenerator';
import RedemptionCodesPagination from './RedemptionCodesPagination';
import DeleteRedemptionCodeDialog from './DeleteRedemptionCodeDialog';

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RedemptionCodeGenerator
          onGenerateCode={handleCodeGeneration}
          onBulkGenerate={handleBulkGeneration}
          isGenerating={isGenerating}
          codeType={codeType}
          setCodeType={setCodeType}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
        />
        
        <AutomatedCodeGenerator
          onGenerateCodes={handleAutomatedGeneration}
          isGenerating={isGenerating}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redemption Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RedemptionCodeActions
              selectedCount={selectedCodes.length}
              onRefresh={fetchCodes}
              onExport={() => exportCodes(codes)}
              onPrint={() => window.print()}
              onEmailSelected={() => handleBulkEmail(selectedCodes)}
              onDeleteSelected={handleShowDeleteDialog}
            />

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Codes</TabsTrigger>
                <TabsTrigger value="unused">Unused</TabsTrigger>
                <TabsTrigger value="used">Used</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="employers">Employers</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <RedemptionCodesTable
                  codes={codes}
                  selectedCodes={selectedCodes}
                  allSelected={allSelected}
                  isLoading={isLoading}
                  formatDate={formatDate}
                  onSelectCode={handleSelectCode}
                  onSelectAll={handleSelectAll}
                  onCopyCode={handleCopyCode}
                  onEmailCode={handleEmailCode}
                  onViewDetails={handleViewDetails}
                />
                
                <RedemptionCodesPagination 
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalItems={totalCodes}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                />
              </TabsContent>
            </Tabs>
          </div>
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
