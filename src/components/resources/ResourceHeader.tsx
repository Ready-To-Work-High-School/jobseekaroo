
import { useSlideIn } from '@/utils/animations';

const ResourceHeader = () => {
  const headerAnimation = useSlideIn(100);

  return (
    <div className={headerAnimation}>
      <div className="text-center mb-12">
        {/* Enhanced gradient to match ESB badge style with stronger accent */}
        <div className="flex justify-center mb-4 relative">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-700 to-amber-400 opacity-30 blur-lg glow-pulse"></div>
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500 to-blue-600 opacity-25 blur-xl"></div>
            <img 
              src="/lovable-uploads/8587ce26-fbc1-463b-a0ef-e63f5fda9889.png" 
              alt="JS4HS Logo" 
              className="h-7 w-7 relative z-10 w-full h-full object-contain rounded-md"
            />
          </div>
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
