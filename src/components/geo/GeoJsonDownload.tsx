
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useClipboard } from '@/hooks/useClipboard';

const GeoJsonDownload: React.FC = () => {
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();

  const handleDownload = () => {
    // Create a link to download the file
    const link = document.createElement('a');
    link.href = '/supported-regions.geojson';
    link.download = 'supported-regions.geojson';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Your GeoJSON file download has started."
    });
  };

  const handleCopyUrl = () => {
    const baseUrl = window.location.origin;
    const geoJsonUrl = `${baseUrl}/supported-regions.geojson`;
    
    if (copyToClipboard(geoJsonUrl)) {
      toast({
        title: "URL Copied",
        description: "GeoJSON file URL has been copied to clipboard",
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Unable to copy URL. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-3">Geographic Service Area</h2>
      <p className="text-muted-foreground mb-4">
        Your app supports the United States region. You can download the GeoJSON file
        defining this area for your records or implementation.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download size={16} />
          Download GeoJSON
        </Button>
        <Button variant="outline" onClick={handleCopyUrl}>
          Copy GeoJSON URL
        </Button>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>This file defines the geographic regions supported by Job Seekers 4 High Schools.</p>
        <p>Format: GeoJSON with MultiPolygon coordinates for the United States.</p>
      </div>
    </div>
  );
};

export default GeoJsonDownload;
