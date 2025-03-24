
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import AdvancedSearchFilters from '../filters/AdvancedSearchFilters';
import RedemptionCodeActions from '../../RedemptionCodeActions';
import RedemptionCodesTable from '../../RedemptionCodesTable';
import RedemptionCodeGenerators from '../RedemptionCodeGenerators';
import RedemptionCodeStats from '../../RedemptionCodeStats';
import RedemptionCodesPagination from '../RedemptionCodesPagination'; // Fixed import path
import { RedemptionCode } from '@/types/redemption';

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
  onViewQRCode: (code: RedemptionCode) => void;
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
  onViewQRCode,
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <RedemptionCodeStats stats={stats} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Codes</TabsTrigger>
          <TabsTrigger value="unused">Unused</TabsTrigger>
          <TabsTrigger value="used">Used</TabsTrigger>
          <TabsTrigger value="students">Student Codes</TabsTrigger>
          <TabsTrigger value="employers">Employer Codes</TabsTrigger>
        </TabsList>

        <AdvancedSearchFilters onSearch={onApplyFilters} />
        
        <Card>
          <CardContent className="p-6">
            <RedemptionCodeActions
              selectedCount={selectedCodes.length}
              onRefresh={handleRefresh}
              onExport={onExport}
              onPrint={onPrint}
              onEmailSelected={onEmailSelected}
              onDeleteSelected={onDeleteSelected}
              isRefreshing={isRefreshing}
            />
            
            <RedemptionCodesTable
              codes={filteredCodes}
              selectedCodes={selectedCodes}
              allSelected={allSelected}
              isLoading={isLoading}
              formatDate={formatDate}
              onSelectCode={onSelectCode}
              onSelectAll={onSelectAll}
              onCopyCode={onCopyCode}
              onEmailCode={onEmailCode}
              onViewDetails={onViewDetails}
              onViewQRCode={onViewQRCode}
            />
            
            <div className="mt-4">
              <RedemptionCodesPagination
                currentPage={currentPage}
                totalItems={totalCodes}
                pageSize={pageSize}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
              />
            </div>
          </CardContent>
        </Card>
      </Tabs>
      
      <div className="pt-4">
        <RedemptionCodeGenerators
          onGenerateCode={onCodeGeneration}
          onBulkGenerate={onBulkGeneration}
          onAutomatedGeneration={onAutomatedGeneration}
          isGenerating={isGenerating}
          codeType={codeType}
          setCodeType={setCodeType}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
        />
      </div>
    </div>
  );
};

export default CodesTab;
