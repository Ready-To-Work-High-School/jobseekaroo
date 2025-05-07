
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
  Kanban,
  Calendar,
  FilePlus,
  Users 
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
      <DropdownMenuContent align="start" className="bg-background w-56 z-[100]">
        <DropdownMenuItem asChild>
          <Link to="/for-employers" className="flex items-center gap-2 w-full">
            <Building2 className="h-4 w-4" />
            Employer Overview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/dashboard" className="flex items-center gap-2 w-full">
            <FilePlus className="h-4 w-4" />
            Post Jobs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/candidates" className="flex items-center gap-2 w-full">
            <Kanban className="h-4 w-4" />
            Candidate Pipeline
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/applicants" className="flex items-center gap-2 w-full">
            <Users className="h-4 w-4" />
            View Applicants
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/analytics" className="flex items-center gap-2 w-full">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/calendar" className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4" />
            Calendar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/verifications" className="flex items-center gap-2 w-full">
            <FileCheck className="h-4 w-4" />
            Verifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/tools" className="flex items-center gap-2 w-full">
            <Folder className="h-4 w-4" />
            Recruitment Tools
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer/premium-features" className="flex items-center gap-2 w-full">
            <Star className="h-4 w-4" />
            Premium Features
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
