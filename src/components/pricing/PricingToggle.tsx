
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ isAnnual, onToggle }) => {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-8">
      <button
        onClick={() => onToggle(true)}
        className={cn(
          "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
          isAnnual ? "text-indigo-700" : "text-gray-500 hover:text-gray-700"
        )}
      >
        Annual
        {isAnnual && (
          <motion.div
            layoutId="pricingToggle"
            className="absolute inset-0 bg-white rounded-full shadow-sm"
            style={{ zIndex: -1 }}
            transition={{ type: "spring", duration: 0.6 }}
          />
        )}
        {isAnnual && (
          <span className="absolute -top-1 -right-1 bg-green-100 text-green-800 text-xs font-medium px-1 py-0.5 rounded-full">
            -24%
          </span>
        )}
      </button>
      <button
        onClick={() => onToggle(false)}
        className={cn(
          "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
          !isAnnual ? "text-indigo-700" : "text-gray-500 hover:text-gray-700"
        )}
      >
        Monthly
        {!isAnnual && (
          <motion.div
            layoutId="pricingToggle"
            className="absolute inset-0 bg-white rounded-full shadow-sm"
            style={{ zIndex: -1 }}
            transition={{ type: "spring", duration: 0.6 }}
          />
        )}
      </button>
    </div>
  );
};

export default PricingToggle;
