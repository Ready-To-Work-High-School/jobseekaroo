import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SavedSearch } from '@/types/user';
import { JobSearchFilters } from '@/types/job';
import Loading from './ui/Loading';

interface SavedSearchesProps {
  currentLocation?: string; 
  currentRadius?: number;
  currentFilters?: JobSearchFilters;
  onSearchSelect: (search: SavedSearch) => void;
  className?: string;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const SavedSearches = ({ 
  currentLocation, 
  currentRadius, 
  currentFilters, 
  onSearchSelect, 
  className 
}: SavedSearchesProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const form = useForm<{ name: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const loadSearches = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_searches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSearches(data || []);
    } catch (error) {
      console.error('Error loading saved searches:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your saved searches',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSearches();
  }, [user]);

  const handleSaveSearch = async (values: { name: string }) => {
    if (!user || !currentFilters) return;

    try {
      // Convert the current search to the SavedSearch format
      const newSearch = {
        name: values.name,
        query: currentLocation || '',
        zipCode: currentLocation || '',
        radius: currentRadius || 25,
        filters: currentFilters,
        user_id: user.id
      };

      const { error } = await supabase
        .from('saved_searches')
        .insert(newSearch);

      if (error) throw error;

      toast({
        title: 'Search saved',
        description: 'Your search has been saved successfully',
      });
      
      form.reset();
      setShowSaveDialog(false);
      loadSearches();
    } catch (error) {
      console.error('Error saving search:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your search',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSearch = async (id: string) => {
    if (!user) return;

    setDeleting(id);
    try {
      const { error } = await supabase
        .from('saved_searches')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Search deleted',
        description: 'Your saved search has been removed',
      });
      
      setSearches(searches.filter(search => search.id !== id));
    } catch (error) {
      console.error('Error deleting search:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete your search',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Saved Searches</h3>
        <Button variant="outline" size="icon" onClick={() => setShowSaveDialog(true)}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      {searches.length === 0 ? (
        <div className="text-muted-foreground">No saved searches yet.</div>
      ) : (
        <ul className="space-y-2">
          {searches.map((search) => (
            <li key={search.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary cursor-pointer">
              <button onClick={() => onSearchSelect(search)} className="flex-1 text-left">
                {search.name}
                {search.zipCode && (
                  <Badge variant="secondary" className="ml-2">{search.zipCode}</Badge>
                )}
              </button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSearch(search.id);
                }}
                disabled={deleting === search.id}
              >
                {deleting === search.id ? (
                  <Loading size="sm" />
                ) : (
                  <XCircleIcon className="h-4 w-4" />
                )}
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Search</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveSearch)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Remote React Jobs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  Save Search
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedSearches;
