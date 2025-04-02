
import React from 'react';
import SpinningBitcoin from '@/components/animations/SpinningBitcoin';

interface RedemptionLoadingAnimationProps {
  onAnimationComplete: () => void;
}

const RedemptionLoadingAnimation: React.FC<RedemptionLoadingAnimationProps> = ({ 
  onAnimationComplete 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <SpinningBitcoin 
        size={80} 
        onAnimationComplete={onAnimationComplete}
        className="mb-4"
      />
      <p className="text-lg text-center text-muted-foreground animate-pulse">
        Redeeming your code...
      </p>
    </div>
  );
};

export default RedemptionLoadingAnimation;
