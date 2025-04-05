
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  PenLine, 
  Headphones, 
  BarChart,
  Shield,
  Award,
  Info,
  Building2
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from 'lucide-react';
import { ModeToggle } from '../ModeToggle';
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom';

const MainNavigation = ({ className }: { className?: string }) => {
  const location = useLocation();
  const { userProfile } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast()
  const navigate = useNavigate();

  // Debug log for admin status
  console.log('MainNavigation - user type:', userProfile?.user_type);

  useEffect(() => {
    if (userProfile && userProfile.user_type === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userProfile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
      navigate('/sign-in');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      })
    }
  };
  
  return (
    <nav className={cn("hidden lg:flex items-center space-x-6", className)}>
      <Link to="/" className={cn("text-sm font-medium transition-colors", 
        location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        Home
      </Link>
      
      {/* Primary Navigation Links */}
      <Link to="/entrepreneurship-academy" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
        location.pathname === "/entrepreneurship-academy" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        <Award className="w-4 h-4" />
        Our Program
      </Link>

      <Link to="/for-employers" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
        location.pathname === "/for-employers" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        <Building2 className="w-4 h-4" />
        Employers
      </Link>

      <Link to="/about" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
        location.pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        <Info className="w-4 h-4" />
        About
      </Link>
      
      {/* Job Seeker Links */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 h-auto">
            <span className={cn("text-sm font-medium transition-colors", 
            location.pathname.includes("/jobs") ? "text-primary" : "text-muted-foreground hover:text-primary")}>
              For Job Seekers
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
            <Link to="/jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Browse Jobs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/skills" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Skills Development
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/resume-assistant" className="flex items-center gap-2">
              <PenLine className="h-4 w-4" />
              Resume Help
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/interview-prep" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Interview Prep
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Employer Links */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 h-auto">
            <span className={cn("text-sm font-medium transition-colors", 
            location.pathname.includes("/for-employers") || location.pathname.includes("/employer-dashboard") ? 
            "text-primary" : "text-muted-foreground hover:text-primary")}>
              For Employers
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
            <Link to="/for-employers" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Employer Overview
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/employer-dashboard" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Employer Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Resources Links */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 h-auto">
            <span className={cn("text-sm font-medium transition-colors", 
            location.pathname.includes("/resources") || location.pathname.includes("/analytics") ? 
            "text-primary" : "text-muted-foreground hover:text-primary")}>
              Resources
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
            <Link to="/resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Career Resources
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/analytics" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Analytics Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {isAdmin && (
        <Link to="/admin" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
          location.pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground hover:text-primary")}>
          <Shield className="w-4 h-4" />
          Admin
        </Link>
      )}

      {/* User Menu */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile?.avatar_url || `https://avatar.vercel.sh/${user?.email}.png`} alt={user?.email || "Avatar"} />
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userProfile?.first_name ? `${userProfile.first_name} ${userProfile.last_name}` : user?.email}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/applications">
                My Applications
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/saved">
                Saved Jobs
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <ModeToggle />
      )}
    </nav>
  );
};

export default MainNavigation;
