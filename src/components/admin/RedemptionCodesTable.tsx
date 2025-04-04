
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import { 
  Table, 
  TableBody
} from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import RedemptionCodeTableRow from './redemption/table/RedemptionCodeTableRow';
import RedemptionCodeTableHeader from './redemption/table/RedemptionCodeTableHeader';
import RedemptionCodeEmptyState from './redemption/table/RedemptionCodeEmptyState';
import RedemptionCodeLoadingState from './redemption/table/RedemptionCodeLoadingState';

interface RedemptionCodesTableProps {
  codes: RedemptionCode[];
  selectedCodes: RedemptionCode[];
  allSelected: boolean;
  isLoading: boolean;
  formatDate: (date?: Date | string) => string;
  onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onCopyCode: (code: string) => void;
  onEmailCode: (code: RedemptionCode) => void;
  onViewDetails: (code: RedemptionCode) => void;
  onViewQRCode: (code: RedemptionCode) => void;
}

const RedemptionCodesTable: React.FC<RedemptionCodesTableProps> = ({
  codes,
  selectedCodes,
  allSelected,
  isLoading,
  formatDate,
  onSelectCode,
  onSelectAll,
  onCopyCode,
  onEmailCode,
  onViewDetails,
  onViewQRCode
}) => {
  if (isLoading) {
    return <RedemptionCodeLoadingState />;
  }

  if (codes.length === 0) {
    return <RedemptionCodeEmptyState />;
  }

  // Check if there are any non-used codes
  const hasAvailableCodes = codes.some(code => !code.used);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <RedemptionCodeTableHeader 
            allSelected={allSelected && codes.length > 0} 
            onSelectAll={onSelectAll}
            hasAvailableCodes={hasAvailableCodes}
          />
          <TableBody>
            {codes.map((code) => {
              const isSelected = selectedCodes.some(c => c.id === code.id);
              
              return (
                <RedemptionCodeTableRow
                  key={code.id}
                  code={code}
                  isSelected={isSelected}
                  formatDate={formatDate}
                  onSelectCode={onSelectCode}
                  onCopyCode={onCopyCode}
                  onEmailCode={onEmailCode}
                  onViewDetails={onViewDetails}
                  onViewQRCode={onViewQRCode}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default RedemptionCodesTable;
