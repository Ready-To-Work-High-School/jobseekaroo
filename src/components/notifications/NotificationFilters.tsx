
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useNotifications } from '@/contexts/notifications/NotificationsContext';

// Export as default instead of named export
const NotificationFilters: React.FC = () => {
  const { filterOptions, updateFilters } = useNotifications();

  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-md">
      <h3 className="text-sm font-medium mb-2">Filter Notifications</h3>
      
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Type</label>
        <Select 
          value={filterOptions.type} 
          onValueChange={(value) => updateFilters({ type: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="application">Application</SelectItem>
            <SelectItem value="job">Job</SelectItem>
            <SelectItem value="message">Message</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Status</label>
        <Select 
          value={filterOptions.read === true ? 'read' : filterOptions.read === false ? 'unread' : 'all'} 
          onValueChange={(value) => {
            let readValue: boolean | 'all' = 'all';
            if (value === 'read') readValue = true;
            if (value === 'unread') readValue = false;
            updateFilters({ read: readValue });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Read status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Date From</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterOptions.dateRange.from ? (
                format(filterOptions.dateRange.from, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filterOptions.dateRange.from || undefined}
              onSelect={(date) => updateFilters({ 
                dateRange: { ...filterOptions.dateRange, from: date } 
              })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Date To</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterOptions.dateRange.to ? (
                format(filterOptions.dateRange.to, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filterOptions.dateRange.to || undefined}
              onSelect={(date) => updateFilters({ 
                dateRange: { ...filterOptions.dateRange, to: date } 
              })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Sort By</label>
        <Select 
          value={filterOptions.sortBy} 
          onValueChange={(value) => updateFilters({ 
            sortBy: value as 'newest' | 'oldest' 
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        variant="outline" 
        onClick={() => updateFilters({
          type: 'all',
          read: 'all',
          dateRange: {
            from: null,
            to: null
          },
          sortBy: 'newest'
        })}
        className="mt-2"
      >
        Reset Filters
      </Button>
    </div>
  );
};

// Export as default
export default NotificationFilters;
