
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Award, Building2, Info } from 'lucide-react';

export const NavLinks = () => {
  const location = useLocation();
  
  return (
    <>
      <Link to="/" className={cn("text-sm font-medium transition-colors", 
        location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        Home
      </Link>
      
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
    </>
  );
};
