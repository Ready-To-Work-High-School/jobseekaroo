import { useSlideIn, useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import FeatureCard from './FeatureCard';
const EnhancedHero = () => {
  const titleAnimation = useSlideIn(100);
  const subtitleAnimation = useSlideIn(300);
  const infoAnimation = useFadeIn(700);
  return <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      <div className="max-w-3xl mx-auto py-8 mt-10">
        <div className={cn("mb-8", titleAnimation)}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight md:text-8xl">
            <span className="bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent text-7xl">
              Job Seekers 4 High Schools
            </span>
          </h1>
          <p className="text-xl font-medium mt-2 text-primary/90">Your Gateway to Career Success</p>
        </div>
        
        <p className={cn("text-lg mb-8 text-black max-w-2xl mx-auto", subtitleAnimation)}>
          Many jobs offer competitive salaries, opportunities for growth and professional development, and long-term career potential.
        </p>

        <p className="font-semibold text-black bg-amber-200 inline-block px-4 py-2 rounded-md border border-amber-600 text-base">
          * <em>This opportunity is limited to Westside High School students enrolled in the Entrepreneurship Academy</em>
        </p>
        
        <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 mb-12", infoAnimation)}>
          <FeatureCard icon="🔎" title="Location Search" description="Find opportunities within Jacksonville and surrounding counties. Search up to 50 miles from your location." />
          <FeatureCard icon="💰" title="Apprenticeships" description="Discover paid training programs where you can learn valuable skills while earning income." />
          <FeatureCard icon="💼" title="Advanced Filtering" description="Use our powerful filters to narrow down jobs by type, experience level, and sort by relevance, date, or salary." />
        </div>
      </div>
    </section>;
};
export default EnhancedHero;