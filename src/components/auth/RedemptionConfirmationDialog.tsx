
import React, { useState, useEffect } from 'react';
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
import ConfettiAnimation from './redemption/ConfettiAnimation';
import RedemptionLoadingAnimation from './redemption/RedemptionLoadingAnimation';
import RedemptionSuccessHeader from './redemption/RedemptionSuccessHeader';
import RedemptionBenefitsList from './redemption/RedemptionBenefitsList';
import RedemptionActionButtons from './redemption/RedemptionActionButtons';

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
  const [showMainContent, setShowMainContent] = useState(false);
  
  // Reset states when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setShowMainContent(false);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleAnimationComplete = () => {
    console.log('Animation completed, showing main content');
    setShowMainContent(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {showConfetti && <ConfettiAnimation />}
        
        <DialogHeader>
          {!showMainContent ? (
            <RedemptionLoadingAnimation onAnimationComplete={handleAnimationComplete} />
          ) : (
            <RedemptionSuccessHeader redemptionType={redemptionCode.type} />
          )}
        </DialogHeader>
        
        {showMainContent && (
          <>
            <div className="space-y-4">
              <RedemptionBenefitsList type={redemptionCode.type} />
              
              <div className="text-sm text-muted-foreground">
                <p>Your redemption code <span className="font-mono font-medium">{redemptionCode.code}</span> has been applied to {userProfile?.first_name ? `${userProfile.first_name}'s` : 'your'} account.</p>
              </div>
            </div>

            <DialogFooter>
              <RedemptionActionButtons 
                onClose={onClose} 
                onDashboardClick={onDashboardClick} 
                redemptionType={redemptionCode.type} 
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RedemptionConfirmationDialog;
