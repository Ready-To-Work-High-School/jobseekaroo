
import { Link } from 'react-router-dom';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Shield, Award } from 'lucide-react';

interface AdminMenuItemsProps {
  isAdmin: boolean;
}

const AdminMenuItems = ({ isAdmin }: AdminMenuItemsProps) => {
  if (!isAdmin) return null;
  
  return (
    <>
      <DropdownMenuItem asChild>
        <Link to="/admin" className="cursor-pointer">
          <Shield className="mr-2 h-4 w-4" />
          <span>Admin Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/admin/redemption-codes" className="cursor-pointer">
          <Award className="mr-2 h-4 w-4" />
          <span>Manage Redemption Codes</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
};

export default AdminMenuItems;
