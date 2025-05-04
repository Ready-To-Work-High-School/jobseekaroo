
import React from 'react';
import { Globe } from 'lucide-react';
import CeoFeatureCard from '@/components/ceo/CeoFeatureCard';
import GeoJsonDownload from '@/components/geographic/GeoJsonDownload';

const GeographicCoverage: React.FC = () => {
  return (
    <CeoFeatureCard
      icon={<Globe className="h-5 w-5 text-blue-600" />}
      title="App Geographic Coverage"
      description="Platform service area and expansion regions"
    >
      <div className="mt-4">
        <GeoJsonDownload />
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-start gap-2">
          <Globe className="h-5 w-5 text-green-600 mt-1" />
          <div>
            <p className="font-medium">Priority Service Areas</p>
            <p className="text-muted-foreground">Jacksonville, Florida and surrounding areas have enhanced local support and resources</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Globe className="h-5 w-5 text-amber-600 mt-1" />
          <div>
            <p className="font-medium">Expansion Regions</p>
            <p className="text-muted-foreground">Upcoming service areas with educational institution partnerships in development</p>
          </div>
        </div>
      </div>
    </CeoFeatureCard>
  );
};

export default GeographicCoverage;
