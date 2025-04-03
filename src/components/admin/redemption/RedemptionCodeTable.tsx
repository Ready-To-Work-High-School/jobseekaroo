
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodesTable from '../RedemptionCodesTable';
import RedemptionCodesPagination from './RedemptionCodesPagination';
import RedemptionCodeActions from '../RedemptionCodeActions';

interface RedemptionCodeTableProps {
  codes: RedemptionCode[];
  selectedCodes: RedemptionCode[];
  allSelected: boolean;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPage: number;
  pageSize: number;
  totalCodes: number;
  formatDate: (date?: Date | string) => string;
  onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onCopyCode: (code: string) => void;
  onEmailCode: (code: RedemptionCode) => void;
  onViewDetails: (code: RedemptionCode) => void;
  onRefresh: () => Promise<void>;
  onExport: () => void;
  onPrint: () => void;
  onEmailSelected: () => void;
  onDeleteSelected: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const RedemptionCodeTable: React.FC<RedemptionCodeTableProps> = ({
  codes,
  selectedCodes,
  allSelected,
  isLoading,
  activeTab,
  setActiveTab,
  currentPage,
  pageSize,
  totalCodes,
  formatDate,
  onSelectCode,
  onSelectAll,
  onCopyCode,
  onEmailCode,
  onViewDetails,
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
      <RedemptionCodeActions
        selectedCount={selectedCodes.length}
        onRefresh={onRefresh}
        onExport={onExport}
        onPrint={onPrint}
        onEmailSelected={onEmailSelected}
        onDeleteSelected={onDeleteSelected}
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
            onSelectCode={onSelectCode}
            onSelectAll={onSelectAll}
            onCopyCode={onCopyCode}
            onEmailCode={onEmailCode}
            onViewDetails={onViewDetails}
          />
          
          <RedemptionCodesPagination 
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalCodes}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RedemptionCodeTable;
