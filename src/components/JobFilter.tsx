
import { useState } from 'react';
import { JobSearchFilters } from '@/types/job';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { JOB_TYPES, EXPERIENCE_LEVELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/format';

export interface JobFilterProps {
  onFilterChange: (filters: JobSearchFilters) => void;
  className?: string;
}

const JobFilter = ({ onFilterChange, className }: JobFilterProps) => {
  const [filters, setFilters] = useState<JobSearchFilters>({
    keyword: '',
    location: '',
    job_type: undefined,
    experience_level: undefined,
    is_remote: false,
    salary_min: 0,
    is_featured: false
  });

  const handleFilterChange = (key: keyof JobSearchFilters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters: JobSearchFilters = {
      keyword: '',
      location: '',
      job_type: undefined,
      experience_level: undefined,
      is_remote: false,
      salary_min: 0,
      is_featured: false
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Keyword Search */}
      <div className="space-y-2">
        <Label htmlFor="keyword">Keywords</Label>
        <Input 
          id="keyword"
          placeholder="Job title, skills, or keywords"
          value={filters.keyword}
          onChange={(e) => handleFilterChange('keyword', e.target.value)}
        />
      </div>
      
      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location"
          placeholder="City, state, or zip code"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />
      </div>
      
      {/* Job Type */}
      <div className="space-y-2">
        <Label htmlFor="job_type">Job Type</Label>
        <Select 
          value={filters.job_type} 
          onValueChange={(value) => handleFilterChange('job_type', value)}
        >
          <SelectTrigger id="job_type">
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any</SelectItem>
            {JOB_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Experience Level */}
      <div className="space-y-2">
        <Label htmlFor="experience_level">Experience Level</Label>
        <Select 
          value={filters.experience_level}
          onValueChange={(value) => handleFilterChange('experience_level', value)}
        >
          <SelectTrigger id="experience_level">
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any</SelectItem>
            {EXPERIENCE_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Minimum Salary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="salary_min">Minimum Salary</Label>
          <span className="text-sm">{formatCurrency(filters.salary_min)}</span>
        </div>
        <Slider
          id="salary_min"
          min={0}
          max={100000}
          step={5000}
          value={[filters.salary_min || 0]}
          onValueChange={(value) => handleFilterChange('salary_min', value[0])}
        />
      </div>
      
      {/* Remote Only */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="is_remote" 
          checked={filters.is_remote}
          onCheckedChange={(checked) => handleFilterChange('is_remote', !!checked)}
        />
        <Label htmlFor="is_remote" className="cursor-pointer">Remote only</Label>
      </div>
      
      {/* Featured Jobs */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="is_featured" 
          checked={filters.is_featured}
          onCheckedChange={(checked) => handleFilterChange('is_featured', !!checked)}
        />
        <Label htmlFor="is_featured" className="cursor-pointer">Featured jobs only</Label>
      </div>
      
      {/* Filter Actions */}
      <div className="pt-4 flex justify-end">
        <Button
          variant="outline"
          onClick={handleReset}
          className="mr-2"
        >
          Reset
        </Button>
        <Button onClick={() => onFilterChange(filters)}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default JobFilter;
