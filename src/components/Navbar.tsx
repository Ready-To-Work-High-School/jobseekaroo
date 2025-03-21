
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { NotificationCenter } from '@/components/NotificationCenter';
import AuthStatus from '@/components/AuthStatus';
import {
  Menu,
  Search,
  Briefcase,
  BookOpen,
  BookMarked,
  Building2,
  User,
  FileText,
  CheckSquare,
  LogOut,
  X,
  Menu as MenuIcon,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  end?: boolean;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-foreground hover:bg-muted hover:text-primary'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <SheetClose asChild>
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 text-base transition-colors ${
          isActive 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'hover:bg-muted'
        }`}
      >
        {children}
      </Link>
    </SheetClose>
  );
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [atTop, setAtTop] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const handleQuickSearch = (query: string) => {
    navigate(`/jobs?q=${encodeURIComponent(query)}`);
  };
  
  const showSearchBar = !location.pathname.includes('/jobs') && !location.pathname.includes('/sign');
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md ${
        atTop ? 'border-b border-border/40' : 'border-b border-border shadow-sm'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container-custom flex h-16 items-center justify-between py-2">
        <div className="flex items-center gap-2 md:gap-6">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 pt-10 w-[280px]">
                <SheetHeader className="px-4 pb-2">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col border-t">
                  <MobileNavLink to="/">
                    <Briefcase className="h-5 w-5" />
                    Home
                  </MobileNavLink>
                  <MobileNavLink to="/jobs">
                    <Search className="h-5 w-5" />
                    Find Jobs
                  </MobileNavLink>
                  <MobileNavLink to="/resources">
                    <BookOpen className="h-5 w-5" />
                    Resources
                  </MobileNavLink>
                  <MobileNavLink to="/for-employers">
                    <Building2 className="h-5 w-5" />
                    For Employers
                  </MobileNavLink>
                  <MobileNavLink to="/resume-assistant">
                    <FileText className="h-5 w-5" />
                    Resume Assistant
                  </MobileNavLink>
                  
                  {user && (
                    <>
                      <div className="border-t border-border/60 my-2"></div>
                      <MobileNavLink to="/skills">
                        <TrendingUp className="h-5 w-5" />
                        Skills
                      </MobileNavLink>
                      <MobileNavLink to="/saved-jobs">
                        <BookMarked className="h-5 w-5" />
                        Saved Jobs
                      </MobileNavLink>
                      <MobileNavLink to="/applications">
                        <CheckSquare className="h-5 w-5" />
                        Applications
                      </MobileNavLink>
                      <MobileNavLink to="/profile">
                        <User className="h-5 w-5" />
                        Profile
                      </MobileNavLink>
                      <div 
                        className="flex items-center gap-3 px-4 py-3 text-base cursor-pointer hover:bg-muted"
                        onClick={() => {
                          signOut();
                          navigate('/');
                        }}
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </div>
                    </>
                  )}
                  
                  {!user && (
                    <>
                      <div className="border-t border-border/60 my-2"></div>
                      <MobileNavLink to="/sign-in">
                        Sign In
                      </MobileNavLink>
                      <MobileNavLink to="/sign-up">
                        Sign Up
                      </MobileNavLink>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold">Job<span className="text-primary">Match</span></span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/jobs">Find Jobs</NavLink>
              {user && <NavLink to="/skills">Skills</NavLink>}
              {user && <NavLink to="/applications">Applications</NavLink>}
              <NavLink to="/resources">Resources</NavLink>
              <NavLink to="/for-employers">For Employers</NavLink>
              <NavLink to="/resume-assistant">Resume Assistant</NavLink>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {showSearchBar && (
            <form className="hidden md:flex" onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Search jobs..."
                  className="pl-8 w-[180px] lg:w-[240px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search for jobs"
                />
              </div>
            </form>
          )}
          
          {user && (
            <div className="flex items-center">
              <NotificationCenter />
            </div>
          )}
          
          <AuthStatus />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
