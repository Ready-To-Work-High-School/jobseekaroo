
import React from 'react';
import { Button } from '@/components/ui/button';
import { SavedSearch } from '@/types/user';
import { Bookmark, X, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SavedSearchesProps {
  searches: SavedSearch[];
  onSelectSearch: (search: SavedSearch) => void;
  onDeleteSearch?: (id: string) => void;
  className?: string;
}

const SavedSearches: React.FC<SavedSearchesProps> = ({
  searches,
  onSelectSearch,
  onDeleteSearch,
  className
}) => {
  if (searches.length === 0) {
    return (
      <div className={`p-4 text-center ${className}`}>
        <p className="text-muted-foreground">No saved searches yet.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 p-2 ${className}`}>
      <h3 className="font-medium px-2 mb-2">Saved Searches</h3>
      <div className="max-h-64 overflow-y-auto">
        {searches.map((search) => (
          <div
            key={search.id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-secondary cursor-pointer"
            onClick={() => onSelectSearch(search)}
          >
            <div className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <div>
                <div className="font-medium text-sm">{search.name}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {search.created_at
                      ? formatDistanceToNow(new Date(search.created_at), { addSuffix: true })
                      : 'Recently saved'}
                  </span>
                </div>
              </div>
            </div>
            {onDeleteSearch && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSearch(search.id);
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearches;
