
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { School, Briefcase, UserCircle, CreditCard, Info, Award, LogOut, LogIn, UserPlus, Shield, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import AdminTestLink from '../shared/AdminTestLink';

export const MobileMenu = () => {
  const { user, userProfile, signOut } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();

  const handleSignOut = () => {
    signOut();
  };

  const isEmployer = userProfile?.user_type === 'employer';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col h-full">
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-grow gap-4 pt-4">
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Home
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/jobs" className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Find Jobs
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/for-employers" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              For Employers
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/school-integration" className="flex items-center">
              <School className="mr-2 h-4 w-4" />
              Schools
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/about" className="flex items-center">
              <Info className="mr-2 h-4 w-4" />
              About
            </Link>
          </Button>
          
          <div className="border-t my-2"></div>
          
          {/* Admin Panel Link */}
          {isAdmin && (
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/admin" className="flex items-center text-red-500">
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            </Button>
          )}
          
          {/* CEO Portal Link - subtle but visible on hover */}
          {isCeo && (
            <Button asChild variant="ghost" className="justify-start opacity-60 hover:opacity-100 bg-gradient-to-r hover:from-purple-50 hover:to-amber-50">
              <Link to="/ceo-portal" className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-amber-500" />
                <span className="bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 bg-clip-text text-transparent">
                  CEO Portal
                </span>
              </Link>
            </Button>
          )}
          
          {user ? (
            <>
              <Button asChild variant="ghost" className="justify-start">
                <Link to="/profile" className="flex items-center">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>

              {isEmployer && (
                <>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/employer-dashboard" className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Employer Dashboard
                    </Link>
                  </Button>
                  
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/employer-profile" className="flex items-center">
                      <Building2 className="mr-2 h-4 w-4" />
                      Company Profile
                    </Link>
                  </Button>
                </>
              )}
              
              <Button asChild variant="ghost" className="justify-start">
                <Link to="/notifications" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                  Notifications
                </Link>
              </Button>
              
              <div className="mt-auto">
                <Button variant="ghost" className="justify-start w-full text-red-500" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="mt-auto flex flex-col gap-2">
              <Button asChild variant="outline" className="justify-start">
                <Link to="/signin" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild className="justify-start">
                <Link to="/signup" className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
