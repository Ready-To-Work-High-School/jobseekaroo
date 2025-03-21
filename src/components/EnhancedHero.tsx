
import { useSlideIn, useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EnhancedSearchForm from './EnhancedSearchForm';
import FeatureCard from './FeatureCard';

const EnhancedHero = () => {
  const titleAnimation = useSlideIn(100);
  const subtitleAnimation = useSlideIn(300);
  const searchAnimation = useSlideIn(500);
  const infoAnimation = useFadeIn(700);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      <div className="max-w-3xl mx-auto py-8 mt-10">
        <h1 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight mt-6", titleAnimation)}>
          <span className="bg-gradient-to-r from-zinc-800 via-amber-700 to-zinc-900 bg-clip-text text-transparent">
            Find the perfect entry level job for credential holders
          </span>
        </h1>
        
        <p className={cn("text-lg mb-8 text-black max-w-2xl mx-auto", subtitleAnimation)}>
          Many jobs offer competitive salaries, opportunities for growth and professional development, and long-term career potential.
        </p>

        <p className="text-base font-semibold text-black bg-amber-200 inline-block px-4 py-2 rounded-md border border-amber-500">
          * <em>This opportunity is limited to Westside High School students enrolled in the Entrepreneurship Academy</em>
        </p>
        
        <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 mb-12", infoAnimation)}>
          <FeatureCard 
            icon="🔎" 
            title="Enhanced Location Search" 
            description="Find opportunities within Jacksonville with our improved geolocation features. Use your current location or save searches for later." 
          />
          <FeatureCard 
            icon="💰" 
            title="Apprenticeships" 
            description="Discover paid training programs where you can learn valuable skills while earning income." 
          />
          <FeatureCard 
            icon="💼" 
            title="Advanced Filtering" 
            description="Use our powerful filters to narrow down jobs by type, experience level, and sort by relevance, date, or salary." 
          />
        </div>
        
        <div className={cn("mb-8 flex justify-center", searchAnimation)}>
          <EnhancedSearchForm />
        </div>

        <div className={cn("mb-12 flex justify-center", searchAnimation)}>
          <Link to="/jobs">
            <Button variant="default" size="lg">
              Browse All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
