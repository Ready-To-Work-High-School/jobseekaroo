
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Briefcase } from 'lucide-react';
import { JobType, ExperienceLevel } from '@/types/job';

interface SearchFiltersProps {
  jobType: JobType | 'all';
  setJobType: (type: JobType | 'all') => void;
  experienceLevel: ExperienceLevel | 'all';
  setExperienceLevel: (level: ExperienceLevel | 'all') => void;
  isRemote: boolean | null;
  setIsRemote: (remote: boolean | null) => void;
  isFlexible: boolean | null;
  setIsFlexible: (flexible: boolean | null) => void;
  sortBy?: 'relevance' | 'date' | 'salary' | 'distance';
  setSortBy?: (sort: 'relevance' | 'date' | 'salary' | 'distance') => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

const SearchFilters = ({
  jobType,
  setJobType,
  experienceLevel,
  setExperienceLevel,
  isRemote,
  setIsRemote,
  isFlexible,
  setIsFlexible,
  sortBy,
  setSortBy,
  onResetFilters,
  onApplyFilters
}: SearchFiltersProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Advanced Filters</h3>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Job Type</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            type="button" 
            variant={jobType === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setJobType('all')}
            className="justify-start"
          >
            <Briefcase className="mr-2 h-3.5 w-3.5" />
            All Types
          </Button>
          <Button 
            type="button" 
            variant={jobType === 'part-time' ? "default" : "outline"}
            size="sm"
            onClick={() => setJobType('part-time')}
            className="justify-start"
          >
            <Briefcase className="mr-2 h-3.5 w-3.5" />
            Part Time
          </Button>
          <Button 
            type="button" 
            variant={jobType === 'full-time' ? "default" : "outline"}
            size="sm"
            onClick={() => setJobType('full-time')}
            className="justify-start"
          >
            <Briefcase className="mr-2 h-3.5 w-3.5" />
            Full Time
          </Button>
          <Button 
            type="button" 
            variant={jobType === 'internship' ? "default" : "outline"}
            size="sm"
            onClick={() => setJobType('internship')}
            className="justify-start"
          >
            <Briefcase className="mr-2 h-3.5 w-3.5" />
            Internship
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Experience Level</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            type="button" 
            variant={experienceLevel === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setExperienceLevel('all')}
            className="justify-start"
          >
            All Levels
          </Button>
          <Button 
            type="button" 
            variant={experienceLevel === 'no-experience' ? "default" : "outline"}
            size="sm"
            onClick={() => setExperienceLevel('no-experience')}
            className="justify-start"
          >
            No Experience
          </Button>
          <Button 
            type="button" 
            variant={experienceLevel === 'entry-level' ? "default" : "outline"}
            size="sm"
            onClick={() => setExperienceLevel('entry-level')}
            className="justify-start"
          >
            Entry Level
          </Button>
          <Button 
            type="button" 
            variant={experienceLevel === 'some-experience' ? "default" : "outline"}
            size="sm"
            onClick={() => setExperienceLevel('some-experience')}
            className="justify-start"
          >
            Some Experience
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Job Features</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remote"
              checked={isRemote === true}
              onCheckedChange={(checked) => {
                if (checked === 'indeterminate') return;
                setIsRemote(checked ? true : null);
              }}
            />
            <Label htmlFor="remote">Remote Work</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="flexible"
              checked={isFlexible === true} 
              onCheckedChange={(checked) => {
                if (checked === 'indeterminate') return;
                setIsFlexible(checked ? true : null);
              }}
            />
            <Label htmlFor="flexible">Flexible Schedule</Label>
          </div>
        </div>
      </div>
      
      {setSortBy && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Sort Results By</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              type="button" 
              variant={sortBy === 'relevance' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('relevance')}
              className="justify-start"
            >
              Relevance
            </Button>
            <Button 
              type="button" 
              variant={sortBy === 'date' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('date')}
              className="justify-start"
            >
              Date Posted
            </Button>
            <Button 
              type="button" 
              variant={sortBy === 'salary' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('salary')}
              className="justify-start"
            >
              Salary
            </Button>
            <Button 
              type="button" 
              variant={sortBy === 'distance' ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy('distance')}
              className="justify-start"
            >
              Distance
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={onResetFilters}
        >
          Reset
        </Button>
        <Button 
          type="button" 
          size="sm"
          onClick={onApplyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
