import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Copy, Mail, Eye, QrCode } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodeStatus from './RedemptionCodeStatus';

interface RedemptionCodeTableRowProps {
  code: RedemptionCode;
  isSelected: boolean;
  formatDate: (date?: Date | string) => string;
  onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
  onCopyCode: (code: string) => void;
  onEmailCode: (code: RedemptionCode) => void;
  onViewDetails: (code: RedemptionCode) => void;
  onViewQRCode: (code: RedemptionCode) => void;
}

const RedemptionCodeTableRow: React.FC<RedemptionCodeTableRowProps> = ({
  code,
  isSelected,
  formatDate,
  onSelectCode,
  onCopyCode,
  onEmailCode,
  onViewDetails,
  onViewQRCode
}) => {
  return (
    <TableRow className={isSelected ? 'bg-muted/50' : undefined}>
      <TableCell className="py-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectCode(code, e.target.checked)}
          className="h-4 w-4"
          disabled={code.used}
        />
      </TableCell>
      <TableCell className="font-mono">
        {code.code}
      </TableCell>
      <TableCell>
        <Badge
          variant={code.type === 'student' ? 'default' : 'outline'}
          className="capitalize"
        >
          {code.type}
        </Badge>
      </TableCell>
      <TableCell>
        <RedemptionCodeStatus code={code} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatDate(code.createdAt)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatDate(code.expiresAt)}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => onCopyCode(code.code)}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy code</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy code</TooltipContent>
          </Tooltip>
          
          {!code.used && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => onEmailCode(code)}
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email code</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Email code</TooltipContent>
            </Tooltip>
          )}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => onViewQRCode(code)}
              >
                <QrCode className="h-4 w-4" />
                <span className="sr-only">Show QR code</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Show QR code</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => onViewDetails(code)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">View details</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View details</TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RedemptionCodeTableRow;
