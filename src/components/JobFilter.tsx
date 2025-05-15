import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { JobType, ExperienceLevel } from '@/types/job';

interface JobFilterProps {
  onFilterChange: (filters: any) => void;
}

const JobFilter: React.FC<JobFilterProps> = ({ onFilterChange }) => {
  const [jobType, setJobType] = useState<JobType | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
  const [isRemote, setIsRemote] = useState<boolean | null>(null);
  const [salaryRange, setSalaryRange] = useState<number[]>([20000, 100000]);

  const handleFilter = () => {
    const filters = {
      jobType,
      experienceLevel,
      isRemote,
      salary: {
        min: salaryRange[0],
        max: salaryRange[1],
      },
    };
    onFilterChange(filters);
  };

  const handleReset = () => {
    setJobType(null);
    setExperienceLevel(null);
    setIsRemote(null);
    setSalaryRange([20000, 100000]);
    onFilterChange({});
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Filter Options</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Job Type</h4>
          <div className="pl-1">
            <RadioGroup defaultValue={jobType || undefined} onValueChange={(value) => setJobType(value as JobType)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="job-type-full-time" />
                <Label htmlFor="job-type-full-time">Full-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="job-type-part-time" />
                <Label htmlFor="job-type-part-time">Part-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internship" id="job-type-internship" />
                <Label htmlFor="job-type-internship">Internship</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Experience Level</h4>
          <div className="pl-1">
            <RadioGroup defaultValue={experienceLevel || undefined} onValueChange={(value) => setExperienceLevel(value as ExperienceLevel)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="entry-level" id="experience-entry-level" />
                <Label htmlFor="experience-entry-level">Entry-level</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mid-level" id="experience-mid-level" />
                <Label htmlFor="experience-mid-level">Mid-level</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="senior" id="experience-senior" />
                <Label htmlFor="experience-senior">Senior</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Remote</h4>
            <Switch id="filter-remote" checked={isRemote === true} onCheckedChange={(checked) => setIsRemote(checked)} />
          </div>
          <p className="text-sm text-muted-foreground">Only show remote jobs</p>
        </div>
        <Separator />
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Salary Range</h4>
          <Slider
            defaultValue={salaryRange}
            max={200000}
            step={1000}
            onValueChange={(value) => setSalaryRange(value)}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>${salaryRange[0].toLocaleString()}</p>
            <p>${salaryRange[1].toLocaleString()}</p>
          </div>
        </div>
        <Button onClick={handleFilter}>Apply Filters</Button>
        <Button variant="outline" onClick={handleReset}>Reset Filters</Button>
      </CardContent>
    </Card>
  );
};

export default JobFilter;
