
import React, { useState } from 'react';
import { getJobs } from '@/lib/mock-data/';
import { Job } from '@/types/job';
import { MapPin, Briefcase, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const JobLocationsMap: React.FC = () => {
  const [mapApiKey, setMapApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Mock job locations for the map (in a real app, these would come from the API)
  const jobLocations = [
    { lat: 30.3322, lng: -81.6557, title: "Retail Associate", company: "Target" },
    { lat: 30.2866, lng: -81.5904, title: "Barista", company: "Starbucks" },
    { lat: 30.3293, lng: -81.6747, title: "Server", company: "Olive Garden" },
    { lat: 30.2855, lng: -81.5482, title: "Cashier", company: "Publix" },
    { lat: 30.3156, lng: -81.6747, title: "Sales Associate", company: "Best Buy" }
  ];

  const handleSubmitApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapApiKey.trim() === '') {
      setError('Please enter a valid API key');
      return;
    }
    setShowKeyInput(false);
    setError('');
  };

  const handleReset = () => {
    setMapApiKey('');
    setShowKeyInput(true);
  };

  // Generate the Google Maps URL with markers for the job locations
  const generateMapUrl = () => {
    const baseUrl = 'https://www.google.com/maps/embed/v1/view';
    const center = '30.3322,-81.6557'; // Jacksonville, FL coordinates
    const zoom = '12';
    const markers = jobLocations.map(loc => `${loc.lat},${loc.lng}`).join('|');
    
    return `${baseUrl}?key=${mapApiKey}&center=${center}&zoom=${zoom}`;
  };

  return (
    <Card className="rounded-lg overflow-hidden shadow-md border border-muted">
      <div className="bg-muted px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Job Locations in Jacksonville</h3>
        </div>
        {!showKeyInput && mapApiKey && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReset}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Reset API Key
          </Button>
        )}
      </div>
      
      {showKeyInput ? (
        <div className="p-6 bg-white">
          <div className="text-center">
            <Briefcase className="mx-auto h-12 w-12 text-primary/30" />
            <h3 className="mt-2 text-xl font-semibold">Map Setup Required</h3>
            <p className="mt-1 text-muted-foreground mb-4">
              To view job locations, please enter your Google Maps API key.
            </p>
            
            <form onSubmit={handleSubmitApiKey} className="max-w-sm mx-auto">
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  value={mapApiKey} 
                  onChange={(e) => setMapApiKey(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  placeholder="Enter your Google Maps API key"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex gap-2">
                  <Button type="submit" className="w-full">
                    Load Map
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Visit <a href="https://console.cloud.google.com/google/maps-apis/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a> to get your API key.
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div className="relative h-[400px] w-full">
          {mapApiKey ? (
            <iframe
              title="Job Locations Map"
              width="100%"
              height="100%"
              frameBorder="0"
              src={generateMapUrl()}
              allowFullScreen
              className="border-0"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="text-center p-6 max-w-md">
                <Briefcase className="mx-auto h-12 w-12 text-primary/30" />
                <h3 className="mt-2 text-xl font-semibold">Map Preview</h3>
                <p className="mt-1 text-muted-foreground">
                  Please enter your Google Maps API key to view job locations.
                </p>
              </div>
            </div>
          )}
          
          {!showKeyInput && mapApiKey && (
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
          )}
        </div>
      )}
    </Card>
  );
};

export default JobLocationsMap;
