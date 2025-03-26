
import { useSlideIn } from '@/utils/animations';

const ResourceHeader = () => {
  const headerAnimation = useSlideIn(100);

  return (
    <div className={headerAnimation}>
      <div className="text-center mb-12">
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
