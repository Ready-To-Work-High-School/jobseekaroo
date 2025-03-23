
import { useSlideIn, useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import FeatureCard from './FeatureCard';
import { Award, Cpu, Globe } from 'lucide-react';

const EnhancedHero = () => {
  const isMobile = useIsMobile();
  const titleAnimation = useSlideIn(100);
  const subtitleAnimation = useSlideIn(300);
  const infoAnimation = useFadeIn(700);
  const benefitsAnimation = useFadeIn(900);
  
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      <div className="max-w-3xl mx-auto py-8 mt-10">
        <div className={cn("mb-8", titleAnimation)}>
          {/* Title with accent border and background */}
          <div className="inline-block relative mb-3">
            {/* Decorative accent elements */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-amber-400 via-blue-500 to-blue-700 opacity-75 blur-sm"></div>
            <div className="absolute -inset-2.5 rounded-lg bg-gradient-to-r from-blue-700 to-amber-400 opacity-20 animate-pulse"></div>
            
            {/* Main title with background */}
            <h1 className="relative bg-white/90 backdrop-blur-sm rounded-lg p-4 text-4xl sm:text-5xl font-bold tracking-tight md:text-8xl shadow-xl">
              <span className={cn(
                "bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent px-0 mx-0",
                isMobile ? "text-4xl" : "text-7xl"
              )}>
                Job Seekers 4 High Schools
              </span>
            </h1>
          </div>
          <p className="text-xl font-medium mt-6 text-blue-900"><em>Let Your Next Chapter Start Now</em></p>
        </div>
        
        <div className={cn("mb-8 max-w-2xl mx-auto", subtitleAnimation)}>
          <p className="text-base text-gray-700">
            Westside High School students are gaining a competitive edge in the workforce through an advanced-level curriculum covering AI Foundations, Blockchain, Cloud Computing, and IoT.
          </p>
        </div>
        
        <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8 mb-8", infoAnimation)}>
          <FeatureCard icon="🔎" title="Location Search" description="Find opportunities within Jacksonville and surrounding counties. Search up to 50 miles from your location." />
          <FeatureCard icon="💰" title="Apprenticeships" description="Discover paid training programs where you can learn valuable skills while earning income." />
          <FeatureCard icon="💼" title="Advanced Filtering" description="Use our powerful filters to narrow down jobs by type, experience level, and sort by relevance, date, or salary." />
        </div>
        
        <div className={cn("flex flex-wrap justify-center gap-4 mt-4", benefitsAnimation)}>
          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-sm">
            <Award className="h-4 w-4 text-amber-500" />
            <span>IBM Digital Badges</span>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-sm">
            <Cpu className="h-4 w-4 text-blue-500" />
            <span>Everfi Certifications</span>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-sm">
            <Globe className="h-4 w-4 text-green-500" />
            <span>Ready to Work Credentials</span>
          </div>
        </div>
        
        <p className={cn("text-lg mb-8 text-black max-w-2xl mx-auto mt-6 py-2 px-4 bg-blue-50/50 rounded-lg inline-block", benefitsAnimation)}>
          <em>Competitive Salaries, Health Benefits, 401K Savings and More</em>
        </p>
      </div>
    </section>
  );
};

export default EnhancedHero;
