
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { getCurrentLocation, getZipFromCoordinates, commonZipCodes } from '@/lib/mock-data/search';
import { cn } from '@/lib/utils';

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const LocationSelector = ({ value, onChange, className }: LocationSelectorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredZipCodes, setFilteredZipCodes] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    // Filter zip codes for autocomplete
    if (inputValue.length > 0) {
      const filtered = commonZipCodes.filter(zip => 
        zip.startsWith(inputValue)
      );
      setFilteredZipCodes(filtered);
    } else {
      setFilteredZipCodes([]);
    }
  };

  const handleLocationDetection = async () => {
    setIsLoading(true);
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      const zipCode = await getZipFromCoordinates(latitude, longitude);
      onChange(zipCode);
      toast({
        title: "Location detected",
        description: `Your location has been set to ZIP code ${zipCode}`
      });
      setFilteredZipCodes([]);
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: "Location detection failed",
        description: "Please allow location access or enter your ZIP code manually",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder="Enter ZIP code"
          className="pl-10"
          showAutocomplete
          autocompleteItems={filteredZipCodes}
          onAutocompleteSelect={onChange}
        />
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={handleLocationDetection}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <MapPin className="h-4 w-4" />
      </div>
    </div>
  );
};

export default LocationSelector;
