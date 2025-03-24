
import React, { useState } from 'react';
import { 
  useRedemptionCodeData,
  useRedemptionCodeOperations,
  useRedemptionCodeSelection,
  useRedemptionCodeUtils,
  useRedemptionCodeDialog
} from '@/hooks/redemption';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdvancedCodeFiltering } from '@/hooks/redemption/useAdvancedCodeFiltering';
import { useBulkExport } from '@/hooks/redemption/useBulkExport';
import DeleteRedemptionCodeDialog from './DeleteRedemptionCodeDialog';
import RedemptionCodeStats from '../RedemptionCodeStats';
import CodeGenerationPanel from './code-generation/CodeGenerationPanel';
import CodesTablePanel from './codes-table/CodesTablePanel';
import { useCodeOperationHandlers } from './hooks/useCodeOperationHandlers';
import { useCodeDetailView } from './hooks/useCodeDetailView';
import CodeAnalyticsDashboard from './analytics/CodeAnalyticsDashboard';
import AdvancedSearchFilters from './filters/AdvancedSearchFilters';
import BulkExport from './bulk-actions/BulkExport';

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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="codes">Redemption Codes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="codes" className="space-y-6">
          <RedemptionCodeStats stats={stats} />
          
          <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
            <div className="text-2xl font-bold">Redemption Code Management</div>
            
            <div className="flex flex-wrap gap-2">
              <BulkExport 
                selectedCodes={selectedCodes}
                allCodes={codes}
                onExport={exportCodes}
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6">
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
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <AdvancedSearchFilters onSearch={applyFilters} />
              
              <CodesTablePanel
                codes={filteredCodes}
                selectedCodes={selectedCodes}
                allSelected={allSelected}
                isLoading={isLoading}
                activeTab={codesTab}
                setActiveTab={setCodesTab}
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
                onExport={() => exportCodes(filteredCodes, 'csv')}
                onPrint={() => window.print()}
                onEmailSelected={() => handleBulkEmail(selectedCodes)}
                onDeleteSelected={handleShowDeleteDialog}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isDeleting={isDeleting}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <CodeAnalyticsDashboard stats={stats} />
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Redemption Code Settings</h2>
              {/* Settings content would go here - moved to separate tab for better organization */}
            </CardContent>
          </Card>
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
