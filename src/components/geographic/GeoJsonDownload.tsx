
import React from 'react';
import { Download, Link, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const GeoJsonDownload: React.FC = () => {
  const handleDownload = () => {
    fetch('/supported-regions.geojson')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'js4hs-coverage-regions.geojson';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('GeoJSON file downloaded successfully');
      })
      .catch(() => {
        toast.error('Failed to download the GeoJSON file');
      });
  };

  const copyJsonUrl = () => {
    const url = window.location.origin + '/supported-regions.geojson';
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('GeoJSON URL copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy URL');
      });
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">App Geographic Coverage</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Download our app's geographic coverage data in GeoJSON format, compatible with Apple MapKit and other mapping services.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Download GeoJSON</span>
          </Button>
          <Button onClick={copyJsonUrl} variant="secondary" className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            <span>Copy URL</span>
          </Button>
          <Button asChild variant="link" className="flex items-center gap-2">
            <a href="/supported-regions.geojson" target="_blank" rel="noopener noreferrer">
              <Link className="h-4 w-4" />
              <span>View Raw</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeoJsonDownload;
