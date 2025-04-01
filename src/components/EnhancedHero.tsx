
import { useSlideIn, useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import FeatureCard from './FeatureCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, Building2, User, BookOpen } from 'lucide-react';

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
      
      <div className="w-full max-w-6xl mx-auto py-8 mt-10">
        <div className={cn("mb-8", titleAnimation)}>
          {/* Logo with enhanced gradient glow */}
          <div className="flex justify-center mb-6">
            <div className="relative"> 
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-md animate-pulse"></div>
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-700 to-amber-400 opacity-40 blur-lg glow-pulse"></div>
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-amber-500 via-blue-500 to-blue-700 opacity-20 blur-xl"></div>
              <img 
                src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
                alt="JS4HS Logo" 
                className="relative z-10 w-40 h-auto object-contain" 
              />
            </div>
          </div>
          
          {/* Title with accent border and background - expanded width */}
          <div className="relative mb-3 w-full">
            {/* Decorative accent elements */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-amber-400 via-blue-500 to-blue-700 opacity-75 blur-sm"></div>
            <div className="absolute -inset-2.5 rounded-lg bg-gradient-to-r from-blue-700 to-amber-400 opacity-20 animate-pulse"></div>
            
            {/* Main title with background - expanded */}
            <h1 className="relative bg-white/90 backdrop-blur-sm rounded-lg p-4 text-4xl sm:text-5xl font-bold tracking-tight md:text-8xl shadow-xl">
              <span className={cn(
                "bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent px-0 mx-0",
                isMobile ? "text-4xl" : "text-7xl"
              )}>
                Job Seekers 4 High Schools
              </span>
            </h1>
          </div>
          <p className="text-xl font-medium mt-6 text-black"><em>Exclusively for students at Westside High School</em></p>
        </div>
        
        {/* Main Navigation Links - Expanded with Student link */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
          <Link to="/entrepreneurship-academy">
            <Button size="lg" variant="default" className="flex items-center gap-2 px-6 py-6 text-lg">
              <GraduationCap className="h-5 w-5" />
              Entrepreneurship Academy
            </Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" variant="outline" className="flex items-center gap-2 px-6 py-6 text-lg">
              <Briefcase className="h-5 w-5" />
              Browse Jobs
            </Button>
          </Link>
          <Link to="/for-employers">
            <Button size="lg" variant="secondary" className="flex items-center gap-2 px-6 py-6 text-lg">
              <Building2 className="h-5 w-5" />
              For Employers
            </Button>
          </Link>
          <Link to="/resources">
            <Button size="lg" variant="ghost" className="flex items-center gap-2 px-6 py-6 text-lg">
              <BookOpen className="h-5 w-5" />
              Student Resources
            </Button>
          </Link>
        </div>
        
        <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 mb-8", infoAnimation)}>
          <FeatureCard icon="🔎" title="Location Search" description="Find opportunities within Jacksonville and surrounding counties. Search up to 50 miles from your location." />
          <FeatureCard icon="💰" title="Apprenticeships" description="Discover paid training programs where you can learn valuable skills while earning income." />
          <FeatureCard icon="💼" title="Advanced Filtering" description="Use our powerful filters to narrow down jobs by type, experience level, and sort by relevance, date, or salary." />
        </div>
        
        <p className={cn("text-lg mb-8 text-black max-w-2xl mx-auto mt-6 py-2 px-4 bg-blue-50/50 rounded-lg inline-block", benefitsAnimation)}>
          <em>Competitive Salaries, Health Benefits, 401K Savings and More</em>
        </p>
      </div>
    </section>
  );
};

export default EnhancedHero;
