
import { useSlideIn, useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import SearchForm from './SearchForm';

const Hero = () => {
  const titleAnimation = useSlideIn(100);
  const subtitleAnimation = useSlideIn(300);
  const searchAnimation = useSlideIn(500);
  const infoAnimation = useFadeIn(700);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      <div className="max-w-3xl mx-auto">
        <span className={cn(
          "inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium",
          "bg-primary/10 text-primary",
          titleAnimation
        )}>
          For High School Students
        </span>
        
        <h1 className={cn(
          "text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight",
          "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600",
          titleAnimation
        )}>
          Find the perfect starting job in your area
        </h1>
        
        <p className={cn(
          "text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto",
          subtitleAnimation
        )}>
          Discover entry-level opportunities near you that fit your schedule,
          skills, and interests – all with just your ZIP code.
        </p>
        
        <div className={cn("mb-12 flex justify-center", searchAnimation)}>
          <SearchForm />
        </div>
        
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto", 
          infoAnimation
        )}>
          <FeatureCard 
            icon="🔎"
            title="Local Jobs"
            description="Find opportunities within your community that minimize commute time."
          />
          <FeatureCard 
            icon="🕒"
            title="Flexible Hours"
            description="Filter for jobs that work with your class schedule and activities."
          />
          <FeatureCard 
            icon="🎓"
            title="No Experience Needed"
            description="Browse positions specifically open to high school students."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 rounded-lg bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-3 text-2xl">{icon}</div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Hero;
