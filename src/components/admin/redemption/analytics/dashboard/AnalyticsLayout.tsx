
import React from 'react';

interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

const AnalyticsLayout: React.FC<AnalyticsLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {children}
    </div>
  );
};

export default AnalyticsLayout;
