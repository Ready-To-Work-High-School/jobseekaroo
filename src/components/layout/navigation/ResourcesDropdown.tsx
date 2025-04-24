
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { BookOpen, BarChart, BookMarked } from 'lucide-react';

export const ResourcesDropdown = () => {
  const location = useLocation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto">
          <span className={cn("text-sm font-medium transition-colors", 
          location.pathname.includes("/resources") || location.pathname.includes("/analytics") || location.pathname.includes("/platform-guide") ? 
          "text-primary" : "text-muted-foreground hover:text-primary")}>
            Resources
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-background">
        <DropdownMenuItem asChild>
          <Link to="/resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Career Resources
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/platform-guide" className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            Platform Guide
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Analytics Dashboard
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
