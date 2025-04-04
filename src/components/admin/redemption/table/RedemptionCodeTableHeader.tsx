
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface RedemptionCodeTableHeaderProps {
  allSelected: boolean;
  onSelectAll: (isSelected: boolean) => void;
  hasAvailableCodes: boolean;
}

const RedemptionCodeTableHeader: React.FC<RedemptionCodeTableHeaderProps> = ({
  allSelected,
  onSelectAll,
  hasAvailableCodes
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10">
          <Checkbox 
            checked={allSelected} 
            onCheckedChange={onSelectAll}
            aria-label="Select all codes"
            disabled={!hasAvailableCodes}
          />
        </TableHead>
        <TableHead>Code</TableHead>
        <TableHead className="hidden md:table-cell">Type</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Created</TableHead>
        <TableHead className="hidden lg:table-cell">Expires</TableHead>
        <TableHead className="hidden lg:table-cell">Used By</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default RedemptionCodeTableHeader;
