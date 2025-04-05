
import { cn } from '@/lib/utils';
import { ModeToggle } from '../ModeToggle';
import { useNavigation } from './navigation/useNavigation';
import { NavLinks } from './navigation/NavLinks';
import { JobSeekerDropdown } from './navigation/JobSeekerDropdown';
import { EmployerDropdown } from './navigation/EmployerDropdown';
import { ResourcesDropdown } from './navigation/ResourcesDropdown';
import { AdminLink } from './navigation/AdminLink';
import { UserDropdown } from './navigation/UserDropdown';

const MainNavigation = ({ className }: { className?: string }) => {
  const { user, userProfile, isAdmin, signOut } = useNavigation();

  return (
    <nav className={cn("hidden lg:flex items-center space-x-6", className)}>
      <NavLinks />
      
      {/* Dropdown Menus */}
      <JobSeekerDropdown />
      <EmployerDropdown />
      <ResourcesDropdown />
      
      {/* Admin Link */}
      <AdminLink isAdmin={isAdmin} />

      {/* User Menu */}
      {user ? (
        <UserDropdown 
          user={user} 
          userProfile={userProfile} 
          signOut={signOut} 
        />
      ) : (
        <ModeToggle />
      )}
    </nav>
  );
};

export default MainNavigation;
