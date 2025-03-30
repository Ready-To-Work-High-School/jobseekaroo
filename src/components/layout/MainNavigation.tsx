import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Server } from 'lucide-react';
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

const MainNavigation = () => {
  const location = useLocation();
  const { userProfile } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast()
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile && userProfile.role === 'admin') {
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
    <nav className="hidden lg:flex items-center space-x-6">
      <Link to="/" className={cn("text-sm font-medium transition-colors", 
        location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        Home
      </Link>
      
      <Link to="/jobs" className={cn("text-sm font-medium transition-colors", 
        location.pathname === "/jobs" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        Jobs
      </Link>
      
      <Link to="/server-demo" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
        location.pathname === "/server-demo" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        <Server className="w-4 h-4" /> 
        Server Demo
      </Link>
      
      {isAdmin && (
        <Link to="/admin" className={cn("text-sm font-medium transition-colors", 
          location.pathname === "/admin" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
          Admin
        </Link>
      )}

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
                <p className="text-sm font-medium leading-none">{userProfile?.full_name || user?.email}</p>
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
        <>
          <Link to="/sign-in" className={cn("text-sm font-medium transition-colors", "text-muted-foreground hover:text-primary")}>
            Sign In
          </Link>
          <Link to="/sign-up" className={cn("text-sm font-medium transition-colors", "text-muted-foreground hover:text-primary")}>
            Sign Up
          </Link>
        </>
      )}
      <ModeToggle />
    </nav>
  );
};

export default MainNavigation;
