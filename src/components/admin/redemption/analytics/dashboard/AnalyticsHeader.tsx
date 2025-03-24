
import React from 'react';

interface AnalyticsHeaderProps {
  title: string;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ title }) => {
  return (
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
  );
};

export default AnalyticsHeader;
