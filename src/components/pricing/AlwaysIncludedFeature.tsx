
import React from 'react';

interface AlwaysIncludedFeatureProps {
  feature: string;
}

const AlwaysIncludedFeature: React.FC<AlwaysIncludedFeatureProps> = ({ feature }) => {
  return (
    <li className="flex items-start mb-2">
      <div className="h-5 w-5 mr-2 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
        <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
      </div>
      <span className="text-sm text-gray-600">{feature}</span>
    </li>
  );
};

export default AlwaysIncludedFeature;
