
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCurrentLocation, getZipFromCoordinates, commonZipCodes } from '@/lib/mock-data/search';
import { cn } from '@/lib/utils';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const LocationSelector = ({ value, onChange, className }: LocationSelectorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredZipCodes, setFilteredZipCodes] = useState<string[]>([]);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

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
    // Show privacy notice before accessing location
    setShowPrivacyDialog(true);
  };
  
  const processLocationDetection = async () => {
    setIsLoading(true);
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      const zipCode = await getZipFromCoordinates(latitude, longitude);
      onChange(zipCode);
      toast({
        title: "Location detected",
        description: `Your location has been set to ZIP code ${zipCode}. This data is encrypted and securely stored.`
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
          showAutocomplete={true}
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
      
      {/* Location Privacy Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Location Privacy Notice
            </DialogTitle>
            <DialogDescription>
              We respect your privacy and comply with FERPA and other applicable privacy laws.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <p>By enabling location detection, you consent to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The collection of your approximate location (ZIP code only)</li>
              <li>Secure storage of this data with encryption</li>
              <li>Usage for job matching and location-based services only</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              You can manually enter your ZIP code instead if you prefer not to share your precise location.
              Your location data will never be shared with third parties without your explicit consent.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => {
              setShowPrivacyDialog(false);
              processLocationDetection();
            }}>
              I Consent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationSelector;
