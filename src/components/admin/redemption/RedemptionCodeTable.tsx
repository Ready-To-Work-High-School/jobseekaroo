
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodesTable from '../RedemptionCodesTable';
import RedemptionCodesPagination from './RedemptionCodesPagination';
import RedemptionCodeActions from '../RedemptionCodeActions';
import { Card, CardContent } from '@/components/ui/card';
import MobileActionsSheet from './table/MobileActionsSheet';
import RedemptionCodeTabsList from './table/RedemptionCodeTabsList';
import RedemptionCodeTableLoading from './table/RedemptionCodeTableLoading';
import RedemptionCodeNoResults from './table/RedemptionCodeNoResults';

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
  onViewQRCode: (code: RedemptionCode) => void;
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
  onViewQRCode,
  onRefresh,
  onExport,
  onPrint,
  onEmailSelected,
  onDeleteSelected,
  onPageChange,
  onPageSizeChange
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle refresh with loading state
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500); // Show spinner for at least 500ms for UX
  };

  // Get count of codes by status for badges
  const unusedCount = codes.filter(code => !code.used).length;
  const usedCount = codes.filter(code => code.used).length;
  const studentCount = codes.filter(code => code.type === 'student').length;
  const employerCount = codes.filter(code => code.type === 'employer').length;

  return (
    <Card className="w-full bg-white shadow-sm overflow-hidden">
      <CardContent className="p-0 sm:p-6">
        <div className="space-y-6">
          {/* Mobile Actions Sheet */}
          <MobileActionsSheet 
            selectedCodesCount={selectedCodes.length}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
            onExport={onExport}
            onPrint={onPrint}
            onEmailSelected={onEmailSelected}
            onDeleteSelected={onDeleteSelected}
          />

          {/* Desktop Actions */}
          <div className="hidden md:block">
            <RedemptionCodeActions
              selectedCount={selectedCodes.length}
              onRefresh={handleRefresh}
              onExport={onExport}
              onPrint={onPrint}
              onEmailSelected={onEmailSelected}
              onDeleteSelected={onDeleteSelected}
              isRefreshing={isRefreshing}
            />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <RedemptionCodeTabsList 
              totalCodes={totalCodes}
              unusedCount={unusedCount}
              usedCount={usedCount}
              studentCount={studentCount}
              employerCount={employerCount}
            />
            
            <TabsContent value={activeTab} className="mt-0">
              {isLoading ? (
                <RedemptionCodeTableLoading />
              ) : codes.length > 0 ? (
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
              ) : (
                <RedemptionCodeNoResults />
              )}
              
              {!isLoading && codes.length > 0 && (
                <RedemptionCodesPagination 
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalItems={totalCodes}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedemptionCodeTable;
