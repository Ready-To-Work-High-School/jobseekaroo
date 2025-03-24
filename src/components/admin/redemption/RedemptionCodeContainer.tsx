
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRedemptionCodes } from '@/hooks/useRedemptionCodes';
import { useRedemptionCodeDetailView } from './RedemptionCodeDetailView';
import RedemptionCodeStats from '../RedemptionCodeStats';
import RedemptionCodeGenerator from '../RedemptionCodeGenerator';
import RedemptionCodeActions from '../RedemptionCodeActions';
import RedemptionCodesTable from '../RedemptionCodesTable';
import AutomatedCodeGenerator from '../AutomatedCodeGenerator';
import RedemptionCodesPagination from './RedemptionCodesPagination';
import DeleteRedemptionCodeDialog from './DeleteRedemptionCodeDialog';

const RedemptionCodeContainer: React.FC = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const {
    codes,
    stats,
    isLoading,
    isGenerating,
    isDeleting,
    activeTab,
    selectedCodes,
    allSelected,
    currentPage,
    pageSize,
    totalCodes,
    handlePageChange,
    handlePageSizeChange,
    setActiveTab,
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration,
    handleSelectCode,
    handleSelectAll,
    handleDeleteSelectedCodes,
    fetchCodes,
    formatDate,
    exportCodes,
    
    // Type controls
    codeType,
    setCodeType,
    expireDays,
    setExpireDays
  } = useRedemptionCodes();

  const { view: detailsView, handlers } = useRedemptionCodeDetailView({ formatDate });
  const { handleCopyCode, handleViewDetails, handleEmailCode, handleBulkEmail } = handlers;

  const handleShowDeleteDialog = () => {
    if (selectedCodes.length > 0) {
      setShowDeleteDialog(true);
    }
  };

  return (
    <div className="space-y-6">
      <RedemptionCodeStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RedemptionCodeGenerator
          onGenerateCode={handleGenerateCode}
          onBulkGenerate={handleBulkGenerate}
          isGenerating={isGenerating}
          codeType={codeType}
          setCodeType={setCodeType}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
        />
        
        <AutomatedCodeGenerator
          onGenerateCodes={handleAutomatedCodeGeneration}
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
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteSelectedCodes}
        selectedCodes={selectedCodes}
      />
    </div>
  );
};

export default RedemptionCodeContainer;
