
import { useSlideIn } from '@/utils/animations';
import { Link } from 'react-router-dom';

const ResourceHeader = () => {
  const headerAnimation = useSlideIn(100);

  return (
    <div className={headerAnimation}>
      <div className="text-center mb-12">
        {/* Enhanced gradient to match the shield logo */}
        <div className="flex justify-center mb-4 relative">
          <Link to="/admin?adminTest=true" className="relative" aria-label="Admin Access" title="Admin Access">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
            <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-blue-700 to-amber-400 opacity-30 blur-lg glow-pulse"></div>
            <div className="absolute -inset-3.5 rounded-full bg-gradient-to-r from-amber-500 to-blue-600 opacity-25 blur-xl"></div>
            <img 
              src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
              alt="Admin Access" 
              className="h-12 w-auto relative z-10 object-contain" 
            />
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-6">
          Student Resources
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access tools, guides, and resources to help you prepare for and succeed in your job search and career.
        </p>
      </div>
    </div>
  );
};

export default ResourceHeader;
