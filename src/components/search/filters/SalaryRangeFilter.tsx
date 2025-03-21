
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useJobFilter } from './JobFilterContext';

// Mock salary ranges in $10k intervals
const SALARY_RANGES = [
  { min: 0, max: 20000, label: 'Under $20k' },
  { min: 20000, max: 30000, label: '$20k - $30k' },
  { min: 30000, max: 40000, label: '$30k - $40k' },
  { min: 40000, max: 50000, label: '$40k - $50k' },
  { min: 50000, max: 60000, label: '$50k - $60k' },
  { min: 60000, max: 70000, label: '$60k - $70k' },
  { min: 70000, max: 80000, label: '$70k - $80k' },
  { min: 80000, max: 90000, label: '$80k - $90k' },
  { min: 90000, max: 100000, label: '$90k - $100k' },
  { min: 100000, max: null, label: '$100k+' },
];

const SalaryRangeFilter = () => {
  const { salaryRange, setSalaryRange } = useJobFilter();
  
  return (
    <div className="space-y-3 pt-1">
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">${salaryRange[0]/1000}k</span>
          <span className="text-sm font-medium">${salaryRange[1]/1000}k+</span>
        </div>
        <Slider
          defaultValue={[0, 100000]}
          value={salaryRange}
          min={0}
          max={100000}
          step={10000}
          onValueChange={(values) => setSalaryRange([values[0], values[1]])}
          className="mt-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {SALARY_RANGES.map((range, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={cn(
              "text-xs justify-start",
              salaryRange[0] === range.min && 
              salaryRange[1] === (range.max || 100000) &&
              "bg-primary/10 border-primary text-primary"
            )}
            onClick={() => setSalaryRange([range.min, range.max || 100000])}
          >
            {range.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SalaryRangeFilter;
