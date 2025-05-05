
import { Separator } from "@/components/ui/separator";

interface EnhancedSeparatorProps {
  label?: string;
  className?: string;
}

const EnhancedSeparator = ({ label, className }: EnhancedSeparatorProps) => {
  if (label) {
    return (
      <div className={`relative flex items-center py-4 ${className || ''}`}>
        <Separator className="flex-grow" />
        <span className="text-sm text-muted-foreground mx-4">{label}</span>
        <Separator className="flex-grow" />
      </div>
    );
  }
  
  return <Separator className={`my-6 ${className || ''}`} />;
};

export default EnhancedSeparator;
