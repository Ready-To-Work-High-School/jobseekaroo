
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Mail } from 'lucide-react';

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
  onViewDetails
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (codes.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No redemption codes found
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox 
                checked={allSelected} 
                onCheckedChange={onSelectAll}
                aria-label="Select all codes"
              />
            </TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Used By</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codes.map((code) => {
            const isSelected = selectedCodes.some(c => c.id === code.id);
            return (
              <TableRow key={code.id}>
                <TableCell>
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={(checked) => onSelectCode(code, !!checked)}
                    aria-label={`Select code ${code.code}`}
                    disabled={code.used}
                  />
                </TableCell>
                <TableCell className="font-mono font-medium">
                  <div className="flex items-center gap-1">
                    {code.code}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => onCopyCode(code.code)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={code.type === 'student' ? 'default' : 'outline'}>
                    {code.type === 'student' ? 'Student' : 'Employer'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={code.used ? 'destructive' : 'success'}>
                    {code.used ? 'Used' : 'Available'}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(code.createdAt)}</TableCell>
                <TableCell>{formatDate(code.expiresAt)}</TableCell>
                <TableCell>{code.usedBy || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2">
                    {!code.used && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => onEmailCode(code)}
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span className="sr-only">Email Code</span>
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewDetails(code)}
                    >
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RedemptionCodesTable;
