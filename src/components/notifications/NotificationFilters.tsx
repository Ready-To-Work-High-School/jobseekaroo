
import { useState } from 'react';
import { NotificationFilters, NotificationType } from '@/types/notification';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Check, ChevronDown, Filter, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { useNotifications } from '@/contexts/NotificationsContext';

export const NotificationFilters = () => {
  const { filters, setFilters } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const notificationTypes: { label: string; value: NotificationType | 'all' }[] = [
    { label: 'All Types', value: 'all' },
    { label: 'Job', value: 'job' },
    { label: 'Application', value: 'application' },
    { label: 'Message', value: 'message' },
    { label: 'Email', value: 'email' },
    { label: 'Account', value: 'account' },
    { label: 'Achievement', value: 'achievement' },
    { label: 'General', value: 'general' },
  ];

  const readStatusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
  ];

  const sortOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
  ];

  const hasActiveFilters = 
    filters.type !== 'all' || 
    filters.read !== 'all' || 
    filters.dateRange?.from !== null || 
    filters.dateRange?.to !== null;

  const resetFilters = () => {
    setFilters({
      type: 'all',
      read: 'all',
      dateRange: { from: null, to: null },
      sortBy: 'newest'
    });
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 gap-1 pl-3"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
                {hasActiveFilters && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1 rounded-full px-1 py-0 text-xs"
                  >
                    !
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-3" align="start">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Type</h4>
                  <Select
                    value={filters.type}
                    onValueChange={(value) => 
                      setFilters({ type: value as NotificationType | 'all' })
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {notificationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Status</h4>
                  <Select
                    value={filters.read === true ? 'read' : filters.read === false ? 'unread' : 'all'}
                    onValueChange={(value) => 
                      setFilters({ 
                        read: value === 'read' 
                          ? true 
                          : value === 'unread' 
                            ? false 
                            : 'all' 
                      })
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {readStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Date Range</h4>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 justify-start text-left font-normal flex-1"
                        >
                          <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                          {filters.dateRange?.from ? (
                            format(filters.dateRange.from, 'PPP')
                          ) : (
                            <span>From</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange?.from || undefined}
                          onSelect={(date) => 
                            setFilters({
                              dateRange: {
                                from: date,
                                to: filters.dateRange?.to || null
                              }
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 justify-start text-left font-normal flex-1"
                        >
                          <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                          {filters.dateRange?.to ? (
                            format(filters.dateRange.to, 'PPP')
                          ) : (
                            <span>To</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange?.to || undefined}
                          onSelect={(date) => 
                            setFilters({
                              dateRange: {
                                from: filters.dateRange?.from || null,
                                to: date
                              }
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Sort</h4>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => 
                      setFilters({ sortBy: value as 'newest' | 'oldest' })
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 mt-2"
                    onClick={resetFilters}
                  >
                    <XCircle className="mr-2 h-3.5 w-3.5" />
                    Reset Filters
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Display active filters as badges */}
          {filters.type !== 'all' && (
            <Badge 
              variant="secondary" 
              className="h-7 gap-1 pl-2 pr-1.5"
              onClick={() => setFilters({ type: 'all' })}
            >
              Type: {filters.type}
              <XCircle className="h-3.5 w-3.5 cursor-pointer ml-1" />
            </Badge>
          )}
          
          {filters.read !== 'all' && (
            <Badge 
              variant="secondary" 
              className="h-7 gap-1 pl-2 pr-1.5"
              onClick={() => setFilters({ read: 'all' })}
            >
              {filters.read ? 'Read' : 'Unread'}
              <XCircle className="h-3.5 w-3.5 cursor-pointer ml-1" />
            </Badge>
          )}
          
          {filters.dateRange?.from && (
            <Badge 
              variant="secondary" 
              className="h-7 gap-1 pl-2 pr-1.5"
              onClick={() => setFilters({ 
                dateRange: { 
                  from: null, 
                  to: filters.dateRange?.to || null 
                } 
              })}
            >
              From: {format(filters.dateRange.from, 'MMM d')}
              <XCircle className="h-3.5 w-3.5 cursor-pointer ml-1" />
            </Badge>
          )}
          
          {filters.dateRange?.to && (
            <Badge 
              variant="secondary" 
              className="h-7 gap-1 pl-2 pr-1.5"
              onClick={() => setFilters({ 
                dateRange: { 
                  from: filters.dateRange?.from || null, 
                  to: null 
                } 
              })}
            >
              To: {format(filters.dateRange.to, 'MMM d')}
              <XCircle className="h-3.5 w-3.5 cursor-pointer ml-1" />
            </Badge>
          )}
        </div>

        <Select
          value={filters.sortBy}
          onValueChange={(value) => 
            setFilters({ sortBy: value as 'newest' | 'oldest' })
          }
        >
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
