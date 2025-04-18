
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MobileNavLink } from './MobileNavLink';
import { useMobileMenu } from './useMobileMenu';
import {
  PrimaryNavigationLinks,
  JobSeekersSection,
  ResourcesSection,
  AuthenticatedUserLinks,
  AdminLink,
  CeoLink,
  SignOutButton,
  UnauthenticatedUserLinks
} from './MobileMenuSections';
import { MenuIcon } from 'lucide-react';

export const MobileMenu = () => {
  const {
    user,
    isAdmin,
    getPath,
    handleSignOut
  } = useMobileMenu();

  return (
    <>
      <SheetHeader className="px-4 pb-2">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      
      <nav className="flex flex-col border-t">
        <MobileNavLink to="/">
          <Home className="h-5 w-5" />
          Home
        </MobileNavLink>
        
        {/* Primary Navigation Links - Highlighted at top */}
        <PrimaryNavigationLinks />
        
        {/* Job Seeker Section */}
        <JobSeekersSection getPath={getPath} />
        
        {/* Resources Section */}
        <ResourcesSection getPath={getPath} />
        
        {user ? (
          <>
            {/* Authenticated User Links */}
            <AuthenticatedUserLinks onSignOut={handleSignOut} />
            
            {/* Admin Section - Only for admin users */}
            {isAdmin && <AdminLink />}
            
            {/* Hidden CEO Portal link */}
            <CeoLink />
            
            {/* Sign Out Button */}
            <SignOutButton onSignOut={handleSignOut} />
          </>
        ) : (
          <UnauthenticatedUserLinks />
        )}
      </nav>
    </>
  );
};

export default MobileMenu;
