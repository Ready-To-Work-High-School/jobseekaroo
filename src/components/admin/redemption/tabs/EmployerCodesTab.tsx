
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Copy, Mail, Eye, QrCode } from 'lucide-react';

interface EmployerCodesTabProps {
  codes: RedemptionCode[];
  selectedCodes: RedemptionCode[];
  allSelected: boolean;
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
}

const EmployerCodesTab: React.FC<EmployerCodesTabProps> = ({
  codes,
  selectedCodes,
  allSelected,
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
  onDeleteSelected
}) => {
  const filteredCodes = codes.filter(code => code.type === 'employer');
  
  if (isLoading) {
    return <div className="p-6 text-center">Loading employer codes...</div>;
  }
  
  if (filteredCodes.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">No employer redemption codes found.</p>
        <Button onClick={onRefresh}>Refresh</Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Employer Redemption Codes</h3>
        <p className="text-sm text-muted-foreground">
          These codes can be distributed to employers for premium platform access.
        </p>
      </div>
      
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
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCodes.map((code) => (
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
      
      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
        >
          Export Employer Codes
        </Button>
        
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEmailSelected}
            disabled={selectedCodes.length === 0}
          >
            Email Selected
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDeleteSelected}
            disabled={selectedCodes.length === 0 || isDeleting}
          >
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerCodesTab;
