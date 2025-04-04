
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Search, Filter, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface AdvancedSearchFiltersProps {
  onSearch: (filters: {
    searchTerm: string;
    codeType?: 'student' | 'employer' | null;
    status?: 'used' | 'unused' | null;
    dateFrom?: Date | null;
    dateTo?: Date | null;
  }) => void;
}

const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [codeType, setCodeType] = useState<'student' | 'employer' | null>(null);
  const [status, setStatus] = useState<'used' | 'unused' | null>(null);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    onSearch({
      searchTerm,
      codeType,
      status,
      dateFrom,
      dateTo
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setCodeType(null);
    setStatus(null);
    setDateFrom(null);
    setDateTo(null);
    onSearch({
      searchTerm: '',
      codeType: null,
      status: null,
      dateFrom: null,
      dateTo: null
    });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search by code, user, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSearch} variant="default">
            Search
          </Button>
          
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Advanced Filters</h3>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-1">Code Type</p>
                  <Select
                    value={codeType || ''}
                    onValueChange={(value) => setCodeType(value ? value as 'student' | 'employer' : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All types</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Select
                    value={status || ''}
                    onValueChange={(value) => setStatus(value ? value as 'used' | 'unused' : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-statuses">All statuses</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="unused">Unused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-1">Created From</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-1">Created To</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Button variant="ghost" onClick={handleReset}>
                    Reset all
                  </Button>
                  <Button 
                    onClick={() => {
                      handleSearch();
                      setIsFilterOpen(false);
                    }}
                  >
                    Apply filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Display active filters */}
      {(codeType || status || dateFrom || dateTo) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {codeType && (
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
              Type: {codeType}
            </div>
          )}
          {status && (
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
              Status: {status}
            </div>
          )}
          {dateFrom && (
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
              From: {format(dateFrom, 'PP')}
            </div>
          )}
          {dateTo && (
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
              To: {format(dateTo, 'PP')}
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-6 text-xs">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchFilters;
