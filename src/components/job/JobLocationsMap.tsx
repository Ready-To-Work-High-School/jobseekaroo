
import React, { useEffect, useRef } from 'react';
import { getJobs } from '@/lib/mock-data';
import { Job } from '@/types/job';
import { MapPin, Briefcase } from 'lucide-react';

const JobLocationsMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  
  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMapsAPI = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Create a global callback function
      window.initMap = () => {
        if (mapRef.current) {
          initializeMap();
        }
      };
      
      document.head.appendChild(script);
    };
    
    // Initialize the map
    const initializeMap = () => {
      if (!mapRef.current) return;
      
      // Jacksonville, FL coordinates
      const jacksonville = { lat: 30.3322, lng: -81.6557 };
      
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: jacksonville,
        zoom: 11,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
          { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [{ color: "#bdbdbd" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#dadada" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9c9c9" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }],
          },
        ],
      });
      
      // Add job markers
      addJobMarkers();
    };
    
    // Add markers for jobs
    const addJobMarkers = () => {
      if (!mapInstance.current) return;
      
      const jobs = getJobs();
      
      // InfoWindow for showing job details
      const infoWindow = new google.maps.InfoWindow();
      
      jobs.forEach((job) => {
        // Create a marker for each job
        const marker = new google.maps.Marker({
          position: getRandomJacksonvillePosition(job),
          map: mapInstance.current,
          title: job.title,
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#4285F4',
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8,
          },
        });
        
        // Add click listener to show info window
        marker.addListener('click', () => {
          infoWindow.setContent(createInfoWindowContent(job));
          infoWindow.open(mapInstance.current, marker);
        });
        
        markers.current.push(marker);
      });
    };
    
    // Helper to create random positions in Jacksonville area
    const getRandomJacksonvillePosition = (job: Job): google.maps.LatLngLiteral => {
      // Base coordinates for Jacksonville
      const jacksonville = { lat: 30.3322, lng: -81.6557 };
      
      // Parse zipcode and use it to create slightly different positions
      const zipSum = job.location.zipCode.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      
      // Use the zipcode sum to create a deterministic but varied position
      return {
        lat: jacksonville.lat + ((zipSum % 20) - 10) * 0.01,
        lng: jacksonville.lng + ((zipSum % 30) - 15) * 0.01,
      };
    };
    
    // Create content for the info window
    const createInfoWindowContent = (job: Job): string => {
      return `
        <div style="max-width: 200px; padding: 5px;">
          <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: 600;">${job.title}</h3>
          <p style="margin: 0 0 5px; font-size: 14px;">${job.company.name}</p>
          <p style="margin: 0 0 5px; font-size: 14px;">${job.location.city}, ${job.location.state}</p>
          <p style="margin: 0; font-size: 14px; color: #4285F4;">${job.type}</p>
        </div>
      `;
    };
    
    loadGoogleMapsAPI();
    
    return () => {
      // Clear markers
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
      
      // Remove the global callback
      delete window.initMap;
    };
  }, []);
  
  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-muted">
      <div className="bg-muted px-4 py-3 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Job Locations in Jacksonville</h3>
      </div>
      
      {/* Placeholder message for development */}
      <div className="relative">
        <div
          ref={mapRef}
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

// Need to extend Window interface to allow for the global callback
declare global {
  interface Window {
    initMap: () => void;
  }
}

export default JobLocationsMap;
