
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SearchIcon, MapPin, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDebounce } from '@/hooks/useDebounce';
import { categories } from '@/lib/constants';
import { JobSearchFilters } from '@/types/job';

interface SavedSearch {
  id: string;
  name: string;
  query?: string;
  zipCode?: string;
  radius?: number;
  filters?: JobSearchFilters;
}

interface EnhancedSearchFormProps {
  initialLocation?: string;
  initialRadius?: number;
  initialFilters?: JobSearchFilters;
}

const EnhancedSearchForm = ({ initialLocation, initialRadius, initialFilters }: EnhancedSearchFormProps) => {
  const [location, setLocation] = useState(initialLocation || '');
  const [radius, setRadius] = useState(initialRadius || 25);
  const [isRemote, setIsRemote] = useState(initialFilters?.isRemote || false);
  const [filters, setFilters] = useState<JobSearchFilters>(initialFilters || {});
  const [category, setCategory] = useState(initialFilters?.category || '');
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const debouncedLocation = useDebounce(location, 500);
  const navigate = useNavigate();

  useEffect(() => {
    setLocation(initialLocation || '');
    setRadius(initialRadius || 25);
    setIsRemote(initialFilters?.isRemote || false);
    setFilters(initialFilters || {});
    setCategory(initialFilters?.category || '');
  }, [initialLocation, initialRadius, initialFilters]);

  const handleSearch = useCallback(() => {
    const params = createSearchParams();

    if (debouncedLocation) {
      params.set('location', debouncedLocation);
    }

    if (radius && radius !== 25) {
      params.set('radius', radius.toString());
    }

    if (isRemote) {
      params.set('remote', 'true');
    }

    if (category) {
      params.set('category', category);
    }

    navigate(`/?${params.toString()}`);
  }, [debouncedLocation, radius, isRemote, category, navigate]);

  const handleSelectSavedSearch = (search: SavedSearch) => {
    // Extract the components from the saved search
    const zipCode = search.zipCode || search.query || '';
    const radius = search.radius || 25;
    const filters = search.filters || {};
    
    // Set the form state
    setLocation(zipCode);
    setRadius(radius);
    setFilters(filters);

    // Trigger the search
    handleSearch();
  };

  return (
    <div className="container relative max-w-4xl mx-auto p-4">
      <div className="grid gap-4 md:grid-cols-3 items-center">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter location or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="md:flex md:items-center">
          <Label htmlFor="radius" className="text-sm mr-2 hidden md:block">Radius:</Label>
          <div className="flex items-center">
            <Slider
              id="radius"
              defaultValue={[radius]}
              max={100}
              step={5}
              onValueChange={(value) => setRadius(value[0])}
              className="w-full"
            />
            <span className="ml-2 text-sm">{radius} miles</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button onClick={handleSearch} className="w-full md:w-auto">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                Category
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant="ghost"
                  className="justify-start w-full hover:bg-secondary/50"
                  onClick={() => setCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-4 flex items-center space-x-2">
            <Switch id="remote" checked={isRemote} onCheckedChange={setIsRemote} />
            <Label htmlFor="remote" className="text-sm">Remote</Label>
          </div>
        </div>

        <Button variant="secondary" size="sm" onClick={() => setShowSavedSearches(!showSavedSearches)}>
          {showSavedSearches ? 'Hide Saved Searches' : 'Show Saved Searches'}
        </Button>
      </div>

      {showSavedSearches && (
        <div className="absolute top-full mt-2 right-0 bg-card border rounded-md shadow-md z-10">
          {/* SavedSearches component should be loaded conditionally here */}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchForm;
