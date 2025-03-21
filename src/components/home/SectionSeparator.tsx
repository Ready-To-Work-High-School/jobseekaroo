
import { cn } from '@/lib/utils';
import { useFadeIn } from '@/utils/animations';

interface SectionSeparatorProps {
  className?: string;
}

const SectionSeparator = ({ className }: SectionSeparatorProps) => {
  const animation = useFadeIn(300);
  
  return (
    <div className={cn("container mx-auto px-4 my-12", animation, className)}>
      <div className="flex items-center justify-center">
        <div className="w-1/4 h-px bg-gradient-to-r from-transparent to-primary/60"></div>
        <div className="mx-4">
          <div className="w-3 h-3 rounded-full bg-primary/80 animate-pulse-slow"></div>
        </div>
        <div className="w-1/2 h-1 rounded-full bg-gradient-to-r from-primary/60 via-primary/80 to-primary/60"></div>
        <div className="mx-4">
          <div className="w-3 h-3 rounded-full bg-primary/80 animate-pulse-slow"></div>
        </div>
        <div className="w-1/4 h-px bg-gradient-to-l from-transparent to-primary/60"></div>
      </div>
    </div>
  );
};

export default SectionSeparator;
