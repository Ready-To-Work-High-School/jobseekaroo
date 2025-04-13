
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
import { Briefcase, BarChart3, Star } from 'lucide-react';

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
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild>
          <Link to="/for-employers" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Employer Overview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/employer-dashboard" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Employer Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/premium-services" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Premium Services
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
