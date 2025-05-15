
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookmarkIcon, XIcon, SearchIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { SavedSearch } from '@/types/user';
import { saveSearch, deleteSavedSearch } from '@/lib/mock-data/search';
import { cn } from '@/lib/utils';

interface SavedSearchesProps {
  userId?: string;
  zipCode: string;
  radius?: number;
  filters: Record<string, any>;
  className?: string;
  onSelectSearch?: (search: SavedSearch) => void;
}

const SavedSearches = ({ userId, zipCode, radius, filters, className, onSelectSearch }: SavedSearchesProps) => {
  const [searchName, setSearchName] = useState('');
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Load saved searches on component mount
  useEffect(() => {
    if (userId) {
      // In a real app, we would fetch saved searches from Supabase here
      // For now, we're using mock data from localStorage
      const storedSearches = localStorage.getItem(`savedSearches-${userId}`);
      if (storedSearches) {
        setSavedSearches(JSON.parse(storedSearches));
      }
    }
  }, [userId]);

  // Save searches to localStorage whenever they change
  useEffect(() => {
    if (userId && savedSearches.length > 0) {
      localStorage.setItem(`savedSearches-${userId}`, JSON.stringify(savedSearches));
    }
  }, [savedSearches, userId]);

  const handleSaveSearch = async () => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save searches",
        variant: "destructive"
      });
      return;
    }

    if (!searchName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for your saved search",
        variant: "destructive"
      });
      return;
    }

    if (!zipCode.trim()) {
      toast({
        title: "Location required",
        description: "Please provide a location for your search",
        variant: "destructive"
      });
      return;
    }

    try {
      // In a production app, this would save to Supabase
      const savedSearch = await saveSearch(userId, searchName, zipCode, radius, filters);
      
      // For demo purposes, we're saving to state and localStorage
      setSavedSearches(prev => [...prev, savedSearch as SavedSearch]);
      
      toast({
        title: "Search saved",
        description: "Your search has been saved successfully"
      });
      
      setSearchName('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving search:', error);
      toast({
        title: "Error saving search",
        description: "There was a problem saving your search",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSearch = async (searchId: string) => {
    if (!userId) return;

    try {
      // In a production app, this would delete from Supabase
      await deleteSavedSearch(userId, searchId);
      
      // For demo purposes, we're removing from state and localStorage
      setSavedSearches(prev => prev.filter(search => search.id !== searchId));
      
      toast({
        title: "Search deleted",
        description: "Your saved search has been deleted"
      });
    } catch (error) {
      console.error('Error deleting search:', error);
      toast({
        title: "Error deleting search",
        description: "There was a problem deleting your search",
        variant: "destructive"
      });
    }
  };

  const handleSearchClick = (search: SavedSearch) => {
    if (onSelectSearch) {
      onSelectSearch(search);
    } else {
      // Navigate to search results page with the saved search parameters
      const params = new URLSearchParams();
      params.set('zipCode', search.zipCode);
      if (search.radius) params.set('radius', search.radius.toString());
      
      // Add other filters from the saved search
      Object.entries(search.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            Object.entries(value).forEach(([subKey, subValue]) => {
              if (subValue !== undefined && subValue !== null) {
                params.set(`${key}.${subKey}`, subValue.toString());
              }
            });
          } else {
            params.set(key, value.toString());
          }
        }
      });
      
      navigate(`/jobs?${params.toString()}`);
    }
  };

  return (
    <div className={className}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <BookmarkIcon className="h-4 w-4" />
            Save Search
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save this search</DialogTitle>
            <DialogDescription>
              Save your current search criteria to quickly access it later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="search-name" className="text-right">
                Name
              </Label>
              <Input
                id="search-name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Weekend Jobs Near Home"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Location</Label>
              <div className="col-span-3 text-sm">
                {zipCode}
                {radius ? ` (within ${radius} miles)` : ''}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSearch}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {savedSearches.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Your Saved Searches</h3>
          <div className="space-y-2">
            {savedSearches.map((search) => (
              <div
                key={search.id}
                className={cn(
                  "flex items-center justify-between",
                  "p-2 rounded-md border border-border",
                  "hover:border-primary/50 hover:bg-accent/50 cursor-pointer transition-colors"
                )}
              >
                <div 
                  className="flex-1 flex items-center gap-2"
                  onClick={() => handleSearchClick(search)}
                >
                  <SearchIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{search.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSearch(search.id);
                  }}
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;
