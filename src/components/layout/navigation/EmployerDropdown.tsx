
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
import { 
  Briefcase, 
  BarChart3, 
  Star, 
  Building2, 
  FileCheck, 
  Folder,
  Kanban 
} from 'lucide-react';

export const EmployerDropdown = () => {
  const location = useLocation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto">
          <span className={cn("text-sm font-medium transition-colors", 
          location.pathname.includes("/for-employers") || location.pathname.includes("/employer") ? 
          "text-primary" : "text-muted-foreground hover:text-primary")}>
            For Employers
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-background w-56">
        <DropdownMenuItem asChild>
          <Link to="/for-employers" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Employer Overview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/dashboard" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Post Jobs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/candidates" className="flex items-center gap-2">
            <Kanban className="h-4 w-4" />
            Candidate Pipeline
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/verifications" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Verifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Hiring Analytics
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/tools" className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Recruitment Tools
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/premium-features" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Premium Features
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
