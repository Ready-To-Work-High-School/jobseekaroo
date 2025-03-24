
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodesTable from '../../RedemptionCodesTable';
import RedemptionCodeActions from '../../RedemptionCodeActions';
import RedemptionCodesPagination from '../RedemptionCodesPagination';
import RedemptionCodeTabsList from '../table/RedemptionCodeTabsList';

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
  onViewQRCode: (code: RedemptionCode) => void;
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
  onViewQRCode,
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
    <div className="space-y-4">
      <RedemptionCodeTabsList 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <RedemptionCodeActions
        selectedCount={selectedCodes.length}
        onRefresh={onRefresh}
        onExport={onExport}
        onPrint={onPrint}
        onEmailSelected={onEmailSelected}
        onDeleteSelected={onDeleteSelected}
        isRefreshing={isLoading}
      />
      
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
        onViewQRCode={onViewQRCode}
      />
      
      <RedemptionCodesPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalCodes}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default CodesTablePanel;
