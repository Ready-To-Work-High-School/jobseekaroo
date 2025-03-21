
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
      
      {/* Enhanced decorative separator */}
      <div className="container mx-auto px-4 my-12">
        <div className="flex items-center justify-center">
          <div className="w-1/4 h-px bg-gradient-to-r from-transparent to-primary/60"></div>
          <div className="mx-4">
            <div className="w-3 h-3 rounded-full bg-primary/80 animate-pulse-slow"></div>
          </div>
          <div className="w-1/2 h-1 rounded-full bg-gradient-to-r from-primary/60 via-primary/80 to-primary/60"></div>
          <div className="mx-4">
            <div className="w-3 h-3 rounded-full bg-primary/80 animate-pulse-slow"></div>
          </div>
          <div className="w-1/4 h-px bg-gradient-to-l from-transparent to-primary/60"></div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
