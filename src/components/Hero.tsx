import { useSlideIn, useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import SearchForm from './SearchForm';
import FeatureCard from './FeatureCard';
const Hero = () => {
  const titleAnimation = useSlideIn(100);
  const subtitleAnimation = useSlideIn(300);
  const searchAnimation = useSlideIn(500);
  const infoAnimation = useFadeIn(700);
  return <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 rounded-none bg-amber-500">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      <div className="max-w-3xl mx-auto rounded-md py-0">
        <span className={cn("inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium", "bg-primary/10 text-primary", titleAnimation)}>
          For Westside High School Students
        </span>
        
        <h1 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight", "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600", titleAnimation)}>
Find the perfect entry level job in Jacksonville</h1>
        
        <p className="font-semibold">
          Discover entry-level positions and apprenticeships in Jacksonville, FL that fit your schedule,
          skills, and interests – all with just your ZIP code.
        </p>
        
        <div className={cn("mb-12 flex justify-center", searchAnimation)}>
          <SearchForm />
        </div>
        
        <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto", infoAnimation)}>
          <FeatureCard icon="🔎" title="Local Jobs" description="Find opportunities within Jacksonville that minimize commute time." />
          <FeatureCard icon="💰" title="Apprenticeships" description="Discover paid training programs where you can learn valuable skills while earning income." />
          <FeatureCard icon="💼" title="Entry Level Positions" description="Explore positions specifically designed for high school students beginning their career journey." />
        </div>
      </div>
    </section>;
};
export default Hero;