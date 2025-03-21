
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
  FileText, Search, BookmarkCheck, User, Home
} from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/jobs", label: "Find Jobs", icon: Search },
    ...(user ? [
      { href: "/applications", label: "Applications", icon: FileText },
      { href: "/saved-jobs", label: "Saved Jobs", icon: BookmarkCheck },
      { href: "/skills", label: "Skills", icon: Book },
      { href: "/analytics", label: "Analytics", icon: BarChart2 },
      { href: "/profile", label: "Profile", icon: User },
    ] : []),
    ...(isEmployer ? [
      { href: "/employer-dashboard", label: "Employer Dashboard", icon: Briefcase },
    ] : [
      { href: "/for-employers", label: "For Employers", icon: Briefcase },
    ]),
  ];

  // Bottom navigation links
  const bottomNavLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/resources", label: "Resources" },
    { href: "/skills", label: "Skills" },
    { href: "/for-employers", label: "For Employers" },
    { href: "/faq", label: "FAQ" },
    { href: "/success-stories", label: "Success Stories" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-secondary border-b sticky top-0 z-10">
        <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                  <div className="flex flex-col gap-6 py-4">
                    <Link to="/" className="font-bold text-lg px-2 bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent">
                      Job Seekers 4 High Schools
                    </Link>
                    
                    <nav className="flex flex-col space-y-1">
                      {mobileNavItems.map((item, index) => (
                        <Link 
                          key={index} 
                          to={item.href}
                          className={cn(
                            "flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-accent",
                            location.pathname === item.href ? "bg-accent text-accent-foreground font-medium" : "text-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                    
                    {!user && (
                      <div className="flex flex-col gap-2 px-2 mt-4">
                        <Link to="/sign-in" className={cn(
                          "text-sm font-medium py-2 px-4 rounded-md border border-input",
                          "hover:bg-accent hover:text-accent-foreground"
                        )}>
                          Sign In
                        </Link>
                        <Link to="/sign-up" className={cn(
                          "text-sm font-medium py-2 px-4 rounded-md bg-primary text-primary-foreground",
                          "hover:bg-primary/90"
                        )}>
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
            
            <Link to="/" className="font-bold text-lg flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span className="bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent">Job Seekers 4 High Schools</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/' ? 'text-primary' : 'text-foreground')}>
                Home
              </Link>
              <Link to="/jobs" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/jobs' ? 'text-primary' : 'text-foreground')}>
                Jobs
              </Link>
              {user && (
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.email} />
                      <AvatarFallback>{userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
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
      <main className="flex-1">
        {children}
      </main>
      
      {/* Bottom Navigation Links */}
      <div className="bg-muted py-4 border-t">
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {bottomNavLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <footer className="bg-secondary border-t py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Job Seekers 4 High Schools</h3>
              <p className="text-sm text-muted-foreground">
                Connecting students with credential-ready opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground">Browse Jobs</Link></li>
                <li><Link to="/skills" className="text-sm text-muted-foreground hover:text-foreground">Skills Development</Link></li>
                <li><Link to="/resume-assistant" className="text-sm text-muted-foreground hover:text-foreground">Resume Help</Link></li>
                <li><Link to="/interview-prep" className="text-sm text-muted-foreground hover:text-foreground">Interview Prep</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Employers</h4>
              <ul className="space-y-2">
                <li><Link to="/for-employers" className="text-sm text-muted-foreground hover:text-foreground">Employer Overview</Link></li>
                <li><Link to="/employer-dashboard" className="text-sm text-muted-foreground hover:text-foreground">Employer Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">Career Resources</Link></li>
                <li><Link to="/analytics" className="text-sm text-muted-foreground hover:text-foreground">Analytics Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Job Seekers 4 High Schools. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
