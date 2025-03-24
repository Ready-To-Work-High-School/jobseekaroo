
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Copy, 
  Mail, 
  Eye, 
  CheckCircle2, 
  ClockIcon, 
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import RedemptionCodeStatus from './RedemptionCodeStatus';

interface RedemptionCodeTableRowProps {
  code: RedemptionCode;
  isSelected: boolean;
  formatDate: (date?: Date | string) => string;
  onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
  onCopyCode: (code: string) => void;
  onEmailCode: (code: RedemptionCode) => void;
  onViewDetails: (code: RedemptionCode) => void;
}

const RedemptionCodeTableRow: React.FC<RedemptionCodeTableRowProps> = ({
  code,
  isSelected,
  formatDate,
  onSelectCode,
  onCopyCode,
  onEmailCode,
  onViewDetails
}) => {
  const { toast } = useToast();
  const codeExpired = isExpired(code.expiresAt);

  function isExpired(expiresAt: Date | string | undefined): boolean {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  }

  const handleCopyWithFeedback = (code: string) => {
    onCopyCode(code);
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard",
      variant: "default",
    });
  };

  return (
    <TableRow 
      key={code.id}
      className={cn(
        code.used && "bg-muted/20",
        codeExpired && !code.used && "bg-amber-50/50"
      )}
    >
      <TableCell>
        <Checkbox 
          checked={isSelected}
          onCheckedChange={(checked) => onSelectCode(code, !!checked)}
          aria-label={`Select code ${code.code}`}
          disabled={code.used}
        />
      </TableCell>
      <TableCell className="font-mono text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-1">
          <span className="truncate max-w-[100px] sm:max-w-none">
            {code.code}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => handleCopyWithFeedback(code.code)}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy code</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={code.type === 'student' ? 'default' : 'outline'}>
          {code.type === 'student' ? 'Student' : 'Employer'}
        </Badge>
      </TableCell>
      <TableCell>
        <RedemptionCodeStatus code={code} />
      </TableCell>
      <TableCell className="hidden md:table-cell">{formatDate(code.createdAt)}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {code.expiresAt ? formatDate(code.expiresAt) : 'Never'}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {code.usedBy || 'N/A'}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end items-center space-x-1">
          {!code.used && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEmailCode(code)}
                  disabled={codeExpired}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span className="sr-only">Email Code</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email this code</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={() => onViewDetails(code)}
              >
                <Eye className="h-3.5 w-3.5" />
                <span className="sr-only">View Details</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View code details</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RedemptionCodeTableRow;
