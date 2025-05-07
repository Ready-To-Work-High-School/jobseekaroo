
import { Link } from 'react-router-dom';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Briefcase, Sparkles } from 'lucide-react';

interface EmployerMenuItemsProps {
  isEmployer: boolean;
  isCeo: boolean;
}

const EmployerMenuItems = ({ isEmployer, isCeo }: EmployerMenuItemsProps) => {
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
        <Link to="/employer-premium" className="flex items-center w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Premium Services</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
};

export default EmployerMenuItems;
