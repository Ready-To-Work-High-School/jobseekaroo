
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useJobFilter } from './JobFilterContext';

interface JobFeaturesFilterProps {
  isRemote?: boolean | null;
  setIsRemote?: (remote: boolean | null) => void;
  isFlexible?: boolean | null;
  setIsFlexible?: (flexible: boolean | null) => void;
}

const JobFeaturesFilter = (props: JobFeaturesFilterProps = {}) => {
  // If props are provided, use them, otherwise use the context
  const context = useJobFilter();
  const { 
    isRemote = context.isRemote, 
    setIsRemote = context.setIsRemote,
    isFlexible = context.isFlexible,
    setIsFlexible = context.setIsFlexible
  } = props;
  
  return (
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
  );
};

export default JobFeaturesFilter;
