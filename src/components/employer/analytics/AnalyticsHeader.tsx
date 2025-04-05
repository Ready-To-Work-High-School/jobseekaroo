
import React from 'react';

interface AnalyticsHeaderProps {
  title: string;
  description?: string;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  title, 
  description = "Track performance metrics and understand your applicant pool" 
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );
};

export default AnalyticsHeader;
