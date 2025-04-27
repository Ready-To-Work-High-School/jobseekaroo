
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, List } from "lucide-react";

interface GuideHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showDirectory?: boolean;
  onToggleDirectory?: () => void;
}

const GuideHeader = ({ 
  searchTerm, 
  onSearchChange, 
  showDirectory = false,
  onToggleDirectory
}: GuideHeaderProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <h1 className="text-3xl font-bold mb-6">Complete Platform Guide</h1>
      <p className="text-muted-foreground mb-8">
        This comprehensive guide covers all features and functionalities of our platform, 
        designed to help you navigate and make the most of the available tools.
      </p>
      
      <div className="flex gap-4 items-center mb-4">
        <Button 
          variant={showDirectory ? "default" : "outline"} 
          onClick={onToggleDirectory}
          className="flex items-center gap-2"
        >
          <List className="h-4 w-4" />
          {showDirectory ? "Hide Directory" : "Show Directory"}
        </Button>
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search the guide..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
};

export default GuideHeader;
