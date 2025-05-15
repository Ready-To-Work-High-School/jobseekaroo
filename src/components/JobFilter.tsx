
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
    keywords: '',
    type: undefined,
    experienceLevel: undefined,
    isRemote: false,
    salary: {
      min: 0,
      max: undefined
    },
    isFeatured: false
  });

  const handleFilterChange = (key: keyof JobSearchFilters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters: JobSearchFilters = {
      keywords: '',
      type: undefined,
      experienceLevel: undefined,
      isRemote: false,
      salary: {
        min: 0,
        max: undefined
      },
      isFeatured: false
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Keyword Search */}
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords</Label>
        <Input 
          id="keywords"
          placeholder="Job title, skills, or keywords"
          value={filters.keywords}
          onChange={(e) => handleFilterChange('keywords', e.target.value)}
        />
      </div>
      
      {/* Job Type */}
      <div className="space-y-2">
        <Label htmlFor="type">Job Type</Label>
        <Select 
          value={filters.type} 
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger id="type">
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
        <Label htmlFor="experienceLevel">Experience Level</Label>
        <Select 
          value={filters.experienceLevel}
          onValueChange={(value) => handleFilterChange('experienceLevel', value)}
        >
          <SelectTrigger id="experienceLevel">
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
          <span className="text-sm">{formatCurrency(filters.salary?.min || 0)}</span>
        </div>
        <Slider
          id="salary_min"
          min={0}
          max={100000}
          step={5000}
          value={[filters.salary?.min || 0]}
          onValueChange={(value) => {
            const updatedSalary = { ...filters.salary, min: value[0] };
            handleFilterChange('salary', updatedSalary);
          }}
        />
      </div>
      
      {/* Remote Only */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="isRemote" 
          checked={filters.isRemote}
          onCheckedChange={(checked) => handleFilterChange('isRemote', !!checked)}
        />
        <Label htmlFor="isRemote" className="cursor-pointer">Remote only</Label>
      </div>
      
      {/* Featured Jobs */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="isFeatured" 
          checked={filters.isFeatured}
          onCheckedChange={(checked) => handleFilterChange('isFeatured', !!checked)}
        />
        <Label htmlFor="isFeatured" className="cursor-pointer">Featured jobs only</Label>
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
