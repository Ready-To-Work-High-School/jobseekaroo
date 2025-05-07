
import { Link } from 'react-router-dom';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Award } from 'lucide-react';

interface RedemptionMenuItemProps {
  hasRedeemed: boolean;
  isAdmin: boolean;
}

const RedemptionMenuItem = ({ hasRedeemed, isAdmin }: RedemptionMenuItemProps) => {
  if (hasRedeemed || isAdmin) return null;
  
  return (
    <DropdownMenuItem asChild>
      <Link to="/redeem-code" className="cursor-pointer">
        <Award className="mr-2 h-4 w-4" />
        <span>Redeem Code</span>
      </Link>
    </DropdownMenuItem>
  );
};

export default RedemptionMenuItem;
