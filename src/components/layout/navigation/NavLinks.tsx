
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

export const NavLinks = () => {
  const location = useLocation();
  
  return (
    <>
      <Link to="/" className={cn("text-sm font-medium transition-colors", 
        location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        Home
      </Link>

      <Link to="/about" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
        location.pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        <Info className="w-4 h-4" />
        About
      </Link>
    </>
  );
};
