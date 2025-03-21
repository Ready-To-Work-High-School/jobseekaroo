
import { useSlideIn, useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchForm from './SearchForm';
import FeatureCard from './FeatureCard';

const Hero = () => {
  const titleAnimation = useSlideIn(100);
  const subtitleAnimation = useSlideIn(300);
  const searchAnimation = useSlideIn(500);
  const infoAnimation = useFadeIn(700);

  return <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      <div className="max-w-3xl mx-auto py-8 mt-10">
        <div className={cn("relative mb-8", titleAnimation)}>
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg blur-md opacity-75"></div>
          <div className="relative bg-white rounded-lg p-5 border border-amber-300 shadow-md">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-zinc-800 via-amber-700 to-zinc-900 bg-clip-text text-transparent">
                Find the perfect entry level job for credential holders
              </span>
            </h1>
          </div>
        </div>
        
        <p className={cn("text-lg mb-8 text-black max-w-2xl mx-auto", subtitleAnimation)}>
          Many jobs offer competitive salaries, opportunities for growth and professional development, and long-term career potential.
        </p>

        <p className="text-base font-semibold text-black bg-amber-200 inline-block px-4 py-2 rounded-md border border-amber-500">
          * <em>This opportunity is limited to Westside High School students enrolled in the Entrepreneurship Academy</em>
        </p>
        
        <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 mb-12", infoAnimation)}>
          <FeatureCard icon="🔎" title="How Far Can You Travel?" description="Find opportunities within Jacksonville, surrounding counties or beyond. Use the adjustable radius filter to search up to 50 miles from your location." />
          <FeatureCard icon="💰" title="Apprenticeships" description="Discover paid training programs where you can learn valuable skills while earning income." />
          <FeatureCard icon="💼" title="Entry Level Positions" description="Explore positions specifically designed for high school students beginning their career journey." />
        </div>
        
        <div className={cn("mb-8 flex justify-center", searchAnimation)}>
          <SearchForm />
        </div>

        <div className={cn("mb-12 flex justify-center", searchAnimation)}>
          <Link to="/jobs">
            <Button variant="default" size="lg">
              Browse All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};

export default Hero;
