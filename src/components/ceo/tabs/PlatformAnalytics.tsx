
import React from 'react';
import { CalendarClock } from 'lucide-react';
import CeoFeatureCard from '@/components/ceo/CeoFeatureCard';

const PlatformAnalytics: React.FC = () => {
  return (
    <div className="grid gap-6">
      <CeoFeatureCard
        icon={<CalendarClock className="h-5 w-5 text-muted-foreground" />}
        title="Platform Analytics"
        description=""
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Active Verified Students:</span>
            <span className="font-medium">50+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Verified Employers:</span>
            <span className="font-medium">25+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Successful Placements:</span>
            <span className="font-medium">30+</span>
          </div>
        </div>
      </CeoFeatureCard>
    </div>
  );
};

export default PlatformAnalytics;
