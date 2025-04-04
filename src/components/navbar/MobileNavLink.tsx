
import { Link, useLocation } from 'react-router-dom';
import { SheetClose } from '@/components/ui/sheet';

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  end?: boolean;
  className?: string;
}

export const MobileNavLink = ({ to, children, className }: MobileNavLinkProps) => {
  const location = useLocation();
  
  // Check if current path matches the link or is a subpath
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));
  
  // Debug active state
  console.log(`MobileNavLink - Path: ${to}, Current: ${location.pathname}, Active: ${isActive}`);
  
  return (
    <SheetClose asChild>
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 text-base transition-colors ${
          isActive 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'hover:bg-muted'
        } ${className || ''}`}
      >
        {children}
      </Link>
    </SheetClose>
  );
};
