
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  end?: boolean;
}

export const NavLink = ({ to, children }: NavLinkProps) => {
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
