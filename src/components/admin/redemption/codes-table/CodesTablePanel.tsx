
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodeTable from '../RedemptionCodeTable';

interface CodesTablePanelProps {
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
  isDeleting: boolean;
}

const CodesTablePanel: React.FC<CodesTablePanelProps> = ({
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
  onPageSizeChange,
  isDeleting
}) => {
  return (
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
        />
      </CardContent>
    </Card>
  );
};

export default CodesTablePanel;
