
import { useSlideIn, useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchForm from './SearchForm';
import FeatureCard from './FeatureCard';
import { SparkleGroup } from './animations/Sparkle';
import { Sparkles } from 'lucide-react';
import LazyImage from './LazyImage';

const Hero = () => {
  const titleAnimation = useSlideIn(100);
  const subtitleAnimation = useSlideIn(300);
  const searchAnimation = useSlideIn(500);
  const infoAnimation = useFadeIn(700);

  return <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      {/* Animated sparkles */}
      <SparkleGroup count={8} />
      
      <div className="max-w-3xl mx-auto py-8 mt-10">
        <h1 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight mt-6", titleAnimation)}>
          <span className="bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent relative">
            Find the perfect entry level job for credential holders
            <span className="absolute -right-10 top-0 hidden md:inline">
              <Sparkles className="h-8 w-8 text-amber-500 animate-pulse-slow" />
            </span>
          </span>
        </h1>
        
        <p className={cn("text-lg mb-8 text-black max-w-2xl mx-auto", subtitleAnimation)}>
          Many jobs offer competitive salaries, opportunities for growth and professional development, and long-term career potential.
        </p>

        <p className="text-base font-semibold text-black bg-amber-200 inline-block px-4 py-2 rounded-md border border-amber-500 relative">
          * <em>This opportunity is limited to Westside High School students enrolled in the Entrepreneurship or Nursing Academy</em>
          <span className="absolute -top-2 -right-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
          </span>
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
            <Button variant="default" size="lg" className="relative group">
              Browse All Jobs
              <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="h-5 w-5 text-amber-400" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};

export default Hero;
