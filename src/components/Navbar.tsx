
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useIsMobile } from '@/hooks/use-mobile';

const NavbarBrand = () => (
  <Link to="/" className="flex items-center font-bold text-xl md:text-2xl tracking-tight">
    <img src="/logo.svg" alt="Job Seekers 4 HS Logo" className="mr-2 h-8 w-8" />
    <span className="text-primary">Job Seekers</span> 4 HS
  </Link>
);

// Custom NavLink component that wraps around React Router's Link
const NavLink = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
  <Link
    to={to}
    className={`text-sm font-medium transition-colors hover:text-primary ${className || ''}`}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { user, signOut, userProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout Failed",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive",
      })
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b bg-background">
      <div className="container-custom py-3 flex items-center justify-between">
        <NavbarBrand />
        
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/job-help">AI Job Help</NavLink>
          <NavLink to="/about">About</NavLink>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={userProfile?.avatar_url || undefined} 
                      alt={user?.email || "Avatar"} 
                    />
                    <AvatarFallback>
                      {userProfile?.first_name?.substring(0, 1).toUpperCase() || 
                      userProfile?.last_name?.substring(0, 1).toUpperCase() || 
                      user?.email?.substring(0, 2).toUpperCase() || "JS"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => window.location.href = '/profile'}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        
        {isMobile && (
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-2/3 md:w-1/2">
              <SheetHeader className="space-y-2">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate the app and manage your account.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button variant="ghost" asChild><Link to="/" onClick={toggleMobileMenu}>Home</Link></Button>
                <Button variant="ghost" asChild><Link to="/jobs" onClick={toggleMobileMenu}>Jobs</Link></Button>
                <Button variant="ghost" asChild><Link to="/resources" onClick={toggleMobileMenu}>Resources</Link></Button>
                <Button variant="ghost" asChild><Link to="/job-help" onClick={toggleMobileMenu}>AI Job Help</Link></Button>
                <Button variant="ghost" asChild><Link to="/about" onClick={toggleMobileMenu}>About</Link></Button>
                {user ? (
                  <>
                    <Button variant="ghost" asChild><Link to="/profile" onClick={toggleMobileMenu}>Profile</Link></Button>
                    <Button variant="ghost" asChild><Link to="/dashboard" onClick={toggleMobileMenu}>Dashboard</Link></Button>
                    <Button variant="ghost" onClick={() => { handleLogout(); toggleMobileMenu(); }}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild><Link to="/login" onClick={toggleMobileMenu}>Login</Link></Button>
                    <Button variant="ghost" asChild><Link to="/register" onClick={toggleMobileMenu}>Register</Link></Button>
                  </>
                )}
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default Navbar;
