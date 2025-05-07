
import { Link } from 'react-router-dom';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Briefcase, Sparkles, BarChart3, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EmployerMenuItemsProps {
  isEmployer: boolean;
  isCeo: boolean;
  hasPremium?: boolean;
}

const EmployerMenuItems = ({ isEmployer, isCeo, hasPremium = false }: EmployerMenuItemsProps) => {
  if (!isEmployer && !isCeo) return null;
  
  return (
    <>
      <DropdownMenuItem asChild className="cursor-pointer">
        <Link to="/employer-dashboard" className="flex items-center w-full">
          <Briefcase className="mr-2 h-4 w-4" />
          <span>Employer Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className="cursor-pointer">
        <Link to="/employer/analytics" className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </div>
          {!hasPremium && (
            <Badge 
              variant="outline" 
              className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50 ml-2 py-0 h-5"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className="cursor-pointer">
        <Link to="/employer/calendar" className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </div>
          {!hasPremium && (
            <Badge 
              variant="outline" 
              className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50 ml-2 py-0 h-5"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className="cursor-pointer">
        <Link to="/employer-premium" className="flex items-center w-full">
          <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
          <span>Premium Services</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
};

export default EmployerMenuItems;
