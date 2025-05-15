
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Clock, Trash2 } from 'lucide-react';
import { SavedSearch } from '@/types/user';

interface SavedSearchesProps {
  searches: SavedSearch[];
  onSelectSearch: (search: SavedSearch) => void;
  onDeleteSearch: (id: string) => void;
}

const SavedSearches: React.FC<SavedSearchesProps> = ({
  searches,
  onSelectSearch,
  onDeleteSearch,
}) => {
  if (searches.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground text-sm">No saved searches found.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-md border border-border">
      <h3 className="text-lg font-medium mb-4">Saved Searches</h3>
      <div className="space-y-2">
        {searches.map((search) => (
          <div 
            key={search.id}
            className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors"
          >
            <Button 
              variant="ghost" 
              className="w-full flex justify-start items-center gap-2 h-auto p-0 hover:bg-transparent"
              onClick={() => onSelectSearch(search)}
            >
              <Bookmark className="h-4 w-4 text-primary" />
              <div className="text-left">
                <p className="text-sm font-medium">{search.name}</p>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {search.zipCode || search.query || ''} 
                    {search.filters?.radius ? ` (${search.filters.radius} miles)` : ''}
                  </p>
                </div>
              </div>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => onDeleteSearch(search.id)}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearches;
