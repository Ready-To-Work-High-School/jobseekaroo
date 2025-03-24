import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { 
  Settings, Menu, X, BarChart2, Briefcase, Book, 
  FileText, Search, BookmarkCheck, User, Home, GraduationCap, Award
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileMenu from './MobileMenu';
import AccountTypeBadge from './AccountTypeBadge';
import { NotificationCenter } from '../notifications/NotificationCenter';

const Header = () => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();

  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isEmployer = userProfile?.user_type === 'employer';
  const isAdmin = userProfile?.user_type === 'admin';

  return (
    <header className="bg-secondary border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        {isMobile && <MobileMenu />}
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/' ? 'text-primary' : 'text-foreground')}>
              Home
            </Link>
            <Link to={getPath("/jobs")} className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/jobs' ? 'text-primary' : 'text-foreground')}>
              Jobs
            </Link>
            <Link to="/entrepreneurship-academy" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/entrepreneurship-academy' ? 'text-primary' : 'text-foreground')}>
              Academy
            </Link>
            {user ? (
              <>
                <Link to="/applications" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/applications' ? 'text-primary' : 'text-foreground')}>
                  Applications
                </Link>
                <Link to="/skills" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/skills' ? 'text-primary' : 'text-foreground')}>
                  Skills
                </Link>
                <Link to="/analytics" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/analytics' ? 'text-primary' : 'text-foreground')}>
                  Analytics
                </Link>
                <Link to="/account-benefits" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/account-benefits' ? 'text-primary' : 'text-foreground')}>
                  Benefits
                </Link>
                {isAdmin && (
                  <Link to="/admin/redemption-codes" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/admin/redemption-codes' ? 'text-primary' : 'text-foreground')}>
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/sign-in" className={cn("text-sm font-medium transition-colors hover:text-primary", 
                  location.pathname === '/applications' || location.pathname === '/skills' || location.pathname === '/analytics' ? 'text-primary' : 'text-foreground')}>
                  Student Portal
                </Link>
              </>
            )}
            
            {isEmployer ? (
              <Link to="/employer-dashboard" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/employer-dashboard' ? 'text-primary' : 'text-foreground')}>
                Employer Dashboard
              </Link>
            ) : (
              <Link to="/for-employers" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/for-employers' ? 'text-primary' : 'text-foreground')}>
                For Employers
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          {user && <NotificationCenter />}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.email} />
                    <AvatarFallback>{userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                  {userProfile?.user_type && (
                    <div className="absolute -top-2 -right-2">
                      <AccountTypeBadge userProfile={userProfile} className="h-4 px-1" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  {userProfile ? (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span>{userProfile.first_name} {userProfile.last_name}</span>
                        {userProfile.user_type && (
                          <AccountTypeBadge userProfile={userProfile} />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  ) : (
                    <span>My Account</span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account-benefits" className="cursor-pointer">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Account Benefits</span>
                    </Link>
                  </DropdownMenuItem>
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
                <DropdownMenuSeparator />
                {!userProfile?.redeemed_at && (
                  <DropdownMenuItem asChild>
                    <Link to="/redeem-code" className="cursor-pointer">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Redeem Code</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {isEmployer && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/employer-dashboard" className="cursor-pointer">
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Employer Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/redemption-codes" className="cursor-pointer">
                        <Award className="mr-2 h-4 w-4" />
                        <span>Manage Redemption Codes</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/sign-in" className="text-sm font-medium transition-colors hover:text-primary">
                Sign In
              </Link>
              <Link to="/sign-up" className={cn(
                "inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium transition-colors",
              )}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
