
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Copy, Mail, Eye, QrCode } from 'lucide-react';

interface AllCodesTabProps {
  codes: RedemptionCode[];
  selectedCodes: RedemptionCode[];
  allSelected: boolean;
  currentPage: number;
  pageSize: number;
  totalCodes: number;
  isLoading: boolean;
  isDeleting: boolean;
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

const AllCodesTab: React.FC<AllCodesTabProps> = ({
  codes,
  selectedCodes,
  allSelected,
  currentPage,
  pageSize,
  totalCodes,
  isLoading,
  isDeleting,
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
  if (isLoading) {
    return <div className="p-6 text-center">Loading codes...</div>;
  }
  
  if (codes.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">No redemption codes found.</p>
        <Button onClick={onRefresh}>Refresh</Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="h-4 w-4"
              />
            </TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codes.map((code) => (
            <TableRow key={code.id}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedCodes.some((c) => c.id === code.id)}
                  onChange={(e) => onSelectCode(code, e.target.checked)}
                  className="h-4 w-4"
                />
              </TableCell>
              <TableCell className="font-mono">{code.code}</TableCell>
              <TableCell>
                <Badge variant={code.type === 'student' ? 'secondary' : 'default'}>
                  {code.type.charAt(0).toUpperCase() + code.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={code.used ? 'destructive' : 'success'}>
                  {code.used ? 'Used' : 'Available'}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(code.createdAt)}</TableCell>
              <TableCell>{code.expiresAt ? formatDate(code.expiresAt) : 'Never'}</TableCell>
              <TableCell className="text-right space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onCopyCode(code.code)}
                  title="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEmailCode(code)}
                  title="Email code"
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewDetails(code)}
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewQRCode(code)}
                  title="View QR code"
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalCodes)} - {Math.min(currentPage * pageSize, totalCodes)} of {totalCodes} codes
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage * pageSize >= totalCodes}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllCodesTab;
