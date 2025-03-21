
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Menu, Home, Search, Book, FileText, BookmarkCheck, User, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileMenu = () => {
  const { user, userProfile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isEmployer = userProfile?.user_type === 'employer';

  const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/jobs", label: "Find Jobs", icon: Search },
    ...(user ? [
      { href: "/applications", label: "Applications", icon: FileText },
      { href: "/saved-jobs", label: "Saved Jobs", icon: BookmarkCheck },
      { href: "/skills", label: "Skills", icon: Book },
      { href: "/analytics", label: "Analytics", icon: Briefcase },
      { href: "/profile", label: "Profile", icon: User },
    ] : []),
    ...(isEmployer ? [
      { href: "/employer-dashboard", label: "Employer Dashboard", icon: Briefcase },
    ] : [
      { href: "/for-employers", label: "For Employers", icon: Briefcase },
    ]),
  ];

  return (
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
  );
};

export default MobileMenu;
