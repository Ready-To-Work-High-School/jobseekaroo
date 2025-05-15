// Import necessary components and types
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { JobSearchFilters } from '@/types/job';
import { JobType, ExperienceLevel } from '@/types/job';

// Define props interface
interface JobFilterProps {
  onFilterChange: (filters: JobSearchFilters) => void;
  className?: string;
}

const JobFilter: React.FC<JobFilterProps> = ({ 
  onFilterChange, 
  className = ''
}) => {
  // Define state variables for each filter
  const [zipCode, setZipCode] = useState<string>('');
  const [radius, setRadius] = useState<number>(25);
  const [type, setType] = useState<JobType | ''>('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | ''>('');
  const [isRemote, setIsRemote] = useState<boolean | null>(null);
  const [isFlexible, setIsFlexible] = useState<boolean | null>(null);
  const [salaryRange, setSalaryRange] = useState<number[]>([0, 100000]);
  const [postedWithin, setPostedWithin] = useState<number | null>(null);

  // Handle changes to the zip code input
  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  // Handle changes to the radius slider
  const handleRadiusChange = (value: number[]) => {
    setRadius(value[0]);
  };

  // Handle changes to the job type select
  const handleTypeChange = (value: JobType | '') => {
    setType(value);
  };

  // Handle changes to the experience level select
  const handleExperienceLevelChange = (value: ExperienceLevel | '') => {
    setExperienceLevel(value);
  };

  // Handle changes to the isRemote switch
  const handleIsRemoteChange = (checked: boolean) => {
    setIsRemote(checked);
  };

  // Handle changes to the isFlexible switch
  const handleIsFlexibleChange = (checked: boolean) => {
    setIsFlexible(checked);
  };

  // Handle changes to the salary range slider
  const handleSalaryRangeChange = (value: number[]) => {
    setSalaryRange(value);
  };

  // Handle changes to the posted within select
  const handlePostedWithinChange = (value: number | null) => {
    setPostedWithin(value);
  };

  // Apply the filters and call the onFilterChange callback
  const applyFilters = () => {
    const filters: JobSearchFilters = {
      zipCode: zipCode,
      radius: radius,
      type: type,
      experienceLevel: experienceLevel,
      isRemote: isRemote,
      isFlexible: isFlexible,
      salary: {
        min: salaryRange[0],
        max: salaryRange[1],
      },
      postedWithin: postedWithin,
    };
    onFilterChange(filters);
  };

  // Job type options
  const jobTypeOptions: JobType[] = ['full-time', 'part-time', 'internship', 'volunteer', 'seasonal', 'weekend', 'summer'];

  // Experience level options
  const experienceLevelOptions: ExperienceLevel[] = ['entry-level', 'mid-level', 'senior', 'internship', 'no-experience', 'some-experience'];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <Label htmlFor="zipCode">Zip Code</Label>
        <input
          type="text"
          id="zipCode"
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
      </div>
      <div>
        <Label>Radius</Label>
        <Slider
          defaultValue={[radius]}
          max={100}
          step={1}
          onValueChange={handleRadiusChange}
        />
        <p className="text-sm text-muted-foreground">
          {radius} miles
        </p>
      </div>
      <div>
        <Label>Type</Label>
        <Select onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any</SelectItem>
            {jobTypeOptions.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Experience Level</Label>
        <Select onValueChange={handleExperienceLevelChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any</SelectItem>
            {experienceLevelOptions.map((level) => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="isRemote" onCheckedChange={handleIsRemoteChange} />
        <Label htmlFor="isRemote">Remote</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="isFlexible" onCheckedChange={handleIsFlexibleChange} />
        <Label htmlFor="isFlexible">Flexible</Label>
      </div>
      <div>
        <Label>Salary Range</Label>
        <Slider
          defaultValue={salaryRange}
          max={200000}
          step={1000}
          values={salaryRange}
          onValueChange={handleSalaryRangeChange}
        />
        <p className="text-sm text-muted-foreground">
          ${salaryRange[0]} - ${salaryRange[1]}
        </p>
      </div>
      <div>
        <Label>Posted Within</Label>
        <Select onValueChange={handlePostedWithinChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilter;
