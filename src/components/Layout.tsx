import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-secondary border-b">
        <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
          <Link to="/" className="font-bold text-lg">
            Jobly
          </Link>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden sm:flex items-center space-x-4">
              <Link to="/jobs" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/jobs' ? 'text-primary' : 'text-foreground')}>
                Jobs
              </Link>
              {user && (
                <Link to="/applications" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/applications' ? 'text-primary' : 'text-foreground')}>
                  Applications
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
                  <DropdownMenuItem onClick={() => window.location.href = '/profile'} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/sign-in" className="text-sm font-medium transition-colors hover:text-primary">
                  Sign In
                </Link>
                <Link to="/sign-up" className={cn(
                  ButtonVariants({ variant: "default" }),
                  "text-sm font-medium hover:bg-primary/80"
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
      <footer className="bg-secondary border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Jobly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

const ButtonVariants = (props: any) => {
  let variant = props.variant;
  if (!variant) {
    variant = "default";
  }
  return `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-${variant} text-foreground hover:bg-${variant}/80 h-9 px-4 py-2`
}
