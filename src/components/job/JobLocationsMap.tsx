
import React from 'react';
import { getJobs } from '@/lib/mock-data/';
import { Job } from '@/types/job';
import { MapPin, Briefcase } from 'lucide-react';

const JobLocationsMap: React.FC = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-muted">
      <div className="bg-muted px-4 py-3 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Job Locations in Jacksonville</h3>
      </div>
      
      {/* Placeholder for map */}
      <div className="relative">
        <div 
          className="w-full h-[400px]"
          style={{ backgroundColor: '#f5f5f5' }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center p-6 max-w-md">
            <Briefcase className="mx-auto h-12 w-12 text-primary/30" />
            <h3 className="mt-2 text-xl font-semibold">Map Preview</h3>
            <p className="mt-1 text-muted-foreground">
              In the live version, this area displays an interactive map showing all job locations. Add your Google Maps API key to enable the full functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobLocationsMap;
