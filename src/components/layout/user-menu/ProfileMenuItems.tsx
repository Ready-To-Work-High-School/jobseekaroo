
import { Link } from 'react-router-dom';
import { DropdownMenuItem, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { User, BarChart2, BookmarkCheck, Award } from 'lucide-react';

interface ProfileMenuItemsProps {
  userProfile: any;
  isAdmin: boolean;
}

const ProfileMenuItems = ({ userProfile, isAdmin }: ProfileMenuItemsProps) => {
  const isEmployer = userProfile?.user_type === 'employer';
  
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link to={userProfile?.user_type === 'student' ? "/student-profile" : "/profile"} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/profile-tabs" className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Tabbed Profile</span>
        </Link>
      </DropdownMenuItem>
      {!isAdmin && (
        <DropdownMenuItem asChild>
          <Link to="/account-benefits" className="cursor-pointer">
            <Award className="mr-2 h-4 w-4" />
            <span>Account Benefits</span>
          </Link>
        </DropdownMenuItem>
      )}
      <DropdownMenuItem asChild>
        <Link to="/analytics" className="cursor-pointer">
          <BarChart2 className="mr-2 h-4 w-4" />
          <span>Analytics</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/saved-jobs" className="cursor-pointer">
          <BookmarkCheck className="mr-2 h-4 w-4" />
          <span>Saved Jobs</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

export default ProfileMenuItems;
