
import React from 'react';
import { getJobs } from '@/lib/mock-data/';
import { Job } from '@/types/job';
import { MapPin, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';

const JobLocationsMap: React.FC = () => {
  // Mock job locations for the map
  const jobLocations = [
    { lat: 30.3322, lng: -81.6557, title: "Retail Associate", company: "Target" },
    { lat: 30.2866, lng: -81.5904, title: "Barista", company: "Starbucks" },
    { lat: 30.3293, lng: -81.6747, title: "Server", company: "Olive Garden" },
    { lat: 30.2855, lng: -81.5482, title: "Cashier", company: "Publix" },
    { lat: 30.3156, lng: -81.6747, title: "Sales Associate", company: "Best Buy" }
  ];

  // Generate the Google Maps URL with markers for the job locations
  const generateMapUrl = () => {
    const baseUrl = 'https://www.google.com/maps/embed/v1/view';
    const center = '30.3322,-81.6557'; // Jacksonville, FL coordinates
    const zoom = '12';
    const markers = jobLocations.map(loc => `${loc.lat},${loc.lng}`).join('|');
    
    return `${baseUrl}?key=AIzaSyAfiJRQeKjhXMcqYP7EJzAdjcwB9NYyZ6c&center=${center}&zoom=${zoom}`;
  };

  return (
    <Card className="rounded-lg overflow-hidden shadow-md border border-muted">
      <div className="bg-muted px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Job Locations in Jacksonville</h3>
        </div>
      </div>
      
      <div className="relative h-[400px] w-full">
        <iframe
          title="Job Locations Map"
          width="100%"
          height="100%"
          frameBorder="0"
          src={generateMapUrl()}
          allowFullScreen
          className="border-0"
        ></iframe>
        
        <div className="absolute bottom-4 right-4">
          <div className="bg-white rounded-md shadow-md p-3 max-w-xs">
            <h4 className="font-semibold text-sm mb-2">5 Jobs in This Area</h4>
            <ul className="text-xs space-y-1">
              {jobLocations.map((job, i) => (
                <li key={i} className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>{job.title} at {job.company}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobLocationsMap;
