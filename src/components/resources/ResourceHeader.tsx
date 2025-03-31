
import { useSlideIn } from '@/utils/animations';

const ResourceHeader = () => {
  const headerAnimation = useSlideIn(100);

  return (
    <div className={headerAnimation}>
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/6a344606-c844-465c-b643-7ff460697a49.png" 
            alt="JS4HS Logo" 
            className="h-16 w-16"
          />
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
