
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EnhancedSearchForm from '@/components/EnhancedSearchForm';
import { useFadeIn } from '@/utils/animations';
import { Separator } from '@/components/ui/separator';

const SearchSection = () => {
  const searchAnimation = useFadeIn(400);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className={cn("max-w-3xl mx-auto text-center", searchAnimation)}>
          <h2 className="text-2xl font-bold mb-6">Find Your Next Opportunity</h2>
          
          <div className="mb-8 flex justify-center">
            <EnhancedSearchForm />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <Link to="/jobs?experienceLevel=entry-level" className="col-span-1">
              <Button variant="outline" size="lg" className="w-full">
                Entry Level Jobs
              </Button>
            </Link>
            <Link to="/jobs" className="col-span-1">
              <Button variant="default" size="lg" className="w-full">
                Find Jobs
              </Button>
            </Link>
            <Link to="/jobs?jobType=internship" className="col-span-1">
              <Button variant="outline" size="lg" className="w-full">
                Internships
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Add separator at the end of the section */}
      <div className="container mx-auto px-4 mt-8">
        <Separator className="max-w-4xl mx-auto" />
      </div>
    </section>
  );
};

export default SearchSection;
