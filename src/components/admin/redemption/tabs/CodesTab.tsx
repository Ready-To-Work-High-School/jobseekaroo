
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import { Card, CardContent } from '@/components/ui/card';
import RedemptionCodeStats from '../../RedemptionCodeStats';
import CodeGenerationPanel from '../code-generation/CodeGenerationPanel';
import CodesTablePanel from '../codes-table/CodesTablePanel';
import AdvancedSearchFilters from '../filters/AdvancedSearchFilters';
import ExportOptions from '../exporting/ExportOptions';

interface CodesTabProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
  filteredCodes: RedemptionCode[];
  selectedCodes: RedemptionCode[];
  allSelected: boolean;
  isLoading: boolean;
  isGenerating: boolean;
  isDeleting: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPage: number;
  pageSize: number;
  totalCodes: number;
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
  formatDate: (date?: Date | string) => string;
  onApplyFilters: (filters: any) => void;
  onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onCopyCode: (code: string) => void;
  onEmailCode: (code: RedemptionCode) => void;
  onViewDetails: (code: RedemptionCode) => void;
  onCodeGeneration: () => Promise<void>;
  onBulkGeneration: (amount: number) => Promise<void>;
  onAutomatedGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  onExport: () => void;
  onPrint: () => void;
  onEmailSelected: () => void;
  onDeleteSelected: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const CodesTab: React.FC<CodesTabProps> = ({
  stats,
  filteredCodes,
  selectedCodes,
  allSelected,
  isLoading,
  isGenerating,
  isDeleting,
  activeTab,
  setActiveTab,
  currentPage,
  pageSize,
  totalCodes,
  codeType,
  setCodeType,
  expireDays,
  setExpireDays,
  formatDate,
  onApplyFilters,
  onSelectCode,
  onSelectAll,
  onCopyCode,
  onEmailCode,
  onViewDetails,
  onCodeGeneration,
  onBulkGeneration,
  onAutomatedGeneration,
  onRefresh,
  onExport,
  onPrint,
  onEmailSelected,
  onDeleteSelected,
  onPageChange,
  onPageSizeChange
}) => {
  return (
    <div className="space-y-6">
      <RedemptionCodeStats stats={stats} />
      
      <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
        <div className="text-2xl font-bold">Redemption Code Management</div>
        
        <div className="flex flex-wrap gap-2">
          <ExportOptions 
            selectedCodes={selectedCodes}
            allCodes={filteredCodes}
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <CodeGenerationPanel 
            onGenerateCode={onCodeGeneration}
            onBulkGenerate={onBulkGeneration}
            onAutomatedGeneration={onAutomatedGeneration}
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
          <AdvancedSearchFilters onSearch={onApplyFilters} />
          
          <CodesTablePanel
            codes={filteredCodes}
            selectedCodes={selectedCodes}
            allSelected={allSelected}
            isLoading={isLoading}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCodes={totalCodes}
            formatDate={formatDate}
            onSelectCode={onSelectCode}
            onSelectAll={onSelectAll}
            onCopyCode={onCopyCode}
            onEmailCode={onEmailCode}
            onViewDetails={onViewDetails}
            onRefresh={onRefresh}
            onExport={onExport}
            onPrint={onPrint}
            onEmailSelected={onEmailSelected}
            onDeleteSelected={onDeleteSelected}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            isDeleting={isDeleting}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CodesTab;
