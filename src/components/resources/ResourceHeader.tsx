
import { useSlideIn } from '@/utils/animations';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const ResourceHeader = () => {
  const headerAnimation = useSlideIn(100);

  return (
    <div className={headerAnimation}>
      <div className="text-center mb-12 relative">
        {/* Small floating hearts with gradient */}
        <div className="absolute top-0 right-1/4 transform -translate-y-1/2 animate-bounce-subtle">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-purple-400 to-lavender-500 opacity-70 blur-sm"></div>
            <Heart className="h-6 w-6 text-white relative z-10 drop-shadow-md" />
          </div>
        </div>
        
        <div className="absolute top-10 left-1/4 transform -translate-y-1/2 animate-float">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold-400 to-lavender-400 opacity-60 blur-sm"></div>
            <Heart className="h-4 w-4 text-white relative z-10 drop-shadow-md" />
          </div>
        </div>
        
        {/* Enhanced gradient to match the shield logo */}
        <div className="flex justify-center mb-4 relative">
          <Link to="/admin?adminTest=true" className="relative" aria-label="Admin Access" title="Admin Access">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 via-gold-400 to-lavender-500 opacity-75 blur-sm animate-pulse"></div>
            <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-blue-700 to-gold-400 opacity-30 blur-lg glow-pulse"></div>
            <div className="absolute -inset-3.5 rounded-full bg-gradient-to-r from-gold-400 to-lavender-600 opacity-25 blur-xl"></div>
            <img 
              src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
              alt="Admin Access" 
              className="h-12 w-auto relative z-10 object-contain" 
            />
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-6 relative">
          <span className="bg-gradient-to-r from-gold-500 via-lavender-400 to-lavender-500 bg-clip-text text-transparent">Student Resources</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access tools, guides, and resources to help you prepare for and succeed in your job search and career.
        </p>
        
        {/* Decorative gradient bar - now straight */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-400 via-lavender-500 to-lavender-400 translate-y-6 opacity-70"></div>
      </div>
    </div>
  );
};

export default ResourceHeader;
