
import { Home, Shield } from 'lucide-react';
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
import { useCeoStatus } from '@/components/admin/redemption/tab-manager/useCeoStatus';

export const MobileMenu = () => {
  const {
    user,
    isAdmin,
    getPath,
    handleSignOut
  } = useMobileMenu();
  
  const { isCeo } = useCeoStatus();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex md:hidden items-center justify-center w-8 h-8">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left">
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
              {isAdmin && (
                <div className="border-t pt-2">
                  <h4 className="px-4 py-2 font-semibold">Admin Access</h4>
                  <MobileNavLink to="/admin" className="text-blue-600">
                    <Shield className="h-5 w-5" />
                    Admin Dashboard
                  </MobileNavLink>
                  <MobileNavLink to="/admin/redemption-codes" className="text-blue-600">
                    <Shield className="h-5 w-5" />
                    Redemption Codes
                  </MobileNavLink>
                </div>
              )}
              
              {/* CEO Section - Only for CEO users */}
              {isCeo && (
                <div className="border-t pt-2">
                  <h4 className="px-4 py-2 font-semibold text-gradient-to-r from-purple-800 via-blue-700 to-amber-600">CEO Access</h4>
                  <MobileNavLink to="/ceo-portal" className="bg-gradient-to-r from-purple-800 via-blue-700 to-amber-600 bg-clip-text text-transparent">
                    <Shield className="h-5 w-5 text-amber-500" />
                    CEO Portal
                  </MobileNavLink>
                </div>
              )}
              
              {/* Sign Out Button */}
              <SignOutButton onSignOut={handleSignOut} />
            </>
          ) : (
            <UnauthenticatedUserLinks />
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
