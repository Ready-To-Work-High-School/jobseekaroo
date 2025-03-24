
import React, { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RedemptionCodeResponsiveLayoutProps {
  desktopContent: ReactNode;
  mobileContent: ReactNode;
}

const RedemptionCodeResponsiveLayout: React.FC<RedemptionCodeResponsiveLayoutProps> = ({
  desktopContent,
  mobileContent
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="redemption-code-container">
      {isMobile ? mobileContent : desktopContent}
    </div>
  );
};

export default RedemptionCodeResponsiveLayout;
