import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { Search, MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';

interface EnhancedSearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading?: boolean;
}

interface SearchFilters {
  query: string;
  location: string;
  jobType: string;
  payRange: string;
  experienceLevel: string;
}

const EnhancedSearchForm: React.FC<EnhancedSearchFormProps> = ({ onSearch, isLoading = false }) => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    jobType: '',
    payRange: '',
    experienceLevel: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search jobs..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
          <Input
            placeholder="Location"
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="pl-10"
          />
        </div>

        <Select onValueChange={(value) => updateFilter('jobType', value)}>
          <SelectTrigger>
            <div className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Job Type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => updateFilter('payRange', value)}>
          <SelectTrigger>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Pay Range" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Salary</SelectItem>
            <SelectItem value="0-30000">$0 - $30k</SelectItem>
            <SelectItem value="30000-50000">$30k - $50k</SelectItem>
            <SelectItem value="50000-75000">$50k - $75k</SelectItem>
            <SelectItem value="75000+">$75k+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => updateFilter('experienceLevel', value)}>
          <SelectTrigger>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Experience" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Level</SelectItem>
            <SelectItem value="entry">Entry Level</SelectItem>
            <SelectItem value="mid">Mid Level</SelectItem>
            <SelectItem value="senior">Senior Level</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Searching...' : 'Search Jobs'}
        </Button>
      </div>
    </form>
  );
};

export default EnhancedSearchForm;
