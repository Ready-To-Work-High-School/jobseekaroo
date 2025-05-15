
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SavedSearch } from '@/types/user';
import { JobSearchFilters } from '@/types/job';
import { useAuth } from '@/contexts/auth';

interface SavedSearchesProps {
  currentLocation: string;
  currentRadius: number;
  currentFilters: JobSearchFilters;
  onSearchSelect: (search: SavedSearch) => void;
  className?: string;
}

const SavedSearches: React.FC<SavedSearchesProps> = ({
  currentLocation,
  currentRadius,
  currentFilters,
  onSearchSelect,
  className
}) => {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedSearches = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // In a real implementation, you would fetch from your database
        // For now, we'll just use mock data
        const mockSearches: SavedSearch[] = [
          {
            id: '1',
            name: 'Tech Jobs in Jacksonville',
            zipCode: '32256',
            radius: 25,
            filters: { category: 'technology', isRemote: true }
          },
          {
            id: '2',
            name: 'Retail Near Me',
            zipCode: '32204',
            radius: 10,
            filters: { category: 'retail' }
          }
        ];
        
        setSearches(mockSearches);
      } catch (error) {
        console.error('Error fetching saved searches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedSearches();
  }, [user]);

  const handleSaveCurrentSearch = async () => {
    if (!user) return;
    
    try {
      const newSearch: SavedSearch = {
        id: String(Date.now()),
        name: `Search on ${new Date().toLocaleDateString()}`,
        zipCode: currentLocation,
        radius: currentRadius,
        filters: currentFilters,
        user_id: user.id
      };
      
      // In a real implementation, you would save to your database
      setSearches([...searches, newSearch]);
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  const handleDeleteSearch = async (id: string) => {
    try {
      // In a real implementation, you would delete from your database
      setSearches(searches.filter(search => search.id !== id));
    } catch (error) {
      console.error('Error deleting saved search:', error);
    }
  };

  if (loading) {
    return <div className={className}>Loading saved searches...</div>;
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Saved Searches</h3>
        {user && (
          <Button size="sm" variant="ghost" onClick={handleSaveCurrentSearch}>
            Save Current
          </Button>
        )}
      </div>
      
      {searches.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">No saved searches yet.</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {searches.map((search) => (
            <Card key={search.id} className="p-2">
              <div className="flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-left justify-start w-full h-auto py-1"
                  onClick={() => onSearchSelect(search)}
                >
                  <div>
                    <p className="font-medium truncate w-48">{search.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {search.zipCode} ({search.radius} miles)
                    </p>
                  </div>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => handleDeleteSearch(search.id)}
                >
                  <span className="sr-only">Delete</span>
                  &times;
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {!user && (
        <p className="text-xs text-muted-foreground mt-2 italic">
          Sign in to save and access your searches
        </p>
      )}
    </div>
  );
};

export default SavedSearches;
