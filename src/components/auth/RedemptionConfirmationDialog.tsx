
import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, UserCircle, Briefcase, ShieldCheck, Sparkles } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';
import { UserProfile } from '@/types/user';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RedemptionConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  redemptionCode: RedemptionCode;
  userProfile?: UserProfile | null;
  onDashboardClick?: () => void;
}

const RedemptionConfirmationDialog: React.FC<RedemptionConfirmationDialogProps> = ({
  isOpen,
  onClose,
  redemptionCode,
  userProfile,
  onDashboardClick
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Get icon based on the redemption code type
  const getIcon = () => {
    switch (redemptionCode.type) {
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
    switch (redemptionCode.type) {
      case 'student':
        return 'Student Account';
      case 'employer':
        return 'Employer Account';
      default:
        return 'Premium Account';
    }
  };

  // Benefits based on account type
  const getBenefits = () => {
    switch (redemptionCode.type) {
      case 'student':
        return [
          'Access to premium job listings',
          'Resume builder tools',
          'Interview preparation resources',
          'Skill assessment tools'
        ];
      case 'employer':
        return [
          'Post unlimited job listings',
          'Advanced candidate search',
          'Analytics and reporting tools',
          'Featured company profile'
        ];
      default:
        return ['Premium account benefits'];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                }}
              />
            ))}
          </div>
        )}
        
        <DialogHeader>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
            {getIcon()}
            <Sparkles className="absolute h-6 w-6 text-yellow-400 animate-bounce" style={{ top: '90px', right: '150px' }} />
            <Sparkles className="absolute h-6 w-6 text-yellow-400 animate-bounce" style={{ top: '90px', left: '150px', animationDelay: '0.5s' }} />
          </div>
          <DialogTitle className="text-xl text-center">Redemption Successful!</DialogTitle>
          <DialogDescription className="text-center">
            Your account has been upgraded to <Badge variant="outline" className="ml-1 font-semibold">{getAccountTypeText()}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <h4 className="font-medium mb-2">Your new benefits include:</h4>
            <ul className="list-disc list-inside space-y-1">
              {getBenefits().map((benefit, index) => (
                <li key={index} className="text-sm">{benefit}</li>
              ))}
            </ul>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Your redemption code <span className="font-mono font-medium">{redemptionCode.code}</span> has been applied to {userProfile?.first_name ? `${userProfile.first_name}'s` : 'your'} account.</p>
          </div>
        </div>

        <DialogFooter className="sm:justify-center gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="brand" 
            className="animate-pulse" 
            onClick={onDashboardClick || (() => window.location.href = '/account-benefits')}
          >
            View All Benefits
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RedemptionConfirmationDialog;
