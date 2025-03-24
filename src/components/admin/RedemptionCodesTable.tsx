
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
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (codes.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md bg-muted/20">
        <p className="text-muted-foreground mb-2">No redemption codes found</p>
        <p className="text-sm text-muted-foreground">Try changing the filter or generate new codes</p>
      </div>
    );
  }

  const handleCopyWithFeedback = (code: string) => {
    onCopyCode(code);
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard",
      variant: "default",
    });
  };

  const isExpired = (expiresAt: Date | string | undefined): boolean => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const expiresInDays = (expiresAt: Date | string | undefined): number => {
    if (!expiresAt) return 0;
    const today = new Date();
    const expDate = new Date(expiresAt);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox 
                  checked={allSelected && codes.length > 0} 
                  onCheckedChange={onSelectAll}
                  aria-label="Select all codes"
                  disabled={codes.every(code => code.used)}
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
          <TableBody>
            {codes.map((code) => {
              const isSelected = selectedCodes.some(c => c.id === code.id);
              const codeExpired = isExpired(code.expiresAt);
              const daysLeft = expiresInDays(code.expiresAt);
              
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
                    {code.used ? (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        Used
                      </Badge>
                    ) : codeExpired ? (
                      <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-600">
                        <AlertTriangle className="h-3 w-3" />
                        Expired
                      </Badge>
                    ) : daysLeft < 7 ? (
                      <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-600">
                        <ClockIcon className="h-3 w-3" />
                        {daysLeft}d left
                      </Badge>
                    ) : (
                      <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Available
                      </Badge>
                    )}
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
            })}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default RedemptionCodesTable;
