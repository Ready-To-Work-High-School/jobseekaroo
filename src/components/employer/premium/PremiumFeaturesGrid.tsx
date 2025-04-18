
import React from 'react';
import { BrandedListingFeature } from './features/BrandedListingFeature';
import { PriorityPlacementFeature } from './features/PriorityPlacementFeature';
import { SkillMatchingFeature } from './features/SkillMatchingFeature';
import { CustomFormsFeature } from './features/CustomFormsFeature';
import { DetailedMetricsFeature } from './features/DetailedMetricsFeature';
import { Sparkles } from 'lucide-react';

export const PremiumFeaturesGrid = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Premium Features
          <Sparkles className="h-5 w-5 text-amber-500" />
        </h2>
        <p className="text-muted-foreground mt-2">
          Unlock powerful tools to enhance your recruiting capabilities
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BrandedListingFeature />
        <PriorityPlacementFeature />
        <SkillMatchingFeature />
        <CustomFormsFeature />
        <DetailedMetricsFeature />
      </div>
    </div>
  );
};
