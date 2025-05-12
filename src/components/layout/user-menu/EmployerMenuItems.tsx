
import { Link } from 'react-router-dom';
import { DropdownMenuItem, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Building2, BarChart2, Award, Shield, Settings, UserCircle, Activity } from 'lucide-react';

interface EmployerMenuItemsProps {
  isEmployer: boolean;
  isCeo: boolean;
  hasPremium: boolean;
}

const EmployerMenuItems = ({ isEmployer, isCeo, hasPremium }: EmployerMenuItemsProps) => {
  if (!isEmployer && !isCeo) return null;
  
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link to="/employer-dashboard" className="cursor-pointer">
          <Building2 className="mr-2 h-4 w-4" />
          <span>Employer Dashboard</span>
        </Link>
      </DropdownMenuItem>
      
      <DropdownMenuItem asChild>
        <Link to="/employer-profile" className="cursor-pointer">
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Company Profile</span>
        </Link>
      </DropdownMenuItem>
      
      <DropdownMenuItem asChild>
        <Link to="/employer/analytics" className="cursor-pointer">
          <BarChart2 className="mr-2 h-4 w-4" />
          <span>Performance Analytics</span>
        </Link>
      </DropdownMenuItem>
      
      <DropdownMenuItem asChild>
        <Link to="/account-benefits" className="cursor-pointer">
          <Award className="mr-2 h-4 w-4" />
          <span>Account Benefits</span>
        </Link>
      </DropdownMenuItem>
      
      {isCeo && (
        <DropdownMenuItem asChild>
          <Link to="/ceo-portal" className="cursor-pointer opacity-80 hover:opacity-100">
            <Shield className="mr-2 h-4 w-4" />
            <span>CEO Portal</span>
          </Link>
        </DropdownMenuItem>
      )}
      
      <DropdownMenuItem asChild>
        <Link to="/system-diagnostics" className="cursor-pointer">
          <Activity className="mr-2 h-4 w-4" />
          <span>System Diagnostics</span>
        </Link>
      </DropdownMenuItem>
      
      <DropdownMenuItem asChild>
        <Link to="/settings" className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

export default EmployerMenuItems;
