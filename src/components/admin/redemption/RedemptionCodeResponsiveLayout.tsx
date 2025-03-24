
import React, { ReactNode } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface RedemptionCodeResponsiveLayoutProps {
  desktopContent: ReactNode;
  mobileContent: ReactNode;
}

const RedemptionCodeResponsiveLayout: React.FC<RedemptionCodeResponsiveLayoutProps> = ({
  desktopContent,
  mobileContent
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div className="redemption-code-container">
      {isMobile ? mobileContent : desktopContent}
    </div>
  );
};

export default RedemptionCodeResponsiveLayout;
