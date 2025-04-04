
import React from 'react';
import { UserCircle, Briefcase, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface RedemptionSuccessHeaderProps {
  redemptionType: string;
}

const RedemptionSuccessHeader: React.FC<RedemptionSuccessHeaderProps> = ({ 
  redemptionType 
}) => {
  // Get icon based on the redemption code type
  const getIcon = () => {
    switch (redemptionType) {
      case 'student':
        return <UserCircle className="h-16 w-16 text-primary animate-pulse" />;
      case 'employer':
        return <Briefcase className="h-16 w-16 text-primary animate-pulse" />;
      default:
        return <ShieldCheck className="h-16 w-16 text-primary animate-pulse" />;
    }
  };

  // Get formatted account type
  const getAccountTypeText = () => {
    switch (redemptionType) {
      case 'student':
        return 'Student Account';
      case 'employer':
        return 'Employer Account';
      case 'admin':
        return 'Administrator Account';
      default:
        return 'Premium Account';
    }
  };

  return (
    <>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
        {getIcon()}
        <Sparkles className="absolute h-6 w-6 text-yellow-400 animate-bounce" style={{ top: '90px', right: '150px' }} />
        <Sparkles className="absolute h-6 w-6 text-yellow-400 animate-bounce" style={{ top: '90px', left: '150px', animationDelay: '0.5s' }} />
      </div>
      <DialogTitle className="text-xl text-center">Redemption Successful!</DialogTitle>
      <DialogDescription className="text-center">
        Your account has been upgraded to <Badge variant="outline" className="ml-1 font-semibold">{getAccountTypeText()}</Badge>
      </DialogDescription>
    </>
  );
};

export default RedemptionSuccessHeader;
