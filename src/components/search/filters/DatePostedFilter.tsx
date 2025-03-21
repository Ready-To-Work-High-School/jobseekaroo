
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useJobFilter } from './JobFilterContext';

// Post date options
const POST_DATE_OPTIONS = [
  { value: 1, label: 'Last 24 hours' },
  { value: 7, label: 'Last week' },
  { value: 14, label: 'Last 2 weeks' },
  { value: 30, label: 'Last month' },
  { value: 90, label: 'Last 3 months' },
];

const DatePostedFilter = () => {
  const { postedWithin, setPostedWithin } = useJobFilter();
  
  return (
    <div className="space-y-2 pt-1">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "w-full justify-start text-sm",
          postedWithin === null && "bg-primary/10 border-primary text-primary"
        )}
        onClick={() => setPostedWithin(null)}
      >
        Any time
      </Button>
      {POST_DATE_OPTIONS.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-start text-sm",
            postedWithin === option.value && "bg-primary/10 border-primary text-primary"
          )}
          onClick={() => setPostedWithin(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default DatePostedFilter;
