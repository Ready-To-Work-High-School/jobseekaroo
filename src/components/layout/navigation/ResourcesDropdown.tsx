
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
import { BookOpen, GraduationCap, Award, FileText } from 'lucide-react';

export const ResourcesDropdown = () => {
  const location = useLocation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto">
          <span className={cn("text-sm font-medium transition-colors", 
          location.pathname.includes("/resources") ? 
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
          <Link to="/skill-development" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Skill Development
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/platform-guide" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Platform Guide
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/interview-prep" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Interview Preparation
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
