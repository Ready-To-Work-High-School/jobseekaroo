
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
import { Briefcase, GraduationCap, PenLine, Headphones } from 'lucide-react';

export const JobSeekerDropdown = () => {
  const location = useLocation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto">
          <span className={cn("text-sm font-medium transition-colors", 
          location.pathname.includes("/jobs") ? "text-primary" : "text-muted-foreground hover:text-primary")}>
            For Job Seekers
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild>
          <Link to="/jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Browse Jobs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/skills" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Skills Development
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/resume-assistant" className="flex items-center gap-2">
            <PenLine className="h-4 w-4" />
            Resume Help
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/interview-prep" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Interview Prep
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
