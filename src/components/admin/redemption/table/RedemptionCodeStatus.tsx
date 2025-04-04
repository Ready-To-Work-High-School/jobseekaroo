
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  ClockIcon, 
  AlertTriangle
} from 'lucide-react';

interface RedemptionCodeStatusProps {
  code: RedemptionCode;
}

const RedemptionCodeStatus: React.FC<RedemptionCodeStatusProps> = ({ code }) => {
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

  const codeExpired = isExpired(code.expiresAt);
  const daysLeft = expiresInDays(code.expiresAt);

  if (code.used) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        Used
      </Badge>
    );
  }
  
  if (codeExpired) {
    return (
      <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-600">
        <AlertTriangle className="h-3 w-3" />
        Expired
      </Badge>
    );
  }
  
  if (daysLeft < 7) {
    return (
      <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-600">
        <ClockIcon className="h-3 w-3" />
        {daysLeft}d left
      </Badge>
    );
  }
  
  return (
    <Badge variant="success" className="flex items-center gap-1">
      <CheckCircle2 className="h-3 w-3" />
      Available
    </Badge>
  );
};

export default RedemptionCodeStatus;
