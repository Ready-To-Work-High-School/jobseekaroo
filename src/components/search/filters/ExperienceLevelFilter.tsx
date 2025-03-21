
import { Button } from '@/components/ui/button';
import { ExperienceLevel } from '@/types/job';
import { useJobFilter } from './JobFilterContext';

const ExperienceLevelFilter = () => {
  const { experienceLevel, setExperienceLevel } = useJobFilter();
  
  return (
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
  );
};

export default ExperienceLevelFilter;
